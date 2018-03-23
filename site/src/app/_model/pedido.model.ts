export interface Pedido {
	id: number;
	tipo: string;
	itens: { id: number, produtoId: number, descricao: string, qtd: number, valor: number }[];
	pagamentos: { id: number, especie: string, pagamentoId: number, valor: number }[];
	destinatario : string;
	status: string;
}
