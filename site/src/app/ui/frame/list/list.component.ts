import { Component, OnInit, Input } from '@angular/core';
import { ListModel } from '../_model/list.model';

@Component({
	moduleId: module.id,
	selector: 'ui-frame-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	@Input() model : ListModel;

	constructor() { }

	ngOnInit() {
	}

	setModel( model : ListModel) {
		this.model = model;
	}
}
