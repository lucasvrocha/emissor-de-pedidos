import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { Usuario } from '../_model/usuario.model';
 
@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient) { }
 
    getAll() {
        return this.http.get<Usuario[]>('/api/users');
    }
 
    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }
 
    create(user: Usuario) {
        return this.http.post('/api/users', user);
    }
 
    update(user: Usuario) {
        return this.http.put('/api/users/' + user.id, user);
    }
 
    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}