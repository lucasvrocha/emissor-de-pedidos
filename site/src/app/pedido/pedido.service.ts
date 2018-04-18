import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Pedido, PedidoItem, PedidoPagamento } from '../_model/pedido.model';

@Injectable()
export class PedidoService {

	readonly href = '/api/pedido';

	constructor(
		private http : HttpClient
		) { }


	load() {
		return this.http.get<Pedido[]>(this.href)
	}

	salvar(pedido) {
		return this.http.post<Pedido>(this.href, pedido);
	}

}
