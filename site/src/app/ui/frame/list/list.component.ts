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

	toolbar : ToolbarModel;

	constructor(private tb: ToolbarBuilder) {
	}

	ngOnInit() {
		if (this.model!==undefined)
			this.toolbar = this.model.toolbar;
	}

	
}
