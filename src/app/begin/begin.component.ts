// begin.component.ts
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../service/audio';
import { VideoService, VideoFragment } from '../service/video'; 
import { VideoPreloadService } from '../service/videoPreload.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-begin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss']
})
export class BeginComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  videoReady = false;
  isMusicPlaying = false;
  
  private readonly VIDEO_URL = 'assets/video/A leap of Faith.mp4';
  
  private readonly fragments: VideoFragment[] = [
    { start: 35, end: 82 }
  ];

  constructor(
    private router: Router,
    private audioService: AudioService,
    private videoService: VideoService,
    private videoPreloadService: VideoPreloadService
  ) {}

  ngOnInit() {
    /*this.audioService.pause();*/
    
    if (this.videoPreloadService.isPreloaded(this.VIDEO_URL)) {
      console.log('✅ Video ya precargado desde /start');
    } else {
      console.log('⚠️ Video NO estaba precargado, cargando ahora...');
    }
  }

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    
    const preloadedVideo = this.videoPreloadService.getPreloadedVideo(this.VIDEO_URL);
    
    if (preloadedVideo) {
      console.log('🚀 Usando video precargado (carga instantánea)');
      
      video.src = preloadedVideo.src;
      video.muted = false;
      video.volume = 0.7;
      
      video.addEventListener('loadedmetadata', () => {
        this.setupVideo(video);
      }, { once: true });
      
    } else {
      console.log('⏳ Cargando video normalmente...');
    
      video.src = this.VIDEO_URL;
      video.muted = false;
      video.volume = 0.7;
      
      video.addEventListener('loadedmetadata', () => {
        this.setupVideo(video);
      }, { once: true });
    }

    video.addEventListener('error', (e) => {
      console.error('Error cargando video:', e);
      this.router.navigateByUrl('/home');
    });
  }

  private setupVideo(video: HTMLVideoElement): void {
    console.log('Metadata cargada');
    
    this.videoService.init(video);
    this.videoService.setMuted(false);
    this.videoService.setVolume(0.7);
    
    video.currentTime = this.fragments[0].start;
    
    video.addEventListener('canplay', () => {
      console.log('Video listo');
      this.videoReady = true;
      
      setTimeout(() => {
        this.playVideoWithAudio();
      }, 200);
      
    }, { once: true });
  }

  private playVideoWithAudio(): void {
    const video = this.videoPlayer.nativeElement;
    
    video.play()
      .then(() => {
        console.log('▶️ Video reproduciendo con audio');
        this.videoService.playFragments(this.fragments, () => {
          this.onVideoComplete();
        });
      })
      .catch(err => {
        console.error('❌ Autoplay bloqueado:', err);
        video.muted = true;
        video.play().then(() => {
          this.videoService.playFragments(this.fragments, () => {
            this.onVideoComplete();
          });
        });
      });
  }

  ngOnDestroy() {
    console.log('🔴 BEGIN: Destruyendo componente');
    this.videoService.destroy();
  }

  private onVideoComplete(): void {
    console.log('✅ BEGIN: Video completado, navegando a /home');
    
    // ⚠️ NO llamamos a clear() porque /home necesita el video precargado
    // El video permanece en memoria para ser usado por /home
    
    this.router.navigateByUrl('/home');
  }

  skipIntro(): void {
    this.videoService.skip();
  }
}