import { Directive, Input, HostListener } from '@angular/core';

@Directive({
	selector: '[ui-stop-event]'
})
export class StopEventDirective {

	constructor() { }

	@HostListener('click', ["$event"])
	public onClick(event: any): void {
		event.stopPropagation();
	}
}
