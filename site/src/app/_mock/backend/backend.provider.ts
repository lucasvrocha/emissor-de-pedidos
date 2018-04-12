import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req);
	}
}

// -------------------------

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { BackendInterceptor } from './interceptor/backend.interceptor';
import { LoggerInterceptor } from './interceptor/logger.interceptor';
import { DelayInterceptor } from './interceptor/delay.interceptor';
import { ProxyInterceptor } from './interceptor/proxy.interceptor';

export const NoopeProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: NoopInterceptor,	
	multi: true
}

export const ProxyProvider = env.proxy && env.proxy.length > 0 ? {
	provide: HTTP_INTERCEPTORS,
	useClass: ProxyInterceptor,
	multi: true
} : NoopeProvider;

export const LoggerProvider = env.logger && env.logger.init ? {
	provide: HTTP_INTERCEPTORS,
	useClass: LoggerInterceptor,
	multi: true
} : NoopeProvider;

export const DelayProvider = env.delay && env.delay > 0 ? {
	provide: HTTP_INTERCEPTORS,
	useClass: DelayInterceptor,
	multi: true
} : NoopeProvider;

export const ResponseProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: BackendInterceptor,
	multi: true
}

export let BackendProvider = [
	ProxyProvider, 
	LoggerProvider,
	DelayProvider,
	ResponseProvider
]
