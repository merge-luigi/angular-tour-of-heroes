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
    // Iniciar la música y luego navegar a /begin
    this.audioService.play()
      .then(() => {
        this.router.navigateByUrl('/begin');
      })
      .catch(err => {
        // Si hay error, navegar de todas formas
        console.error('No se pudo reproducir el audio:', err);
        this.router.navigateByUrl('/begin');
      });
  }
}