function(doc, req) {  
	// !json templates.edit
	// !code vendor/couchapp/path.js
	// !code vendor/couchapp/template.js

	// we only show html
	return template(templates.edit.index, {
		index: listPath('index', 'by-title'),
		asset: assetPath(),
		action: 'create',
		loc_action: 'anlegen',
		doc: '{}' });
}