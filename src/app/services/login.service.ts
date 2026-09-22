import { ILoginResponse } from './../interfaces/login-response.interface';
import { HttpClient, HttpContext, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AUTH_TOKEN_ENABLED } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly _httpClient = inject(HttpClient);

  login(username: string, password: string): Observable<any> {
    return this._httpClient.post<ILoginResponse>('http://localhost:3000/login', { username, password }, { context: new HttpContext().set(AUTH_TOKEN_ENABLED, false), observe: 'response' }).pipe(
      tap((response) => {
          console.log('Implemantation Event HttpResponse', response);
       }),
      map((tokenResponse) => {
        // return {};
        // localStorage.setItem('token', tokenResponse.token);
        return tokenResponse.body;
      })
    );
  }
}
