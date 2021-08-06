import { GhRepo } from './gh-repo';
import { NpmRegistry } from './npm-registry';

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  categoryId?: string;
  gitHub: GhRepo | undefined;
  npm: NpmRegistry | undefined;
}
