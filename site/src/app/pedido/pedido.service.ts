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
		return this.http.get<Pedido[]>(this.href).map(data => {
			return data.sort((a, b) => +b.id > +a.id ? 1 : 0);
		});
	}

	salvar(pedido) {
		return this.http.post<Pedido>(this.href, pedido);
	}

	parcelas(){
		return this.http.get<any[]>(this.href + '/parcelas');
	}

	pagamentos(){
		return this.http.get<any[]>(this.href + '/pagamentos');
	}

	cancelar(pedido : Pedido){
		return this.http.put<any>(this.href + '/' + pedido.id + '/cancelar', pedido);
	}


}
