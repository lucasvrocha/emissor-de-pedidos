import { Injectable } from '@angular/core';

import { IconModel } from './icon.model';

@Injectable()
export class IconBuilder {

	private icon: IconModel;

	constructor() {
		this.icon = { name: undefined, color: 'black', size: 24, opacity: 0.8 };
	}

	withName(name: string) {
		this.icon.name = name;
		return this;
	}
	withColor(color: string) {
		this.icon.color = color;
		return this;
	}
	withSize(size: number) {
		this.icon.size = size;
		return this;
	}
	withOpacity(opacity: number) {
		this.icon.opacity = opacity;
		return this;
	}

	build(): IconModel {
		return Object.assign({}, this.icon);;
	}


}
