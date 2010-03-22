function(doc) {
	function emit_split(name, doc) {
		var na = name.toLowerCase().split(' ')
		for (i in na) {
			emit(na[i], doc)
		}
	}

	if (doc.title) {
		emit_split(doc.title, doc)
	}
}