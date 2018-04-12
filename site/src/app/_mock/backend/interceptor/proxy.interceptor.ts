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
export class ProxyInterceptor implements HttpInterceptor {

    constructor() {
        console.log("[backend] ProxyInterceptor is runing");
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let patterns = env.proxy ? env.proxy : [];
        for (let p of patterns) {
            let match: any[] = request.url.match(p.pattern);
            if (match && match['index'] >= 0)
                request = request.clone({ url: request.url.replace(match[0], p.api) });
        }
        return next.handle(request);
    }
}
