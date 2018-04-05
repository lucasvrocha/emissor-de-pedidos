import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MyErrorStateMatcher } from '../../_helper/myErrorStateMatcher';
import { IconModel, IconBuilder } from '../../ui/icon';
import { ToolbarModel, ToolbarBuilder } from '../../ui/toolbar';
import { LoadingService, LoadingComponent } from '../../ui/loading'
import { AuthenticationService } from '../../auth';


import { FornecedorService } from '../../fornecedor/fornecedor.service'
import { Fornecedor } from '../../_model/fornecedor.model';


@Component({
	moduleId: module.id,
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.css'],
	providers: [IconBuilder, ToolbarBuilder, FornecedorService]
})
export class CadastroComponent implements OnInit, OnDestroy {

	private sub: Subscription;
	formGroup: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private loadService: LoadingService,
		private fornecedorService: FornecedorService,
		public matcher: MyErrorStateMatcher,
		private authService: AuthenticationService,
		iconBuilder: IconBuilder,
		tb: ToolbarBuilder,
	) {
		this.loadService.init('main', 3);
		let permission = this.authService.hasPermition(["admin"]);
		let formControlTemplate = { value: '', disabled: !permission };

		this.formGroup = new FormGroup({
			id: new FormControl({ value: 'Sera gerado automaticamte', disabled: true }),
			cnpj: new FormControl(formControlTemplate),
			ie: new FormControl(formControlTemplate),
			razao: new FormControl(formControlTemplate),
			fantasia: new FormControl(formControlTemplate),
			email: new FormControl(formControlTemplate, [
				Validators.required,
				Validators.email,
			])
		});
	}


	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.loadService.end();
			let id = +params['id'];
			if (id == NaN) {
				this.loadService.end();
				return;
			}
			this.fornecedorService.getFornecedor(id).subscribe(fornecedor => {
				this.loadControls(fornecedor);
				this.loadService.end();
			});
		});

		this.loadService.end();
	}

	ngOnChanges() {
		console.log(this.formGroup.hasError('email'));
	}

	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	salvar() {
		let loadin = this.loadService.init("fornecedor", 2);
		loadin.setMessage("Salvando");
		let fornecedor = this.formGroup.getRawValue();
		this.fornecedorService.putFornecedor(fornecedor)
			.subscribe(fornecedor => {
				this.loadControls(fornecedor);
				// loadin.end();
			});
		loadin.end();
	}

	cancelar() {
		console.log("salvar");
	}

	excluir() {
		console.log("salvar");
	}

	private loadControls(fornecedor : Fornecedor){
		let permission = this.authService.hasPermition(["admin"]);
		for (let a in fornecedor) {
			this.formGroup.controls[a].reset({ value: fornecedor[a], disabled: a === 'id' || !permission });
		}
	}

}
