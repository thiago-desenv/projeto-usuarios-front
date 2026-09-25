import { ILoginResponse } from './../interfaces/login-response.interface';
import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AUTH_TOKEN_ENABLED } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly _httpClient = inject(HttpClient);

  login(username: string, password: string): Observable<ILoginResponse> {
    return this._httpClient.post<ILoginResponse>('http://localhost:3000/login', { username, password }, { context: new HttpContext().set(AUTH_TOKEN_ENABLED, false) }).pipe(
      map((tokenResponse) => {
        localStorage.setItem('token', tokenResponse.token);
        return tokenResponse;
      })
    );
  }
}
