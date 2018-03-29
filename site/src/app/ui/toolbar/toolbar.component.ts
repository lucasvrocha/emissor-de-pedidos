import { Component, Directive, OnInit, Input, Injectable, ContentChild, TemplateRef  } from '@angular/core';
import { IconModel, IconBuilder } from '../icon'
import { ToolbarBuilder } from './toolbar.builder';
import { ToolbarModel } from './toolbar.model';

export class DirectiveOptions {};
@Component({
	moduleId: module.id,
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

	constructor(private builder: ToolbarBuilder) {
	}

	ngOnInit() {

		if (this.model === undefined)
			this.model = this.builder.build();
		
		if (this.title) {
			console.warn("save is deprecated");
			this.model.title.description = this.title;
		}

		if (this.save) {
			console.warn("save is deprecated");
			this.model.forward = { url: '.', icon: this.builder.icon("save").build() };
		}

		if (this.add) {
			console.warn("add is deprecated");
			this.model.forward = {url : './novo' , icon : this.builder.icon("add_box").build()};
		}

		if (this.iconColor)
			console.warn("iconColor is deprecated");

		if (this.iconName) {
			console.warn("iconName is deprecated")
			this.model.title.icon = this.builder.icon(this.iconName).build();
		}

		
	}
}
