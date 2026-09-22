import { HttpContextToken, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export const AUTH_TOKEN_ENABLED = new HttpContextToken<boolean>(() => true);

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let newReq = req;
  const APPLY_AUTH_TOKEN = req.context.get(AUTH_TOKEN_ENABLED);
  if(APPLY_AUTH_TOKEN) {
    newReq = req.clone({
      headers: req.headers.set('authorization', `Bearer ${localStorage.getItem('token')!}`)
    });
  }

  return next(newReq).pipe(
    tap((event) => {
      // if(event.type === HttpEventType.Sent)
      //   console.log('Event Sent', event);

      // if(event.type === HttpEventType.Response) {
      //   console.log('Event response', event);
      // }

      // if(event.type === HttpEventType.Response) {
      //   console.log('Body response', event.body);
      // }

      // if(event.type === HttpEventType.Sent) {
      //   console.log('Sent', event);
      // }

      // if(event.type === HttpEventType.UploadProgress) {
      //   console.log('UploadProgress', event);
      // }

      // if(event.type === HttpEventType.ResponseHeader) {
      //   console.log('ResponseHeader', event);
      // }

      // if(event.type === HttpEventType.DownloadProgress) {
      //   console.log('DownloadProgress', event);
      // }

      // if(event.type === HttpEventType.Response) {
      //   console.log('Response', event);
      // }

      if(event.type === HttpEventType.Response) {
        console.log('Interceptor Event Http Response', event);
      }
     }
  ));
}
