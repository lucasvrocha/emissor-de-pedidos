import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { BackendInterceptor } from './interceptor/backend.interceptor';
import { LoggerInterceptor } from './interceptor/logger.interceptor';
import { DelayInterceptor } from './interceptor/delay.interceptor';
import { ProxyInterceptor } from './interceptor/proxy.interceptor';

const ProxyProvider = env.proxy && env.proxy.length>0 ? {
	provide: HTTP_INTERCEPTORS,
	useClass: ProxyInterceptor,
	multi: true
} : undefined;
	
const LoggerProvider = env.logger && env.logger.init ? {
	provide: HTTP_INTERCEPTORS,
	useClass: LoggerInterceptor,
	multi: true
} : undefined;

const DelayProvider = env.delay && env.delay > 0 ? {
	provide: HTTP_INTERCEPTORS,
	useClass: DelayInterceptor,
	multi: true
} : undefined;

const ResponseProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: BackendInterceptor,
	multi: true
}

export function factory() {
	if (!env.mock)
		return [];

	let p = [];
	if (ProxyProvider) p.push(ProxyProvider);
	if (LoggerProvider) p.push(LoggerProvider);
	if (DelayProvider) p.push(DelayProvider);
	if (ResponseProvider) p.push(ResponseProvider);
	
	return p;
};

export let BackendProvider = [].concat(factory())


