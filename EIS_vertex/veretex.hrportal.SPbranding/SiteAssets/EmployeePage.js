
$(document).ready(function () {
  	$('#menu').menu();
	hideAll();
	$('#divProfile').show();	
	$('#aProfile').addClass('active');
});

function hideAll() {
	$('#divProfile').hide();
	$('#aProfile').removeClass('active');
	
	$('#divContactDetails').hide();
	$('#aContactDetails').removeClass('active');
	
	$('#divEducation').hide();
	$('#aEducation').removeClass('active');
	
	$('#divSkills').hide();
	$('#aSkills').removeClass('active');
	
	$('#divCertifications').hide();
	$('#aCertification').removeClass('active');
	
	$('#divPassport').hide();
	$('#aPassport').removeClass('active');
	
	$('#divProjects').hide();
	$('#aProjects').removeClass('active');
	
	$('#divAdditional').hide();
	$('#aInformation').removeClass('active');
}

function activate(divid,aid) {
	//alert(divid);
	hideAll();
	//alert(aid);
	$('#' + aid).addClass('active');
	$('#' + divid).show();
}


var ie = $.browser.msie && $.browser.version < 8.0;

$.fn.menu = function () {
	$(this).find('li').each(function () {
		if ($(this).find('> ul').size() > 0) {
			$(this).addClass('has_child');
		}
	});

	var closeTimer = null;
	var menuItem = null;

	function cancelTimer() {
		if (closeTimer) {
			window.clearTimeout(closeTimer);
			closeTimer = null;
		}
	}

	function close() {
		$(menuItem).find('> ul ul').hide();
		ie ? $(menuItem).find('> ul').fadeOut() : $(menuItem).find('> ul').slideUp(250);
		menuItem = null;
	}

	$(this).find('li').hover(function () {
		cancelTimer();

		var parent = false;
		$(this).parents('li').each(function () {
			if (this == menuItem)
				parent = true;
		});
		if (menuItem != this && !parent)
			close();

		$(this).addClass('hover');
		ie ? $(this).find('> ul').fadeIn() : $(this).find('> ul').slideDown(250);
	}, function () {
		$(this).removeClass('hover');
		menuItem = this;
		cancelTimer();
		closeTimer = window.setTimeout(close, 500);
	});

	if (ie) {
		$(this).find('ul a').css('display', 'inline-block');
		$(this).find('ul ul').css('top', '0');
	}
}
