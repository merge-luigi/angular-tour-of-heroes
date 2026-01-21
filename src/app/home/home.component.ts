import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../models/heroes';
import { HeroesList } from '../service/hero.service';
import { HeroSearchService } from '../service/heroeSearch.service';
import { VideoService, VideoFragment } from '../service/video'; 
import { VideoPreloadService } from '../service/videoPreload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  showSearch = false;
  searchText = '';

  private heroes: Hero[] = [];
  autocompleteList: Hero[] = [];
  showAutocompleteList = false;

  private readonly VIDEO_URL = 'assets/video/A leap of Faith.mp4';
  private readonly fragments: VideoFragment[] = [
    { start: 82, end: 120 } 
  ];

  constructor(
    private router: Router,
    private heroService: HeroesList,
    private heroSearch: HeroSearchService,
    private videoService: VideoService,
    private videoPreloadService: VideoPreloadService
  ) {}
  
  private homeVideoLoopOn = false;
  
  ngOnInit(): void {
    console.log('🏠 HOME: Inicializando componente');
    
    this.heroes = this.heroService.getHeroes();
    
    // Verificar estado del video
    if (this.videoPreloadService.isPreloaded(this.VIDEO_URL)) {
      console.log('✅ Video de /home ya estaba precargado desde /start');
    } else {
      console.log('⚠️ Video NO precargado, se cargará normalmente');
    }
  }

  ngAfterViewInit(): void {
      console.log('🏠 HOME: Configurando video...');
      
      const video = this.bgVideo.nativeElement;

      video.muted = true;
      video.loop = false;
      video.playsInline = true;
      video.preload = 'auto';

      const preloaded = this.videoPreloadService.getPreloadedVideo(this.VIDEO_URL);

      if (preloaded) {
        console.log('🚀 Usando video precargado (carga instantánea)');
        video.src = preloaded.src;
      } else {
        console.log('📥 Cargando video normalmente');
        video.src = this.VIDEO_URL;
      }

      video.load();
      this.videoService.init(video);

      const startPlayback = () => {
        console.log('▶️ Reproduciendo video de fondo en /home');

        this.homeVideoLoopOn = true;

        const loopOnce = () => {
          if (!this.homeVideoLoopOn) return;

          this.videoService.playFragments(this.fragments, () => {
            // cuando termina, repite si seguimos en Home
            loopOnce();
          });
        };

        loopOnce();
      };

      if (video.readyState >= 3) {
        startPlayback();
      } else {
        video.addEventListener('canplay', startPlayback, { once: true });
      }
    }

    ngOnDestroy(): void {
      console.log('🏠 HOME: Destruyendo componente');

      // 🔒 corta el loop antes de destruir
      this.homeVideoLoopOn = false;

      this.videoService.destroy();
      this.videoPreloadService.clear(this.VIDEO_URL);
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
    this.autocompleteList = filtered.slice(0, 8);
    this.showAutocompleteList = this.autocompleteList.length > 0;
  }

  selectHero(hero: Hero): void {
    this.searchText = hero.name;
    this.resetAutocomplete();
  }

  private resetAutocomplete(): void {
    this.autocompleteList = [];
    this.showAutocompleteList = false;
  }
}