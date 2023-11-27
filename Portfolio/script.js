// Progress bars
$(document).ready(function() {
    $('.progress .progress-bar').each(function() {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
    });
});
