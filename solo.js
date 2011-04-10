new function () {
    
    const SOLO = 'Solo player'
	
    const pageId = generateId()
	console.debug('generate page id:', pageId)

	console.debug('Current playing av:', localStorage[SOLO])
	
	window.addEventListener('play', playOrPause, true)
	window.addEventListener('pause', playOrPause, true)
    
    function playOrPause(evt) {
    	var av = evt.target
		if (av.id && av.hasAttribute('solo')) {
            var id = pageId + ':' + av.id
            if (evt.type == 'play')
			    localStorage[SOLO] = id
            else if (localStorage[SOLO] == id)
                localStorage[SOLO] = ''
		}
	}
	
	window.addEventListener('storage', function (evt) {
		if (evt.key == SOLO && evt.oldValue.indexOf(pageId + ':') == 0) {
			var avId = evt.oldValue.slice(pageId.length + 1)
			var av = document.getElementById(avId)
			if (av) {
				console.debug('Other player', evt.newValue, 'start playing, pause me')
				av.pause()
			}
		}
	}, true)

	/*window.addEventListener('pagehide', function () {
		var avs = document.querySelectorAll('audio, video')
		for (var i = 0; i < avs.length; i++)
			avs[i].pause()
	}, false)*/
    
    function generateId() {
        return Math.random().toString(36).slice(2, 8)
    }

}