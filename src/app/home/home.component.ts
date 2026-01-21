import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../models/heroes';
import { HeroesList } from '../service/hero.service';
import { HeroSearchService } from '../service/heroeSearch.service';
import { VideoService, VideoFragment } from '../service/video'; 
import { VideoPreloadService } from '../service/videoPreload.service'; 
import { Subscription } from 'rxjs';

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

  private preloadSub?: Subscription;

  constructor(
    private router: Router,
    private heroService: HeroesList,
    private heroSearch: HeroSearchService,
    private videoService: VideoService,
    private videoPreloadService: VideoPreloadService
  ) {}

  ngOnInit(): void {
    this.heroes = this.heroService.getHeroes();
    this.preloadSub = this.videoPreloadService.preload(this.VIDEO_URL).subscribe();
  }

  ngAfterViewInit(): void {
    const video = this.bgVideo.nativeElement;

    // config segura para autoplay background
    video.muted = true;
    video.loop = false;             
    video.playsInline = true;
    video.preload = 'auto';

    const preloaded = this.videoPreloadService.getPreloadedVideo(this.VIDEO_URL);

    if (preloaded) {

      video.src = preloaded.currentSrc || this.VIDEO_URL;
    } else {
      video.src = this.VIDEO_URL;
    }

    video.load();

    this.videoService.init(video);

    const start = () => {
      this.videoService.playFragments(this.fragments, () => {
        this.videoService.playFragments(this.fragments, () => {});
      });
    };

    if (video.readyState >= 3) start();
    else video.addEventListener('canplay', start, { once: true });
  }

  ngOnDestroy(): void {
    this.preloadSub?.unsubscribe();
    this.videoService.destroy();
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
