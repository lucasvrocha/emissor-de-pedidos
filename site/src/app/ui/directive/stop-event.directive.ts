import { Directive, Input, HostListener } from '@angular/core';

@Directive({
	selector: '[ui-stop-event]'
})
export class StopEventDirective {

	@Input() event: string = 'click';

	constructor() { 
				console.log('stop-event');
	}

	@HostListener('click', ["$event"])
	public onClick(event: any): void {
		event.stopPropagation();
	}
}
