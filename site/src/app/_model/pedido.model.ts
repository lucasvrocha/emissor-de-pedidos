export interface Pedido {
	id: number;
	tipo: string;
	itens: PedidoItem[];
	pagamentos: PedidoPagamento[];
	destinatario: string;
	status: string;

}

export interface PedidoItem {
	id: number,
	produtoId: number,
	descricao: string,
	qtd: number,
	valor: number
}

export interface PedidoPagamento {
	id: number,
	especie: string,
	parcelas : number;
	valor: number
}

