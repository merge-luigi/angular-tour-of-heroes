import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ImageViewerState =
  | { open: false }
  | { open: true; src: string; alt?: string };

@Injectable({ providedIn: 'root' })
export class ImageViewerService {
  private readonly _state = new BehaviorSubject<ImageViewerState>({ open: false });
  readonly state$ = this._state.asObservable();

  open(src: string, alt?: string) {
    if (!src) return;
    this._state.next({ open: true, src, alt });
  }

  close() {
    this._state.next({ open: false });
  }
}
