$(document).ready(function() {
    $(".presence-item").click(function() {
        $("#presence").hide();
        $("#register").show();
    })

    $("#cancel").click((e) => {
        e.preventDefault()
        $("#presence").show();
        $("#register").hide();
    })
})