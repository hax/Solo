new function () {

	var SOLO = 'http://solo.test/solo.html'
	
	//console.debug('current playing media:', localStorage[SOLO])
	
	const pageId = generateId()
	//console.debug('generate page id:', pageId)

	window.addEventListener('play', playOrPause, true)
	window.addEventListener('pause', playOrPause, true)
	
	document.addEventListener('DOMContentLoaded', addSoloIFrame, false)
    
    function addSoloIFrame() {
        var iframe = document.createElement('iframe')
		iframe.id = SOLO
        iframe.src = SOLO
        document.body.appendChild(iframe)
		iframe.style.position = 'absolute'
		iframe.width = iframe.height = iframe.frameBorder = 
		iframe.style.left = iframe.style.right = iframe.style.top = iframe.style.bottom = 0
		iframe.style.visibility = 'hidden'
    }
	
	function soloChannel() {
		var solo = document.getElementById(SOLO)
		return solo ? solo.contentWindow : null
	}
	
	function playOrPause(evt) {
		var media = evt.target
		if (media.id && media.hasAttribute('solo'))
			soloChannel().postMessage([evt.type, pageId, media.id].join(':'), '*')
	}
	
	window.addEventListener('message', function (evt) {
		//console.log(evt.data)
		if (evt.source == soloChannel()) {
			var args = evt.data.split(':')
			if (args[0] == 'pause' && args[1] == pageId) {
				var media = document.getElementById(args[2])
				if (media && media.hasAttribute('solo')) media.pause()
			}
		}
	}, false)

	/*window.addEventListener('pagehide', function () {
		var avs = document.querySelectorAll('audio, video')
		for (var i = 0; i < avs.length; i++)
			avs[i].pause()
	}, false)*/

	function generateId() {
		return Math.random().toString(36).slice(2, 8)
	}
	
}