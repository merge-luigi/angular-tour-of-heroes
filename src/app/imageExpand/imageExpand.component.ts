import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageViewerService, ImageViewerState } from '../service/imageExpand.service';

@Component({
  selector: 'app-image-expand',
  templateUrl: './imageExpand.component.html',
})
export class ImageExpandComponent {
  state$: Observable<ImageViewerState> = this.viewer.state$;

  constructor(private viewer: ImageViewerService) {
  this.viewer.state$.subscribe(s => console.log('VIEWER STATE', s));
}

  close() { this.viewer.close(); }

  @HostListener('document:keydown.escape')
  onEsc() { this.close(); }
}
/*
última act: 09-01-2026 
hora: 18:28pm
*/