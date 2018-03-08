import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import { environment as env } from '../../../environments/environment';
// --- mocks
import { FORNECEDOR } from '../fornecedor.mock';


@Injectable()
export class FornecedorInterceptor implements HttpInterceptor {

    private api: string = env.api;

    constructor() {
        if (env.mock)
            console.log("AOOooouuuuu the FakeBackEnd isss A LIIIIVE!!!!");
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (env.mock === false || request.url.startsWith(this.api+'/fornecedor') === false)
            return next.handle(request);

        return Observable.of(null).mergeMap(() => {
            let response = null;
            if (this.getFornecedorPorId(request)) {
                let urlParts = request.url.split('/');
                let id = urlParts[urlParts.length - 1];

                let fornecedor = null;
                if (id !== undefined)
                    fornecedor = FORNECEDOR.find(x => '' + x.id === id);

                response = new HttpResponse({ status: fornecedor === null ? 404 : 200, body: fornecedor });
            } else if (this.getFornecedorDataGrid(request)) {
                response = new HttpResponse({
                    status: 200, body: {
                        total: FORNECEDOR.length,
                        items: FORNECEDOR
                    }
                });

            } else if (this.getFornecedor(request)) {
                response = new HttpResponse({ status: 200, body: FORNECEDOR });
            }

            console.log("!!! Fake[" + request.method + "] " + request.url, response);
            return Observable.of(response);
        })
            .materialize()
            .delay(500)
            .dematerialize();
    }

    getFornecedorPorId(request: HttpRequest<any>) {
        return request.url.startsWith(this.api + '/fornecedor/') && request.method === 'GET';
    }

    getFornecedorDataGrid(request: HttpRequest<any>) {
        return this.getFornecedor(request) && request.url.indexOf('q=repo:angular/material2', 0) >= 0;
    }
    getFornecedor(request: HttpRequest<any>) {
        return (request.url.startsWith(this.api + '/fornecedor') && request.method === 'GET');
    }



}
