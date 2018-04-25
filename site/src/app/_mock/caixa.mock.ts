export const CAIXAS = [
	{
		id : 3,
		date: '24 de Abril',
		status: 'aberto',
		author: 'lucas.rocha',
		movimentacao: [
			{ pagamento: 'Dinheiro', valor: 100 },
			{ pagamento: 'C.Credito', valor: 200 },
			{ pagamento: 'C.Debito', valor: 150 }
		]
	},
	{
		id : 2,
		date: '23 de Abril',
		status: 'encerrado',
		author: 'lucas.rocha',
		movimentacao: [
			{ pagamento: 'Dinheiro', valor: 55 },
			{ pagamento: 'C.Credito', valor: 154.5 },
			{ pagamento: 'C.Debito', valor: 0 }
		]
	},
	{
		id : 1,
		date: '22 de Abril',
		status: 'encerrado',
		author: 'lucas.rocha',
		movimentacao: [
			{ pagamento: 'Dinheiro', valor: 154 },
			{ pagamento: 'C.Credito', valor: 0 },
			{ pagamento: 'C.Debito', valor: 0 }
		]
	}
];