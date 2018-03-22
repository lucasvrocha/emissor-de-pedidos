import { Injectable } from '@angular/core';
import { ToolbarModel, ToolbarTitleModel } from './toolbar.model';
import { IconBuilder, IconModel } from '../icon';

@Injectable()
export class ToolbarBuilder {
	private too: ToolbarModel;
	private iconBuilder = new IconBuilder();

	constructor() {
		this.too = {
			title: {description : undefined , icon : undefined},
			back: { url: '../', icon: this.iconBuilder.withName("keyboard_backspace").build() },
			forward: undefined
		}
	}

	build(): ToolbarModel {
		return Object.assign({}, this.too);
	}

	withTitle(title: any) {
		if(!('description' in title)){
			this.too.title.description = title;
			return this;
		}

		if ('description' in title) {
			this.too.title = title;
		}
		if ('icon' in title && title.icon instanceof IconBuilder){
			title.icon = title.icon.build();
		}
		return this;
	}

	forward(forward: any) {
		this.too.forward = forward;
		return this;
	}

	icon(name: string): IconBuilder {
		return this.iconBuilder.withName(name);
	}
}


