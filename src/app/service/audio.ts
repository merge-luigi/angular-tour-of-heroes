import { Injectable } from '@angular/core';

export type AudioKey = string;

export interface AudioConfig {
  src: string;
  loop?: boolean;
  volume?: number;     // 0..1
  preload?: 'none' | 'metadata' | 'auto';
}

type Track = {
  el: HTMLAudioElement;
  isPlaying: boolean;
  cfg: Required<Omit<AudioConfig, 'src' | 'preload'>> & Pick<AudioConfig, 'preload'>;
};

@Injectable({ providedIn: 'root' })
export class AudioService {

  private tracks = new Map<AudioKey, Track>();

  /**
   * Crea o actualiza un track por key.
   * NO reproduce automáticamente (así no rompe autoplay policy).
   */
  register(key: AudioKey, config: AudioConfig): void {
    const el = new Audio(config.src);

    el.loop = config.loop ?? false;
    el.volume = config.volume ?? 1;
    el.preload = config.preload ?? 'auto';

    // Importante: evitar “cruces raros” si un audio queda a medio play
    el.pause();
    el.currentTime = 0;

    this.tracks.set(key, {
      el,
      isPlaying: false,
      cfg: {
        loop: el.loop,
        volume: el.volume,
        preload: el.preload as any
      }
    });
  }

  /** Reproduce un track por key */
  async play(key: AudioKey): Promise<void> {
    const t = this.mustGet(key);
    t.isPlaying = true;
    await t.el.play();
  }

  /** Pausa sin resetear el tiempo */
  pause(key: AudioKey): void {
    const t = this.mustGet(key);
    t.el.pause();
    t.isPlaying = false;
  }

  /** Stop = pausa y vuelve al inicio */
  stop(key: AudioKey): void {
    const t = this.mustGet(key);
    t.el.pause();
    t.el.currentTime = 0;
    t.isPlaying = false;
  }

  /** Para SFX: dispara desde el inicio, aunque ya estuviera sonando */
  async playFromStart(key: AudioKey): Promise<void> {
    const t = this.mustGet(key);
    t.el.currentTime = 0;
    t.isPlaying = true;
    await t.el.play();
  }

  setVolume(key: AudioKey, volume: number): void {
    const t = this.mustGet(key);
    t.el.volume = Math.max(0, Math.min(1, volume));
    t.cfg.volume = t.el.volume;
  }

  isPlaying(key: AudioKey): boolean {
    const t = this.mustGet(key);
    return t.isPlaying;
  }

  /** Opcional: liberar un track si ya no lo necesitás */
  unregister(key: AudioKey): void {
    const t = this.tracks.get(key);
    if (!t) return;
    t.el.pause();
    t.el.src = '';
    this.tracks.delete(key);
  }

  private mustGet(key: AudioKey): Track {
    const t = this.tracks.get(key);
    if (!t) {
      // Esto te deja el error “limpio” y explícito (y lo ves rápido)
      throw new Error(`AudioService: track no registrado: "${key}"`);
    }
    return t;
  }
}
