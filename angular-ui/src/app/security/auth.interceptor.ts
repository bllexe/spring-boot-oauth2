import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { SocialService } from '../service/social.service';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>,next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  
  const router = inject(Router);
  const authService = inject(SocialService);

  const token = authService.getToken();

  // Token varsa, Authorization başlığı ekle
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      // 401 hatası durumunda token yenilemeye çalış
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            // Yeni token ile isteği tekrar et
            const newAuthReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            });
            return next(newAuthReq);
          }),
          catchError((refreshError) => {
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};