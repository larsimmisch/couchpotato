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

function mm_parse(str) {

	function parse_recipe(lines) {		

		function isNumber(str) {
			// understands floating point numbers and 
			// fractions ("1/3" or "1 1/2")
			var n = new Number(str)
			if (n != NaN) {
				return true
			}
			
			var fp = str.split(/\s+/)
			if (fp.length > 2) {
				return false
			}
	
			if (!/[0-9]+/.test(fp[0])) {
				return false
			}

			if (fp.length > 1 && !(/[0-9]+\/[0-9]+/.test(fp[1]))) {
				return false
			}
			
			return true
		}

		function parse_ingredients(lines) {
		}

		function parse_description(lines) {
		}

		var state = 'header'
		var recipe = {}

		// Delete initial empty lines
		for (var i in lines) {
			if (/\S/.test(lines[i]))
				continue

			var line = lines[i]

			switch(state) {
			case 'header':
				var tm = /\s*Title:\s+(.+)/.exec(line)
				if (tm)
					recipe.title = tm[1]

				var cm = /\s*Categories:\s+(\S*)/.exec(line)
				if (cm) 
					recipe.tags = each(cm[1].split(','), lstrip);
				
				var ym = /\s*Yield:\s+([0-9.]+)\s+(\S*)/.exec(line)
				if (!ym)
					ym = /\s*Servings:\s+([0-9.]+)/.exec(line)

				if (ym) {
					if (ym[2] == 'Servings') {
						recipe.yield = {'quantity': parseInt(ym[1]), 
										'unit': 'person'}
					}
					else {
						recipe.yield = {'quantity': parseFloat(ym[1]), 
										'unit': ym[2]}
					}
				}
				if (parseIngredient(recipe, line))
					state = 'ingredients'
				
				break
			case 'ingredients':
				if (!parseIngredient(recipe, line))
					state = 'description'
				
			case 'description':
				recipe.description += line + '\n'
			}
		}

		return recipe
	}

	var recipes = []
	var start = /^(MMMMM|-----).+Meal-Master/
	var end =  /^(MMMMM|-----)/
	var active = false
	var recipe = []
	var lines = str.split('\n')

	// Split into single recipes
	for (var i = 0; i < lines.length; i++) {
		if (active) {
			if (end.test(lines[i])) {
				recipes.push(parse_recipe(recipe))
				recipe = []
				active = false
			}
			else if (start.test(lines[i])) {
				recipes.push(parse_recipe(recipe))
				recipe = []
			}
			else {
				recipe.push(lines[i])
			}
		}
		else if (start.test(lines[i])) {
			active = true
		}
	}

	// Parse unterminated fragment
	if (recipe.length) {
		recipes.push(parse_recipe(recipe))
	}

	return recipes
}