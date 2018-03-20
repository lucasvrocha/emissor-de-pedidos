import { ChangeDetectorRef, Directive, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Directive({
	selector: '[media-query]',
	exportAs : 'media'
})
export class MediaQueryDirective implements OnDestroy {

	private mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	constructor(
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher
		) {
		this.mobileQuery = media.matchMedia('(max-width: 599px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}

	isMobile() : boolean {
		return this.mobileQuery.matches;
	}
}
