import { Pedido } from '../_model/pedido.model';

export const PEDIDOS: Pedido[] = [
	{
		id: 1,
		tipo: 'venda',
		itens: [
			{id : 11, produtoId : 1, descricao: 'descricao do item 1' , valor : 1.99 , qtd : 1} ,
			{id : 12, produtoId : 2, descricao: 'descricao do item 2' , valor : 2.50 , qtd : 2} ,
			{id : 13, produtoId : 3, descricao: 'descricao do item 3' , valor : 3.00 , qtd : 3} 
		],
		pagamentos: [
			{id: 11 , valor: 5, especie : 'dinheiro' , parcelas : 0},
			{id: 12 , valor: 10.99, especie : 'dinheiro', parcelas : 0}
		],
		destinatario : undefined,
		status : "finalizado"
	},
	{
		id: 2,
		tipo: 'compra',
		itens: [
			{id : 21, produtoId : 1, descricao: 'descricao do item 1' , valor : 1.99 , qtd : 1} ,
			{id : 22, produtoId : 2, descricao: 'descricao do item 2' , valor : 2.99 , qtd : 1} ,
			{id : 23, produtoId : 3, descricao: 'descricao do item 3' , valor : 3.99 , qtd : 1} 
		],
		pagamentos: undefined,
		destinatario : "Fornecedor 1", 
		status : "enviado"
	},
	{
		id: 3,
		tipo: 'devolucao',
		itens: [
			{id : 31, produtoId : 1, descricao: 'descricao do item 1' , valor : 1.99 , qtd : 1} 
			
		],
		pagamentos: undefined,
		destinatario : "CCE - Comecou Comprando Errado",
		status : "enviado"
	},
	{
		id: 4,
		tipo: 'venda',
		itens: [
			{id : 41, produtoId : 1, descricao: 'descricao do item 1' , valor : 1.99 , qtd : 1} ,
			{id : 42, produtoId : 2, descricao: 'descricao do item 2' , valor : 2.50 , qtd : 2} ,
			{id : 43, produtoId : 3, descricao: 'descricao do item 3' , valor : 3.00 , qtd : 3} 
		],
		pagamentos: [
			{id: 41 , valor: 15.99, especie : 'dinheiro' , parcelas : 0}
		],
		destinatario: undefined,
		status : "cancelado"
	},
]