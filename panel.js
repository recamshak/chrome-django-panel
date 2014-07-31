$(function() {
	function resizeLeftPanel(width) {
		$('#request-list').width(width);
		$('.split-view-resizer').css('left', width);
	}

	resizeLeftPanel(localStorage['sidePanelWidth'] || 200);

	function resizerDragMove(event) {
		resizeLeftPanel(event.pageX);
		event.preventDefault();
	}

	function resizerDragEnd(event) {
		resizeLeftPanel(event.pageX);
		localStorage['sidePanelWidth'] = event.pageX + 'px';

		$(document).off('mousemove', resizerDragMove);
		$(document).off('mouseup', resizerDragEnd);
	}

	$('.split-view-resizer').on('mousedown', function() {
		$(document).on('mousemove', resizerDragMove);
		$(document).on('mouseup', resizerDragEnd);
	});
});


function buildRequestEl(requestUrl, debugDataUrl) {
	var url = decodeURIComponent(requestUrl),
			anchor = document.createElement('a'),
			path;

	anchor.href = url;
	path = decodeURIComponent(anchor.pathname + anchor.search);

	return $('<div class="request"></div>')
		.text(path)
		.attr('title', url)
		.on('click', function() {
			$('.selected').removeClass('selected');
			$(this).addClass('selected');

			$('#debug-toolbar-panel').attr('src', debugDataUrl);
		});
}

chrome.devtools.network.onRequestFinished.addListener(function(entry) {
	$.each(entry.response.headers, function(i, header) {
		if (header.name === 'X-debug-data-url' || header.name === 'x-debug-data-url') {
			$('#request-list').append(buildRequestEl(entry.request.url, header.value));
			return false;
		}
	});
});
