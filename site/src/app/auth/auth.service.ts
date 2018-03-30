import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Usuario } from '../_model/usuario.model';
import { environment as env } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    readonly href: string = '/api/authenticate';

    private user: Usuario;
    private storage = localStorage;
    private authorized: boolean = false;

    private cachedRequests: Array<HttpRequest<any>> = [];

    constructor(private http: HttpClient) {
        let currentUser = JSON.parse(this.storage.getItem('currentUser'));
        this.authorized = currentUser && currentUser.jwt ? true : false;
        this.user = currentUser;
    }

    public collectRequest(request): void {
        this.cachedRequests.push(request);
    }

    public lastRequest() {
        return this.cachedRequests.pop();
    }

    isAutorzed(){
        return this.authorized;
    }

    currentUser(): Usuario {
        let currentUser = JSON.parse(this.storage.getItem('currentUser'));
        if (currentUser === null || currentUser.id !== this.user.id)
            this.user = currentUser;
        return this.user;
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.href, { usuario: username, senha: password })
            .map(user => {
                if (user && user.jwt) {
                    this.storage.setItem('currentUser', JSON.stringify(user));
                    this.authorized = true;
                    this.user = user;
                }
                return user;
            });
    }

    logout() {
        this.authorized = false;
        this.storage.removeItem('currentUser');
        this.user = this.currentUser();
    }

    recuperarSenha(email: string) {
        console.log(`TODO - recuperar senha do email: ${email} `);
        return this.http.post<any>(this.href + "/recuperar", { 'email': email });

    }
}