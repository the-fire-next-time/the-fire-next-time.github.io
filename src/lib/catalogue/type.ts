export interface Entry {
  id: string;
  title: string;
  author: string;
  description: string[];
  publisher: string;
  publishedYear: number;
  publishedMonth?: number;
  pages: number;
  format: 'paperback' | 'hardback' | 'zine';
  width?: number;
  height?: number;
  unit?: 'in' | 'mm';
  category: 'photography' | 'cinema' | 'zine';
  tags: string[];
  coverUrl?: string;
}
