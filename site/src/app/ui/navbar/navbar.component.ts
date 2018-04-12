import { Component, OnInit, OnDestroy , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
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

	@ViewChild('snav') snav: any;
	_logged: boolean = false;
	_user: Usuario = null;
	_adm: boolean = false;

	constructor(private authService :AuthenticationService, private router : Router) { }

	ngOnInit() {
		this._user =undefined;
		this._logged = this._user != null;
		this._adm = false;

		this._sub = this.authService.observable().subscribe(user=>{
			this._user = user;
			this._logged = user != null;
			this._adm = user && user.roles.admin ? user.roles.admin : false;
		});
	}

	ngOnDestroy(){
		if (this._sub) this._sub.unsubscribe();
	}	

	navegate(route){
		this.router.navigateByUrl(route);
		event.stopPropagation();
		this.snav.toggle();
	}


}
