import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import { Usuario } from '../_model/usuario.model';
import { environment as env } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    private readonly _href: string = '/api/authenticate';
    private _storage = localStorage;

    private _sub = new Subject<Usuario>();

    private _user: Usuario;
    private _authorized: boolean = false;
    private _jwt: string;

    constructor(private http: HttpClient, private router: Router) {
        this._jwt = this._storage.getItem('jwt');
    }

    observable(sendEvent?: boolean) {
        if (sendEvent) setTimeout(() => this._sub.next(this.user));
        return this._sub.asObservable();
    }

    verifyJwt() {
        return this.http.get<any>(this._href).map(user => {
            return this.user = user;
        });
    }

    login(username: string, password: string) {
        return this.http.post<any>(this._href, { usuario: username, senha: password })
            .map(user => {
                this.user = user;
                this.jwt = user ? user.jwt : null;
                return this.user;
            });
    }

    logout() {
        return this.http.delete<any>(this._href).map(() => {
            this.user = null;
            this.jwt = null;
        }).subscribe(() => {
            this.router.navigate(['/login']);
        });
    }

    set jwt(jwt: string) {
        if (jwt == null) this._storage.removeItem('jwt')
        else this._storage.setItem('jwt', jwt);

        this._jwt = jwt;
    }

    get jwt() {
        return this._jwt;
    }

    set user(user: Usuario) {
        this._user = user;
        this._sub.next(this.user);
    }

    get user(): Usuario {
        return this._user;
    }


    hasPermition(permition: string[]) {
        if (!this.user || !this.user.roles)
            return false;

        for (let p of permition) {
            if (this.user.roles[p])
                return this.user.roles[p];
        }
        return false;
    }

    recuperarSenha(email: string) {
        console.log(`TODO - recuperar senha do email: ${email} `);
        return this.http.post<any>(this._href + "/recuperar", { 'email': email });
    }
}