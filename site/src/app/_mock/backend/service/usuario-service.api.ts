import { HttpRequest, HttpResponse } from '@angular/common/http';

import { DataBaseStorage as DB } from '../database.storage';
import { RequestMap, Authenticate } from '../decorator';
import { USUARIO } from '../../../usuario';

export class UsuarioServiceApi {

	constructor() {
		console.log('[backend] UsuarioServiceApi is running');
	}

	get db() { return new DB('usuario', USUARIO); }

	@RequestMap('\\/api\\/usuario/\\d{1,}$', 'GET')
	@Authenticate()
	byId(request) {
		let id = request.url.match('\\d{1,}$')[0];
		let obj = this.db.data.find(x => '' + x.id === id);
		if (obj && obj['senha']) obj['senha'] = null;
		return new HttpResponse({ status: obj == null ? 404 : 200, body: obj });
	}

	@RequestMap('(\\/api\\/usuario\\/$)|(\\/api\\/usuario$)', 'GET')
	@Authenticate()
	byAll(request) {
		let body = this.db.data.map(x => { if (x['senha']) x['senha'] = null; return x });
		return new HttpResponse({
			status: 200, body: body
		});
	}

	@RequestMap('\\/api\\/usuario\\/\\d{1,}$', 'PUT')
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

	@RequestMap('(\\/api\\/usuario$)|(\\/api\\/usuario\\//$)', 'POST')
	@Authenticate()
	add(request){
		let obj: any = Object.assign(new Object(),request.body);
		obj.id = + new Date();
		this.db.insert(obj);
		return new HttpResponse({ status: 201, body: obj });
	}

	@RequestMap('\\/api\\/usuario\\/\\d{1,}$','DELETE')
	@Authenticate()
	deletar(request){
		let id = +request.url.match('\\d{1,}$')[0];
		let obj = this.db.data.find(x => x.id == id);
		this.db.delete(obj);
		return new HttpResponse({ status: 204, body: obj });
	}

}