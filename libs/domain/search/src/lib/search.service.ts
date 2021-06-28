import { Resource } from '@ab/data';
import { ENVIRONMENT, Environment } from '@ab/global';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly resourcesUrl = `${this.environment.apiUrl}/resources`;
  constructor(
    @Inject(ENVIRONMENT) private readonly environment: Environment,
    private http: HttpClient
  ) {}
  getResourceByQuery$(query: string) {
    return this.http
      .get<Resource[]>(`${this.resourcesUrl}`)
      .pipe(map((resources) => resources.filter((r) => this.matchesQuery(r, query))));
  }
  private matchesQuery(resource: Resource, query: string) {
    const cleanQuery = query.toLowerCase().trim();
    if (cleanQuery.length === 0) return false;
    if (resource.name.toLowerCase().includes(cleanQuery)) return true;
    if (resource.description.toLowerCase().includes(cleanQuery)) return true;
    if (resource.categoryId?.toLowerCase().includes(cleanQuery)) return true;
    if (resource.url.toLowerCase().includes(cleanQuery)) return true;
    return false;
  }
}
