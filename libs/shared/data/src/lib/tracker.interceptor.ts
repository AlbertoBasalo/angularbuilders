/* eslint-disable @typescript-eslint/no-explicit-any */
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
          this.store.trackCodeError(error);
        } else {
          this.store.trackHttpError(error);
        }
        return throwError(error);
      })
    );
  }
}
