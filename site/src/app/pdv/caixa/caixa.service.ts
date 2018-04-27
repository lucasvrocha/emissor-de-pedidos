import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable()
export class CaixaService {
	readonly href = '/api/pdv/caixa';

	constructor(
		private http: HttpClient
	) { }

	getGraphData(inicio: Date, fim: Date) {
		return this.http.get<any>(this.href + `?q=graph&begin=${inicio}&end=${fim}`);
	}

	getCurrentCaixa() {
		return this.http.get<any>(this.href + '/atual');
	}

	getCaixas() {
		return this.http.get<any[]>(this.href);
	}

	encerrar(id: number) {
		return this.http.put<any>(this.href + '/' + id + '/encerrar', null);
	}

	insert(data, caixa) {
		return this.http.post<any>(this.href + '/' + caixa.id + '/lancamento', data);
	}

	createCaixa() {
		return this.http.post<any>(this.href + '/novo', null);
	}

	estornarLancamento(caixa, lancamento) {
		return this.http.delete<any>(this.href + '/' + caixa.id + '/lancamento/' + lancamento.id)
	}


}
