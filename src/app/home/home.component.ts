import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../models/heroes';
import { HeroesList } from '../service/hero.service';
import { HeroSearchService } from '../service/heroeSearch.service'; // ajustá el path/nombre real

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showSearch = false;
  searchText = '';

  private heroes: Hero[] = [];              // 👈 no hace falta exponerlo al template
  autocompleteList: Hero[] = [];
  showAutocompleteList = false;

  constructor(
    private router: Router,
    private heroService: HeroesList,
    private heroSearch: HeroSearchService
  ) {}

  ngOnInit(): void {
    this.heroes = this.heroService.getHeroes();
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;

    if (!this.showSearch) {
      this.resetAutocomplete();
      this.searchText = '';
    }
  }

  goHero(): void {
    const q = this.searchText.trim();
    if (!q) return;

    this.resetAutocomplete();
    this.router.navigate(['/heroes'], { queryParams: { q } });
  }

  onInputChange(): void {
    const q = this.searchText.trim();
    if (!q) {
      this.resetAutocomplete();
      return;
    }

    const { filtered } = this.heroSearch.search(this.heroes, q);

    // opcional: limitar cantidad para que no sea un choclo
    this.autocompleteList = filtered.slice(0, 8);
    this.showAutocompleteList = this.autocompleteList.length > 0;
  }

  selectHero(hero: Hero): void {
    // podés elegir: setear el texto o navegar directo
    this.searchText = hero.name;
    this.resetAutocomplete();

    // si querés que al click ya vaya a /heroes:
    // this.router.navigate(['/heroes'], { queryParams: { q: hero.key } });
  }

  private resetAutocomplete(): void {
    this.autocompleteList = [];
    this.showAutocompleteList = false;
  }
}
