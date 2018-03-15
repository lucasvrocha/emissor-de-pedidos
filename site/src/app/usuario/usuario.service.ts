import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Usuario } from '../_model/usuario.model';
import { environment as env } from '../../environments/environment';

@Injectable()
export class UsuarioService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Usuario[]> {
        const href = env.api + '/usuario';
        const requestUrl = `${href}`;
        let list: Usuario[] = [];
        return this.http.get<Usuario[]>(requestUrl)
    }

    getById(id: number) {
        // return this.http.get<any>(this.api  +'/'+ id);
    }

    create(user: Usuario) {
        // return this.http.post(this.api, user);
    }

    update(user: Usuario) {
        // return this.http.put(this.api +'/'+ user.id, user);
    }

    delete(id: number) {
        // return this.http.delete(this.api  +'/'+ id);
    }
}