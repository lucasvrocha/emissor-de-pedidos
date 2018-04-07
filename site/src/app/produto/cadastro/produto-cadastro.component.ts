import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadService } from '../../ui/load';

import { Produto } from '../../produto';
import { AuthenticationService } from '../../auth'

@Component({
	moduleId: module.id,
	selector: 'app-produto-cadastro',
	templateUrl: './produto-cadastro.component.html',
	styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

	formGroup: FormGroup;

	selectedValue: string;

	fornecedores = [
		{ value: 'steak-0', viewValue: 'Steak' },
		{ value: 'pizza-1', viewValue: 'Pizza' },
		{ value: 'tacos-2', viewValue: 'Tacos' }
	];

	constructor(private laodService: LoadService, private authService: AuthenticationService) {
		

		let permission  = this.authService.hasPermition(["admin"]);

		let formControlTemplate = {value : '', disabled : !permission};

		this.formGroup = new FormGroup({
			nome: new FormControl(formControlTemplate),
			fornecedor: new FormControl(formControlTemplate),
			btnSalvar : new FormControl(formControlTemplate),
			btnExcluir : new FormControl(formControlTemplate),
			btnCancelar : new FormControl(formControlTemplate)
		});
	}

	ngOnInit() {
		
	}

}
