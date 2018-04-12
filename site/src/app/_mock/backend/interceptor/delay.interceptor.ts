import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import { environment as env } from '../../../../environments/environment';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {

    private api: string = env.api;

    constructor() {
        if (env.delay && env.delay > 0) {
            console.log("[backend] DelayInterceptor is runing");
            this.intercept = this.delay;
        } 
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request);
    }

    delay(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).materialize().delay(env.delay).dematerialize();
    }

}
