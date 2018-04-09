import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import { Usuario } from '../../_model/usuario.model';
import { USUARIO } from '../usuario.mock';
import { environment as env } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private api: string = env.api;

    constructor() {
        console.log("Fake-AuthInterceptor is runing");
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (env.mock === false || request.url.startsWith('/api/authenticate') === false)
            return next.handle(request);

        // array in local storage for registered users
        let users: Usuario[] = USUARIO;

        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {
            // authenticate
            if (request.url.endsWith('/authenticate') && request.method === 'GET') {
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({ status: 200, body: undefined }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('/authenticate Não autorizado');
                }
            }

            if (request.url.endsWith('/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.usuario === request.body.usuario && user.senha === request.body.senha;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body  = {
                        id: user.id,
                        nome: user.nome,
                        foto: user.foto,
                        roles : user.roles,
                        email: user.email,
                        jwt: 'fake-jwt-token'
                    };
                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return Observable.throw('Usuario e/ou senha invalido');
                }
            }

            if (request.url.endsWith('/authenticate/recuperar') === true && request.method === 'POST') {
                let body = {
                    message: 'E-mail enviado com sucesso',
                    success: true
                }
                return Observable.of(new HttpResponse({ status: 201, body: body }));
            }

            
            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Não autorizado');
                }
            }

            // get user by id
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return Observable.of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Não autorizado');
                }
            }

            // create user
            if (request.url.endsWith('/api/users') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { return user.usuario === newUser.usuario; }).length;
                if (duplicateUser) {
                    return Observable.throw('Usuario "' + newUser.username + '" ja existe');
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return Observable.of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Não autorizado');
                }
            }
        })

            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .materialize()
            .delay(250)
            .dematerialize();
    }
}
