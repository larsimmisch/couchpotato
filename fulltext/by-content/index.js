function(doc) { 
	var ret = null
	if (doc.type == 'recipe') {
		ret = new Document()
		ret.add(doc.title)
		ret.add(doc.description)

		for (var i in doc.ingredients) {
			if (doc.ingredients[i]) {
				ret.add(doc.ingredients[i])
			}
		}
	}

	return ret 
}