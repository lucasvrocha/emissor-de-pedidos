import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_model/usuario.model'
import { USUARIO } from '../../_mock/usuario.mock';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

	user: Usuario;
	userList : Usuario[];

	constructor() { }

	ngOnInit() {
		this.user = USUARIO[0];
		this.userList = USUARIO;
	}

}
