import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private readonly _httpClient = inject(HttpClient);

  authorization: string = 'authorization';

  createUser(newUser: { name: string; email: string; username: string; password: string; }): Observable<{ message: string }> {
    const headers = new HttpHeaders().set(this.authorization, `Bearer ${localStorage.getItem('token')!}`);

    return this._httpClient.post<{ message: string }>('http://localhost:3000/create-user', { newUser }, { headers });
  }
}
