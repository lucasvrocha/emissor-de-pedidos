import { HttpRequest, HttpResponse } from '@angular/common/http';

import { DataBaseStorage as DB } from '../database.storage';
import { RequestMap, Authenticate } from '../decorator';

import { PRODUTO ,FORNECEDOR} from '../../../_mock';

export class ProdutoServiceApi {

	constructor() {
		console.log('[backend] ProdutoServiceApi is running');
	}

	get db() { return new DB('produto', PRODUTO); }
	get dbFornecedor() { return new DB('fornecedor', FORNECEDOR); };

	@RequestMap('\\/api\\/produto\\/\\d{1,}$', 'GET')
	@Authenticate()
	byId(request) {
		let id = request.url.match('\\d{1,}$')[0];
		let obj = this.db.data.find(x => '' + x.id === id);
		return new HttpResponse({ status: obj == null ? 404 : 200, body: obj });
	}

	@RequestMap('\\/api\\/produto\\?q=repo:angular\\/material2', 'GET')
	@Authenticate()
	byAngularList(request) {
		return new HttpResponse({
			status: 200, body: {
				total: this.db.data.length,
				items: this.db.data
			}
		});
	}

	@RequestMap('(\\/api\\/produto\\/$)|(\\/api\\/produto$)', 'GET')
	@Authenticate()
	byAll(request) {
		let body = this.db.data.map(x => { if (x['senha']) x['senha'] = null; return x });
		return new HttpResponse({
			status: 200, body: body
		});
	}

	@RequestMap('\\/api\\/produto\\/fornecedor\\/\\d{1,}$', 'GET')
	@Authenticate()
	byFornecedor(request) {
		let id = +request.url.match('\\d{1,}$')[0];
		let list : any[]= this.db.data.filter(x => x.fornecedorId == id);
		return new HttpResponse({ status: 200, body: list });
	}

	@RequestMap('\\/api\\/produto\\/\\d{1,}$', 'PUT')
	@Authenticate()
	alterar(request) {
		let id = +request.url.match('\\d{1,}$')[0];
		let obj = this.db.data.find(x => x.id == id);
		if (obj == null)
			return new HttpResponse({ status: 404 })

		for (let f in request.body) {
			if (request.body[f] != undefined) {
				obj[f] = request.body[f];
			}
		}
		this.db.update(obj);
		return new HttpResponse({ status: 200, body: obj });
	}

	@RequestMap('(\\/api\\/produto$)|(\\/api\\/produto\\//$)', 'POST')
	@Authenticate()
	add(request) {
		let obj: any = request.body;
		obj.id = + new Date();
		this.db.insert(obj);
		return new HttpResponse({ status: 201, body: obj });
	}

	@RequestMap('\\/api\\/produto\\/\\d{1,}$', 'DELETE')
	@Authenticate()
	deletar(request) {
		let id = +request.url.match('\\d{1,}$')[0];
		let obj = this.db.data.find(x => x.id == id);
		this.db.delete(obj);
		return new HttpResponse({ status: 204, body: obj });
	}

}