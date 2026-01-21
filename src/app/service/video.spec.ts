import { TestBed } from '@angular/core/testing';
import { VideoService, VideoFragment } from './video';

describe('Video', () => {
  let service: VideoService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
