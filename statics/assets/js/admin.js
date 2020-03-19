$(document).ready(function() {

	$('#choose-event').click(() => {
		$('#event-table').show()
		$('#cancel-btn').show()
	})

	$("#cancel-btn").click(e => {
		e.preventDefault();
		$("#event-table").hide();
		$('#cancel-btn').hide()
	});

});