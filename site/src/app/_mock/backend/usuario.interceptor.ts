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
import { USUARIO } from '../usuario.mock';
import {Usuario } from '../../_model/usuario.model';


@Injectable()
export class UsuarioInterceptor implements HttpInterceptor {

    private api: string = env.api;

    constructor() {
        console.log("Fake-UsuarioInterceptor is running");
    }

    intercept(request: HttpRequest<Usuario[]>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.startsWith('assets') === true) {
            return next.handle(request);
        }

        if (env.mock === false || request.url.startsWith(this.api + '/usuario') === false) {
            return next.handle(request);
        }

        if (request.headers.get('Authorization') !== 'Bearer fake-jwt-token') {
            return Observable.throw('Não autorizado');
        }

        return Observable.of(null).mergeMap(() => {
            let response = null;
            if (this.getUsuarioPorId(request)) {
                let urlParts = request.url.split('/');
                let id = urlParts[urlParts.length - 1];

                let usuario = null;
                if (id !== undefined)
                    usuario = USUARIO.find(x => '' + x.id === id);

                response = new HttpResponse({ status: usuario === null ? 404 : 200, body: usuario });
            } else if (this.getUsuario(request)) {

                response = new HttpResponse({ status: 200, body: USUARIO });
            }

            console.log("!!! Fake[" + request.method + "] " + request.url, response);
            return Observable.of(response);
        })
            .materialize()
            .delay(250)
            .dematerialize();
    }

    getUsuarioPorId(request: HttpRequest<any>) {
        return request.url.startsWith(this.api + '/usuario/') && request.method === 'GET';
    }

    getUsuario(request: HttpRequest<any>) {
        console.log(request.url, this.api + '/usuario');
        return (request.url.startsWith(this.api + '/usuario') && request.method === 'GET');
    }



}
