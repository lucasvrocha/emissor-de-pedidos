import { ChangeDetectorRef, ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

import { Fornecedor } from '../../_model/fornecedor.model';
import { FornecedorService } from '../fornecedor.service';
import { LoadService } from '../../ui/load'

@Component({
	moduleId: module.id,
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit, OnDestroy {

	displayedColumns: string[] = ['id', 'cnpj', 'descricao', 'edit'];
	exampleDatabase: FornecedorService | null;
	dataSource = new MatTableDataSource();

	resultsLength = 0;
	isLoadResults = true;
	isRateLimitReached = false;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	mobileQuery: MediaQueryList;

	private _mobileQueryListener: () => void;

	constructor(
		private http: HttpClient,
		private laodService: LoadService,
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher
	) {
		this.mobileQuery = media.matchMedia('(max-width: 599px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnInit() {
		this.laodService.init('main').process((load) => {
			this.exampleDatabase = new FornecedorService(this.http);
			load.progress(70);
			// If the user changes the sort order, reset back to the first page.
			this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
			merge(this.sort.sortChange, this.paginator.page)
				.pipe(
					startWith({}),
					switchMap(() => {
						this.isLoadResults = true;
						return this.exampleDatabase!.getRepoIssues(
							this.sort.active, this.sort.direction, this.paginator.pageIndex);
					}),
					map(data => {
						// Flip flag to show that load has finished.
						this.isLoadResults = false;
						this.isRateLimitReached = false;
						this.resultsLength = data.total_count;
						return data.items;
					}),
					catchError(() => {
						this.isLoadResults = false;
						// Catch if the GitHub API has reached its rate limit. Return empty data.
						this.isRateLimitReached = true;
						return observableOf([]);
					})
				).subscribe(data => {
					this.dataSource.data = data;
					load.end();
				});
		}, "carregando...")
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
}
