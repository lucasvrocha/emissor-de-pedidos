import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Fornecedor } from '../_model/fornecedor.model';
import { environment  as env} from '../../environments/environment';

@Injectable()
export class FornecedorService {

	constructor(private http: HttpClient) { }

	getRepoIssues(sort: string, order: string, page: number): Observable<DataGrid<Fornecedor>> {
		const href = env.api + '/fornecedor';
		const requestUrl = `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;
		return this.http.get<DataGrid<Fornecedor>>(requestUrl);
	}

}

export interface DataGrid<T> {
	items: T[];
	total_count: number;
}
