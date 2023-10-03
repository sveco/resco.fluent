// @ts-check
///This is "plumbing" to enable require.js to dynamically load modules specified in handler query string.
///Do not change, unless you want to extend this functionality.
///register offline html iframe in following way: file://index.html?handler=account.form for a file named account.form.js placed in js folder.
function getParameterByName(name: string, url: string | undefined): string {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return '';
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function initialize() {
	var moduleName = getParameterByName('handler', undefined);
	var baseName = moduleName.replace('.','');
	requirejs([moduleName], function(module:any) {
		document.title = moduleName;
		if(module[baseName]
			&& module[baseName].prototype
			&& module[baseName].prototype.initialize) {
				module[baseName].prototype.initialize();
			};
	});
	return {
		initialize: initialize
	};
}
