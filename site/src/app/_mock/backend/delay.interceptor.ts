import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { environment as env } from '../../../environments/environment';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {

	private readonly delayMax: number = 0;
	private readonly delayMin: number = 2500;

	constructor() {
		console.log("Fake-DelayInterceptor is runing");
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (env.mock === false || request.url.startsWith('assets/'))
			return next.handle(request);

		let delay = Math.floor(Math.random() * Math.floor(this.delayMax)) + this.delayMin;
		return next.handle(request).delay(delay);
	}
	
}