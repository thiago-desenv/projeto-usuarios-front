import { HttpContextToken, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const AUTH_TOKEN_ENABLED = new HttpContextToken<boolean>(() => true);

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let newReq = req;
  const APPLY_AUTH_TOKEN = req.context.get(AUTH_TOKEN_ENABLED);
    console.log('context', APPLY_AUTH_TOKEN);
  if(APPLY_AUTH_TOKEN) {
    newReq = req.clone({
      headers: req.headers.set('authorization', `Bearer ${localStorage.getItem('token')!}`)
    });
  }

  return next(newReq);
}
