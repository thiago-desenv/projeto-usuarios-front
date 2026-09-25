import { HttpContextToken, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";

export const AUTH_TOKEN_ENABLED = new HttpContextToken<boolean>(() => true);

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  // return throwError(() => 'Ocorreu um erro no interceptor');

  let newReq = req;
  const APPLY_AUTH_TOKEN = req.context.get(AUTH_TOKEN_ENABLED);
  if(APPLY_AUTH_TOKEN) {
    newReq = req.clone({
      headers: req.headers.set('authorization', `Bearer ${localStorage.getItem('token')!}`)
    });
  }

  return next(newReq).pipe(
    tap((event) => {
      console.log('Interceptor Pipe tap: ', event);
     }),
     catchError((error) => {
      console.log('Interceptor Pipe error: ', error);
      return throwError(() => error);
     }
  ));
}
