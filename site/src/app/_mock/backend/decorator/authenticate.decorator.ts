import { HttpRequest, HttpResponse } from '@angular/common/http';

export function Authenticate(): MethodDecorator {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;
		descriptor.value = function(...args: any[]) {
			let request = args[0];
			let v1 = request.headers.get('Authorization') === 'Bearer fake-jwt-token'
			if (v1)
				return originalMethod.call(target, ...args);

			return new HttpResponse({ status: 401, body: null });
		}
		return descriptor;
	}
}
