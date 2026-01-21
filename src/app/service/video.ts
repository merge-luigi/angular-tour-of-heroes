// src/app/service/video.service.ts
import { Injectable } from '@angular/core';

export interface VideoFragment {
  start: number;
  end: number;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  
  private currentVideo: HTMLVideoElement | null = null;
  private animationFrameId?: number;
  private onEndCallback?: () => void;

  constructor() {}

  init(videoElement: HTMLVideoElement): void {
    this.currentVideo = videoElement;
  }

  playFragments(fragments: VideoFragment[], onComplete: () => void): void {
    if (!this.currentVideo) {
      console.error('Video no inicializado. Llamá a init() primero.');
      return;
    }

    this.onEndCallback = onComplete;
    this.playFragmentSequence(fragments, 0);
  }

  private playFragmentSequence(fragments: VideoFragment[], index: number): void {
    if (!this.currentVideo) return;

    if (index >= fragments.length) {
      this.onEndCallback?.();
      return;
    }

    const fragment = fragments[index];
    const video = this.currentVideo;

    video.currentTime = fragment.start;

    video.play().catch(err => {
      console.error('Error al reproducir video:', err);
      video.muted = true;
      video.play();
    });

    const checkTime = () => {
      if (!this.currentVideo) return;

      if (video.currentTime >= fragment.end) {
        this.playFragmentSequence(fragments, index + 1);
      } else {
        this.animationFrameId = requestAnimationFrame(checkTime);
      }
    };

    this.animationFrameId = requestAnimationFrame(checkTime);
  }

  pause(): void {
    if (this.currentVideo) {
      this.currentVideo.pause();
    }
    this.cleanup();
  }

  stop(): void {
    if (this.currentVideo) {
      this.currentVideo.pause();
      this.currentVideo.currentTime = 0;
    }
    this.cleanup();
  }

  skip(): void {
    this.cleanup();
    this.onEndCallback?.();
  }

  setVolume(volume: number): void {
    if (this.currentVideo) {
      this.currentVideo.volume = Math.max(0, Math.min(1, volume));
    }
  }

  setMuted(muted: boolean): void {
    if (this.currentVideo) {
      this.currentVideo.muted = muted;
    }
  }

  getDuration(): number {
    return this.currentVideo?.duration || 0;
  }

  getCurrentTime(): number {
    return this.currentVideo?.currentTime || 0;
  }

  private cleanup(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
  }

  destroy(): void {
    this.cleanup();
    this.currentVideo = null;
    this.onEndCallback = undefined;
  }
}