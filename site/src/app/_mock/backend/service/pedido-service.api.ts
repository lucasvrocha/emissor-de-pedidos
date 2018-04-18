import { HttpRequest, HttpResponse } from '@angular/common/http';

import { DataBaseStorage as DB } from '../database.storage';
import { RequestMap, Authenticate } from '../decorator';

// mock
import { PEDIDOS } from '../../../_mock/pedido.mock';

export class PedidoServiceApi {

	constructor() {
		console.log('[backend] PedidoServiceApi is running');
	}

	get db() { return new DB('pedido', PEDIDOS); }

	@RequestMap('(\\/api\\/pedido$)|(\\/api\\/pedido\//$)', 'GET')
	@Authenticate()
	all(request) {
		return new HttpResponse({ status: 204, body: PEDIDOS });
	}

}