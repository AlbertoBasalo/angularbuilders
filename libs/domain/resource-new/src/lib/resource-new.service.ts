import { ENVIRONMENT, Environment } from '@ab/global';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from './models/category';
import { Resource } from './models/resource';

@Injectable({
  providedIn: 'root',
})
export class ResourceNewService {
  private readonly categoriesUrl = `${this.environment.apiUrl}/categories`;
  private readonly resourcesUrl = `${this.environment.apiUrl}/resources`;
  constructor(
    @Inject(ENVIRONMENT) private readonly environment: Environment,
    private http: HttpClient
  ) {}
  getCategories$() {
    return this.http
      .get<{ data: Category[] }>(this.categoriesUrl)
      .pipe(map((result) => result.data));
  }
  postNewResource$(newResource: Resource) {
    return this.http
      .post<{ data: Resource }>(`${this.resourcesUrl}/`, newResource)
      .pipe(map((result) => result.data));
  }
}
