import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Usuario } from '../_model/usuario.model';
import { environment as env } from '../../environments/environment';

@Injectable()
export class UsuarioService {

    readonly href = '/api/usuario';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.href);
    }

    getById(id: number) {
        return this.http.get<Usuario>(this.href +'/'+ id);
    }

    create(user: Usuario) {
        return this.http.post(this.href, user);
    }

    update(user: Usuario) {
        return this.http.put(this.href +'/'+ user.id, user);
    }

    delete(id: number) {
        return this.http.delete(this.href + '/' + id);
    }
}