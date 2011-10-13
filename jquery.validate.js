(function ($) {
	$.validate = function (event) {
		var form = $(this),
			inputs = $("input[type=text], input[type=email], input[type=password]", form),
			isFormValid = true,
			defaults = { position: "below" },
			checkInput, showAlert,
			regex = {
				email: /^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,4}$/i,
				alpha: /^[A-Z]+$/i
			};
		
		checkInput = function () {
			var elem = $(this),
				value = elem.val(),
				length = value.length,
				required = elem.attr('required'),
				type = elem.attr('type'),
				minlength = parseInt(elem.attr('minlength'), 10),
				maxlength = parseInt(elem.attr('maxlength'), 10),
				pattern = elem.attr('pattern'),
				error = false,
				validationObj = elem.data("validation") || { position: form.data("validate-position") || defaults.position, visible: false, uuid: (elem.attr('id') || elem.attr('name')) + "_" + new Date().valueOf() };

			if (required && value === '') {
				error = "This field is required.";
			} else if (type === 'email' && !regex.email.test(value)) {
				error = "Please enter a valid email address.";
			} else if (length < minlength || length > maxlength) {
				error = "This field requires ";
				if (minlength && maxlength) {
					if (minlength === maxlength) {
						error += "exactly " + minlength;
					} else {
						error += "between " + minlength + " and " + maxlength;
					}
				} else if (minlength) {
					error += "at least " + minlength;
				} else if (maxlength) {
					error += "no more than " + maxlength;
				}
				error += " characters.";
			} else if (value !== '' && pattern === 'alpha' && !regex.alpha.test(value)) {
				error = "This field requires standard alphabet characters, only.";
			}

			if (error) {
				if (validationObj.alertObj) {
					validationObj.alertObj.find(".message").html(error);
				} else {
					validationObj.alertObj = $('<div id="validate_' + validationObj.uuid + '" class="input_alert ' + validationObj.position + ' notice"><div class="arrow"></div><div class="message">' + error + '</div></div>');
				}
				elem.addClass("invalid").data("validation", validationObj).unbind("focus.validation").bind("focus.validation", showAlert);
				isFormValid = false;
			} else {
				if (validationObj.alertObj) {
					validationObj.alertObj.remove();
					elem.unbind("focus.validation keyup.validation blur.validation").removeClass("invalid").removeData("validation");
				}
			}
		};

		showAlert = function () {
			var elem = $(this),
				validationObj = elem.data("validation"),
				offset = elem.offset(),
				width = parseFloat(elem.outerWidth()),
				height = parseFloat(elem.outerHeight()),
				start = { opacity: 0 },
				final = { opacity: 1 };

			if (!validationObj.visible) {
				$("body").append(validationObj.alertObj);
				switch (validationObj.position) {
					case "above":
						start.top = offset.top - parseFloat(validationObj.alertObj.outerHeight()) + 5;
						start.left = offset.left;
						final.top = "-=10";
					break;
					case "right":
						start.left = offset.left + width - 25;
						start.top = offset.top - ((parseFloat(validationObj.alertObj.outerHeight()) - height) / 2);
						final.left = "+=10";
					break;
					default:
						start.top = offset.top + (height - 5);
						start.left = offset.left;
						final.top = "+=10";
					break;
				}
				validationObj.alertObj.css(start);
				validationObj.alertObj.animate(final, 250);
				elem.bind("blur.validation", function () { validationObj.visible = false; elem.data("validation", validationObj); validationObj.alertObj.remove(); });
				elem.bind("keyup.validation", checkInput);
				validationObj.visible = true;
				elem.data("validation", validationObj);
			}
		}

		inputs.each(checkInput);

		if (!isFormValid) {
			$(".invalid:first", form).focus();
			event.stopImmediatePropagation();
			return false;
		}
	};

	$("form").attr("novalidate", true).bind("submit", $.validate);
})(jQuery);