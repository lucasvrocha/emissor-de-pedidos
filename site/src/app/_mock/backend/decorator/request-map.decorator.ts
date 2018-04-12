export function RequestMap(map: string, method: string, debug: boolean = false): MethodDecorator {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value
		descriptor.value = function(...args: any[]) {
			let request = args[0];
			let v1 = new RegExp(map).test(request.url);
			let v2 = method.toLowerCase() === request.method.toLowerCase();
			if (debug) {
				console.group('RequestMap', 'map = '+ v1, 'method = ' +  v2);
				console.log('map', map);
				console.log('request.url', request.url);
				console.log('method', method);
				console.log('request.method', request.method);
				console.groupEnd()
			 
			  }
			if (v1 && v2)
				return originalMethod.call(target, ...args);
		}
		return descriptor;
	};

}
