import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log('authInterceptor');
  console.log('req', req);

  const newReq = req.clone({
    headers: req.headers.set('authorization', `Bearer ${localStorage.getItem('token')!}`)
  });

  return next(newReq);
}
