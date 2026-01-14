import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeroesComponent } from './heroes/heroes.component';
import { StoriesComponent } from './stories/stories.component';


const routes: Routes = [
  { path: '', component: HomeComponent },          // <-- TU LANDING
  { path: 'heroes', component: HeroesComponent },  // <-- LISTA / SELECCIÓN
  { path: 'powers', component: StoriesComponent},
  { path: 'heroes/:heroKey/powers', component: StoriesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
