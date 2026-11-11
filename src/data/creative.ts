export type CreativeItem = {
  title: string;
  category: 'Video' | 'Generative media' | 'Visual studies';
  role: string;
  tools: string[];
  caption: string;
  image: string;
  alt: string;
  video?: string;
  captions?: string;
  externalUrl?: string;
};

// Add shareable, credited work here. An empty collection intentionally renders a text-led page.
export const creativeItems: CreativeItem[] = [];
