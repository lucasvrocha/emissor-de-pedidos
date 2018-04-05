import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Fornecedor } from '../_model/fornecedor.model';
import { environment as env } from '../../environments/environment';

@Injectable()
export class FornecedorService {

	private href = env.api + '/fornecedor';
	constructor(private http: HttpClient) { }

	getRepoIssues(sort: string, order: string, page: number): Observable<DataGrid<Fornecedor>> {
		const requestUrl = `${this.href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;
		return this.http.get<DataGrid<Fornecedor>>(requestUrl);
	}

	getFornecedores(): Observable<Fornecedor[]> {
		return this.http.get<Fornecedor[]>(this.href);
	}

	getFornecedor(id: number): Observable<Fornecedor> {
		return this.http.get<Fornecedor>(this.href + '/' + id);
	}

	putFornecedor(fornecedor : Fornecedor){
		return this.http.put<Fornecedor>(this.href + '/' + fornecedor.id,  fornecedor );
	}
}

export interface DataGrid<T> {
	items: T[];
	total_count: number;
}
