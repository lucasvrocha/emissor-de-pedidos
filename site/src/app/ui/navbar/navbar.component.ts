import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../auth';
import { Subject } from 'rxjs/Subject';

import { Usuario } from '../../usuario';
@Component({
	moduleId: module.id,
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

	private _sub: any;

	_logged: boolean = false;
	_user: Usuario = null;

	constructor(private authService :AuthenticationService) { }

	ngOnInit() {
		this._user =undefined;
		this._logged = this._user != null;

		this._sub = this.authService.observable().subscribe(user=>{
			this._user = user;
			this._logged = user != null;
			
		});
	}

	ngOnDestroy(){
		if (this._sub) this._sub.unsubscribe();
	}	


}
