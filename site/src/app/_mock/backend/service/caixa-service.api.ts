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
	byId(request) {
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

	@RequestMap('\\/api\\/pdv\\/caixa\\/\\d{1,}\\/encerrar$', 'PUT')
	@Authenticate()
	encerrar(request) {
		let jwt = request.headers.get('Authorization').split(' ')[1];
		let id = request.url.match('\\d{1,}')[0];

		let user = this.dbAuth.data.find(x => x.jwt === jwt);
		let mov = this.db.data.find(x => x.id == id)
		if(mov == null)
			return new HttpResponse({ status: 404 });	

		mov.status = 'encerrado';
		mov.author = user.usuario;
		this.db.update(mov);
		return new HttpResponse({ status: 204, body: mov});
		
	}

}