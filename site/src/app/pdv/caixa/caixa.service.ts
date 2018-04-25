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

	getCaixas(){
		return this.http.get<any[]>(this.href);
	}

	encerrar(id : number){
		return this.http.put<any>(this.href +'/'+id+'/encerrar', null);
	}


}
