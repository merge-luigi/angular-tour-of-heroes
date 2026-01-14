import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { StoriesService, StorySection } from '../service/stories.service';
import { ImageViewerService } from '../service/imageExpand.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit, OnDestroy {
  heroKey = 'default';

  title = 'Historia';
  heroDisplayName = 'Personaje';
  tagline = '';
  heroImageUrl = '';
  paragraphs: string[] = [];
  sections: StorySection[] = [];

  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storiesService: StoriesService,
    private viewer: ImageViewerService
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(
      ([pm, qm]) => {
        const qSelected = qm.get('selected');
        const qHero = qm.get('hero');
        const pHero = pm.get('heroKey');

        this.heroKey = (qSelected || qHero || pHero || 'default').toLowerCase();

        const story = this.storiesService.getStory(this.heroKey);

        this.title = story.title;
        this.heroDisplayName = story.heroDisplayName;
        this.tagline = story.tagline ?? '';
        this.heroImageUrl = story.heroImageUrl ?? '';
        this.paragraphs = story.paragraphs ?? [];
        this.sections = story.sections ?? [];
      }
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  goBack(): void {
    if (!this.heroKey || this.heroKey === 'default') {
      this.router.navigate(['/heroes']);
      return;
    }

    this.router.navigate(['/heroes'], {
      queryParams: { selected: this.heroKey }
    });
  }

zoomImage(): void {
  this.viewer.open(this.heroImageUrl, this.heroDisplayName);
  console.log('OPEN CALLED');
}

}
