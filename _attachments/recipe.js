function isearch_key(e) {
	code = e.keyCode ? e.keyCode : e.which;
	if (code == 13) {
		// Reload the page from the database
		var p = document.location.pathname.split('/')
		var key = $(this).val()
		if (key.length) {
			p.splice(4, 3, '_show', 'search')
			document.location.href = document.location.protocol 
				+ '//' + document.location.host + p.join('/') 
				+ '?q=' + key
		}
		else {
			p.splice(4, 3, '_list', 'index', 'by-title')
			document.location.href = document.location.protocol 
				+ '//' + document.location.host + p.join('/')
		}
	}
}

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

	var desc = l.join(', ') + '.'

	//if (recipe.description) {
	//	desc += ': ' + recipe.description
	//}
	
	if (desc.length) {
		s += '<span id="ldescription">' + desc + '</span>'
	}
	
	return s + '</p>'
}
