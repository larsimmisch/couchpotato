function(head, req) {
	// !json templates.index
	// !code vendor/couchapp/path.js
	// !code vendor/couchapp/date.js
	// !code vendor/couchapp/template.js
	// !code vendor/couchapp/json2.js
	// !code _attachments/recipe.js
	
	provides("html", function() {
		send(template(templates.index.head, {
			index: listPath('index', 'by-title'),
			asset: assetPath(),
			search: req.query.key
		}))
		
		// loop over view rows, rendering one at a time
		var row
		while (row = getRow()) {
			send(renderRecipe(row.value))
		}
	
		// render the html tail template
		return templates.index.tail
	})
}
