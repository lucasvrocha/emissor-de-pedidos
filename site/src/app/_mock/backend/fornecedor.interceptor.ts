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

    readonly byId = (target: string) => new RegExp('\\/\\d{1,}$').test(target);
    readonly byAngularList = (target: string) => new RegExp('\\?q=repo:angular\\/material2').test(target);
    readonly byAll = (target: string) => new RegExp('(fornecedor |\\/)$').test(target);

    constructor() {
        console.log("Fake-FornecedorInterceptor is running");
    }

    intercept(request: HttpRequest<Fornecedor>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (env.mock === false || request.url.startsWith(this.interceptUrl) === false)
            return next.handle(request);

        return Observable.of(null).mergeMap(() => {
            if (this.authenticated(request)) {
                return Observable.of(new HttpResponse({ status: 401, body: null }));
            }

            let response = this[request.method](request);
            console.log("! Fake[" + request.method + "] " + request.url, response);
            return Observable.of(response);
        })
            .materialize()
            .delay(250)
            .dematerialize();
    }

    GET(request :HttpRequest<Fornecedor>) : HttpResponse<any>{
        if (this.byId(request.url)) {
            let id = request.url.match('\\d{1,}$')[0];
            let fornecedor = null;
            if (id !== undefined)
                fornecedor = FORNECEDOR.find(x => '' + x.id === id);

            return new HttpResponse({ status: fornecedor === null ? 404 : 200, body: fornecedor });
        }

        if(this.byAngularList(request.url)){
            return new HttpResponse({
                status: 200, body: {
                    total: FORNECEDOR.length,
                    items: FORNECEDOR
                }
            });
        }

        if(this.byAll(request.url)){
            return new HttpResponse({ status: 200, body: FORNECEDOR });
        }
        return null;
    }


    PUT(request: HttpRequest<Fornecedor>): HttpResponse<Fornecedor> {
        if(this.byId(request.url)){
            let id = +request.url.match('\\d{1,}$')[0];
            let i = FORNECEDOR.findIndex(x => x.id == id);
            if(i<0)
                return new HttpResponse({status: 404})

            let fornecedor = FORNECEDOR[i] = request.body;
            return new HttpResponse({ status: 200, body: fornecedor });
        }
        return null;
    }

    POST(request: HttpRequest<Fornecedor>): HttpResponse<any> {
        let fornecedor : Fornecedor = request.body;
        fornecedor.id = + new Date();
        FORNECEDOR.push(fornecedor);
        return new HttpResponse({status: 201, body : fornecedor});
    }

    DELETE(request): HttpResponse<Fornecedor[]> {
        if(this.byId(request.url)){
            let id = +request.url.match('\\d{1,}$')[0];
            let i = FORNECEDOR.findIndex(x => x.id == id);
            let fornecedor = FORNECEDOR.splice(i, 1);
            if(fornecedor == null)
                return new HttpResponse({ status: 204 });

            return new HttpResponse({ status: 204, body: fornecedor });
        }
        return null;
    }

    authenticated(request: HttpRequest<any>): boolean {
        return request.headers.get('Authorization') !== 'Bearer fake-jwt-token'
    }


}
