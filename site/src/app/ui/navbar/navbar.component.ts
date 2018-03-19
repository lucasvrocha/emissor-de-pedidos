import { ChangeDetectorRef, Component, OnChanges, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthGuard } from '../../auth/auth.guard';

import { Usuario } from '../../_model/usuario.model';
import { Observable } from 'rxjs/Observable';

@Component({
	moduleId: module.id,
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges, OnDestroy {

	mobileQuery: MediaQueryList;

	private storage = localStorage;

	private _mobileQueryListener: () => void;

	constructor(
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		public guard: AuthGuard
	) {
		this.mobileQuery = media.matchMedia('(max-width: 599px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);

	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}

	ngOnChanges(changes) {
	}


}
