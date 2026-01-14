import { Injectable } from '@angular/core';
import { Hero } from '../models/heroes';

export type HeroSearchResult = {
  filtered: Hero[];
  exact?: Hero;
};

@Injectable({ providedIn: 'root' })
export class HeroSearchService {
  /**
   * Filtra por name o key (case-insensitive).
   * Devuelve también un "exact" si el query coincide exacto con key o name.
   */
  search(heroes: Hero[], query: string): HeroSearchResult {
    const q = (query ?? '').trim().toLowerCase();

    if (!q) return { filtered: [...heroes] };

    const filtered = heroes.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.key.toLowerCase().includes(q)
    );

    const exact =
      heroes.find(h => h.key.toLowerCase() === q) ??
      heroes.find(h => h.name.toLowerCase() === q);

    return { filtered, exact };
  }
}
