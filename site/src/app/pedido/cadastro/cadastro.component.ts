import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

import { ListModel } from '../../ui/frame';
import { ToolbarBuilder } from '../../ui/toolbar';
import { ProdutoService, Produto } from '../../produto';
import { FornecedorService, Fornecedor } from '../../fornecedor';
import { PedidoService } from '../pedido.service';

import { Pedido, PedidoItem, PedidoPagamento } from '../../_model/pedido.model';
import { LoadService, LoadComponent } from '../../ui/load';

@Component({
	moduleId: module.id,
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.css', '../lista/lista.component.css'],
	providers: [ToolbarBuilder, ProdutoService, FornecedorService, PedidoService]
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

	pagamentos: PedidoPagamento[];
	parcelas: any[];

	constructor(
		private _formBuilder: FormBuilder,
		private tb: ToolbarBuilder,
		private produtoService: ProdutoService,
		private fornecedorService: FornecedorService,
		private pedidoService: PedidoService,
		private loadService: LoadService,
		private router: Router
	) { }

	ngOnInit() {
		this.frame = {
			title: 'Novo Pedido',
			toolbar: this.tb
				.withTitle({ description: 'Novo Pedido', icon: this.tb.icon('add_shopping_cart').build() })
				.build()
		};
		this.dataSourceItens.data = this.pedido.itens;
		this.dataSourcePagamentos.data = this.pedido.pagamentos;

		this.firstFormGroup = this._formBuilder.group({});
		this.secondFormGroup = this._formBuilder.group({});
		this.thirdFormGroup = this._formBuilder.group({});

		this.fornecedorService.getFornecedores().subscribe(fornecedores => this.fornecedores = fornecedores);
		this.pedidoService.pagamentos().subscribe(pagamentos => this.pagamentos = pagamentos);
		this.pedidoService.parcelas().subscribe(parcelas => this.parcelas = parcelas);
	}

	ngOnDestroy() { }

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
		for (let p of i) p.qtd <= 0 ? this.splice(i, this.pedido.itens) : p.qtd--;
		this.updateDataSourceItens();
	}

	updateProdutos() {
		let param = this.pedido.tipo === 'venda' ? undefined : { fornecedorId: this.pedido.fornecedorId };
		this.produtoService.getProdutos(param).subscribe(produtos => this.produtos = produtos);
	}

	updatePagamento() {
		this.dataSourcePagamentos.data = this.pedido.pagamentos = this.pagamentos.filter(p => {
			if (p.especie === 'credito')
				p.parcelas = p.valor > 0 ? p.parcelas <= 0 ? 1 : p.parcelas : 0;
			
			return p.valor > 0;
		});
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

	canFinalizar() {
		if (this.totalItens() <= 0)
			return false;

		if (this.pedido.tipo === 'venda')
			return this.totalReceber() <= 0;

		return this.totalReceber() != 0;
	}

	finalizar() {
		this.pedidoService.salvar(this.pedido).subscribe(retorno => {
			if (retorno)
				this.router.navigate(['pedido']);
		});

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

