import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly categoriesUrl =
    'https://api-angular-builders.herokuapp.com/v1' + '/categories';
  constructor(private http: HttpClient) {}
  getCategories$() {
    return this.http
      .get<any>(this.categoriesUrl)
      .pipe(map((result) => result['data']));
  }
}
