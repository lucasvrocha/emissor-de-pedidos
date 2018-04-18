import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import {
    ProdutoServiceApi,
    AuthServiceApi,
    UsuarioServiceApi,
    FornecedorServiceApi,
    PedidoServiceApi
} from '../service';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

    private _storage = localStorage;

    readonly byId = (api: string, url: string) => new RegExp('\\/\\d{1,}$').test(url);
    readonly byAngularList = (api: string, url: string) => new RegExp('\\?q=repo:angular\\/material2').test(url);
    readonly byAll = (api: string, url: string) => new RegExp('(\\/' + api + '\\/)|(\\/' + api + '$)').test(url);
    readonly login = (api: string, url: string) => url.match(api + /$/);
    readonly recoveryAccount = (api: string, url: string) => url.match(/\// + api + /\/recuperar$/)

    private services: any[]

    constructor() {
        console.log("[backend] BackendInterceptor is running");
        this.services = [
            new AuthServiceApi(),
            new UsuarioServiceApi(),
            new FornecedorServiceApi(),
            new ProdutoServiceApi(),
            new PedidoServiceApi(),
        ]
    }

    intercept(request: HttpRequest<any[]>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (new RegExp('assets\\/').test(request.url))
            return next.handle(request);

        let response;
        for (let s of this.services) {
            for (let f in s)
                if (typeof s[f] === "function" && (response = s[f](request)))
                    return Observable.of(response);
        }

        return next.handle(request);
    }

}
