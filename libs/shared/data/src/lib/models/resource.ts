export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  categoryId?: string;
  gitHub: unknown;
  npm: unknown;
}
