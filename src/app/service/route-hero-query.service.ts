import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

export type RouteHeroQueryState = {
  selectedKey: string | null;
  search: string;
  hadSearchParam: boolean;
};

@Injectable({ providedIn: 'root' })
export class RouteHeroQueryService {
  constructor(private route: ActivatedRoute) {}

  watch(): Observable<RouteHeroQueryState> {
    return this.route.queryParamMap.pipe(
      map(q => {
        const selectedKey = q.get('selected');
        const rawQ = q.get('q');
        const search = (rawQ ?? '').trim().toLowerCase();
        const hadSearchParam = q.has('q');
        return { selectedKey, search, hadSearchParam };
      })
    );
  }
}
