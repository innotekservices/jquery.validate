# jquery.validate

A simpler, more elegant form validation plugin.

I wrote this plugin for a specific project I was working on. I needed a very simple form validator and wanted one that actually looked good. Plus I wanted to use HTML5's built-in attributes for marking up validation requirements.

This only supports the specific use-cases that I needed, but I plan on completing more when I have time. You're welcome to make contributions as well.

## Supported Features

No special markup is required in declaring your form.

	<form> ... </form>

You can also pass special options in the form tag like so:

	<form data-validate-position="right"> ... </form>

Will cause the validation bubbles for this form to appear to the right of the input field, instead of the default `below`. Valid values are `above`, `below`, and `right`.

In terms of input fields, supported options are `required`, `minlength`, `maxlength`, and partial `pattern` support.

	<input type="text" required minlength="2" maxlength="32" pattern="alpha">

At this time, `pattern` only supports the value of `alpha`, to restrict the input to be alphabetical characters. Custom regex patterns and other pre-made regexes will be supported later.

Also, if the `type` is set to `email`, it will validate the formatting of the input to ensure it's a legal email address.

It's important to note, this plugin automatically adds `novalidate` to the `form` tag, to prevent modern browsers from checking the form.