
function buildRequestEl(requestUrl, debugDataUrl) {
	return $('<div class="request"></div>')
		.text(decodeURIComponent(requestUrl))
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