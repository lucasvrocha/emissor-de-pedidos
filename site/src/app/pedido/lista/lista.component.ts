import { Component, OnInit } from '@angular/core';
import { ListModel } from '../../ui/frame/_model/list.model'
import { Pedido } from '../../_model/pedido.model';
import { PEDIDOS } from '../../_mock/pedido.mock';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

	frameListModel: ListModel = {
		title: 'Pedidos'
		, iconName: 'assignment'
		, iconColor: 'black'
	};

	itemColumns = ['descricao', 'qtd', 'valor', 'total'];
	pagamentoColumns = ['especie', 'valor'];

	panel: number;

	pedidos: Pedido[];

	constructor() {
		this.pedidos = PEDIDOS
			.concat(PEDIDOS)
			.concat(PEDIDOS)
			.concat(PEDIDOS);
	}

	ngOnInit() {
	}

	setPanel(panel: number) {
		this.panel = panel;
	}

	getTotal(itens: any[]) {
		let soma: number = 0;
		for (let i of itens) {
			soma += i.qtd ? i.qtd * i.valor : i.valor;
		}
		return soma;
	}
	getIcon(status: string) {
		let icon = {
			name: undefined,
			color: undefined,
			size: 24
		}

		switch (status) {
			case "cancelado":
				icon.name = 'money_off';
				icon.color = 'red';
				break;
			case "finalizado":
				icon.name = 'attach_money';
				icon.color = 'blue';
				break;
			case "enviado":
			default:
				icon.name = 'email';
				icon.color = 'green';
				break;
		}
		return icon;
	}

	getIconName(status: string): string {
		if (status === 'cancelado')
			return 'money_off'
		if (status === 'finalizado')
			return 'attach_money'
		if (status === 'enviado')
			return 'email'

		return 'undefined'

	}

}
