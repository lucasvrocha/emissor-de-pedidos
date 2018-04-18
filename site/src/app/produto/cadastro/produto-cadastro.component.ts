import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MyErrorStateMatcher } from '../../_helper/myErrorStateMatcher';
import { IconModel, IconBuilder } from '../../ui/icon';
import { ToolbarModel, ToolbarBuilder } from '../../ui/toolbar';
import { LoadService, LoadComponent, LoadProcess } from '../../ui/load'
import { AuthenticationService } from '../../auth';


import { FornecedorService } from '../../fornecedor/fornecedor.service'
import { Fornecedor } from '../../_model/fornecedor.model';
import { ProdutoService } from '../produto.service';
import { Produto } from '../../_model/produto.model';



@Component({
	moduleId: module.id,
	selector: 'app-produto-cadastro',
	templateUrl: './produto-cadastro.component.html',
	styleUrls: ['./produto-cadastro.component.css'],
	providers: [IconBuilder, ToolbarBuilder, FornecedorService, ProdutoService]
})
export class ProdutoCadastroComponent implements OnInit, OnDestroy, AfterViewInit {

	private sub: Subscription;
	produto: Produto;
	fornecedores: any[];

	private permission: boolean;
	private formControlTemplate: { value: string, disabled: boolean };

	load: LoadProcess;
	formGroup: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private loadService: LoadService,
		private fornecedorService: FornecedorService,
		private produtoService: ProdutoService,
		private authService: AuthenticationService,
		private router: Router,
		private fb: FormBuilder,
		public matcher: MyErrorStateMatcher
	) { }

	ngOnInit() {
		this.load = this.loadService.init('produto');

		this.permission = !!this.authService.hasPermition(["admin"]);

		this.formGroup = this.fb.group({
			id: ['',],
			descritivo: ['', Validators.required],
			quantidade: ['', Validators.required],
			quantidadeMinima: ['', Validators.required],
			fornecedorId: ['', Validators.required],
			preco: ['', Validators.required]
		});

		this.formGroup.disable({});

		this.sub = this.route.params.subscribe(params => {
			this.load.process((load: LoadProcess) => {
				load.progress(80);

				this.fornecedorService.getFornecedores().subscribe(fornecedores => {
					this.fornecedores = [];
					for (let f of fornecedores) {
						this.fornecedores.push({ value: f.id, viewValue: f.razao })
					}
				});

				let id = params['id'];
				if (id === 'novo') {
					this.loadControls();
					load.end();
					return;
				}
				if (id !== 'novo' && isNaN(+id)) {
					this.ngAfterViewInit = () => {
						setTimeout(() => {
							this.router.navigate(['produto']);
						}, 5000);
					}
					load.end();
					return;
				}

				this.produtoService.getProduto(id).subscribe(produto => {
					if (produto == null) {
						load.message('Produto não encontrado, redirecionando...')
						setTimeout(() => {
							load.end();
							this.router.navigate(['produto']);
						}, 5000);
						return;
					}
					this.loadControls(produto);
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
			let produto = this.formGroup.getRawValue();
			let request;
			if (this.produto != null)
				request = this.produtoService.putProduto(produto);
			else
				request = this.produtoService.postProduto(produto);

			request.subscribe(produto => {
				this.router.navigate(['produto', produto.id]);
				load.end();
			});
		}, "salvando...");
	}

	cancelar() {
		this.loadControls(this.produto);
	}

	excluir() {
		this.load.process((load: LoadProcess) => {
			let produto = this.formGroup.getRawValue();
			this.produtoService.deleteProduto(produto.id)
				.subscribe(response => {
					this.router.navigate(['produto']);
					load.end();
				});
		}, "excluindo...");
	}

	private loadControls(produto?: Produto) {
		if (produto == null) {
			for (let c in this.formGroup.controls)
				this.formGroup.controls[c].reset({
					value: c === 'id' ? 'Sera gerado automaticamente' : '',
					disabled: c === 'id' || !this.permission
				});
		} else {
			for (let a in produto) {
				this.formGroup.controls[a].reset({
					value: produto[a],
					disabled: a === 'id' || !this.permission
				});
			}
		}
		this.produto = produto;
	}

}
