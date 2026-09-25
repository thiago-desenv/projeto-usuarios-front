import { ILoginResponse } from './../interfaces/login-response.interface';
import { HttpClient, HttpContext, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AUTH_TOKEN_ENABLED } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly _httpClient = inject(HttpClient);

  login(username: string, password: string): Observable<any> {
    return this._httpClient.post<ILoginResponse>('http://localhost:3000/login', { username, password }, { context: new HttpContext().set(AUTH_TOKEN_ENABLED, false) }).pipe(
      tap((response) => {
          console.log('Implemantation Event HttpResponse', response);
       }),
      map((tokenResponse) => {
        console.log('Implemantation map response', tokenResponse);
        // return {};
        // localStorage.setItem('token', tokenResponse.token);
        return tokenResponse;
      }),
      catchError((error) => {
        console.log('Implemantation catchError: ', error)
        return throwError(() => error);

        return of('Ocorreu um erro, porém estou retornando um Observable de sucesso');
        // return throwError(() => error + ' Modificado na implementação');
      })
    );
  }
}
