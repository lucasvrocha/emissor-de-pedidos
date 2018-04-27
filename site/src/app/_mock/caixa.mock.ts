export const CAIXAS = [
	{
		id: 3,
		date: new Date().setFullYear(2018, 3, 25),
		status: 'aberto',
		author: 'lucas.rocha',
		movimentacao: [
			{ id: 14, pagamento: 'C.Debito', valor: 150, descricao: 'Venda #1' },
			{ id: 13, pagamento: 'Dinheiro', valor: 100, descricao: 'Venda #1' },
			{ id: 12, pagamento: 'Dinheiro', valor: 100, descricao: 'Deposito' },
			{ id: 11, pagamento: 'Dinheiro', valor: 100, descricao: 'Deposito' },
			{ id: 10, pagamento: 'Dinheiro', valor: 100, descricao: 'Deposito' },
			{ id: 9, pagamento: 'Dinheiro', valor: 100, descricao: 'Deposito' },
			{ id: 8, pagamento: 'C.Credito', valor: 200, descricao: 'Venda #2' },
			{ id: 7, pagamento: 'C.Debito', valor: 150, descricao: 'Venda #1' }
		]
	},
	{
		id: 2,
		date: new Date().setFullYear(2018,3,24),
		status: 'encerrado',
		author: 'lucas.rocha',
		movimentacao: [
			{ id: 6, pagamento: 'Dinheiro', valor: 55, descricao: 'Venda #3' },
			{ id: 5, pagamento: 'C.Credito', valor: 154.5, descricao: 'Venda #3' },
			{ id: 4, pagamento: 'C.Debito', valor: 0, descricao: 'Venda #3' }
		]
	},
	{
		id: 1,
		date: new Date().setFullYear(2018,3,23),
		status: 'encerrado',
		author: 'lucas.rocha',
		movimentacao: [
			{ id: 3, pagamento: 'Dinheiro', valor: 154, descricao: 'Venda #4' },
			{ id: 2, pagamento: 'C.Credito', valor: 0, descricao: 'Venda #5' },
			{ id: 1, pagamento: 'C.Debito', valor: 0, descricao: 'Venda #6' }
		]
	}
];