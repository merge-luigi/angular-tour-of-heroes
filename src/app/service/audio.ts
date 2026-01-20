import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;

  constructor() {
    // Crear el elemento de audio
    this.audio = new Audio();
    this.audio.src = 'assets/audio/intro-loop2.wav';
    this.audio.loop = true;
    this.audio.volume = 0.7; // Volumen al 70%
  }

  play(): Promise<void> {
    if (this.audio && !this.isPlaying) {
      this.isPlaying = true;
      return this.audio.play().catch(err => {
        console.error('Error al reproducir audio:', err);
        this.isPlaying = false;
        throw err;
      });
    }
    return Promise.resolve();
  }

  pause(): void {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }

  setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}