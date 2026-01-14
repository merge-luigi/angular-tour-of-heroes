import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeroesComponent } from './heroes/heroes.component';
import { HomeComponent } from './home/home.component';
import { StoriesComponent } from './stories/stories.component';

import { IonicModule } from '@ionic/angular';
import { ImageExpandComponent } from './imageExpand/imageExpand.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HomeComponent,
    StoriesComponent,
    ImageExpandComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule.forRoot({}),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
