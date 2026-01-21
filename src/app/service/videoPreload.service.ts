// src/app/service/video-preload.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PreloadStatus {
  url: string;
  loaded: boolean;
  progress: number;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoPreloadService {
  
  private preloadedVideos = new Map<string, HTMLVideoElement>();
  private preloadStatus = new Map<string, BehaviorSubject<PreloadStatus>>();
  private activePreloads = new Set<string>(); // ✅ Evitar duplicados

  constructor() {}

  preload(url: string): Observable<PreloadStatus> {
    // Si ya existe el status (precarga en progreso o completa), retornar
    if (this.preloadStatus.has(url)) {
      console.log(`ℹ️ Ya existe una precarga para ${url}`);
      return this.preloadStatus.get(url)!.asObservable();
    }

    // Si ya está precargado y disponible, retornar status exitoso
    if (this.isPreloaded(url)) {
      console.log(`✅ ${url} ya estaba precargado`);
      const status$ = new BehaviorSubject<PreloadStatus>({
        url,
        loaded: true,
        progress: 100
      });
      return status$.asObservable();
    }

    // Marcar como precarga activa
    this.activePreloads.add(url);

    const status$ = new BehaviorSubject<PreloadStatus>({
      url,
      loaded: false,
      progress: 0
    });

    this.preloadStatus.set(url, status$);

    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true; // ✅ Importante para mobile
    video.style.display = 'none';
    
    // ✅ Agregar al DOM para que Chrome lo cargue correctamente
    document.body.appendChild(video);

    video.addEventListener('progress', () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        
        if (duration > 0) {
          const progress = Math.round((bufferedEnd / duration) * 100);
          
          // Solo actualizar si el progreso cambió
          const currentStatus = status$.getValue();
          if (currentStatus.progress !== progress) {
            status$.next({
              url,
              loaded: progress === 100,
              progress
            });
            
            console.log(`📹 Precarga ${url}: ${progress}%`);
          }
        }
      }
    });

    video.addEventListener('canplaythrough', () => {
      console.log(`✅ Video precargado: ${url}`);
      status$.next({
        url,
        loaded: true,
        progress: 100
      });
      
      this.preloadedVideos.set(url, video);
      this.activePreloads.delete(url);
    }, { once: true });

    video.addEventListener('error', (e) => {
      console.error(`❌ Error precargando ${url}:`, e);
      
      status$.next({
        url,
        loaded: false,
        progress: 0,
        error: 'Error al cargar el video'
      });
      
      // Limpiar en caso de error
      this.activePreloads.delete(url);
      video.remove();
    });

    video.src = url;
    video.load();

    return status$.asObservable();
  }

  isPreloaded(url: string): boolean {
    return this.preloadedVideos.has(url);
  }

  getPreloadedVideo(url: string): HTMLVideoElement | null {
    return this.preloadedVideos.get(url) || null;
  }

  getStatus(url: string): Observable<PreloadStatus> | null {
    const status$ = this.preloadStatus.get(url);
    return status$ ? status$.asObservable() : null;
  }

  /**
   * Limpia un video específico de la memoria
   * ⚠️ Usar con cuidado - solo cuando estés seguro que no se necesitará más
   */
  clear(url: string): void {
    console.log(`🗑️ Limpiando video: ${url}`);
    
    const video = this.preloadedVideos.get(url);
    if (video) {
      video.pause();
      video.src = '';
      video.load();
      video.remove();
    }
    
    this.preloadedVideos.delete(url);
    this.preloadStatus.delete(url);
    this.activePreloads.delete(url);
  }

  /**
   * Limpia todos los videos precargados
   */
  clearAll(): void {
    console.log('🗑️ Limpiando todos los videos precargados');
    
    this.preloadedVideos.forEach((video, url) => {
      video.pause();
      video.src = '';
      video.load();
      video.remove();
      console.log(`  - Limpiado: ${url}`);
    });
    
    this.preloadedVideos.clear();
    this.preloadStatus.clear();
    this.activePreloads.clear();
  }
}