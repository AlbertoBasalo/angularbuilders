import { ENVIRONMENT, Environment } from '@ab/global';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from './models/category';
import { Resource } from './models/resource';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly categoriesUrl = `${this.environment.apiUrl}/categories`;

  constructor(
    @Inject(ENVIRONMENT) private readonly environment: Environment,
    private http: HttpClient
  ) {}
  getCategoryById$(categoryId: string) {
    return this.http
      .get<{ data: Category }>(`${this.categoriesUrl}/${categoryId}`)
      .pipe(map((result) => result.data));
  }
  getResourcesByCategoryId$(categoryId: string) {
    return this.http
      .get<{ data: Resource[] }>(
        `${this.categoriesUrl}/${categoryId}/resources`
      )
      .pipe(map((result) => result.data));
  }
}
