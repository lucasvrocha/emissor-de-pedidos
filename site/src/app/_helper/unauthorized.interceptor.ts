import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthenticationService } from '../auth/auth.service';
import { AlertService } from '../ui/alert';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private auth: AuthenticationService,
        private alert: AlertService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    let resp: HttpResponse<any> = event;
                    if (resp.status === 403) {
                        this.router.navigate(['../']);
                        this.alert.error('Não tem autorização de acesso!');
                    }
                }
            }, err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 403) {
                        this.router.navigate(['../']);
                        this.alert.error('Não tem autorização de acesso!');
                    }
                }
            });
    }
}

export let UnauthorizedProviver = {
    provide: HTTP_INTERCEPTORS,
    useClass: UnauthorizedInterceptor,
    multi: true
}