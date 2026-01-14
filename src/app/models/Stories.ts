export type StorySection = {
  title: string;
  content: string;
};

export type HeroStory = {
  heroKey: string;
  title: string;
  heroDisplayName: string;
  tagline?: string;
  heroImageUrl?: string;
  paragraphs: string[];
  sections?: StorySection[];
};
