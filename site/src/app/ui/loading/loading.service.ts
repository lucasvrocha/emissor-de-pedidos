import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {

	private loading: boolean = false;

	private process: boolean[] = new Array(0);
	private progress: number;
	constructor() { }

	isLoading(): boolean {
		return this.loading;
	}

	start() {
		this.init(1);
	}

	init(process: number) {
		this.process = new Array(0);
		while (process > 0) {
			process--;
			this.process.push(true);
		}
		this.loading = true;
		this.progress = 0;
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
		setTimeout(() => { this.loading = this.progress < 100; }, 750);
	}

	modo() {
		return this.process.length > 1 ? 'determinate' : 'indeterminate';
	}

	value() {
		return this.progress;
	}

}
