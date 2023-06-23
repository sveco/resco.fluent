requirejs.config({
	baseUrl: 'js',
	paths: {
		jsbridge:	'../lib/JSBridge',
		polyfill:	'../lib/polyfill.min'
	}
});
requirejs(['init'], function (app: any) {
    app.initialize()
})