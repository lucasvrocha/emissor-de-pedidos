import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Usuario } from '../_model/usuario.model';
import { environment as env } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    private user: Usuario;
    private storage = localStorage;
    authorized: boolean = false;
    private href: string;

    constructor(private http: HttpClient) {
        let currentUser = JSON.parse(this.storage.getItem('currentUser'));
        this.authorized = currentUser && currentUser.token ? true : false;
        this.user = currentUser;
        this.href = '/api/authenticate';
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
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
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