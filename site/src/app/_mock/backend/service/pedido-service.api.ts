import {  HttpRequest, HttpResponse } from '@angular/common/http';

import { DataBaseStorage as DB } from '../database.storage';
import { RequestMap, Authenticate } from '../decorator';

// mock
import { PEDIDOS } from '../../../_mock/pedido.mock';
import { CAIXAS } from '../../../_mock';

const PAGAMENTOS: any[] = [
	{ id: undefined, especie: 'dinheiro', parcelas: 0, valor: 0 },
	{ id: undefined, especie: 'debito', parcelas: 0, valor: 0 },
	{ id: undefined, especie: 'credito', parcelas: 0, valor: 0 }
];

const PARCELAS = [
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


export class PedidoServiceApi {

	constructor() {
		console.log('[backend] PedidoServiceApi is running');
	}

	get db() { return new DB('pedido', PEDIDOS); }
	get dbPagamento() { return new DB('pagamento', PAGAMENTOS) }
	get dbParcelas() { return new DB('parcela', PARCELAS) }
	get dbCaixa() { return new DB('caixa', CAIXAS) }
	get dbAuth() { return new DB('authenticate', []) }

	@RequestMap('(\\/api\\/pedido$)|(\\/api\\/pedido\\//$)', 'GET')
	@Authenticate()
	all(request) {
		return new HttpResponse({ status: 204, body: this.db.data });
	}

	@RequestMap('(\\/api\\/pedido\\/parcelas$)|(\\/api\\/pedido\\/parcelas\\/$)', 'GET')
	@Authenticate()
	getParcelas(request) {
		return new HttpResponse({ status: 204, body: this.dbParcelas.data });
	}

	@RequestMap('(\\/api\\/pedido\\/pagamentos$)|(\\/api\\/pedido\\/pagamentos\\//$)', 'GET')
	@Authenticate()
	getPagamentos(request) {
		return new HttpResponse({ status: 204, body: this.dbPagamento.data });
	}

	@RequestMap('(\\/api\\/pedido$)', 'POST')
	@Authenticate()
	salvar(request) {
		let pedido = request.body;
		pedido.id = + new Date();
		if (pedido.tipo === 'venda')
			pedido.status = 'finalizado';
		else
			pedido.status = 'enviado';

		this.db.insert(pedido);

		let movimento = [];
		pedido.pagamentos.forEach(x => {
			movimento.push({
				id: +new Date(),
				pagamento: x.especie,
				descricao: pedido.tipo + " #" + pedido.id,
				valor: x.valor
			})
		});

		let user = this.getCurrentUser(request);
		let caixa = this.dbCaixa.data.find(x => x.status === 'aberto');
		if (!caixa) {
			let caixa = {
				id: +new Date(),
				date: new Date(),
				status: 'aberto',
				author: user.usuario,
				movimentacao: movimento
			};
			this.dbCaixa.insert(caixa);
		} else {
			movimento.forEach(x => caixa.movimentacao.push(x))
			this.dbCaixa.update(caixa);
		}

		return new HttpResponse({ status: 204, body: pedido });
	}

	@RequestMap('\\/api\\/pedido\\/\\d{1,}\\/cancelar', 'PUT')
	@Authenticate()
	cancelar(request) {
		let id = request.url.match('\\d{1,}')[0];
		let pedido = this.db.data.find(x => x.id == id);
		if (!pedido)
			return new HttpResponse({ status: 404 });

		pedido.status = 'cancelado';
		this.db.update(pedido);
		return new HttpResponse({ status: 200, body: pedido });
	}

	 
	private getCurrentUser(request) {
		let jwt = request.headers.get('Authorization').split(' ')[1];
		return this.dbAuth.data.find(x => x.jwt === jwt);
	}
}