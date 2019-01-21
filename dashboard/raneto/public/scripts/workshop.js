function handle_execute(event, terminal) {
    var value = event.target.innerText.trim();
    parent.send_to_terminal(value, terminal);
}

function copy_to_clipboard(value) {
    const el = document.createElement('textarea');
    el.value = value;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
	document.getSelection().removeAllRanges();
	document.getSelection().addRange(selected);
    }
}

function handle_copy(event) {
    copy_to_clipboard(event.target.innerText.trim());
}

$(document).ready(function() {
    $.each([$('code.execute'), $('code.execute-1')], function() {
        this.parent().prepend('<span class="execute-glyph fa fa-play-circle" aria-hidden="true"></span>');
	this.parent().click(function(event) {
            $(this).find('.execute-glyph').addClass('text-danger');
            handle_execute(event, 1);
	});
    });

    $.each([$('code.execute-2')], function() {
        this.parent().prepend('<span class="execute-glyph fa fa-play-circle" aria-hidden="true"></span>');
	this.parent().click(function(event) {
            $(this).find('.execute-glyph').addClass('text-danger');
            handle_execute(event, 2);
	});
    });

    $.each([$('code.copy')], function() {
        this.parent().prepend('<span class="copy-glyph fa fa-cut" aria-hidden="true"></span>');
	this.parent().click(function(event) {
            $(this).find('.copy-glyph').addClass('text-danger');
	    handle_copy(event);
        });
    });

    $('section.content a').each(function() {
      if(!(location.hostname === this.hostname || !this.hostname.length)) {
	$(this).attr('target','_blank');
      }
    });
});
