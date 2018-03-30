import { Injectable } from '@angular/core';
import { LoadingComponent } from './loading.component';

@Injectable()
export class LoadingService {

	private components: LoadingComponent[] = [];
	
	constructor() { }
	
	start() : LoadingComponent {
		return this.init('main', 1);
	}

	add( comp : LoadingComponent){
		this.components.push(comp);
	}

	init(name?: string |'main', process?: number |1) : LoadingComponent {
		let loader = this.components.find(c  => c.name === name);
		if (loader)
			loader.init(process);
		return loader;
	}

	end() {
		this.components.find(c => c.name ==='main').end();
	}

}
