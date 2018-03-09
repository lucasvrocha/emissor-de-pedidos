import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Produto } from '../_model/produto.model';
import { environment  as env} from '../../environments/environment';

@Injectable()
export class ProdutoService {

	constructor(private http: HttpClient) { }

	getRepoIssues(sort: string, order: string, page: number): Observable<DataGrid<Produto>> {
		const href = env.api + '/produto';
		const requestUrl = `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;
		return this.http.get<DataGrid<Produto>>(requestUrl);
	}

}

export interface DataGrid<T> {
	items: T[];
	total_count: number;
}
