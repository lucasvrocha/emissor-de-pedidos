import { Directive, HostListener, OnInit, ViewChild } from '@angular/core';
import * as screenfull from 'screenfull';

@Directive({
	selector: '[fullscreen]',
	exportAs: 'fullscreen'
})
export class FullscreenDirective implements OnInit {


	private storage = localStorage;

	constructor() { }

	ngOnInit() {
		screenfull.onchange(() => {
			this.storage.setItem('options', `{"fullscreen" : ${screenfull.isFullscreen} }`);
		});

	}

	@HostListener('click') onClick() {
		if (screenfull.enabled) {
			if (this.isFullscreen())
				screenfull.exit();
			else
				screenfull.request();
		}
	}

	@HostListener('window:keyup', ['$event'])
	keyEvent(event: KeyboardEvent) {
		if (event.keyCode === KEY_CODE.F11) {
			if (screenfull.enabled) {
				screenfull.toggle();
			}
		}
	}

	isFullscreen(): boolean {
		return screenfull.isFullscreen;
	}

}

export enum KEY_CODE {
	F11 = 122
}
