import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";

export const AUTH_TOKEN_ENABLED = new HttpContextToken<boolean>(() => true);

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let newReq = req;
  const APPLY_AUTH_TOKEN = req.context.get(AUTH_TOKEN_ENABLED);
  if(APPLY_AUTH_TOKEN) {
    let token = localStorage.getItem('token');
    if(!token) {
      return throwError(() => new HttpErrorResponse({
        error: { message: 'Token não encontrado. Por favor, logue novamente' },
        status: 401,
        statusText: 'Token não encontrado. Por favor, logue novamente'
      }));
    }

    newReq = req.clone({
      headers: req.headers.set('authorization', `Bearer ${localStorage.getItem('token')!}`)
    });
  }

  return next(newReq);
}
