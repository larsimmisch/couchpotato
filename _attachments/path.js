//path functions for use in browser-side javascript
function assetPath() {
	return document.location.pathname.split('/').slice(0, 3)
}

function showPath() {
	return assetPath().push('_show')
}

function listPath() {
	return assetPath().push('_list')
}
