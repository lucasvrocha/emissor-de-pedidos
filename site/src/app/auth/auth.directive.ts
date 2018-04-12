import { Directive, Input, OnInit, OnChanges, AfterViewInit, OnDestroy, ElementRef, Renderer } from '@angular/core';

import { AuthenticationService } from './auth.service';
import { Usuario } from '../usuario';

@Directive({
	selector: '[permission]',
	exportAs: 'auth'
})
export class AuthDirective implements OnInit, AfterViewInit, OnDestroy {

	@Input("permission-expected") permission: string[];

	private _autorized: boolean;
	private _sub: any;

	constructor(
		private authService: AuthenticationService,
		private el: ElementRef,
		public renderer: Renderer
	) { }

	ngOnInit() {
		this._sub = this.authService.observable().subscribe(user => {
			this.updateAuthorized(user);
		});
		
		this.updateAuthorized(this.authService.user);
	}

	private updateAuthorized(user : Usuario){
		this._autorized = user != null && !!this.permission.find(x => user.roles[x]);
	}

	ngOnDestroy() {
		if (this._sub) this._sub.unsubscribe();
	}

	ngAfterViewInit() {
		this.renderer.setElementProperty(this.el.nativeElement, 'disabled', this._autorized);
	}

	disabled(permission?: string[]) {
		return this._autorized;
	}

	hasPermission() {
		return this._autorized;
	}

}
