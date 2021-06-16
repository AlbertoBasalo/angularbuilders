import { ENVIRONMENT, Environment } from '@ab/global';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from './models/category';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly categoriesUrl = `${this.environment.apiUrl}/categories`;
  constructor(
    @Inject(ENVIRONMENT) private readonly environment: Environment,
    private http: HttpClient
  ) {}
  getCategories$() {
    return this.http
      .get<{ data: Category[] }>(this.categoriesUrl)
      .pipe(map((result) => result.data));
  }
  getResourceCountByCategoryid$(categoryId: string) {
    return this.http
      .get<{ data: number }>(
        `${this.categoriesUrl}/${categoryId}/resources/count`
      )
      .pipe(map((result) => result.data));
  }
}
