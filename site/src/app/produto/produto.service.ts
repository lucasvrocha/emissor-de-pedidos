import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Produto } from '../_model/produto.model';
import { environment  as env} from '../../environments/environment';

@Injectable()
export class ProdutoService {
	private href = env.api + '/produto';

	constructor(private http: HttpClient) { }

	getProdutos() : Observable<Produto[]> {
		return this.http.get<Produto[]>(this.href);
	}

	getRepoIssues(sort: string, order: string, page: number): Observable<DataGrid<Produto>> {
		const requestUrl = `${this.href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;
		return this.http.get<DataGrid<Produto>>(requestUrl);
	}

}

export interface DataGrid<T> {
	items: T[];
	total_count: number;
}
