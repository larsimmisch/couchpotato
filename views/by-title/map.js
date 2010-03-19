function(doc) {
	function emit_split(name, doc) {
		var na = name.toLowerCase().split(' ')
		for (i in na) {
			emit(na[i], doc)
		}
	}

	if (doc.name) {
		if (doc.name.given) {
			emit_split(doc.name.given, doc)
		}
		if (doc.name.additional) {
			emit_split(doc.name.additional, doc)
		}
		if (doc.name.family) {
			emit_split(doc.name.family, doc);
		}
	}
}