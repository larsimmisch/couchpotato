function lstrip(s) {
	var m = /\s*(\S*)/.exec(s)
	if (m) {
		return m[1]
	}
}

function each(a, fn) {
	var r = []
	for (var i in a) {
		r.push(fn(a[i])) 
	}
	return r
}

function mm_parse(lines) {

	function parse_recipe(lines) {		
		var recipe = {}

		if (lines.length < 4)
			return null

		var tm = /\s*Title:\s+(\S+)/.exec(lines[0])
		if (!tm)
			throw 'Missing/invalid title'
		recipe.title = tm[1]

		var cm = /\s*Categories:\s+(\S*)/.exec(lines[1])
		if (!cm)
			throw 'Missing/invalid categories'
		recipe.tags = each(cm[1].split(','), lstrip) 
		
		var ym = /\s*Yield:\s+([0-9.]+)\s+(\S*)/.exec(lines[2])
		if (!ym) {
			ym = /\s*Servings:\s+([0-9.]+)/.exec(lines[2])
			if (!ym) {
			}
		}
		else {
			if (ym[2] == 'Servings') {
				recipe.yield = {'quantity': parseInt(ym[1]), 'unit': 'person'}
			}
			else {
				recipe.yield = {'quantity': parseFloat(ym[1]), 'unit': ym[2]}
			}
	}

	var recipes = []
	var start = /^(MMMMM|-----).+Meal-Master/
	var end =  /^(MMMMM|-----)/
	var active = false
	var recipe = []

	// Split into single recipes
	for (var i = 0; i < lines.length; i++) {
		if (active) {
			if (end.search(lines[i]) >= 0) {
				recipes.push(parse_recipe(recipe))
				recipe = []
				active = false
			}
			else if (start.search(lines[i]) >= 0) {
				recipes.push(parse_recipe(recipe))
				recipe = []
			}
			else {
				recipe.push(lines[i])
			}
		}
		else if (start.search(lines[i])) {
			active = true
		}
	}
	// Parse unterminated fragment
	if (fragment.length) {
		recipes.push(parse_recipe(recipe))
	}
}