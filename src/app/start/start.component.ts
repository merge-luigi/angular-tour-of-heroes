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

  private readonly HOME_VIDEO_URL = 'assets/video/A leap of Faith.mp4';

  homeVideoLoaded = false;
  loadingProgress = 0;

  constructor(
    private router: Router,
    private audioService: AudioService,
    private videoPreloadService: VideoPreloadService
  ) {}

  ngOnInit(): void {
    console.log('🎬 START: Iniciando precarga del video de /home...');

    this.videoPreloadService.preload(this.HOME_VIDEO_URL).subscribe(status => {
      this.loadingProgress = status.progress;

      if (status.progress > 0 && status.progress < 100) {
        console.log(`📹 Descargando video de /home: ${status.progress}%`);
      }

      if (status.loaded) {
        console.log(`✅ Video de /home COMPLETAMENTE PRECARGADO (${this.HOME_VIDEO_URL})`);
        this.homeVideoLoaded = true;
      }

      if (status.error) {
        console.error('❌ Error precargando:', status.error);
        this.homeVideoLoaded = true;
      }
    });
  }

start(): void {
  // opcional: avisar que el usuario dio consentimiento
  sessionStorage.setItem('audioUnlocked', 'true');

  this.router.navigateByUrl('/begin');
}

}