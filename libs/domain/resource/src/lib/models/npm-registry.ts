export interface NpmRegistry {
  package: {
    name: string;
    version: string;
    date: Date;
    keywords: string[];
    links: { npm: string };
    author: { name: string };
    publisher: { username: string };
  };
  score: { final: number };
}
