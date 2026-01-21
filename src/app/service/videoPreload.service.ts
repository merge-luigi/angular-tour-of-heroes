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

  constructor() {}

  preload(url: string): Observable<PreloadStatus> {
    if (this.preloadStatus.has(url)) {
      return this.preloadStatus.get(url)!.asObservable();
    }

    const status$ = new BehaviorSubject<PreloadStatus>({
      url,
      loaded: false,
      progress: 0
    });

    this.preloadStatus.set(url, status$);

    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.style.display = 'none';

    video.addEventListener('progress', () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        
        if (duration > 0) {
          const progress = Math.round((bufferedEnd / duration) * 100);
          status$.next({
            url,
            loaded: progress === 100,
            progress
          });
          
          console.log(`📹 Precarga ${url}: ${progress}%`);
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
    }, { once: true });

    video.addEventListener('error', (e) => {
      console.error(`❌ Error precargando ${url}:`, e);
      status$.next({
        url,
        loaded: false,
        progress: 0,
        error: 'Error al cargar el video'
      });
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

  clear(url: string): void {
    const video = this.preloadedVideos.get(url);
    if (video) {
      video.src = '';
      video.load();
      video.remove();
    }
    
    this.preloadedVideos.delete(url);
    this.preloadStatus.delete(url);
  }

  clearAll(): void {
    this.preloadedVideos.forEach(video => {
      video.src = '';
      video.load();
      video.remove();
    });
    
    this.preloadedVideos.clear();
    this.preloadStatus.clear();
  }
}