import { Injectable } from '@angular/core';
import { LoadingComponent } from './loading.component';

@Injectable()
export class LoadingService {

	components: LoadingComponent[] = [];

	constructor() { }

	start(): LoadingComponent {
		return this.init('main', 1);
	}

	add(comp: LoadingComponent) {
		if (!this.components.find(i => i.name === comp.name))
			this.components.push(comp);
	}

	remove(comp: LoadingComponent) {
		let i = this.components.findIndex(i => i.name === comp.name);
		if (i >= 0)
			this.components.splice(i, 1);
	}

	init(name?: string | 'main', process?: number | 1): LoadingComponent {
		let loader = this.components.find(c => c.name === name);
		if (loader)
			return loader.init(process);
		return null;
	}

	end() {
		this.components.find(c => c.name === 'main').end();
	}

}
