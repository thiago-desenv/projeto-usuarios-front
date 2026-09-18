import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log('authInterceptor');
  console.log('req', req);

  return next(req);
}
