// start.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../service/audio';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent {
  
  constructor(
    private router: Router,
    private audioService: AudioService
  ) { }

  start() {
    // 👇 CLAVE: Crear y reproducir el video AQUÍ (con el click del usuario)
    const video = document.createElement('video');
    video.src = 'assets/video/A leap of Faith.mp4';
    video.muted = false; // 👈 CON AUDIO
    video.volume = 0.7;
    
    // Reproducir inmediatamente (esto desbloquea el audio)
    video.play()
      .then(() => {
        console.log('✓ Audio desbloqueado desde /start');
        
        // Pausar inmediatamente (solo queríamos desbloquear)
        video.pause();
        
        // Guardar el estado de "desbloqueado" en sessionStorage
        sessionStorage.setItem('audioUnlocked', 'true');
        
        // Navegar a /begin
        this.router.navigateByUrl('/begin');
      })
      .catch(err => {
        console.error('Error al desbloquear audio:', err);
        // Navegar de todas formas
        this.router.navigateByUrl('/begin');
      });
  }
}