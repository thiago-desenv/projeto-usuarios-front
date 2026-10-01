import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { LoadingService } from "../services/loading.service";
import { inject } from "@angular/core";
import { finalize, Observable, retry } from "rxjs";

export function loadingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);

  loadingService.showLoading();

  return next(req).pipe(
    retry(2),
    finalize(() => {
      loadingService.hideLoading();
    })
  );
}
