import categories from '../content/categories.json';
import projectRecords from '../content/projects.json';
import dashboardRecords from '../content/dashboards.json';
import experienceRecords from '../content/experience.json';
import site from '../content/site.json';
export { categories, site };
export const labels = site.labels;
const presentationOrder = (a: {featured: boolean; displayOrder: number}, b: {featured: boolean; displayOrder: number}) => Number(b.featured) - Number(a.featured) || a.displayOrder - b.displayOrder;
export const projects = [...projectRecords].sort(presentationOrder);
export const dashboards = [...dashboardRecords].sort(presentationOrder);
export const experiences = [...experienceRecords].sort((a, b) => presentationOrder(a, b) || b.start.localeCompare(a.start));
export const categoryLabel = (id: string) => categories.find(item => item.id === id)?.label ?? id;
export const sitePath = (path = '') => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
export const mediaPath = (path: string) => path.startsWith('https://') ? path : sitePath(path);
export type Project = typeof projects[number];
export type Dashboard = typeof dashboards[number];

export const usableLink = (url: string) => /^https:\/\//.test(url) || /^\/(?!\/)/.test(url);
