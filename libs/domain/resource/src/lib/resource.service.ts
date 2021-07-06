import { Resource } from '@ab/data';
import { ENVIRONMENT, Environment } from '@ab/global';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GhRepo } from './models/gh-repo';
import { NpmRegistry } from './models/npm-registry';

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

  getNpmRegistryByName(name: string, repoUrl: string) {
    const apiUrl = `https://registry.npmjs.org/-/v1/search?text=${name}&size=10`;
    return this.http.get<{ objects: NpmRegistry[] }>(apiUrl).pipe(
      map((response) => response.objects),
      map((objects) => {
        return (
          objects.find(
            (object) => object.package.links.repository?.toLowerCase() === repoUrl.toLowerCase()
          ) || objects[0]
        );
      })
    );
  }
}
