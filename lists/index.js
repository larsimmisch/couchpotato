function(head, req) {
	// !json templates.index
	// !code vendor/couchapp/path.js
	// !code vendor/couchapp/date.js
	// !code vendor/couchapp/template.js
	// !code vendor/couchapp/json2.js

	function values(obj, keys) {
		var a = [];
		for (var i in keys) {
			var o = obj[keys[i]];
			if (o) {
				a.push(o)
			}
		}
		return a
	}

	function join(obj, key, sep, prefix) {
		var v = values(obj, key).join(sep)
		if (v.length && prefix) {
			return prefix + v
		}
		return v
	}

	function renderRecipe(recipe) {
		var s = '<p><a href="' + showPath('edit', recipe._id)
			+ '">' + recipe.title + '</a></p>\r\n' 

		return s
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
