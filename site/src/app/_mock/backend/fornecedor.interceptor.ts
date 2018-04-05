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
import { Fornecedor } from '../../fornecedor'
// --- mocks
import { FORNECEDOR } from '../fornecedor.mock';


@Injectable()
export class FornecedorInterceptor implements HttpInterceptor {

    readonly interceptUrl: string = env.api + '/fornecedor';
    readonly regById = '\\/\\d{1,}$';
    readonly regAllAngularList = '\\?q=repo:angular\\/material2';
    readonly regAll = '(fornecedor |\\/)$';

    constructor() {
        console.log("Fake-FornecedorInterceptor is running");
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (env.mock === false || request.url.startsWith(this.interceptUrl) === false)
            return next.handle(request);

        return Observable.of(null).mergeMap(() => {
            if (this.authenticated(request)) {
                return Observable.of(new HttpResponse({ status: 401, body: null }));
            }

            let response = this[request.method](request);
            console.log("!!! Fake[" + request.method + "] " + request.url, response);
            return Observable.of(response);
        })
            .materialize()
            .delay(250)
            .dematerialize();
    }

    GET(request :HttpRequest<any>) {
        let test = (reg: string) :boolean => new RegExp(reg).test(request.url);

        if (test(this.regById)) {
            let id = request.url.match('\\d$')[0];
            let fornecedor = null;
            if (id !== undefined)
                fornecedor = FORNECEDOR.find(x => '' + x.id === id);

            return new HttpResponse({ status: fornecedor === null ? 404 : 200, body: fornecedor });
        }

        if(test(this.regAllAngularList)){
            return new HttpResponse({
                status: 200, body: {
                    total: FORNECEDOR.length,
                    items: FORNECEDOR
                }
            });
        }

        if(test(this.regAll)){
            return new HttpResponse({ status: 200, body: FORNECEDOR });
        }
        return null;
    }

    PUT(request: HttpRequest<Fornecedor>): HttpResponse<Fornecedor> {
        let test = (reg: string): boolean => new RegExp(reg).test(request.url);
        if(test(this.regById)){
            let id = request.url.match('\\d$')[0];
            let fornecedor : Fornecedor = null;
            console.log(FORNECEDOR);
            if (id !== undefined){
                let i = FORNECEDOR.findIndex(x => '' + x.id === id);
                FORNECEDOR[i] = request.body
                console.log(FORNECEDOR);
            }
            return new HttpResponse({ status: 200, body: fornecedor });
        }


        return null;
    }

    POST(request): HttpResponse<any> {
        return null;
    }

    DELETE(request): HttpResponse<any> {
        return null;
    }

    authenticated(request: HttpRequest<any>): boolean {
        return request.headers.get('Authorization') !== 'Bearer fake-jwt-token'
    }


}
