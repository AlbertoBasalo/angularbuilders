import { ENVIRONMENT, Environment } from '@ab/global';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly leadsUrl = `${this.environment.apiUrl}/leads`;
  constructor(
    @Inject(ENVIRONMENT) private readonly environment: Environment,
    private http: HttpClient
  ) {}
  postLead$(lead: unknown) {
    return this.http.post(this.leadsUrl, lead);
  }
}
