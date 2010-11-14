function(doc, req) {  
	// !json templates.import
	// !code vendor/couchapp/path.js
	// !code vendor/couchapp/template.js

	// we only show html
	return template(templates.import.index, {
		index: listPath('index', 'by-title'),
		asset: assetPath() });
}