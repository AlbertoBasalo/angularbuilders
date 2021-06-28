import { Category } from '@ab/data';
import { ENVIRONMENT, Environment } from '@ab/global';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

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
    return this.http.get<Category[]>(this.categoriesUrl);
  }
  getResourceCountByCategoryid$(categoryId: string) {
    return this.http.get<number>(`${this.categoriesUrl}/${categoryId}/resources/count`);
  }
}
