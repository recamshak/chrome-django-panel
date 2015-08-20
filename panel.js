$(function() {
	function resizeLeftPanel(width) {
		$('#request-list').width(width);
		$('.split-view-resizer').css('left', width);
	}

	var initial_size = 200;
	var can_access_localStorage = true;
	try {
		initial_size = localStorage['sidePanelWidth'];
	}
	catch (ex) {
		can_access_localStorage = false;
	}

	resizeLeftPanel(initial_size);

	function resizerDragMove(event) {
		resizeLeftPanel(event.pageX);
		event.preventDefault();
	}

	function resizerDragEnd(event) {
		resizeLeftPanel(event.pageX);
		if (can_access_localStorage)
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
		if (header.name === 'X-debug-data-url') {
			$('#request-list').append(buildRequestEl(entry.request.url, header.value));
			return false;
		}
	});
});
