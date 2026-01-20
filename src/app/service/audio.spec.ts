import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../service/audio'; // Cambiado aquí

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
    this.audioService.play()
      .then(() => {
        this.router.navigateByUrl('/begin');
      })
      .catch(err => {
        console.error('No se pudo reproducir el audio:', err);
        this.router.navigateByUrl('/begin');
      });
  }
}