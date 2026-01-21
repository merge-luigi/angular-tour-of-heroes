// audio.service.ts (o donde tengas tu AudioService)
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  
  private audio: HTMLAudioElement;
  private isPlaying = false;

  constructor() {
    // Inicializar el audio con tu archivo de música
    this.audio = new Audio('assets/audio/intro-loop.wav'); // 👈 Ajustá la ruta
    this.audio.loop = true; // Para que se repita
    this.audio.volume = 0.5; // Volumen al 50%
  }

  // Método para reproducir
  play(): Promise<void> {
    this.isPlaying = true;
    return this.audio.play();
  }

  // 👇 AGREGAR ESTE MÉTODO
  pause(): void {
    this.audio.pause();
    this.isPlaying = false;
  }

  // 👇 AGREGAR ESTE MÉTODO (opcional, por si querés detener completamente)
  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0; // Volver al inicio
    this.isPlaying = false;
  }

  // Método que ya tenías
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // 👇 MÉTODO EXTRA (opcional, para controlar volumen)
  setVolume(volume: number): void {
    this.audio.volume = Math.max(0, Math.min(1, volume)); // Entre 0 y 1
  }
}