import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { LoadComponent } from './load.component';

@Injectable()
export class LoadService {

	private issues: LoadProcess[] = []

	constructor() { }

	init(name: string): LoadProcess {
		let issue = this.issues.find(x => x.name() === name);
		if (issue == null) {
			issue = new LoadProcess(name);
			this.issues.push(issue);
		}
		return issue;
	}

	get(name: string) {
		return this.issues.find(x => x.name() === name);
	}

	remove(name: string): void {
		let i = this.issues.findIndex(x => x.name() === name);
		if (i >= 0)
			this.issues.splice(i, 1);
	}
}

export class LoadProcess {
	private _name: string;
	private _message: string;
	private _process: boolean[] = [];
	private _progress: number;

	private _sub = new Subject<LoadProcess>();

	constructor(name: string) {
		this._name = name;
		this._message = 'carregando...';
		this._progress = 0;
	}

	public name() {
		return this._name;
	}

	public message(message?: string): string {
		if (message != null) {
			this._message = message;
			this._sub.next(this);
		}
		return this._message;
	}

	public process(process: Function, message?: string) {
		if (message != null)
			this.message(message);

		this.add();
		process(this);
	}

	private add() {
		this._process.push(true);
		this.calcProgress();
	}

	private interval: any;

	public progress(qtd?: number) {
		if (qtd != null) {
			clearInterval(this.interval);
			if (qtd < this._progress)
				this._progress = 0;

			let dif =  (qtd - this._progress) / 14;
			this.interval = setInterval(() => {
				if (dif <= 0 || this._progress > 99) {
					clearInterval(this.interval);
					return;
				}

				if ( this._progress >= qtd) {
					dif = (100 - this._progress) / 50;
				}
				this._progress += dif;
				this._sub.next(this);

			},120);
		}
		return this._progress;
	}

	public isWorking() {
		return this._process.length > 0;
	}

	public end() {
		clearInterval(this.interval);

		let p = this._process.findIndex(x => x);
		if (p >= 0)
			this._process[p] = false;

		this.calcProgress();

		if (this._process.findIndex(x => x) < 0) {
			this.kill();
		}
	}

	public modo() {
		return this._progress > 0 ? 'determinate' : 'indeterminate';
	}

	public sub(): Observable<LoadProcess> {
		return this._sub.asObservable();
	}

	public kill() {
		this._process = []
		this.calcProgress();
	}


	private calcProgress() {
		let progress = 0;
		for (let i = 0; i < this._process.length; i++) {
			if (!this._process[i]) {
				let div = this._process.length > 0 ? this._process.length : 1;
				progress += 100 / div;
			};
		}
		this._progress = progress;;
		this._sub.next(this);
	}
}
