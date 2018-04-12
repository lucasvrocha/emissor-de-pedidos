import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthGuard, AuthenticationService } from '../../../auth';

import { Usuario } from '../../../_model/usuario.model';

@Component({
	selector: 'ui-navbar-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

	_user: Usuario;
	_isAdmin : boolean = false;
	
	private _sub: any;
	
	constructor(public authService: AuthenticationService) { }

	ngOnInit() {
		this._user = this.authService.user;
		this._isAdmin = this.authService.hasPermition(['admin']);
		
		this._sub = this.authService.observable().subscribe(user => {
			this._user = user;
			this._isAdmin = this.authService.hasPermition(['admin']);
		});
	}

	ngOnDestroy() {
		if (this._sub) this._sub.unsubscribe();
	}
}
