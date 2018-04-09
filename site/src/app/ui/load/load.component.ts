import { Component, OnInit, OnDestroy, Input, Output, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { LoadService, LoadProcess } from './load.service'


@Component({
	selector: 'app-load',
	templateUrl: './load.component.html',
	styleUrls: ['./load.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadComponent implements OnInit, OnDestroy {

	@Input() name: string;
	@Input() message: string;

	@Input('loaded') loaded: boolean = false;

	private sub: any;
	process: LoadProcess;

	constructor(
		public service: LoadService,
		private ref: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.process = this.service.init(this.name);
		this.sub = this.process.sub().subscribe(load => {
			this.process = load;
			this.ref.detectChanges();
		});

	}

	ngOnDestroy() {
		if (this.sub) this.sub.unsubscribe();
		this.service.remove(this.name);
	}
}
