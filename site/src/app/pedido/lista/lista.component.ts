import { Component, OnInit } from '@angular/core';
import { ListModel } from '../../ui/frame/_model/list.model'
import { Pedido } from '../../_model/pedido.model';
import { ToolbarBuilder } from '../../ui/toolbar';

import { LoadingService } from '../../ui/loading'

// mock
import { PEDIDOS } from '../../_mock/pedido.mock';


@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css'],
	providers: [ToolbarBuilder]
})
export class ListaComponent implements OnInit {

	frameListModel: ListModel;

	itemColumns = ['descricao', 'qtd', 'valor', 'total'];
	pagamentoColumns = ['especie', 'valor'];

	panel: number;

	pedidos: Pedido[] = PEDIDOS.concat(PEDIDOS).concat(PEDIDOS).concat(PEDIDOS);

	constructor(private tb: ToolbarBuilder, private loadService : LoadingService) {
		this.loadService.start();
	}

	ngOnInit() {
		let toolbar = this.tb
			.withTitle({ description: 'Pedidos', icon: this.tb.icon('assignment').build() })
			.forward({ url: './novo', icon: this.tb.icon("add_box").build() })
			.build();

		this.frameListModel = {
			title: 'Pedidos',
			toolbar: toolbar
		};
		this.loadService.end();
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
