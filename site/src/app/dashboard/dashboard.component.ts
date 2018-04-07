import { Component, OnInit } from '@angular/core';
import { LoadService, LoadComponent } from '../ui/load';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private loadService : LoadService) { 
	}

	ngOnInit() {
		this.loadService.init('main').process((load) => {
			load.progress(100);
			setTimeout(() => {
				load.end();
			},1500);
			
		},'carregando o dashboard');
	}

}
