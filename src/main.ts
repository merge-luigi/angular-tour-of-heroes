import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

console.clear();

console.log(
  '%c🕷 Proyecto Tour of Heroes\n%cIniciado · Modo desarrollo',
  'color:#e53935; font-size:18px; font-weight:bold;',
  'color:#aaa; font-size:12px; letter-spacing:1px;'
);
