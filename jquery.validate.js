;(function ($){
	var checkForm, checkInput, showAlert, clearAlert, isFormValid, opts = { position: "below", level: "notice" };
	
	checkForm = function(event) {
		var form = $(this), inputs = $("input[type=text], input[type=email], input[type=password]", form);
		
		isFormValid = true;
		inputs.each(checkInput);
		
		if (!isFormValid) {
			$(".invalid:first", form).focus();
			
			event.stopImmediatePropagation();
			return false;
		}
	}
	
	checkInput = function() {
		var elem = $(this),
			value = elem.val(),
			length = value.length,
			required = elem.attr('required'),
			type = elem.attr('type'),
			min = parseInt(elem.attr('min')),
			max = parseInt(elem.attr('max')),
			pattern = elem.attr('pattern'),
			error = false,
			isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		
		if (required && value == '') {
			error = "This field is required.";
		} else if (type == 'email' && !isEmail.test(value)) {
			error = "Please enter a valid email address.";
		} else if (length < min || length > max) {
			error = "This field requires ";
			if (min && max) {
				if (min == max) {
					error += "exactly " + min;
				} else {
					error += "between " + min + " and " + max;
				}
			} else if (min) {
				error += "at least " + min;
			} else if (max) {
				error += "no more than " + max;
			}
			error += " characters.";
		}
		
		if (error) {
			elem.addClass("invalid").data("validation", {
				position: opts.position,
				level: opts.level,
				message: error,
				visible: false
			}).unbind("focus.validation").bind("focus.validation", showAlert);
			
			isFormValid = false;
		} else {
			elem.removeClass("invalid").removeData("validation").unbind("focus.validation");
		}
	}
	
	showAlert = function() {
		var elem = $(this), validationObj = elem.data("validation"), alertObj, offset = elem.offset(), height = parseFloat(elem.outerHeight());
		
		if (!validationObj.visible) {
			alertObj = $('<div class="input_alert ' + validationObj.position + ' ' + validationObj.level + '"><div class="arrow"></div><div class="message">' + validationObj.message + '</div></div>');
			alertObj.css({ opacity: 0, top: (offset.top + (height - 15)) + 'px', left: (offset.left + 3) + 'px' });
			$("body").append(alertObj);
			alertObj.animate({ opacity: 1, top: '+=10' }, 250);
			elem.unbind("keydown.validation blur.validation").one("keydown.validation blur.validation", function() { validationObj.visible = false; elem.data("validation", validationObj); alertObj.remove(); });
			validationObj.visible = true;
			elem.data("validation", validationObj);
		}
	}
	
	$("form").bind("submit", checkForm);
})(jQuery);