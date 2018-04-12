export const environment = {
	production: true,
	proxy: [
		// { pattern: '/api\\/', api: 'http://localhost:8089/api/' }
	],
	mock: true,
	api: 'http://localhost:8089/api/',
	delay: 250,
	logger: {
		init: true,
		pattern: '/api\\/'
	}
};
