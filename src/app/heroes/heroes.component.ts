import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../models/heroes';
import { HeroesList } from '../service/hero.service';
import { HeroPowersService } from '../service/powers.service';
import { Technique } from '../models/powers';
import { HeroSearchService } from '../service/heroeSearch.service'; 

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  selectedHero?: Hero;
  selectedHeroPowers: Technique[] = [];

  constructor(
    private heroService: HeroesList,
    private route: ActivatedRoute,
    private powersService: HeroPowersService,
    private router: Router,
    private heroSearch: HeroSearchService // si lo creaste
  ) {}

  ngOnInit(): void {
    this.heroes = this.heroService.getHeroes();
    this.filteredHeroes = [...this.heroes];

    this.route.queryParamMap.subscribe(params => {
  const selected = (params.get('selected') ?? '').trim().toLowerCase();
  const search   = (params.get('q') ?? '').trim();

  // 1) Si viene selected, seleccionar y listo (y opcionalmente no tocar filtros)
  if (selected) {
    const hero = this.heroes.find(h => h.key.toLowerCase() === selected);
    if (hero) {
      this.selectHero(hero);
      // Opcional: si querés que además filtre la grilla a ese héroe
      // this.filteredHeroes = [hero];
      return;
    }
  }

  // 2) Si no viene selected, entonces aplicar lógica de búsqueda por q
  if (!search) {
    this.filteredHeroes = [...this.heroes];
    // Si querés también limpiar selección cuando no hay q:
    // this.selectedHero = undefined;
    // this.selectedHeroPowers = [];
    return;
  }

  const { filtered, exact } = this.heroSearch.search(this.heroes, search);
  this.filteredHeroes = filtered;

  if (exact) {
    this.selectHero(exact);
  } else if (this.filteredHeroes.length === 1) {
    this.selectHero(this.filteredHeroes[0]);
  }
  });
}

  selectHero(hero: Hero) 
  {
    this.selectedHero = hero;
    this.selectedHeroPowers = this.powersService.getTechniquesByHeroKey(hero.key);
  }

  clearSelection() 
  {
    this.selectedHero = undefined;
    this.selectedHeroPowers = [];
    this.router.navigate(['/heroes'], { queryParams: {} });
  }
}
