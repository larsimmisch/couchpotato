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
		var s = '<p>' + recipe.title + '</p>'

		return s + '\n<ul class="toolbar">'
			+ '<li><a href="' + showPath('edit', card._id)
			+ '"><button class="edit">&rarr edit</button></a></li>'
			+ '<li><button class="delete" onclick="_delete('
			+ "'" + card._id + "', '" + card._rev + "', '" + name + "'"
			+')">delete' + '</button></li>'
			+ '</ul><hr>\n';
	}
	
	provides("html", function() {
		send(template(templates.index.head, {
			index: listPath('index', 'names'),
			asset: assetPath(),
		}));
		
		// loop over view rows, rendering one at a time
		var row, key;
		while (row = getRow()) {
			var card = row.value;
			key = row.key;
			send(renderRecipe(card));
		}
	
		// render the html tail template
		return templates.index.tail;
	});
};
