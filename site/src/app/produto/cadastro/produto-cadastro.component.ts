import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../ui/loading';


@Component({
	moduleId: module.id,
	selector: 'app-produto-cadastro',
	templateUrl: './produto-cadastro.component.html',
	styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

	selectedValue: string;

	fornecedores = [
		{ value: 'steak-0', viewValue: 'Steak' },
		{ value: 'pizza-1', viewValue: 'Pizza' },
		{ value: 'tacos-2', viewValue: 'Tacos' }
	];

	constructor(private laodService : LoadingService) { 
		this.laodService.start();
	}

	ngOnInit() {
		this.laodService.end();
	}

}
