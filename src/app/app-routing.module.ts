import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeroesComponent } from './heroes/heroes.component';
import { StoriesComponent } from './stories/stories.component';
import { BeginComponent } from './begin/begin.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'start' },
  { path: 'start', component: StartComponent},
  { path: 'begin', component: BeginComponent },        
  { path: 'home', component: HomeComponent },           
  { path: 'heroes', component: HeroesComponent },
  { path: 'powers', component: StoriesComponent },
  { path: 'heroes/:heroKey/powers', component: StoriesComponent },

  { path: '**', redirectTo: 'start' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}