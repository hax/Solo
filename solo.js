new function () {

	const SOLO = 'Solo player'
	
	console.debug('Current playing av', localStorage[SOLO])
	
	const pageId = Math.random().toString(36).slice(2, 8)
	console.debug('generate page id:', pageId)

	window.addEventListener('play', function (evt) {
		var av = evt.target
		if (av.id && av.hasAttribute('solo')) {
			localStorage[SOLO] = pageId + ':' + av.id
		}
	}, true)
	
	window.addEventListener('pause', function (evt) {
		var av = evt.target
		if (localStorage[SOLO] == av.id) {
			localStorage[SOLO] = null
		}
	}, true)
	
	window.addEventListener('storage', function (evt) {
		if (evt.key == SOLO && evt.oldValue.indexOf(pageId) == 0) {
			var avId = evt.oldValue.slice(pageId.length + 1)
			var av = document.getElementById(avId)
			if (av) {
				console.debug('Other player', evt.newValue, 'start playing, pause me')
				av.pause()
			}
		}
	}, false)

	/*window.addEventListener('pagehide', function () {
		var avs = document.querySelectorAll('audio, video')
		for (var i = 0; i < avs.length; i++)
			avs[i].pause()
	}, false)*/

}