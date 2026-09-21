import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUpdateUserResponse } from '../interfaces/update-user-response.interface';
import { IUserRequest } from '../interfaces/user-request.interface';
import { AUTH_TOKEN_ENABLED } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
  private readonly _httpClient = inject(HttpClient);

  authorization: string = 'authorization';

  updateUser(userInfos: IUserRequest): Observable<IUpdateUserResponse> {
    return this._httpClient.put<IUpdateUserResponse>('http://localhost:3000/update-user', { userInfos }, { context: new HttpContext().set(AUTH_TOKEN_ENABLED, true) }).pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        return response;
      })
    );
  }
}
