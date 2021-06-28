import { Resource } from '@ab/data';
import { ENVIRONMENT, Environment } from '@ab/global';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GhRepo } from './models/gh-repo';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly resourcesUrl = `${this.environment.apiUrl}/resources`;
  constructor(
    @Inject(ENVIRONMENT) private readonly environment: Environment,
    private http: HttpClient
  ) {}
  getResourceById$(resourceId: string) {
    return this.http.get<Resource>(`${this.resourcesUrl}/${resourceId}`);
  }
  getGitHubRepoByRepoUrl(repoUrl: string) {
    // https://github.com/ReactiveX/rxjs [org]/[repo]
    // https://api.github.com/repos/ReactiveX/rxjs
    const apiUrl = repoUrl.replace('//github.com/', '//api.github.com/repos/');
    return this.http.get<GhRepo>(apiUrl);
  }
}
