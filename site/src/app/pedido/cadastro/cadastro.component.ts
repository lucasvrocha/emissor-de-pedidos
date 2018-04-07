import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

import { ListModel } from '../../ui/frame';
import { ToolbarBuilder } from '../../ui/toolbar';
import { ProdutoService, Produto } from '../../produto';
import { FornecedorService, Fornecedor } from '../../fornecedor';

import { Pedido, PedidoItem, PedidoPagamento } from '../../_model/pedido.model';
import { LoadService, LoadComponent } from '../../ui/load';

@Component({
	moduleId: module.id,
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.css', '../lista/lista.component.css'],
	providers: [ToolbarBuilder, ProdutoService, FornecedorService]
})
export class CadastroComponent implements OnInit, OnDestroy {

	frame: ListModel;

	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;

	dataSourceItens = new MatTableDataSource();
	dataSourcePagamentos = new MatTableDataSource();

	produtos: Produto[];
	fornecedores: Fornecedor[];

	itemColumns = ['descricao', 'qtd', 'valor', 'total'];
	pagamentoColumns = ['especie', 'valor'];

	pedido: Pedido = {
		id: undefined,
		tipo: undefined,
		itens: [],
		pagamentos: [],
		fornecedorId: undefined,
		status: ""
	};

	pagamentos: PedidoPagamento[] = [
		{ id: undefined, especie: 'dinheiro', parcelas: 0, valor: 0 },
		{ id: undefined, especie: 'debito', parcelas: 0, valor: 0 },
		{ id: undefined, especie: 'credito', parcelas: 0, valor: 0 }
	]

	parcelas = [
		{ value: 1, viewValue: '1x' },
		{ value: 2, viewValue: '2x' },
		{ value: 3, viewValue: '3x' },
		{ value: 4, viewValue: '4x' },
		{ value: 5, viewValue: '5x' },
		{ value: 6, viewValue: '6x' },
		{ value: 7, viewValue: '7x' },
		{ value: 8, viewValue: '8x' },
		{ value: 9, viewValue: '9x' },
		{ value: 10, viewValue: '10x' }
	];

	constructor(
		private _formBuilder: FormBuilder,
		private tb: ToolbarBuilder,
		private produtoService: ProdutoService,
		private fornecedorService: FornecedorService,
		private loadService: LoadService
	) {	}

	ngOnInit() {

		this.firstFormGroup = this._formBuilder.group({});
		this.secondFormGroup = this._formBuilder.group({});
		this.thirdFormGroup = this._formBuilder.group({});

		this.frame = {
			title: 'Novo Pedido',
			toolbar: this.tb
				.withTitle({ description: 'Novo Pedido', icon: this.tb.icon('add_shopping_cart').build() })
				.build()
		};

		//this.produtoService.getProdutos(null).subscribe(produtos => { this.produtos = produtos });
		this.fornecedorService.getFornecedores()
			.subscribe(fornecedores => {
				this.fornecedores = fornecedores;
			});

		this.dataSourceItens.data = this.pedido.itens;
		this.dataSourcePagamentos.data = this.pedido.pagamentos;
		
	}

	ngOnDestroy() {

	}

	estoque(produto: Produto) {
		let i: PedidoItem[] = this.pedido.itens.filter(i => i.produtoId === produto.id);
		return i[0] ? produto.quantidade - i[0].qtd : produto.quantidade;
	}

	basket(produto: Produto) {
		let i: PedidoItem[] = this.pedido.itens.filter(i => i.produtoId === produto.id);
		return i[0] ? i[0].qtd : 0;
	}

	add(produto: Produto) {
		let i = this.pedido.itens.filter(i => i.produtoId === produto.id);
		if (i[0]) {
			i[0].qtd++;
		} else {
			this.pedido.itens.push(this.pipe(produto));
		}
		this.updateDataSourceItens();
	}

	remove(produto: Produto) {
		let i = this.pedido.itens.filter(i => i.produtoId === produto.id);
		for (let p of i) {
			p.qtd <= 0 ? this.splice(i, this.pedido.itens) : p.qtd--;
		}
		this.updateDataSourceItens();
	}

	updateProdutos() {
		let param = this.pedido.tipo === 'venda' ? undefined : { fornecedorId: this.pedido.fornecedorId };

		this.produtoService
			.getProdutos(param)
			.subscribe(produtos => {
				this.produtos = produtos;

			});
	}

	updatePagamento() {
		this.dataSourcePagamentos.data = this.pedido.pagamentos = this.pagamentos.filter(p => p.valor > 0);
	}

	updateDataSourceItens() {
		this.dataSourceItens.data = this.pedido.itens.filter(i => i.qtd > 0);
	}

	total(produto: Produto) {
		let i = this.pedido.itens.filter(i => i.produtoId === produto.id)[0];
		return this.valorTotal(i);
	}

	totalPagamentos() {
		let soma = 0;
		this.pedido.pagamentos.map(p => soma += p.valor);
		return soma;
	}

	totalBasket() {
		let soma = 0;
		this.pedido.itens.map(i => soma += i.valor * i.qtd);
		return soma;
	}

	totalItens() {
		let soma = 0;
		this.pedido.itens.map(i => soma += i.qtd);
		return soma;
	}

	totalReceber() {
		return this.totalBasket() - this.totalPagamentos();
	}

	getPagamento(pagamento: string) {
		let soma = 0;
		this.pedido.pagamentos.map(p => soma += p.especie === pagamento ? p.valor : 0);
		return soma;
	}

	private valorTotal(i: PedidoItem) {
		return i && i.qtd > 0 ? i.qtd * i.valor : 0;
	}


	private pipe(produto: Produto): PedidoItem {
		return {
			id: 0,
			produtoId: produto.id,
			descricao: produto.descritivo,
			qtd: 1,
			valor: produto.preco
		};
	}

	private splice(target, data: any[]) {
		var index = data.indexOf(target, 0);
		if (index > -1) {
			data.splice(index, 1);
		}
	}



}

