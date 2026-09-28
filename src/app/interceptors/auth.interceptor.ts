import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";

export const AUTH_TOKEN_ENABLED = new HttpContextToken<boolean>(() => true);

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const APPLY_AUTH_TOKEN = req.context.get(AUTH_TOKEN_ENABLED);

  const TOKEN = APPLY_AUTH_TOKEN ? localStorage.getItem('token') : null;
  if(APPLY_AUTH_TOKEN && !TOKEN) {
    return throwError(() => new Error('Token não encontrado'));
  }

  const newReq = TOKEN ? req.clone({
      headers: req.headers.set('authorization', `Bearer ${localStorage.getItem('token')!}`)
    }) : req;

  return next(newReq);
}
