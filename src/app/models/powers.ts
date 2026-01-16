export interface Technique {
  id: number;
  name: string;
}
export type HeroKey = 'venom' | 'spiderman' | 'carnage' | 'dante' | 'miles' | 'peter';
export type HeroTechniquesMap = Record<HeroKey, Technique[]>;

