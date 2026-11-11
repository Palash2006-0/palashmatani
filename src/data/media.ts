import pallify from '../assets/projects/pallify.jpg';
import inspector from '../assets/projects/pallify-inspector.jpg';
import folio from '../assets/projects/folio.jpg';
import fler from '../assets/projects/fler.jpg';
import type { ImageMetadata } from 'astro';

type Media = { image: ImageMetadata; alt: string; caption: string; secondary?: { image: ImageMetadata; alt: string; caption: string } };
export const projectMedia: Record<string, Media> = {
  pallify: { image: pallify, alt: 'Pallify music interface showing the library, mood filters, and playback controls', caption: 'Pallify’s music interface. Captured November 2026.', secondary: { image: inspector, alt: 'Q-Pallify inspector showing the Bloch-sphere visualisation and state-fidelity overlap', caption: 'The Q-Flow inspector exposes the engine’s state representation. The overlap shown is interface state, not an accuracy score.' } },
  folio: { image: folio, alt: 'FOLIO dashboard with a market heatmap and navigation for setting up an optimisation run', caption: 'FOLIO’s market dashboard. Captured November 2026; displayed market values are a snapshot.' },
  fler: { image: fler, alt: 'Flér flight-search interface with a destination photograph and route, date, and traveller controls', caption: 'Flér’s flight-search experience. College project; payments run in test mode.' },
};
