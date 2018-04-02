import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { LoadingService } from './loading.service'


@Component({
	selector: 'app-loading',
	exportAs: 'load',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.css']

})
export class LoadingComponent implements OnInit {

	@Input() name: string | 'main';

	modo: string | 'indeterminate';
	progress: number;

	loading: boolean = false;

	private process: boolean[] = new Array(0);

	constructor(public service: LoadingService, private router: Router) {
		router.events.subscribe((val) => {this.init(1)})
	}

	ngOnInit() {
		this.service.add(this);
	}

	init(qtdProcess: number) {
		qtdProcess = (qtdProcess === undefined ? 1 : qtdProcess);

		this.modo = qtdProcess > 1 ? 'determinate' : 'indeterminate';
		this.loading = true;
		this.progress = 0;

		this.process = new Array(0);
		while (qtdProcess > 0) {
			qtdProcess--;
			this.process.push(true);
		}
	}

	end() {
		let soma = 0;
		for (let i = 0; i < this.process.length; i++) {
			if (this.process[i]) {
				this.process[i] = false;
				this.progress += 100 / this.process.length;
				break;
			};
		}
		setTimeout(() => { this.loading = this.progress < 100; }, 500);
	}
}
