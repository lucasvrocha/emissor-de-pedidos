import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

	@Input() backLink: string;
	@Input() iconName: string;
	@Input() iconColor: string = 'black';
	@Input() iconSize: number = 24;
	@Input() iconLabel: string = '';
	@Input() add: boolean = false;
	@Input() save: boolean = false;
	@Input() title: string;

	constructor() { }

	ngOnInit() {
	}

}
