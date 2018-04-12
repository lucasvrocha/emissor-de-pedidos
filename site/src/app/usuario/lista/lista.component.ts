import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../_model/usuario.model'
import { USUARIO } from '../../_mock/usuario.mock';
import { UsuarioService } from '../usuario.service';
import { LoadService } from '../../ui/load';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

	public userList: Usuario[] = [];

	private service: UsuarioService | null;

	constructor(
		private http: HttpClient, 
		private loadService: LoadService
		) {}

	ngOnInit() {
		this.service = new UsuarioService(this.http);
		this.service.getAll().subscribe(usuarios => {
			this.userList = usuarios;
		});
	}

	isAdmin(usuario : Usuario){
		return usuario.roles.admin;	
	}


}
