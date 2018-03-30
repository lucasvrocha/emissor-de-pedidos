import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service'

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.css'],
	providers: [LoadingService]

})
export class LoadingComponent implements OnInit {


	constructor(public service : LoadingService) { }

	ngOnInit() {
	}

	value() {
		return this.service.value();
	}

	modo() {
		return this.service.modo();
	}

	loaded(){
		return !this.service.isLoading();
	}

}
