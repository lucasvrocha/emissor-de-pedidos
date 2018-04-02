import { Directive, Input, OnInit, OnChanges, AfterViewInit, ElementRef, Renderer } from '@angular/core';

import { AuthenticationService } from './auth.service';

@Directive({
	selector: '[permission]'
})
export class AuthDirective implements OnInit, AfterViewInit {

	@Input() permission: string[];

	constructor(
		private authService: AuthenticationService,
		private el: ElementRef,
		public renderer: Renderer
	) { }

	ngAfterViewInit() {
		let disabled =  this.disabled();
		this.renderer.setElementProperty(this.el.nativeElement, 'disabled', disabled);
	}

	ngOnInit() {
	}

	disabled(permission?: string[]) {
		return !(this.authService.isAutorzed() && this.authService.hasPermition(permission === undefined ? this.permission : permission));
	}
}
