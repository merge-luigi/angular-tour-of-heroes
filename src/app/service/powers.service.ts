import { Injectable } from '@angular/core';
import { Technique, HeroKey, HeroTechniquesMap } from '../models/powers';


@Injectable({ providedIn: 'root' })
export class HeroPowersService {
  private readonly powersByHero: HeroTechniquesMap = {
    venom: [
      { id: 1, name: 'Bomba Simbionte' },
      { id: 2, name: 'Brazo escudo' },
      { id: 3, name: 'Puños Demoledores' },
      { id: 4, name: 'Tempestad Simbiótica' },
    ],
    spiderman: [
      { id: 1, name: 'Sentido Arácnido' },
      { id: 2, name: 'Telaraña' },
    ],
    carnage: [
      { id: 1, name: 'Cuchillas Orgánicas' },
      { id: 2, name: 'Brazo espada' },
      { id: 3, name: 'Garras' },
      { id: 4, name: 'Brazo espada & garra' },
      { id: 5, name: 'Blindaje' },
      { id: 6, name: 'Biomasa Muscular' },
    ],
    dante: [
      { id: 1, name: 'Stinger Infernal' },
      { id: 2, name: 'Combo Aéreo Ascendente' },
      { id: 3, name: 'Overdrive Carmesí' },
      { id: 4, name: 'Rain Storm' },
      { id: 5, name: 'Royal Release' },
      { id: 6, name: 'Devil Trigger' },
    ],
    miles: [
      { id: 1, name: 'Sentido Arácnido' },
      { id: 2, name: 'Telaraña' },
    ],
      peter: []
  };
  
  getTechniquesByHeroKey(heroKey: HeroKey): Technique[] 
  { return this.powersByHero[heroKey] ?? []; }
}
