import { HttpRequest, HttpResponse } from '@angular/common/http';

import { DataBaseStorage as DB } from '../database.storage';
import { RequestMap, Authenticate } from '../decorator';

import { USUARIO } from '../../../usuario';

export class AuthServiceApi {

	constructor() {
		console.log('[backend] AuthServicetApi is running');
	}

	get dbAuth() { return new DB('authenticate', []); }
	get dbUser() { return new DB('usuario', USUARIO) };

	@RequestMap('\\/api\\/authenticate$', 'GET')
	@Authenticate()
	checkLogin(request) {
		let jwt = request.headers.get('Authorization').split(' ')[1];
		let obj = new DB('authenticate', []).data.find(x => x.jwt === jwt);
		return new HttpResponse<any>({ status: 200, body: JSON.stringify(obj) });
	}

	@RequestMap('\\/api\\/authenticate$', 'POST')
	login(request) {
		let user = this.dbUser.data.find(user => {
			return user.usuario === request.body.usuario
				&& user.senha === request.body.senha;
		});

		if (!user) return new HttpResponse({ status: 400, body: null });
		user.jwt = 'fake-jwt-token';
		this.dbAuth.insert(user);
		return new HttpResponse({ status: 200, body: user });
	}

	@RequestMap('\\/api\\/authenticate$', 'DELETE')
	@Authenticate()
	logout(request) {
		let jwt = request.headers.get('Authorization').split(' ')[1];
		let dbAuth = new DB('authenticate', []);
		let auth = dbAuth.data.find(x => x.jwt === jwt);
		dbAuth.delete(auth);
		return new HttpResponse<any>({ status: 200 });
	}
}