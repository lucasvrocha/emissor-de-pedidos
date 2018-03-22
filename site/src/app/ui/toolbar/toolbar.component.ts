import { Component, OnInit, Input, Injectable} from '@angular/core';
import { IconModel, IconBuilder } from '../icon/icon.component'

@Injectable()
export class ToolbarBuilder {
	private too: ToolbarModel;
	private iconBuilder = new IconBuilder();

	constructor() {
		this.too = {
			title: { description: undefined, icon: undefined },
			back: { url: '../', icon: this.iconBuilder.withName("keyboard_backspace").build() },
			forward: { url: './novo', icon: this.iconBuilder.withName("add_box").build() }
		}
	}

	build(): ToolbarModel {
		return Object.assign({},this.too);
	}

	withTitle(title: any) {
		this.too.title.description = title;
		return this;
	}

	goto(forward: any) {
		this.too.forward = forward;
		return this;
	}

	icon(name: string): IconBuilder {
		return this.iconBuilder.withName(name);
	}
}

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.css'],
	providers: [IconBuilder, ToolbarBuilder]
})
export class ToolbarComponent implements OnInit {

	@Input() model: ToolbarModel;

	@Input() iconName: string;
	@Input() iconColor: string;
	@Input() title: string;
	@Input() add: boolean;
	@Input() save: boolean;

	 constructor(private builder : ToolbarBuilder) { }

	ngOnInit() {
		if (!this.model)
			this.model = this.builder.build();

		console.log(this.model);
		if (this.title)
			this.model.title.description = this.title;

		if (this.save) {
			console.warn("save is deprecated");
			this.model.forward.icon = this.builder.icon("save").build();
		}

		if (this.add) {
			console.warn("add is deprecated");
			this.model.forward.icon = this.builder.icon("add_box").build();
		}

		if (this.iconColor)
			console.warn("iconColor is deprecated");

		if (this.iconName) {
			console.warn("iconName is deprecated")
			this.model.title.icon = this.builder.icon(this.iconName).build();
		}
	}
}

export interface ToolbarModel {
	title: { description: string, icon: IconModel };
	back: { url: string, icon: IconModel };
	forward: { url: string, icon: IconModel };
}

