import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-image-expand></app-image-expand>
  `
})
export class AppComponent {}
