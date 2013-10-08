
//***************************************************************
//* Project Name     : GSS
//* Application name :Genomics Experiments
//* Dependencies     :
//* Limitations      :
//* Created Date     : 17 Jan 2013
//* Author           : Rajesh Kumar Nandamuri
//****************************************************************

//var curUser = $().SPServices.SPGetCurrentUser();
var fileAdded=false;
//var curUser = "NA\\yeddula.ar";
//var curUser = "CN\\bolla.su";
//var curUser = "EU\\terala.l";
//var curUser = "ap\\thaduri.us";
//var curUser = "AP\\chittavajhula.v";

var mileRPTObj; 
var tempMileRPTObj;
var ContactsOBJ;
var MileStonePlan=new Array(8);

$(document).ready(function () {
	$("#tdMain").attr('style', '');
	$("#brdCurrPage").text('Study Tracking Report')

	document.title = "Study Tracking Report";
	MileStonePlan[0] = "Samples Reception##M1";
	MileStonePlan[1] = "RNA Isolation##M2a";
	MileStonePlan[2] = "cRNA Label##M2b";
	MileStonePlan[3] = "Chips Run##M2c";
	MileStonePlan[4] = "Data Posted##M2d";
	MileStonePlan[5] = "Initial QC completion##M3a";
	MileStonePlan[6] = "Statistics Report##M3b";
	MileStonePlan[7] = "BioInformatics Analysis##M4";

	getGSSContactsInfo();

	var month = new Array(12);
	month[0] = "Jan";
	month[1] = "Feb";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "Aug";
	month[8] = "Sep";
	month[9] = "Oct";
	month[10] = "Nov";
	month[11] = "Dec";

	$("[id$='Date']").datepicker();

	var currDate = new Date();
	var currYear = parseInt(currDate.getFullYear()) + 5;

	for (var i = currDate.getFullYear() - 5; i <= currYear; i++) {
		$("#selYear").append("<option value=" + i + ">" + i + "</option>");
	}
	for (var x = 0; x < 12; x++) {
		$("#selstrMon").append("<option value=" + x + ">" + month[x] + "</option>");
		$("#selEndMon").append("<option value=" + x + ">" + month[x] + "</option>");
	}

	$("#selMonthlyType").click(function () {
		var selValue = $(this).find('option:selected').val();
		if (selValue == 1) {
			$("#txtStrtDate").parent().parent().show();
			$("#selYear").parent().parent().hide();
			$("#filderDiv").show();
			setTimeout("adjustWidth()", 1000);

		} else if (selValue == 2) {
			$("#selYear").parent().parent().show();
			$("#txtStrtDate").parent().parent().hide();
			$("#filderDiv").show();
			setTimeout("adjustWidth()", 1000);
		}
	});

	$("#btnSubmit").click(function () {
		if ($("#GSSID").get(0).selectedIndex != 0 && $("#Study_x0020_Name").get(0).selectedIndex != 0)
			alert("Please select either GSS# or Study Name");
		else
			getWeeklyMileStoneRpt();
	});
});

//This function is to load GSS and Contacts info
function getGSSContactsInfo() {
	var viewFlds = "<ViewFields><FieldRef Name='Author' /><FieldRef Name='GSSID' />" +
		"<FieldRef Name='Study_x0020_Name' /><FieldRef Name='Bio_x0020_Informatics_x0020_Owne' /><FieldRef Name='Statistics_x0020_Owner' /><FieldRef Name='GC_x0020_Analyst' /><FieldRef Name='Title' /></ViewFields>";

	var strHtml = "";
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : "Study",
		CAMLQueryOptions : "<QueryOptions> <IncludeMandatoryColumns>True</IncludeMandatoryColumns><IncludeAttachmentUrls>TRUE</IncludeAttachmentUrls></QueryOptions>",
		CAMLViewFields : viewFlds,
		CAMLRowLimit : 2000,
		completefunc : function (xData, Status) {

			if ($(xData.responseXML).SPFilterNode("z:row").length > 0) {

				ContactsOBJ = $(xData.responseXML).SPFilterNode("z:row");
				addOptionToSelect('GSSID');
				addOptionToSelect('Study_x0020_Name');
				addOptionToSelect('Author');
				addOptionToSelect('GC_x0020_Analyst');

				addOptionToSelect('Bio_x0020_Informatics_x0020_Owne');
				addOptionToSelect('Statistics_x0020_Owner');
			}
			setTimeout("adjustWidth()", 1000);
		}
	});
}


//This function is to Add optoins to GSS Study Name, contacts to drop down boxes
function addOptionToSelect(selField) {
	var selOBJ = $("#" + selField);
	var selFlag = false;

	ContactsOBJ.each(function (i) {

		if ($(this).attr('ows_' + selField)) {
			var selOptions = selOBJ.find('option');
			var currVal = $(this).attr('ows_' + selField);
			if (selOptions.length == 1)
				selFlag = true;
			else {
				selFlag = true;
				selOptions.each(function () {

					if (currVal.indexOf('#') > 0) {
						if ($(this).val() == currVal.split(';#')[0])
							selFlag = false;
					} else if ($(this).val() == currVal)
						selFlag = false;
				});
			}
			if (selFlag == true) {
				if (currVal.indexOf('#') > 0)
					selOBJ.append("<option value=" + currVal.split(';#')[0] + ">" + currVal.split(';#')[1] + "</option>");
				else
					selOBJ.append("<option value=" + currVal + ">" + currVal + "</option>");
			}
		}
	});
}

function getWeeklyMileStoneRpt() {
	debugger;
	var selQuery2 = getFilterQuery();
	//var mandatoryQuery="<And><And><And><IsNotNull><FieldRef Name='GC_x0020_Analyst' /></IsNotNull><IsNotNull><FieldRef Name='Statistics_x0020_Owner' />"+
	//               "</IsNotNull></And><IsNotNull><FieldRef Name='Bio_x0020_Informatics_x0020_Owne' /></IsNotNull></And><IsNotNull><FieldRef Name='Overall_Study_Status' /></IsNotNull></And>";

	var mandatoryQuery = "<And><And><IsNotNull><FieldRef Name='GC_x0020_Analyst' /></IsNotNull><IsNotNull><FieldRef Name='Statistics_x0020_Owner' />" +
		"</IsNotNull></And><IsNotNull><FieldRef Name='Bio_x0020_Informatics_x0020_Owne' /></IsNotNull></And>";

	if (selQuery2 != "")
		var milestoneQuery = "<Query><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy><Where><And>" + mandatoryQuery + selQuery2 + "</And></Where></Query>";
	else
		var milestoneQuery = "<Query><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy><Where>" + mandatoryQuery + "</Where></Query>";

	var viewFlds = "<ViewFields><FieldRef Name='Editor' /><FieldRef Name='Author' /><FieldRef Name='Created' /><FieldRef Name='Modified' /><FieldRef Name='ID' />" +
		"<FieldRef Name='EnableWF' /><FieldRef Name='enableStage' /><FieldRef Name='Reason_for_Delay_4' /><FieldRef Name='M3b_act_Statistics_Report_Date' /><FieldRef Name='M3a_act_Initial_QC_completion_da' />" +
		"<FieldRef Name='Reason_for_Delay_m3b' /><FieldRef Name='Reason_for_Delay_m3a' /><FieldRef Name='Reason_for_Delay_m2d' /><FieldRef Name='Reason_for_Delay_m2c' /><FieldRef Name='Reason_for_Delay_m2b' />" +
		"<FieldRef Name='M2d_act_Data_Posted_date' /><FieldRef Name='M2c_act_Chips_Run_date' /><FieldRef Name='M2b_cRNA_act_Dates_Label' /><FieldRef Name='M2a_act_RNA_Isolation_Date' /><FieldRef Name='cRNA_Protocol' />" +
		"<FieldRef Name='Comments_M2a' /><FieldRef Name='Reason_for_Delay_M2a' /><FieldRef Name='RNA_x0020_Procotol' /><FieldRef Name='Reason_for_Delay_m1' /><FieldRef Name='M1_Actual_Samples_Received_Date' />" +
		"<FieldRef Name='ReminderIds' /><FieldRef Name='M4_BioInformatics_Analysis_date' /><FieldRef Name='M3b_Statistics_Report_Date' /><FieldRef Name='M3a_Initial_QC_completion_date' /><FieldRef Name='M2d_Date_Data_Posted' />" +
		"<FieldRef Name='M2c_Date_Chips_Run' /><FieldRef Name='M2b_cRNA_Dates_Label' /><FieldRef Name='M2a_RNA_Isolation_Date' /><FieldRef Name='M1_Anticipated_Samples' /><FieldRef Name='TissueType' /><FieldRef Name='DescriptionPurpose' />" +
		"<FieldRef Name='Chip_x0020_Type' /><FieldRef Name='GSSID' /><FieldRef Name='Fundamental_questions' /><FieldRef Name='Purpose' /><FieldRef Name='Comments_4' /><FieldRef Name='Comments_m3b' />" +
		"<FieldRef Name='Comments_m2d' /><FieldRef Name='Comments' /><FieldRef Name='Delayed' /><FieldRef Name='Overall_Study_Status' /><FieldRef Name='BioInformatics_Analysis_date_4' /><FieldRef Name='Statistics_Report_Date_M3b' /><FieldRef Name='Initial_QC_completion_date_M3a' />" +
		"<FieldRef Name='Date_Data_Posted_M2d' /><FieldRef Name='Date_Chips_Run_M2c' /><FieldRef Name='cRNA_Dates_Label_M2b' /><FieldRef Name='NA_Isolation_Date_M2a' /><FieldRef Name='Estimated_timing' /><FieldRef Name='ProtocolNumber' /><FieldRef Name='Estimated_x0020_Number_x0020_of_' />" +
		"<FieldRef Name='Study_x0020_Name' /><FieldRef Name='LogMilestones' /><FieldRef Name='Bio_x0020_Informatics_x0020_Owne' /><FieldRef Name='Statistics_x0020_Owner' /><FieldRef Name='GC_x0020_Analyst' /><FieldRef Name='Title' /></ViewFields>";

	var strHtml = "";
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : "Study",
		CAMLQueryOptions : "<QueryOptions> <IncludeMandatoryColumns>True</IncludeMandatoryColumns><IncludeAttachmentUrls>TRUE</IncludeAttachmentUrls></QueryOptions>",
		CAMLQuery : milestoneQuery,
		CAMLViewFields : viewFlds,
		CAMLRowLimit : 2000,
		completefunc : function (xData, Status) {

			if ($(xData.responseXML).SPFilterNode("z:row").length > 0) {
				var x = 1;
				mileRPTObj = $(xData.responseXML).SPFilterNode("z:row");
				//tempMileRPTObj=mileRPTObj;
				getMileStoneRpt(0);

			} else
				$("#tdStudyReport").html("<span>No Records Available</span>");
		}
	});
}

//This function is to get revised and original milestone dates from log column
function getRVSALog(logDates) {
	var MileLogDates = logDates.split('##')

		var mileDatesStr = "";
	var originalMileDates = new Array(11);

	for (var i = 0; i < 11; i++)
		originalMileDates[i] = 0;

	var originalMileDates = MileLogDates[1].split(';');
	for (var x = 0; x < 8; x++) {
		originalMileDates[x] = getDateformat(originalMileDates[x].split(':')[1]) + ";";
	}

	var revisedStatus = true;
	if (MileLogDates.length != 2) {
		var templogDate = MileLogDates[MileLogDates.length - 2].split(';');
		var z = 8;
		for (var i = 0; i < templogDate.length; i++) {

			if (templogDate[i].indexOf('=') < 0) {
				var revisedDate = templogDate[i].split(':');
				if (revisedDate[0] == 'M1')
					originalMileDates[0] = originalMileDates[0] + getDateformat(revisedDate[1]);

				if (revisedDate[0] == 'M2a')
					originalMileDates[1] = originalMileDates[1] + getDateformat(revisedDate[1]);

				if (revisedDate[0] == 'M2b')
					originalMileDates[2] = originalMileDates[2] + getDateformat(revisedDate[1]);

				if (revisedDate[0] == 'M2c')
					originalMileDates[3] = originalMileDates[3] + getDateformat(revisedDate[1]);

				if (revisedDate[0] == 'M2d')
					originalMileDates[4] = originalMileDates[4] + getDateformat(revisedDate[1]);

				if (revisedDate[0] == 'M3a')
					originalMileDates[5] = originalMileDates[5] + getDateformat(revisedDate[1]);

				if (revisedDate[0] == 'M3b')
					originalMileDates[6] = originalMileDates[6] + getDateformat(revisedDate[1]);

				if (revisedDate[0] == 'M4')
					originalMileDates[7] = originalMileDates[7] + getDateformat(revisedDate[1]);
			}
		}
	}
	return originalMileDates;
}

//This function is to get Mile Stone Log Date and return string
function getMilestoneLog(logDates) {

	var MileLogDates = logDates.split('#');
	var mileDatesStr = "";

	for (var x = 0; x < 8; x++) {
		mileDatesStr += MileStonePlan[x].split('##')[0] + "<br/>";
		mileDatesStr += getDateformat(MileLogDates[1].split(';')[0].split(':')[1]) + "&nbsp;";

		for (var i = 2; i < MileLogDates.length; i++) {
			var indexPos = MileLogDates[2].indexOf(MileStonePlan[x].split('##')[1]);
			if (indexPos >= 0) {
				if (MileStonePlan[x].split('##')[1].length == 2)
					mileDatesStr += getDateformat(MileLogDates[2].substring(indexPos + 3, indexPos + 13)) + "&nbsp;";
				else
					mileDatesStr += getDateformat(MileLogDates[2].substring(indexPos + 4, indexPos + 14)) + "&nbsp;";
			}
		}
		mileDatesStr += "<br/>";
	}
	return mileDatesStr;
}

 //This function is to get Mile stone reports
 function getMileStoneRpt(z) {
 	var x = 1;
 	var strHtml = "";
 	strHtml = "<table width='100%' border='0' align='center' cellpadding='4' cellspacing='1' class='ms-WPBorder' ><tr style='font-weight:bold'>" +
 		"<td  height='20' align='left' class='ms-menutoolbar' style='white-space:nowrap;'>&nbsp;Study Name&nbsp;&nbsp;</td><td align='left' class='ms-menutoolbar'>&nbsp;GSS#</td><td align='left' class='ms-menutoolbar' style='white-space:nowrap;'>&nbsp;Current Phase</td><td  align='left' class='ms-menutoolbar' style='white-space:nowrap;'>&nbsp; Overall Status &nbsp;&nbsp;</td><td  align='left' class='ms-menutoolbar'>&nbsp;Milestone / Planned / Actual</td></tr>";
 	var xLen = mileRPTObj.length;

 	$.each(mileRPTObj, function (i) {

 		if (i >= parseInt(z) * 10 && i <= parseInt(z) * 10 + 9) {
 			var m1 = "";
 			var m2 = "";
 			var m3 = "";
 			var m4 = "";
 			var m5 = "";
 			var m6 = "";
 			var m7 = "";
 			var m8 = "";
 			var a1 = "";
 			var a2 = "";
 			var a3 = "";
 			var a4 = "";
 			var a5 = "";
 			var a6 = "";
 			var a7 = "";
 			var a8 = "";

 			var CurrentPhase = "";

 			if ($(this).attr('ows_M1_Anticipated_Samples'))
 				m1 = getDateformat($(this).attr('ows_M1_Anticipated_Samples').split(' ')[0]);
 			if ($(this).attr('ows_M2a_RNA_Isolation_Date'))
 				m2 = getDateformat($(this).attr('ows_M2a_RNA_Isolation_Date').split(' ')[0]);
 			if ($(this).attr('ows_M2b_cRNA_Dates_Label'))
 				m3 = getDateformat($(this).attr('ows_M2b_cRNA_Dates_Label').split(' ')[0]);
 			if ($(this).attr('ows_M2c_Date_Chips_Run'))
 				m4 = getDateformat($(this).attr('ows_M2c_Date_Chips_Run').split(' ')[0]);
 			if ($(this).attr('ows_M2d_Date_Data_Posted'))
 				m5 = getDateformat($(this).attr('ows_M2d_Date_Data_Posted').split(' ')[0]);
 			if ($(this).attr('ows_M3a_Initial_QC_completion_date'))
 				m6 = getDateformat($(this).attr('ows_M3a_Initial_QC_completion_date').split(' ')[0]);
 			if ($(this).attr('ows_M3b_Statistics_Report_Date'))
 				m7 = getDateformat($(this).attr('ows_M3b_Statistics_Report_Date').split(' ')[0]);
 			if ($(this).attr('ows_M4_BioInformatics_Analysis_date'))
 				m8 = getDateformat($(this).attr('ows_M4_BioInformatics_Analysis_date').split(' ')[0]);

 			CurrentPhase = 'Samples Reception';
 			if ($(this).attr('ows_M1_Actual_Samples_Received_Date')) {
 				a1 = getDateformat($(this).attr('ows_M1_Actual_Samples_Received_Date').split(' ')[0]);
 				CurrentPhase = 'RNA Isolation';
 			}
 			if ($(this).attr('ows_M2a_act_RNA_Isolation_Date')) {
 				a2 = getDateformat($(this).attr('ows_M2a_act_RNA_Isolation_Date').split(' ')[0]);
 				CurrentPhase = 'cRNA Label';
 			}

 			if ($(this).attr('ows_M2b_cRNA_act_Dates_Label')) {
 				a3 = getDateformat($(this).attr('ows_M2b_cRNA_act_Dates_Label').split(' ')[0]);
 				CurrentPhase = 'Chips Run';
 			}

 			if ($(this).attr('ows_M2c_act_Chips_Run_date')) {
 				a4 = getDateformat($(this).attr('ows_M2c_act_Chips_Run_date').split(' ')[0]);
 				CurrentPhase = 'Data Posted ';
 			}

 			if ($(this).attr('ows_M2d_act_Data_Posted_date')) {
 				a5 = getDateformat($(this).attr('ows_M2d_act_Data_Posted_date').split(' ')[0]);
 				CurrentPhase = 'Initial QC completion ';
 			}

 			if ($(this).attr('ows_M3a_act_Initial_QC_completion_da')) {
 				a6 = getDateformat($(this).attr('ows_M3a_act_Initial_QC_completion_da').split(' ')[0]);
 				CurrentPhase = 'Statistics Report ';
 			}

 			if ($(this).attr('ows_M3b_act_Statistics_Report_Date')) {
 				a7 = getDateformat($(this).attr('ows_M3b_act_Statistics_Report_Date').split(' ')[0]);
 				CurrentPhase = 'BioInformatics Analysis';
 			}
 			if ($(this).attr('ows_BioInformatics_Analysis_date_4')) {
 				a8 = getDateformat($(this).attr('ows_BioInformatics_Analysis_date_4').split(' ')[0]);
 				CurrentPhase = 'Completed';
 			}

 			var mileStoneDates = "<table><tr><td style='white-space:nowrap;'>Samples Reception </td><td>" + m1 + "</td><td>" + a1 + "</td></tr><tr><td style='white-space:nowrap;'>RNA Isolation </td><td>" + m2 + "</td><td>" + a2 + "</td></tr><tr><td style='white-space:nowrap;'>cRNA Label </td><td>" + m3 + "</td><td>" + a3 + "</td></tr><tr><td style='white-space:nowrap;'>Chips Run </td><td>" + m4 + "</td><td>" + a4 + "</td></tr><tr><td style='white-space:nowrap;'>Data Posted </td><td>" + m5 + "</td><td>" + a5 + "</td></tr><tr><td style='white-space:nowrap;'>Initial QC completion </td><td>" + m6 + "</td><td>" + a6 + "</td></tr><tr><td style='white-space:nowrap;'>Statistics Report </td><td>" + m7 + "</td><td>" + a7 + " </td></tr><tr><td style='white-space:nowrap;'>BioInformatics Analysis </td><td>" + m8 + "</td><td>" + a8 + "</td></tr></table>";
			
			if ($(this).attr('ows_Overall_Study_Status') != null)
 						var overallstatus = $(this).attr('ows_Overall_Study_Status');
 					else
 						var overallstatus = "";

 			if ($(this).attr('ows_GC_x0020_Analyst') && $(this).attr('ows_Statistics_x0020_Owner') && $(this).attr('ows_Bio_x0020_Informatics_x0020_Owne') && $(this).attr('ows_Study_x0020_Name') && $(this).attr('ows_GSSID') && $(this).attr('ows_Purpose')) {
 				if (parseInt(x) % 2 != 0) {

 					strHtml += "<tr><td  valign='top'>" + $(this).attr('ows_Study_x0020_Name') + "</td><td valign='top' >" + $(this).attr('ows_GSSID') + "</td><td valign='top' >" + CurrentPhase + "</td><td valign='top' >" + overallstatus + "</td><td valign='top'  >" + mileStoneDates + "</td></tr>";
 				} else {
 					strHtml += "<tr class='ms-alternating' ><td valign='top'>" + $(this).attr('ows_Study_x0020_Name') + "</td><td valign='top' >" + $(this).attr('ows_GSSID') + "</td><td valign='top' >" + CurrentPhase + "</td><td valign='top' >" + overallstatus + "</td><td valign='top' >" + mileStoneDates + "</td></tr>";
 				}
 				x++;
 			}
 		}
 	});

 	if (x > 1) {
 		strHtml += "</table>";
 		strHtml += "<br/><br/><table width='100%' cellpadding=0 cellspacing=0 align=right><tr><td>";
 		if (xLen > 10)
 			for (var j = 0; j < xLen / 10; j++) {
 				if (j == 0)
 					strHtml += "<a href='javascript:void(0)' id='navi" + j + "' style='color:red' onclick='getMileStoneRpt(&quot;" + j + "&quot;);highlightAnchor($(this).attr(&quot;id&quot;))'>" + (parseInt(j) + 1) + "</a>&nbsp;&nbsp;&nbsp;";
 				else
 					strHtml += "<a href='javascript:void(0)' id='navi" + j + "' onclick='getMileStoneRpt(&quot;" + j + "&quot;);highlightAnchor($(this).attr(&quot;id&quot;))'>" + (parseInt(j) + 1) + "</a>&nbsp;&nbsp;&nbsp;";
 			}
 		strHtml += "</td></tr></table>";
 		$("#tdStudyReport").html(strHtml);
 	}
 }
 
  
 //This function is to get Date Format
 function getDateformat(currDt) {
 	var tempDate = currDt.split('-')
 		return tempDate[1] + "/" + tempDate[2] + "/" + tempDate[0];
 }

 function getFilterQuery() {
 	var selObjs = $("#filderDiv").find('select');
 	var QueryBeginPart = "<Query><Where>";
 	var QueryEndPart = "</Where></Query>";
 	var QueryMiddlePart = "";
 	var lookupid = "";
 	var valtype = "<Value Type='Text'>"
 		var x = 0;
 	selObjs.each(function (i) {

 		if ($(this).get(0).selectedIndex != 0) {
 			var fieldVal = $(this).val();

 			if ($(this).attr('id') != 'GSSID' && $(this).attr('id') != 'Study_x0020_Name') {
 				lookupid = "LookupId='TRUE'";
 				valtype = "<Value Type='User'>";
 			} else {

 				fieldVal = $(this).find('option:selected').text();
 			}
 			if (x == 0) {
 				QueryMiddlePart = "<Eq><FieldRef Name='" + $(this).attr('id') + "' " + lookupid + "  />" + valtype + fieldVal + "</Value></Eq>";
 			} else {
 				QueryMiddlePart = "<And>" + QueryMiddlePart + "<Eq><FieldRef Name='" + $(this).attr('id') + "' " + lookupid + "  />" + valtype + fieldVal + "</Value></Eq></And>";
 			}
 			x++;
 		}
 	});
 	return QueryMiddlePart;
 }
 
 
  function highlightAnchor(currObj) {
  	var anchorParent = $("#" + currObj).parent().find('a');
  	anchorParent.each(function () {
  		$(this).css('color', 'blue');
  	});
  	$("#" + currObj).css('color', 'red');
  }

  function adjustWidth() {
  	if (parseInt($("#GSSID").css('width')) > parseInt($("#GC_x0020_Analyst").css('width')))
  		$("#GC_x0020_Analyst").css('width', $("#GSSID").css('width'));
  	else
  		$("#GSSID").css('width', $("#GC_x0020_Analyst").css('width'));

  	if (parseInt($("#Study_x0020_Name").css('width')) > parseInt($("#Statistics_x0020_Owner").css('width')))
  		$("#Statistics_x0020_Owner").css('width', $("#Study_x0020_Name").css('width'));
  	else
  		$("#Study_x0020_Name").css('width', $("#Statistics_x0020_Owner").css('width'));

  	if (parseInt($("#Author").css('width')) > parseInt($("#Statistics_x0020_Owner").css('width')))
  		$("#Bio_x0020_Informatics_x0020_Owne").css('width', $("#Author").css('width'));
  	else
  		$("#Author").css('width', $("#Bio_x0020_Informatics_x0020_Owne").css('width'));
  }