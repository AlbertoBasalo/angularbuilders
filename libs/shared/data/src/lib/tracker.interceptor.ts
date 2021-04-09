import { TrackerStore } from '@ab/global';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TrackerInterceptor implements HttpInterceptor {
  constructor(private store: TrackerStore) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // errorMessage = `Error: ${error.error.message}`;
          this.store.trackError(error);
        } else {
          //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          this.store.trackHttpError(error);
        }
        return throwError(error);
      })
    );
  }
}
