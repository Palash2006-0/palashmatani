---
name: Pallify
summary: A music streaming platform exploring quantum-inspired recommendations and transparent music discovery.
category: Music & recommendation systems
status: in-progress
order: 1
published: true
updatedAt: '2026-11-11'
currentFocus: Building the music platform and refining its quantum-inspired recommendation system.
tags: [Music platform, Recommendations, Quantum-inspired]
stack: [TypeScript, React, Vite, Node.js, Express, SQLite, Web Audio API]
liveUrl: https://pallify.vercel.app/
collaborators: Engineering report co-authored with Gaurav Jain.
architecture: [Pallify interface, Application services, Recommendation engine, Song data & media]
architectureNote: Conceptual overview based on the engineering report; the diagram groups responsibilities rather than prescribing an exact request sequence.
---

## A player with a different approach to discovery

Pallify brings music browsing, personal libraries, and recommendation experiments into one web experience. Alongside the platform, I’m building Q-Pallify: a quantum-inspired recommendation engine that explores how acoustic features can guide the next track.

The project has two connected questions. How can a music player make browsing and playback feel straightforward? And how can its recommendations balance familiar transitions with the chance to discover something different? The platform provides the listening interface; the engine provides a space to explore that second question.

## The listening experience

The live interface brings together a collapsible navigation rail, library collections, mood filters, and persistent playback controls. A listener can browse music and open the Q-Flow inspector to see the representation used by the recommendation experiment.

That inspector is an important part of the experience. Instead of keeping the recommendation concept entirely behind the interface, it exposes a Bloch-sphere visualisation and state-overlap information. This makes an abstract approach easier to inspect. The displayed overlap describes the relationship between represented states; it is not a listener-preference or accuracy score.

## Inside Q-Pallify

The engineering report describes a classical implementation inspired by quantum information concepts. Acoustic features such as energy, valence, danceability, and tempo are mapped into a Bloch-sphere representation. Similarity between these representations is then expressed using state fidelity.

Candidate weights feed a binary sum-tree for weighted sampling. Recent-history exclusion and exploration logic address a practical listening problem: recommendations becoming repetitive while still needing to retain a sense of continuity.

This creates several engineering tradeoffs. A compact representation makes similarity calculations simple, while compressing the original feature space. A sampling structure supports efficient selection, while its construction and weight updates still have costs. History-aware selection can encourage variety, while its behaviour needs evaluation across different library sizes and listening patterns.

<details>
<summary>A closer look at state fidelity</summary>

For the pure single-qubit representations described in the report, fidelity can be written as F = (1 + r₁ · r₂) / 2, where r₁ and r₂ are unit Bloch vectors. Here it acts as a similarity measure between encoded tracks. The current implementation runs on classical hardware. Physical quantum processor integration is a future direction in the report.

</details>

## Building the platform around the engine

The documented platform combines a React and TypeScript frontend with Node.js application services, SQLite persistence, and byte-range audio delivery. The range-streaming approach is intended to support seeking without loading a whole audio file into memory. SQLite keeps the documented persistence layer compact and close to the application.

These are architecture choices described in the engineering report. The live interface provides a public view of the product, while the report covers the broader system design. They offer complementary ways to understand the project.

## Evaluation and current work

The report evaluates recommendation latency, repetition, and catalogue exploration. Those measurements are useful directions for assessing the engine, but their meaning depends on the test setup, the baseline, and the complete cost of the pipeline. A fast tree-sampling step alone does not describe the cost of preparing every recommendation.

The platform and its recommendation system remain in progress. My current focus is continuing to build the listening experience and refine the quantum-inspired approach. The engineering report was co-authored with Gaurav Jain.
