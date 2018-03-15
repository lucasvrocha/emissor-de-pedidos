import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
 import { Usuario } from '../_model/usuario.model';
 import {environment as env } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    storage = localStorage;
    authorized : boolean = false;
    private href : string;

    constructor(private http: HttpClient) {
        let currentUser = JSON.parse(this.storage.getItem('currentUser'));
        this.authorized = currentUser && currentUser.token ? true : false;
        this.href = '/api/authenticate';
    }
 
    login(username: string, password: string) {
        return this.http.post<any>(this.href, { usuario: username, senha: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.storage.setItem('currentUser', JSON.stringify(user));
                    this.authorized = true;
                }
                 return user;
            });
    }
 
    logout() {
        this.authorized = false;
        this.storage.removeItem('currentUser');
    }
}