import { Component, OnInit } from '@angular/core';
import { AuthGuard, AuthenticationService } from '../../../auth';

import { Usuario } from '../../../_model/usuario.model';

@Component({
	selector: 'ui-navbar-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	isAdmin : boolean = false;
	nome: string; 
	foto: string;
	id: number;
	email: string;

	constructor(public guard: AuthGuard, public authService: AuthenticationService) { }

	ngOnInit() {
		this.isAdmin = this.authService.hasPermition(['admin']) != null;

		let user : Usuario  = this.authService.currentUser();
		this.nome = user.nome;
		this.foto = user.foto;
		this.email = user.email;
		this.id = user.id;
	}

}
