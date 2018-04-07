import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MyErrorStateMatcher } from '../../_helper/myErrorStateMatcher';
import { IconModel, IconBuilder } from '../../ui/icon';
import { ToolbarModel, ToolbarBuilder } from '../../ui/toolbar';
import { LoadService, LoadComponent, LoadProcess } from '../../ui/load'
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
export class CadastroComponent implements OnInit, OnDestroy, AfterViewInit {

	private sub: Subscription;
	private fornecedor: Fornecedor;

	private permission: boolean;
	private formControlTemplate: { value: string, disabled: boolean };

	load: LoadProcess;
	formGroup: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private loadService: LoadService,
		private fornecedorService: FornecedorService,
		private authService: AuthenticationService,
		private router: Router,
		private fb: FormBuilder,
		public matcher: MyErrorStateMatcher
	) { }

	ngOnInit() {
		this.load = this.loadService.init('fornecedor');

		this.permission = !!this.authService.hasPermition(["admin"]);

		this.formGroup = this.fb.group({
			id: ['',],
			cnpj: ['', Validators.required],
			ie: ['', Validators.required],
			razao: ['', Validators.required],
			fantasia: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]]
		});
		this.formGroup.disable({});
		this.sub = this.route.params.subscribe(params => {
			this.load.process((load: LoadProcess) => {
				load.progress(80);
				let id = params['id'];
				if (id === 'novo') {
					this.loadControls();
					load.end();
					return;
				}
				if (id !== 'novo' && isNaN(+id)) {
					this.ngAfterViewInit = () => {
						setTimeout(() => {
							this.router.navigate(['fornecedor']);
						}, 5000);
					}
					load.end();
					return;
				}

				this.fornecedorService.getFornecedor(id).subscribe(fornecedor => {
					if (fornecedor == null) {
						load.message('Fornecedor não encontrado, redirecinando...')
						setTimeout(() => {
							load.end();
							this.router.navigate(['fornecedor']);
						}, 5000);
						return;
					}
					this.loadControls(fornecedor);
					load.end();
				});
			}, 'carregando...');
		});
	}

	ngAfterViewInit() {
		this.loadService.get('main').end();
	}

	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	novo() {
		this.router.navigate(['fornecedor', 'novo'])
	}

	salvar() {
		this.load.process((load) => {
			let fornecedor = this.formGroup.getRawValue();
			let request;
			if (this.fornecedor != null)
				request = this.fornecedorService.putFornecedor(fornecedor);
			else
				request = this.fornecedorService.postFornecedor(fornecedor);

			request.subscribe(fornecedor => {
				this.router.navigate(['fornecedor', fornecedor.id]);
				load.end();
			});
		}, "salvando...");
	}

	cancelar() {
		this.loadControls(this.fornecedor);
	}

	excluir() {
		this.load.process((load: LoadProcess) => {
			let fornecedor = this.formGroup.getRawValue();
			this.fornecedorService.deleteFornecedor(fornecedor)
				.subscribe(response => {
					this.router.navigate(['fornecedor']);
					load.end();
				});
		}, "excluindo...");
	}

	private loadControls(fornecedor?: Fornecedor) {
		if (fornecedor == null) {
			for (let c in this.formGroup.controls)
				this.formGroup.controls[c].reset({
					value: c === 'id' ? 'Sera gerado automaticamente' : '',
					disabled: c === 'id' || !this.permission
				});
		} else {
			for (let a in fornecedor) {
				this.formGroup.controls[a].reset({
					value: fornecedor[a],
					disabled: a === 'id' || !this.permission
				});
			}
		}
		this.fornecedor = fornecedor;
	}

}
