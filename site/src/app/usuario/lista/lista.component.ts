import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../_model/usuario.model'
import { USUARIO } from '../../_mock/usuario.mock';
import { UsuarioService } from '../usuario.service';
import { LoadingService } from '../../ui/loading';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

	public userList: Usuario[] = [];

	private service: UsuarioService | null;

	constructor(private http: HttpClient, private loadService: LoadingService) {
		this.loadService.init('main', 2)
	}

	ngOnInit() {
		this.service = new UsuarioService(this.http);
		this.service.getAll().subscribe(usuarios => {
			this.userList = usuarios;
			this.loadService.end();
		});
		this.loadService.end();
	}

}
