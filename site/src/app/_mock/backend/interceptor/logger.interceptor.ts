import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import { environment as env } from '../../../../environments/environment';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {

	private pattern;

	constructor() {
		console.log("[backend] LoggerInterceptor is runing");
		this.pattern = env ? env.logger ? env.logger.pattern : undefined : undefined;

	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let t0 = performance.now();
		return next.handle(request).do((response:any) => {
			if (response.type!=4 )
				return;

			if (!this.pattern || (this.pattern && new RegExp(this.pattern).test(request.url))){
				let t1 = performance.now();
				console.groupCollapsed('[backend]', request.method, request.url, response.status, '- ' + Math.round(t1 - t0) + ' ms');
				console.log("Request", request);
				console.log("--body", JSON.stringify(request.body, null, 4));
				console.log("Response", response);
				console.log("--body", JSON.stringify(response.body, null, 4));
				console.groupEnd();
			}

		});

	}

}
