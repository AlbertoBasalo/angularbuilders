export interface NpmRegistry {
  package: {
    name: string;
    description: string;
    version: string;
    date: Date;
    keywords: string[];
    links: { npm: string; repository: string };
    author: { name: string };
    publisher: { username: string };
  };
  score: { final: number; detail: { quality: number } };
}
