import { ENVIRONMENT, Environment } from '@ab/global';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from './model/category';
import { Resource } from './model/resource';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly categoriesUrl = `${this.environment.apiUrl}/categories`;
  private readonly resourcesUrl = `${this.environment.apiUrl}/resources`;
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
