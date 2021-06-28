import { ENVIRONMENT, Environment } from '@ab/global';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

type apiResult = { data: any };

@Injectable()
export class AdapterInterceptor implements HttpInterceptor {
  constructor(@Inject(ENVIRONMENT) private readonly environment: Environment) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      filter((event) => event instanceof HttpResponse),
      map((eventResponse) => eventResponse as HttpResponse<any>),
      map((httpResponse) => {
        if (request.url.startsWith(this.environment.apiUrl))
          return this.adaptResponse(httpResponse);
        else return httpResponse;
      })
    );
  }

  adaptResponse(httpResponse: HttpResponse<any>) {
    const body = httpResponse.body;
    const adaptedBody = body['data'] || [];
    const adaptedResponse = httpResponse.clone({ body: adaptedBody });
    return adaptedResponse;
  }
}
