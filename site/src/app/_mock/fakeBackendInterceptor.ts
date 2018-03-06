import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import { environment as env } from '../../environments/environment';
// --- mocks
import { PRODUTO } from './produto-mock';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    private api: string = env.api;

    constructor() {
        if (environment.mock)
            console.log("AOOooouuuuu the FakeBackEnd isss A LIIIIVE!!!!");
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (environment.mock === false || request.url.startsWith('assets/'))
            return next.handle(request);

        return Observable.of(null).mergeMap(() => {
            let response = null;
            if (this.getProdutoPorId(request)) {
                let urlParts = request.url.split('/');
                let id = urlParts[urlParts.length - 1];

                let produto = null;
                if (id !== undefined)
                    produto = PRODUTO.find(x => '' + x.id === id);

                response = new HttpResponse({ status: produto === null ? 404 : 200, body: produto });
            } else if (this.getProdutoDataGrid(request)) {
                response = new HttpResponse({
                    status: 200, body: {
                        total: PRODUTO.length,
                        items: PRODUTO
                    }
                });

            } else if (this.getProduto(request)) {
                response = new HttpResponse({ status: 200, body: PRODUTO });
            }

            console.log("!!! Fake[" + request.method + "] " + request.url, response);
            return Observable.of(response);
        })
            .materialize()
            .delay(500)
            .dematerialize();
    }

    getProdutoPorId(request: HttpRequest<any>) {
        return request.url.startsWith(this.api + '/produto/') && request.method === 'GET';
    }

    getProdutoDataGrid(request: HttpRequest<any>) {
        return this.getProduto(request) && request.url.indexOf('q=repo:angular/material2', 0) >= 0;
    }
    getProduto(request: HttpRequest<any>) {
        return (request.url.startsWith(this.api + '/produto') && request.method === 'GET');
    }



}

export let FakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};