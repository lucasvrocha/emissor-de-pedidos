import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../ui/loading';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private loadService : LoadingService) { 
		this.loadService.init(3);
	}

	ngOnInit() {
		setTimeout(()=>{this.loadService.end()},750);
		setTimeout(()=>{this.loadService.end()},1500);
		setTimeout(()=>{this.loadService.end()},3000);
	}

}
