import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../auth/auth.guard';
@Component({
	moduleId: module.id,
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	constructor( public guard : AuthGuard){}

	ngOnInit() {
	}


}
