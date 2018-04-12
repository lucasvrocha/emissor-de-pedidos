import { HttpRequest, HttpResponse } from '@angular/common/http';

import { DataBaseStorage as DB } from '../database.storage';
import { RequestMap, Authenticate } from '../decorator';

import { FORNECEDOR } from '../../../_mock';

export class FornecedorServiceApi {

	constructor() {
		console.log('[backend] FornecedorServiceApi is running');
	}

	get db() { return new DB('fornecedor', FORNECEDOR); }

	@RequestMap('\\/api\\/fornecedor/\\d{1,}$', 'GET')
	@Authenticate()
	byId(request) {
		let id = request.url.match('\\d{1,}$')[0];
		let obj = this.db.data.find(x => '' + x.id === id);
		if (obj && obj['senha']) obj['senha'] = null;
		return new HttpResponse({ status: obj == null ? 404 : 200, body: obj });
	}

	@RequestMap('\\/api\\/fornecedor\\?q=repo:angular\\/material2', 'GET')
	@Authenticate()
	byAngularList(request) {
		return new HttpResponse({
			status: 200, body: {
				total: this.db.data.length,
				items: this.db.data.map(x => { if (x['senha']) x['senha'] = null; return x })
			}
		});
	}

	@RequestMap('(\\/api\\/fornecedor\\/$)|(\\/api\\/fornecedor$)', 'GET')
	@Authenticate()
	byAll(request) {
		return new HttpResponse({ status: 200, body: this.db.data });
	}

	@RequestMap('\\/api\\/fornecedor\\/\\d{1,}$', 'PUT')
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

	@RequestMap('(\\/api\\/fornecedor$)|(\\/api\\/fornecedor\\//$)', 'POST')
	@Authenticate()
	add(request) {
		let obj: any = request.body;
		obj.id = + new Date();
		this.db.insert(obj);
		return new HttpResponse({ status: 201, body: obj });
	}

	@RequestMap('\\/api\\/fornecedor\\/\\d{1,}$', 'DELETE')
	@Authenticate()
	deletar(request) {
		let id = +request.url.match('\\d{1,}$')[0];
		let obj = this.db.data.find(x => x.id == id);
		this.db.delete(obj);
		return new HttpResponse({ status: 204, body: obj });
	}

}