import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy,ViewChild, ViewChildren } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
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
	@ViewChild('btnEstornar') btnEstornar: any;
	@ViewChildren('canvas') canvas: any
	@ViewChildren('canvasMovimentacaoMensal') canvasDashBoard: any

	caixas: any[] = [];
	chartCaixa: any[] = [];

	detalheColumns = ['id', 'descritivo', 'valor', 'options'];

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
		});
	}

	estornarLancamento(btn, caixa, lancamento) {
		btn.disabled = true;
		this.caixaService.estornarLancamento(caixa, lancamento)
			.subscribe(lancamento => {
				caixa.movimentacao.push(lancamento)
				caixa.dataSourceTable = new MatTableDataSource(caixa.movimentacao);
				btn.disabled = false;
				this.ref.detectChanges();
			});
	}

	canEstornarLancamento(caixa, lancamento) {
		if (caixa.status !== 'aberto')
			return false;

		if (caixa.movimentacao.find(x => x.descricao.indexOf('Lancamento #' + lancamento.id, 0) > -1))
			return false;
		return true;
	}


	private clone(target: any[]) {
		let cloned = new Array();
		target.forEach(x => cloned.push(Object.assign(new Object(), x)));
		return cloned;
	}

	private buildChartCaixa(caixas: any[]) {
		this.caixas = caixas;
		this.ref.detectChanges();

		let i = 0;
		this.canvas.forEach(canvas => {
			let caixa = this.caixas[i];
			caixa.movimentacao.map(x => x.pagamento = x.pagamento.toUpperCase());

			caixa.dataSourceTable = new MatTableDataSource(caixa.movimentacao);
			caixa.dataChart = [];
			caixa.movimentacao.map(x => {
				let d = caixa.dataChart.find(xx => xx.label == x.pagamento);
				if (!d)
					caixa.dataChart.push({ label: x.pagamento, valor: x.valor });
				else
					d.valor += x.valor;
			});

			this.buildChartDoughnut(canvas, caixa.dataChart.map(x => x.label), caixa.dataChart.map(x => x.valor));
			i++;
		});

	}

	private buildChartDoughnut(canvas: any, labels: string[], data: number[]) {
		return new Chart(canvas.nativeElement, {
			type: 'doughnut',
			data: {
				labels: labels,
				datasets: [
					{
						data: data,
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
