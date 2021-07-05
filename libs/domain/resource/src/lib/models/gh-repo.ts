export interface GhRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  updated_at: Date;
  stargazers_count: number;
  subscribers_count: number;
  homepage: string;
  language: string;
  owner: {login:string, html_url: string;avatar_url:string}
}
