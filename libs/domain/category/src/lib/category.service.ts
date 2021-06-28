import { Category, Resource } from '@ab/data';
import { ENVIRONMENT, Environment } from '@ab/global';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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
    return this.http.get<Category>(`${this.categoriesUrl}/${categoryId}`);
  }
  getResourcesByCategoryId$(categoryId: string) {
    return this.http
      .get<Resource[]>(`${this.categoriesUrl}/${categoryId}/resources`)
      .pipe(
        map((resources) => resources.sort((ca, cb) => ca.name.trim().localeCompare(cb.name.trim())))
      );
  }
}
