function(head, req) {
	// !json templates.index
	// !code vendor/couchapp/path.js
	// !code vendor/couchapp/date.js
	// !code vendor/couchapp/template.js
	// !code vendor/couchapp/json2.js

	function renderRecipe(recipe) {
		var s = '<p><span><a href="' + showPath('edit', recipe._id)
			+ '">' + recipe.title + '</a></span>\r\n'

		// Build description - ingredients
		var l = []
		for (var i in recipe.ingredients) {
			if (recipe.ingredients[i]) {
				var n = recipe.ingredients[i].name
				if (n) {
					l.push(n)
				}
			}
		}

		var desc = l.join(', ')

		if (recipe.description) {
			desc += ': ' + recipe.description
		}

		if (desc.length) {
			s += '<span id="description">' + desc + '</span>'
		}

		return s + '</p>'
	}
	
	provides("html", function() {
		send(template(templates.index.head, {
			index: listPath('index', 'names'),
			asset: assetPath(),
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
