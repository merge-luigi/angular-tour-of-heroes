// start.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../service/audio';
import { VideoPreloadService } from '../service/videoPreload.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  
  // URLs de los videos que se usarán después
  private readonly HOME_VIDEO_URL = 'assets/video/A leap of Faith.mp4';
  
  constructor(
    private router: Router,
    private audioService: AudioService,
    private videoPreloadService: VideoPreloadService
  ) {}

  ngOnInit(): void {
    console.log('🎬 Iniciando precarga de videos en background...');
    
    // 👇 CLAVE: Iniciar precarga INMEDIATAMENTE al entrar a /start
    this.videoPreloadService.preload(this.HOME_VIDEO_URL).subscribe(status => {
      // Monitorear progreso
      if (status.progress > 0 && status.progress < 100) {
        console.log(`📹 Precarga ${this.HOME_VIDEO_URL}: ${status.progress}%`);
      }
      
      if (status.loaded) {
        console.log(`✅ Video precargado: ${this.HOME_VIDEO_URL}`);
      }
      
      if (status.error) {
        console.error(`❌ Error precargando video:`, status.error);
      }
    });
  }

  start(): void {
    // Crear video temporal solo para desbloquear audio
    const tempVideo = document.createElement('video');
    tempVideo.src = this.HOME_VIDEO_URL; // Usamos el mismo video que ya estamos precargando
    tempVideo.muted = false;
    tempVideo.volume = 0.7;
    
    // Reproducir para desbloquear audio
    tempVideo.play()
      .then(() => {
        console.log('✓ Audio desbloqueado desde /start');
        
        // Pausar inmediatamente
        tempVideo.pause();
        tempVideo.remove();
        
        // Marcar audio como desbloqueado
        sessionStorage.setItem('audioUnlocked', 'true');
        
        // Navegar a /begin
        this.router.navigateByUrl('/begin');
      })
      .catch(err => {
        console.error('⚠️ Error al desbloquear audio:', err);
        // Navegar de todas formas
        this.router.navigateByUrl('/begin');
      });
  }
}