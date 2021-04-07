import { ENVIRONMENT, Environment } from '@ab/global';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Resource } from './models/resource';

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
    return this.http
      .get<{ data: Resource }>(`${this.resourcesUrl}/${resourceId}`)
      .pipe(map((result) => result.data));
  }
}
