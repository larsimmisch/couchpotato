function(doc, req) {  
	// !json templates.search
	// !code vendor/couchapp/path.js
	// !code vendor/couchapp/template.js

	// we only show html
	return template(templates.search.index, {
		index: listPath('index', 'by-title'),
		asset: assetPath(),
		title: 'Couchpotato'
	})
}