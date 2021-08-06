import { GhRepo, NpmRegistry, Resource } from '@ab/data';
import { ENVIRONMENT, Environment } from '@ab/global';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly resourcesUrl = `${this.environment.apiUrl}/resources`;

  constructor(
    @Inject(ENVIRONMENT) private readonly environment: Environment,
    @Inject(PLATFORM_ID) private platformId: Record<string, unknown>,
    private http: HttpClient
  ) {}

  getResourceById$(resourceId: string): Observable<Resource> {
    return this.http.get<Resource>(`${this.resourcesUrl}/${resourceId}`);
  }

  updateResource$(resource: Resource): Observable<Resource> {
    return this.http.put<Resource>(`${this.resourcesUrl}/${resource.id}`, resource);
  }

  refreshResourceExternalData$(resource: Resource): Observable<Resource> {
    if (isPlatformBrowser(this.platformId) && resource.url.startsWith('https://github.com/')) {
      const resourceOriginal = JSON.stringify(resource);
      return this.getGitHubRepoByRepoUrl$(resource.url).pipe(
        map((ghRepo) => this.toResourceWithGH(resource, ghRepo)),
        switchMap((resourceWithGH) => this.getNpmRegistryByFullName$(resourceWithGH)),
        switchMap((npm) => {
          if (npm) {
            return of(npm);
          } else {
            return this.getNpmRegistryByName$(resource);
          }
        }),
        map((npm) => this.toResourceWithNpm(resource, npm)),
        tap((resourceWithGH_NPM) => {
          if (JSON.stringify(resourceWithGH_NPM) !== resourceOriginal) {
            this.updateResource$(resourceWithGH_NPM).subscribe();
          }
        })
      );
    } else {
      return of(resource);
    }
  }

  getGitHubRepoByRepoUrl$(repoUrl: string): Observable<GhRepo> {
    // https://github.com/ReactiveX/rxjs [org]/[repo]
    // https://api.github.com/repos/ReactiveX/rxjs
    const apiUrl = repoUrl.replace('//github.com/', '//api.github.com/repos/');
    return this.http.get<GhRepo>(apiUrl);
  }

  private getNpmRegistryByFullName$(resource: Resource): Observable<NpmRegistry | undefined> {
    const name = (resource.gitHub as GhRepo)?.owner.login + ' ' + resource.name;
    return this.getNpmRegistry$(name, resource);
  }
  private getNpmRegistryByName$(resource: Resource): Observable<NpmRegistry | undefined> {
    const name = resource.name;
    return this.getNpmRegistry$(name, resource);
  }

  private getNpmRegistry$(name: string, resource: Resource) {
    const apiUrl = `https://registry.npmjs.org/-/v1/search?text=${name}&size=10`;
    return this.http.get<{ objects: NpmRegistry[] }>(apiUrl).pipe(
      map((response) => response.objects),
      map((objects) => this.findBestRegistry(objects, resource.url))
    );
  }

  private findBestRegistry(registries: NpmRegistry[], repoUrl: string) {
    const bestRegistry = registries.find(
      (registry) => registry.package.links.repository?.toLowerCase() === repoUrl.toLowerCase()
    );
    return bestRegistry || undefined;
  }

  private toResourceWithGH(resource: Resource, ghRepo: GhRepo): Resource {
    const resourceGH = {
      name: ghRepo.name,
      full_name: ghRepo.full_name,
      html_url: ghRepo.html_url,
      description: ghRepo.description,
      updated_at: ghRepo.updated_at,
      stargazers_count: ghRepo.stargazers_count,
      subscribers_count: ghRepo.subscribers_count,
      homepage: ghRepo.homepage,
      language: ghRepo.language,
      owner: {
        login: ghRepo.owner.login,
        html_url: ghRepo.owner.html_url,
        avatar_url: ghRepo.owner.avatar_url,
      },
    };
    resource.gitHub = resourceGH;
    return resource;
  }

  private toResourceWithNpm(resource: Resource, npm?: NpmRegistry): Resource {
    if (npm) {
      const resourceNpm = {
        package: {
          name: npm.package.name,
          description: npm.package.description,
          version: npm.package.version,
          date: npm.package.date,
          keywords: npm.package.keywords,
          links: npm.package.links,
          author: npm.package.author,
          publisher: npm.package.publisher,
        },
        score: npm.score,
      };
      resource.npm = resourceNpm;
    } else {
      resource.npm = undefined;
    }
    return resource;
  }
}
