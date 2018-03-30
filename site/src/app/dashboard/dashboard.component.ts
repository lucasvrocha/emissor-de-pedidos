import { Component, OnInit } from '@angular/core';
import { LoadingService, LoadingComponent } from '../ui/loading';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	private loader : LoadingComponent;

	constructor(private loadService : LoadingService) { 
		this.loader = this.loadService.init('main',3);
	}

	ngOnInit() {
		setTimeout(()=>{this.loader.end()},750);
		setTimeout(()=>{this.loader.end()},1500);
		setTimeout(()=>{this.loader.end()},3000);
	}

}
