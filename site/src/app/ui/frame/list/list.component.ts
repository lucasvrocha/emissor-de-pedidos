import { Component, OnInit, Input } from '@angular/core';
import { ListModel } from '../_model/list.model';
import { ToolbarBuilder, ToolbarModel } from '../../toolbar'


@Component({
	moduleId: module.id,
	selector: 'ui-frame-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css'],
	providers: [ToolbarBuilder]
})
export class ListComponent implements OnInit {

	@Input() model: ListModel;

	constructor(private tb: ToolbarBuilder) {
	}

	ngOnInit() {
		console.log("this.model", this.model);
		if (this.model===undefined)
			this.model = {
				title : undefined, 
				toolbar : this.tb.build()
			} ;
	}

	setModel(model: ListModel) {
		this.model = model;
	}
}
