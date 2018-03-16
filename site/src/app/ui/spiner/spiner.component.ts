import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/observer';

@Injectable()
@Component({
	moduleId: module.id,
	selector: 'app-spiner',
	templateUrl: './spiner.component.html',
	styleUrls: ['./spiner.component.css']
})
export class SpinerComponent implements OnInit {

	closeObserver: Observer<boolean>[] = [];
	finished: boolean = false;
	second: number = -9999;

	visible: boolean = false;
	message: any = undefined;
	defaultMessage: any = undefined;

	constructor() {
	}

	ngOnInit() {
		this.defaultMessage = { title: "Processando, aguarde...", body: undefined }
		this.finished = false;
	}

	ngOnDestroy() {
		if (this.closeObserver) this.closeObserver.forEach(obs => obs.complete())
	}

	closeNotify() {
		this.closeObserver.forEach(o => { o.next(!this.visible) });
	}

	onClose(): Observable<boolean> {
		return new Observable(obs => { this.closeObserver.push(obs); });
	}

	setMessage(message: any) {
		this.message = message;
	}

	show(): SpinerComponent {
		this.message = this.defaultMessage;
		this.visible = true;
		this.closeNotify();
		return this;
	}

	complete(): SpinerComponent {
		this.finished = true;
		return this;
	}

	close(): boolean {
		this.visible = false;
		this.closeNotify();
		return !this.visible;
	}

	closeAfter(time: number) : SpinerComponent{
		setTimeout(() => {
			if (time <= 0)
				return this.close();

			time -= 250;
			this.second = this.formatSecond(time);
			this.closeAfter(time)
		}, 250);
		return this;
	}

	private formatSecond(time: number): number {
		let multiplier = Math.pow(10, 0);
		let sec = Math.round(time / 1000 * multiplier) / multiplier;
		return  sec < 0 ? 0 : sec;
	}
}
