import { HttpRequest, HttpResponse } from '@angular/common/http';

import { DataBaseStorage as DB } from '../database.storage';
import { RequestMap, Authenticate } from '../decorator';

import { CAIXAS } from '../../../_mock';

export class CaixaServiceApi {

	constructor() {
		console.log('[backend] CaixaServiceApi is running');
	}

	get db() { return new DB('caixa', CAIXAS); }
	get dbAuth() { return new DB('authenticate', []) };

	@RequestMap('\\/api\\/pdv\\/caixa\\?|q=graph', 'GET')
	@Authenticate()
	allByPeriodo(request) {
		let inicio = request.url.match('begin=\\w*')[0].split('=')[1];
		let fim = request.url.match('end=\\w*')[0].split('=')[1];
		console.log('inicio', inicio, 'fim', fim);

		let body = {
			labels: ["01/04", "07/04", "13/04", "19/04", "25/04", "30/04"],
			datasets: [{
				label: '# Faturamento',
				data: [0, 25, 33, 20, 10, 50],
			}, {
				label: '# Entrada',
				data: [0, 35, 37, 0, 10, 60],
			}, {
				label: '# Saida',
				data: [0, 10, 5, 13, 20, 10],
			}]
		}
		return new HttpResponse({ status: 200, body: body });
	}


	@RequestMap('\\/api\\/pdv\\/caixa$', 'GET')
	@Authenticate()
	all(request) {
		return new HttpResponse({ status: 200, body: this.db.data });
	}


	@RequestMap('\\/api\\/pdv\\/caixa\\/atual$', 'GET')
	@Authenticate()
	getCurrentCaixa(request) {
		let caixa = this.db.data.find(x => x.status === 'aberto');
		if(caixa == null)
			return new HttpResponse({ status: 404, body: caixa });	
		
		return new HttpResponse({ status: 200, body: caixa});
	}

	@RequestMap('\\/api\\/pdv\\/caixa\\/novo$', 'POST')
	@Authenticate()
	createCaixa(request) {
		let user = this.getCurrentUser(request);
		let caixa = {
			id: +new Date(),
			date: new Date(),
			status: 'aberto',
			author: user.usuario,
			movimentacao: []
		};
		this.db.insert(caixa);
		return new HttpResponse({ status: 200, body: caixa });
	}
	@RequestMap('\\/api\\/pdv\\/caixa\\/\\d{1,}\\/lancamento\\/\\d{1,}', 'DELETE')
	@Authenticate()
	estornarLancamento(request) {
		let caixaId = request.url.match('caixa\\/\\d{1,}')[0].split('/')[1];
		let lancamentoId = request.url.match('lancamento\\/\\d{1,}')[0].split('/')[1];
		let user = this.getCurrentUser(request);

		let caixa = this.db.data.find(x => x.id == caixaId);
		if(!caixa)
			return new HttpResponse({ status: 404 });

		let lancamento = caixa.movimentacao.find(x => x.id == lancamentoId);

		let estorno = Object.assign(new Object(), lancamento);
		estorno.descricao = 'Lancamento #' + lancamento.id + " estornado por " + user.usuario;
		estorno.valor = lancamento.valor * -1;
		estorno.id = +new Date();

		caixa.movimentacao.push(estorno);

		this.db.update(caixa);
		return new HttpResponse({ status: 200, body: lancamento });
	}



	@RequestMap('\\/api\\/pdv\\/caixa\\/\\d{1,}\\/encerrar$', 'PUT')
	@Authenticate()
	encerrar(request) {
		let user = this.getCurrentUser(request);
		let id = request.url.match('\\d{1,}')[0];
		let mov = this.db.data.find(x => x.id == id)
		if (mov == null)
			return new HttpResponse({ status: 404 });

		mov.status = 'encerrado';
		mov.author = user.usuario;
		this.db.update(mov);
		return new HttpResponse({ status: 204, body: mov });
	}



	@RequestMap('\\/api\\/pdv\\/caixa\\/\\d{1,}\\/lancamento$', 'POST')
	@Authenticate()
	cadastrarLancamento(request) {
		let idCaixa = request.url.match('\\d{1,}')[0];

		let caixa = this.db.data.find(x => x.id == idCaixa);
		if (caixa == null)
			return new HttpResponse({ status: 404 });

		let data = request.body;
		data.id = +new Date();
		caixa.movimentacao.push(data);
		this.db.update(caixa);

		return new HttpResponse({ status: 200, body: data })

	}


	private getCurrentUser(request) {
		let jwt = request.headers.get('Authorization').split(' ')[1];
		return this.dbAuth.data.find(x => x.jwt === jwt);
	}
}
