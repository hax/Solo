new function () {

	const SOLO = 'Solo-player'
	
	//console.debug('current playing media:', localStorage[SOLO])
	
	const pageId = generateId()
	//console.debug('generate page id:', pageId)

	window.addEventListener('play', playOrPause, true)
	window.addEventListener('pause', playOrPause, true)
	
	function playOrPause(evt) {
		var media = evt.target
		var value = pageId + ':' + media.id
		//console.debug(evt.type, value)
		if (media.id && media.hasAttribute('solo')) {
			if (evt.type == 'play') {
				localStorage.setItem(SOLO, value + ':' + evt.timeStamp)
			} else if (localStorage.getItem(SOLO).indexOf(value) == 0) {
				localStorage.setItem(SOLO, '::' + evt.timeStamp)
			}
			//console.debug('set localstorage:', localStorage.getItem(SOLO))
		}
	}
	
	window.addEventListener('storage', function (evt) {
		//console.log(evt.key, ':', evt.oldValue, '->', evt.newValue)
		if (evt.key == SOLO && evt.oldValue && evt.oldValue.indexOf(pageId + ':') == 0) {
			var media = document.getElementById(evt.oldValue.split(':')[1])
			if (media) {
				//console.debug('other player', evt.newValue, 'start playing, pause me')
				media.pause()
			}
		}
	}, false)

	window.addEventListener('pagehide', function () {
		var avs = document.querySelectorAll('audio, video')
		for (var i = 0; i < avs.length; i++)
			avs[i].pause()
	}, false)

	function generateId() {
		return Math.random().toString(36).slice(2, 8)
	}
   document.addEventListener('DOMContentLoaded', addSoloIFrame, false)
    
    function addSoloIFrame() {
        var iframe = document.createElement('iframe')
        iframe.src = 'solo.html'
        document.body.appendChild(iframe)
    }
}