
//***************************************************************
//* Project Name     : GSS
//* Application name : Genomics Experiments
//* Dependencies     : XXX1
//* Limitations      : XXX2
//* Created Date     : 30 Dec 2012
//* Author           : Vijay Bhaskar C
//****************************************************************

var items = [["txtOne","NumVal"],["txtTwo","strVal"]];

$(document).ready(function () {
	//alert('check this');
});

function fire() {
	txt = "\n#Generated code#\n\n\n";
	$.each(items, function (i) {
		abc(items[i][0], items[i][1]);
	});
	$('#txta').html(txt);
}

var txt = "";

function abc(ctrlid, valType) {

	switch (valType) {

	case "NumVal":
		txt += Numvalidation(ctrlid);
		break;

	case "strVal":
		txt += strValidation(ctrlid);
		break;

	default:
		txt += "Nothing searched..";
		break;
	}
}

function Numvalidation(ctrlId) {
	var html = "// Code for NUMBER Validation\n\n"
		html += '$(\"#' + ctrlId + '\").keypress(function (e) {\n' +
		'if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;\n' +
		'});\n\n\n\n';
	return html;
}

function strValidation(ctrlId) {
	var html = "// Code for STRING Validation\n\n";
	html += '$("#' + ctrlId + '").keypress(function (e) {\n' +
	'if($("#' + ctrlId + '").val().length == 0)\n' +
	'if (e.which == 32)\n' + 
	'e.preventDefault();\n' +
	'var valid = (e.which == 32) || (e.which >= 65 && e.which <= 90) ||\n' +
	'(e.which >= 97 && e.which <= 122);\n' +
	'if (!valid) {\n' +
	'e.preventDefault();\n' +
	'}});\n';
	return html;
}






