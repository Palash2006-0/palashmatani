export interface PageRecommendation {
  eyebrow: string;
  heading: string;
  description: string;
  href: string;
  linkLabel: string;
  tags: string[];
}

export const pageRecommendations: Record<string, PageRecommendation[]> = {
  home: [
    {
      eyebrow: 'Continue exploring',
      heading: "See what I've been <em>building.</em>",
      description: 'Three ongoing projects across music, finance, and travel.',
      href: '/work/',
      linkLabel: 'Explore the work',
      tags: ['3 Case Studies', 'Quantum & AI', 'Live Demos'],
    },
    {
      eyebrow: 'The creative side',
      heading: 'A different kind of <em>output.</em>',
      description: 'Video, visual direction, and generative experiments.',
      href: '/playground/',
      linkLabel: 'Visit the playground',
      tags: ['Video Editing', 'Visual Direction', 'GenAI'],
    },
  ],
  work: [
    {
      eyebrow: 'The bigger picture',
      heading: 'The journey behind <em>the work.</em>',
      description: 'Education, internships, and what shaped my approach.',
      href: '/journey/',
      linkLabel: 'Read my journey',
      tags: ['VESIT', 'Suvidha & FAD', 'Syrus7 1st Place'],
    },
    {
      eyebrow: 'Beyond the code',
      heading: 'Make room for <em>the unexpected.</em>',
      description: 'Video editing, storyboarding, and generative experiments.',
      href: '/playground/',
      linkLabel: 'Visit the playground',
      tags: ['Video Editing', 'DaVinci Resolve', 'Generative Media'],
    },
  ],
  journey: [
    {
      eyebrow: 'See it in action',
      heading: 'Curiosity, put to <em>work.</em>',
      description: 'Explore my ongoing technical projects and case studies.',
      href: '/work/',
      linkLabel: 'Explore the work',
      tags: ['Pallify', 'FOLIO (QAOA)', 'Flér Demo'],
    },
    {
      eyebrow: 'Start from the top',
      heading: 'Software, with a sense of <em>possibility.</em>',
      description: 'An overview of who I am and what I build.',
      href: '/',
      linkLabel: 'Go to Home',
      tags: ['Core Philosophy', 'Capabilities', 'About Me'],
    },
  ],
  playground: [
    {
      eyebrow: 'The technical side',
      heading: 'Ideas are a start. <em>Building</em> is next.',
      description: 'Three ongoing projects shaped by curiosity and experimentation.',
      href: '/work/',
      linkLabel: 'Explore the work',
      tags: ['Software & Systems', 'Quantum Algorithms', 'Architecture'],
    },
    {
      eyebrow: 'The full picture',
      heading: 'Always learning, always <em>moving forward.</em>',
      description: 'Education, experience, and achievements.',
      href: '/journey/',
      linkLabel: 'Read my journey',
      tags: ['VESIT (2024-2028)', 'Founder\'s Office', 'Data Science'],
    },
  ],
};
