import { getCollection } from 'astro:content';
export async function getProjects() {
  return (await getCollection('projects', ({ data }) => data.published)).sort((a, b) => a.data.order - b.data.order);
}
export const statusLabels = { 'in-progress': 'In progress', completed: 'Completed', archived: 'Archived' } as const;
