import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListModel } from '../../ui/frame';
import { ToolbarBuilder } from '../../ui/toolbar';
import { ProdutoService, Produto } from '../../produto';

@Component({
	moduleId: module.id,
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.css'],
	providers: [ToolbarBuilder, ProdutoService]
})
export class CadastroComponent implements OnInit {
	frame: ListModel;

	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;

	produtos: Produto[];

	itemColumns = ['descricao', 'total', 'action'];
	itensData: DataItem[] = [];

	pagamentos : Pagamentos = {
		dinheiro : 0, 
		cartao : {valor : 0, parcelas : 0}
	}

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
		private produtoService: ProdutoService
	) { }

	ngOnInit() {
		this.firstFormGroup = this._formBuilder.group({});
		this.secondFormGroup = this._formBuilder.group({});
		this.thirdFormGroup = this._formBuilder.group({});

		this.frame = {
			title: 'Novo Pedido',
			toolbar: this.tb
				.withTitle({ description: 'Novo Pedido', icon: this.tb.icon('assignment').build() })
				.build()
		};

		this.produtoService.getProdutos().subscribe(produtos => this.produtos = produtos);
	}

	estoque(produto: Produto) {
		let i: DataItem[] = this.itensData.filter(i => i.codigo === produto.id);
		return i[0] ? produto.quantidade - i[0].qtd : produto.quantidade;
	}

	basket(produto: Produto) {
		let i: DataItem[] = this.itensData.filter(i => i.codigo === produto.id);
		return i[0] ? i[0].qtd : 0;
	}

	add(produto: Produto) {
		let i = this.itensData.filter(i => i.codigo === produto.id);
		if (i[0]) {
			i[0].qtd++;
		} else {
			this.itensData.push(this.pipe(produto));
		}
	}

	remove(produto: Produto) {
		let i = this.itensData.filter(i => i.codigo === produto.id);
		for (let p of i) {
			p.qtd <= 0 ? this.splice(p, this.itensData) : p.qtd--;
		}
	}

	total(produto: Produto) {
		let i = this.itensData.filter(i => i.codigo === produto.id)[0];
		return this.valorTotal(i);
	}

	totalPagamentos() {
		return this.pagamentos.dinheiro  + this.pagamentos.cartao.valor;
	}

	totalBasket() {
		let soma = 0;
		this.itensData.map(i => { soma += this.valorTotal(i) });
		return soma;
	}

	private valorTotal(i: DataItem) {
		return i && i.qtd > 0 ? i.qtd * i.valor : 0;
	}


	private pipe(produto: Produto): DataItem {
		return {
			codigo: produto.id,
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


interface DataItem { codigo: number; descricao: string; qtd: number; valor: number };
interface Pagamentos { dinheiro : number, cartao : {valor :number , parcelas : number}};
