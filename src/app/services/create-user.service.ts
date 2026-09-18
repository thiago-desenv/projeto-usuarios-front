import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUserRequest } from '../interfaces/user-request.interface';
import { ICreateUserResponse } from '../interfaces/create-user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private readonly _httpClient = inject(HttpClient);

  authorization: string = 'authorization';

  createUser(newUser: IUserRequest): Observable<ICreateUserResponse> {
    return this._httpClient.post<ICreateUserResponse>('http://localhost:3000/create-user', { newUser });
  }
}
