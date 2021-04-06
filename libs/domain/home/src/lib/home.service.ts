import { ENVIRONMENT, Environment } from '@ab/global';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from './model/category';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly categoriesUrl = `${this.environment.apiUrl}/categories`;
  private readonly leadsUrl = `${this.environment.apiUrl}/leads`;
  constructor(
    @Inject(ENVIRONMENT) private readonly environment: Environment,
    private http: HttpClient
  ) {}
  getCategories$() {
    return this.http
      .get<{ data: Category[] }>(this.categoriesUrl)
      .pipe(map((result) => result.data));
  }
  postLead$(lead: unknown) {
    return this.http.post(this.leadsUrl, lead);
  }
}
