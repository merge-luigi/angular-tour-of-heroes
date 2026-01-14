import { HeroKey } from './powers';
export interface Hero {
  id: number;
  key: HeroKey;
  name: string;
  imageUrl: string;
}