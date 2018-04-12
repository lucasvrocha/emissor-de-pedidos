import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../auth/auth.service';
import { LoadService } from '../ui/load';
import { Usuario } from '../_model/usuario.model';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router, private auth: AuthenticationService, private loadService: LoadService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.auth.user != null) return true;
		if (this.auth.jwt == null) {
			this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
			return false;
		}

		this.loadService.init('main').process((load) => {
			this.auth.verifyJwt().subscribe(user => {
				if (user == null) {
					this.auth.logout();
				}
				else
					this.router.navigate([state.url]);
				load.end();
			})
		});
		return false;
	}

}
