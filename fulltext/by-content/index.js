function(doc) { 
	if (doc.type == 'recipe') {
		var ret = new Document()
		ret.add(doc.title)
		ret.add(doc.description)

		for (var i in doc.ingredients) {
			if (doc.ingredients[i]) {
				ret.add(doc.ingredients[i])
			}
		}
		if (doc.tags)
			ret.add(doc.tags)

		return ret
	}

	return null
}