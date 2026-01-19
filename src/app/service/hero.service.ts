import { Injectable } from '@angular/core';
import { Hero } from '../models/heroes';

@Injectable({
  providedIn: 'root'
})

export class HeroesList {
  private readonly heroes: Hero[] = [
    { id: 1, key: 'spiderman', name: 'Spider-Man', imageUrl: 'assets/spidy.jpg' },
    { id: 2, key: 'venom', name: 'Venom', imageUrl: 'assets/venom-block black background.gif' },
    { id: 3, key: 'carnage', name: 'Carnage', imageUrl: 'assets/carnage.gif' },
    { id: 4, key: 'dante', name: 'Dante', imageUrl: 'assets/Dante.png' },
    { id: 5, key: 'miles', name: 'Miles', imageUrl: 'assets/writing miles.jpg' },
    { id: 6, key: 'peter', name: 'Peter B. Parker', imageUrl: 'assets/best peter.jpg' }
  ];

  getHeroes(): Hero[] {
    return this.heroes;
  }

  getHeroByKey(key: string): Hero | undefined {
    return this.heroes.find(h => h.key === key);
  }
}
