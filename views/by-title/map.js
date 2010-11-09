function(doc) {
	function emit_split(name, doc) {
		var na = name.toLowerCase().split(' ')
		for (var i in na) {
			emit(na[i], doc)
		}
	}

	if (doc.title) {
		emit(doc.title.toLowerCase(), doc)
	}
}