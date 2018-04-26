import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChildren } from '@angular/core';
import { Chart } from 'chart.js';

import { CaixaService } from '../caixa.service';

@Component({
	selector: 'app-fluxo',
	templateUrl: './fluxo.component.html',
	styleUrls: ['./fluxo.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [CaixaService]
})
export class FluxoComponent implements OnInit {

	@ViewChildren('canvas') canvas: any
	@ViewChildren('canvasMovimentacaoMensal') canvasDashBoard: any

	caixas: any[] = [];
	chartCaixa: any[] = [];

	detalheColumns = ['descritivo', 'pagamento', 'valor'];

	chart: any;
	readonly chartBackgroundColor = [
		'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
		'rgba(255, 206, 86, 0.2)',
		'rgba(75, 192, 192, 0.2)',
		'rgba(153, 102, 255, 0.2)',
		'rgba(255, 159, 64, 0.2)',
		'rgba(165, 125, 12, 0.2)'
	];

	readonly chartBorderColor = [
		'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)',
		'rgba(255, 206, 86, 1)',
		'rgba(75, 192, 192, 1)',
		'rgba(153, 102, 255, 1)',
		'rgba(255, 159, 64, 1)',
		'rgba(165, 125, 12, 1)'
	];

	constructor(
		private caixaService: CaixaService,
		private ref: ChangeDetectorRef
	) { }

	ngOnInit() {
		Chart.defaults.line.spanGaps = true;
		this.caixaService.getGraphData(null, null).subscribe(data => this.updateChartMensal(data));
		this.caixaService.getCaixas()
			.map(data => {
				return data.sort(function comp(a, b) {
					if (a.id < b.id) return 1;
					if (a.id > b.id) return -1;
					return 0;
				})
			})
			.subscribe(data => this.buildChartCaixa(data));
	}

	ngAfterViewInit() {
		this.buildChartMensal();
	}


	total(data) {
		return data.map(m => m.valor).reduce((a, b) => a + b, 0)
	}

	encerrar(data) {
		this.caixaService.encerrar(data.id).subscribe(data => {
			let target = this.caixas.findIndex(x => x.id == data.id);
			this.caixas[target].status = data.status;
			this.ref.detectChanges();
		})
	}

	private buildChartCaixa(data: any[]) {
		this.caixas = data;
		this.ref.detectChanges();

		let i = 0;
		this.canvas.forEach(canvas => {
			let caixa = this.caixas[i];
			caixa.detalhe = [];
			caixa.movimentacao.forEach(x => caixa.detalhe.push(Object.assign({}, x)));
			
			this.chartCaixa.push(new Chart(canvas.nativeElement, {
				type: 'doughnut',
				data: {
					labels: caixa.movimentacao.map(x => x.pagamento),
					datasets: [
						{
							data: caixa.movimentacao.map(x => {
								let grupo = caixa.movimentacao.filter(xx=> xx.pagamento === x.pagamento && xx.id != x.id);
								grupo.forEach(xx => {
									x.valor += xx.valor;
									x.descricao = 'Total';
									let ind = caixa.movimentacao.findIndex(xxx => xx.id == xxx.id);
									if (ind >= 0)
										caixa.movimentacao.splice(ind, 1);
								});
								return x;
							}).map(x => x.valor),
							backgroundColor: this.chartBackgroundColor,
							borderColor: this.chartBorderColor
						}
					]
				},
				options: {
					legend: {
						display: false
					}
				}
			}));
			i++;
		});

		this.chartCaixa.forEach(chart => {
			let i = 0;
			chart.data.datasets.forEach((dataset) => {
				if (!dataset.backgroundColor) dataset.backgroundColor = [];
				dataset.backgroundColor.push(this.chartBackgroundColor[i])

				if (!dataset.borderColor) dataset.borderColor = [];
				dataset.borderColor.push(this.chartBorderColor[i])

				i++;
			});
			chart.update();
		});
	}


	private buildChartMensal() {
		let ctx = document.getElementById('canvas-dashboard');
		this.chart = new Chart(ctx, {
			type: 'line',
			data: {},
			options: {
				legend: {
					display: false
				},
				scales: {
					xAxes: [{
						display: true
					}],
					yAxes: [{
						display: true
					}],
				}
			}
		});
	}

	private updateChartCaixa(data) {
		console.log(data)
		this.chart.data = data;
		let i = 0;
		this.chart.data.datasets.forEach((dataset) => {
			if (!dataset.backgroundColor) dataset.backgroundColor = [];
			dataset.backgroundColor.push(this.chartBackgroundColor[i])

			if (!dataset.borderColor) dataset.borderColor = [];
			dataset.borderColor.push(this.chartBorderColor[i])

			i++;
		});
		this.chart.update();
	}

	private updateChartMensal(data) {
		this.chart.data = data;
		let i = 0;
		this.chart.data.datasets.forEach((dataset) => {
			if (!dataset.backgroundColor) dataset.backgroundColor = [];
			dataset.backgroundColor.push(this.chartBackgroundColor[i])

			if (!dataset.borderColor) dataset.borderColor = [];
			dataset.borderColor.push(this.chartBorderColor[i])

			i++;
		});
		this.chart.update();
	}
}
