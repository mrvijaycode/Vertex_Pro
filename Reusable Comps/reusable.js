
//***************************************************************
//* Project Name     : Vertex Reusable
//* Application name : Reusable Components
//* Dependencies     : 
//* Limitations      : 
//* Created Date     : 31 Oct 2013
//* Author           : Vijay Bhaskar C
//****************************************************************

var items = [["txtOne","NumVal"],["txtTwo","checkTextBoxMandatory"],["txtThree","numMandatory"]];

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

	case "NumDecimals":
		txt += allowNumDecimals(ctrlid);
		break;

	case "fullTrim":
		txt += fullTrim(ctrlid);
		break;

	case "leftTrim":
		txt += leftTrim(ctrlid);
		break;

	case "rightTrim":
		txt += rightTrim(ctrlid);
		break;

	case "maxStringLength":
		txt += maxStringLength(ctrlid);
		break;

	case "toUppercase":
		txt += toUppercase(ctrlid);
		break;

	case "numMandatory":
		txt += numMandatory(ctrlid);
		break;

	case "checkEmail":
		txt += checkEmail(ctrlid);
		break;

	case "checkTextBoxMandatory":
		txt += checkTextBoxMandatory(ctrlid);
		break;
	
	case "checkSelectMandatory":
		txt += checkSelectMandatory(ctrlid);
		break;
		
	default:
		txt += "Nothing searched..";
		break;
	}
}


function Numvalidation(ctrlId) {
	var html = "// Code for NUMBER Validation\n\n"
		html += '$(\"#' + ctrlId + '\").keypress(function (e) {\n' +
		'if (String.fromCharCode(e.keyCode).match(/[^0-9]/g))\n'+ 
		'return false;\n' +
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

function allowNumDecimals(ctrlId) {

	var html = "//Allow Numbers and Decimals only\n\n";
	html += "$('#"+ctrlId+"').keydown(function (e) {\n" +
	"var keyCode = e.which;\n" + // Capture the event
	//190 is the key code of decimal if you dont want decimals remove this condition keyCode != 190
	"if (keyCode != 8 && keyCode != 9 && keyCode != 13 && keyCode != 37 && keyCode != 38 && keyCode != 39 && keyCode != 40 && keyCode != 46 && keyCode != 110 && keyCode != 190) {\n" +
	"if (keyCode < 48) {\n" +
	"e.preventDefault();\n" +
	"}\n" +
	"else if (keyCode > 57 && keyCode < 96) {\n" +
	"e.preventDefault();\n" +
	"}\n" +
	"else if (keyCode > 105) {\n" +
	"e.preventDefault();\n" +
	"}\n" +
	"}\n" +
	"});";
	return html;
}


function fullTrim(ctrlId) {
	var html = "//Full trim for the text\n\n";
	html += '$("#' + ctrlId + '").val($("#' + ctrlId + '").val().replace(/^\s+|\s+$/g, ""));';
	return html;
}


function leftTrim(ctrlId) {
	var html = "//Left trim for the text\n\n";
	html += '$("#' + ctrlId + '").val($("#' + ctrlId + '").val().replace(/^\s+/,""));'
	return html;
}


function rightTrim(ctrlId) {
	var html = "//Left trim for the text..\n\n";
	html += '$("#'+ctrlId+'").val($("#'+ctrlId+'").val().replace(/\s+$/,""));'
	return html;
}


function maxStringLength(ctrlId) {
	var html = "//Max string length--5 .. \n\n";
	html += '$("#' + ctrlId + '").attr("maxLength","5");';
	return html;
}

function toUppercase(ctrlId) {
	var html = "//String convert to UPPERCASE .. \n\n";
	html += '$("#'+ctrlId+'").val().toUpperCase();';
	return html;
}


function toLowercase(ctrlId) {
	var html = "//String convert to lowercase .. \n\n";
	html += '$("#' + ctrlId + '").val().toLowerCase();';
	return html;
}


function numMandatory(ctrlId) {
	var html = "//Check number madatory field ..\n//Call this function on textbox focus out\n\n";
	//html += 'function CheckForMandatory(' + ctrlId + ')\n' +
	//'{\n' +
	html +='FullTRIM(' + ctrlId + ');\n' +
	'if (isNaN($("#' + ctrlId + '").val()))\n' +
	'{\n' +
	'alert("Please enter valid number");\n' +
	'}\n' +
	'else if ($("#"' + ctrlId + '").val()=="")\n' +
	'{\n' +
	'alert("Please enter number");\n' +
	'}\n\n' ;
	//'}\n\n';
	return html;
}


function checkEmail(ctrlId) {

	var html = "//Check Email validation...\n\n";
	html += '$("#' + ctrlId + '").focusout(function () {\n' +
	'var email = $(this).val();\n' +
	'var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;\n' +
	'var isEmail = regex.test(email);\n' +
	'if (!isEmail) {\n' +
	'alert(" Please enter valid email address..");\n' +
	'}\n' +
	'});';
	return html;
}

function checkTextBoxMandatory(ctrlId) {
	var html = "//Check text mandatory field...\n\n";
	html += 'if ($("#' + ctrlId+'").val() == "")\n' +
	'alert("Please enter data");\n\n';
	return html;
}


function checkSelectMandatory(ctrlId) {
	var html = "//Check select mandatory field...\n\n";
	html += 'if (($("#' + ctrlId+'").val() == "Select") || ($("#' + ctrlId +'" option:selected").index() == 0))'+
	'alert("Please select valid data");';
	return html;
}


