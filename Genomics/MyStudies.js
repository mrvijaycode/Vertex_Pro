
//***************************************************************
//* Project Name     : GSS
//* Application name :Genomics Experiments
//* Dependencies     :
//* Limitations      :
//* Created Date     : 16 Jan 2013
//* Author           : Rajesh Kumar N
//****************************************************************


var reminderIds = "";
var myStudiesRPT;

var strQuery = $(location).attr('href').split('?')[1].split('=')[1];
//alert(strQuery);

var ALL_STUDIES = "allStudies";
var DELAY_STUDIES = "delayed";
var ACTIVE_STUDIES = "active";
var COMP_STUDIES = "completed";
var My_STUDIES = "MyStudies";
var CANCELED = "Cancel";

$(document).ready(function(){

getMyGeneomicStudies();
})


function getMyGeneomicStudies()
{
var mandatoryQuery="<And><And><And><And><IsNotNull><FieldRef Name='GC_x0020_Analyst' /></IsNotNull><IsNotNull><FieldRef Name='Statistics_x0020_Owner' />"+
		"</IsNotNull></And><IsNotNull><FieldRef Name='Bio_x0020_Informatics_x0020_Owne' /></IsNotNull></And><IsNotNull>"+
		"<FieldRef Name='Overall_Study_Status' /></IsNotNull></And><Neq><FieldRef Name='studyCancel' /><Value Type='Boolean'>1</Value>"+
		"</Neq></And>";

	var strCaml = "<Query><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy><Where>"+mandatoryQuery+"</where></Query>";
	var userName = $().SPServices.SPGetCurrentUser({
			fieldName : "Title",
			debug : false
		});

	switch (strQuery) {
	case My_STUDIES:
		$("#pgTitle").text('My Studies')
		$("#brdCurrPage").text('My Studies')
		document.title = 'My Studies';
		$(this).attr("title", "My Studies");
		strCaml = "<Query><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy><Where><And><And>"+mandatoryQuery+"<Or><Or><Or><Eq><FieldRef Name='GC_x0020_Analyst' /><Value Type='User'>" + userName + "</Value></Eq><Eq><FieldRef Name='Statistics_x0020_Owner' />" +
			"<Value Type='User'>" + userName + "</Value></Eq></Or><Eq><FieldRef Name='Bio_x0020_Informatics_x0020_Owne' /><Value Type='User'>" + userName + "</Value></Eq></Or><Eq><FieldRef Name='Author' /><Value Type='User'>" + userName + "</Value></Eq></Or></And><Neq><FieldRef Name='enableStage' /><Value Type='Text'>StepM4</Value></Neq></And></Where></Query>";
		break;
		
	case DELAY_STUDIES:
		$("#pgTitle").text('Delayed Studies')
		$("#brdCurrPage").text('Delayed Studies')
		$(this).attr("title", "Delayed Studies");
		document.title = 'Delayed Studies';
		strCaml = "<Query><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy><Where><And>"+mandatoryQuery+"<Eq><FieldRef Name='Delayed' /><Value Type='Boolean'>1</Value></Eq></And></Where></Query>";
		break;
		
	case ACTIVE_STUDIES:
		$("#pgTitle").text('Active Studies')
		$("#brdCurrPage").text('Active Studies')
		$(this).attr("title", "Active Studies");
		strCaml = "<Query><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy><Where><And>"+mandatoryQuery+"<Neq><FieldRef Name='enableStage' /><Value Type='Text'>StepM4</Value></Neq></And></Where></Query>";
		break;
		
	case COMP_STUDIES:
		$("#pgTitle").text('Completed Studies')
		$("#brdCurrPage").text('Completed Studies')
		$(this).attr("title", "Completed Studies");
		document.title = 'Completed Studies';
		strCaml = "<Query><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy><Where><And>"+mandatoryQuery+"<Eq><FieldRef Name='enableStage' /><Value Type='Text'>StepM4</Value></Eq></And></Where></Query>";
		break;
		
	case ALL_STUDIES:
		$("#pgTitle").text('All Studies')
		$("#brdCurrPage").text('All Studies')
		$(this).attr("title", "All Studies");
		document.title = 'All Studies';
		strCaml = "<Query><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy><Where>"+mandatoryQuery+"</Where></Query>";
		break;
	
	case CANCELED:
	$("#pgTitle").text('Cancelled Studies')
		$("#brdCurrPage").text('Cancelled Studies')
		$(this).attr("title", "Cancelled Studies");
		document.title = 'Cancelled Studies';
		strCaml = "<Query><Where><Eq><FieldRef Name='studyCancel' /><Value Type='Boolean'>1</Value></Eq></Where><OrderBy><FieldRef Name='Modified'  Ascending='False' /></OrderBy></Query>";
	break;
	}
	
	getMyProject(strCaml);

}



function getMyProject(strCaml) {
	

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
		"<FieldRef Name='Study_x0020_Name' /><FieldRef Name='Bio_x0020_Informatics_x0020_Owne' /><FieldRef Name='Statistics_x0020_Owner' /><FieldRef Name='GC_x0020_Analyst' /><FieldRef Name='Title' /></ViewFields>";
		
	
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : "Study",
		CAMLQueryOptions : "<QueryOptions> <IncludeMandatoryColumns>True</IncludeMandatoryColumns><IncludeAttachmentUrls>TRUE</IncludeAttachmentUrls></QueryOptions>",
		CAMLQuery : strCaml,
		CAMLViewFields : viewFlds,
		CAMLRowLimit:2000,

		completefunc : function (xData, Status) {
			
			if($(xData.responseXML).SPFilterNode("z:row").length!=0)
			myStudiesRPT=$(xData.responseXML).SPFilterNode("z:row");
			
			getMyStudiesRPT(0);
		
			
		}
	});
	
}


function getMyStudiesRPT(z)
{


var strHtml = "<table width='100%' border='0' align='center' cellpadding='4' cellspacing='1' class='ms-WPBorder'>" +
		"<tr><td  height='15' align='left' class='ms-menutoolbar' style='font-weight:bold'>&nbsp;GSS#</td><td  height='15' align='left' style='font-weight:bold;white-space:nowrap' class='ms-menutoolbar'>&nbsp;Study Name</td><td  height='15' align='left' style='font-weight:bold;white-space:nowrap' class='ms-menutoolbar'>&nbsp;Major Milestone</td><td style='font-weight:bold'  align='left' class='ms-menutoolbar'>&nbsp;BU</td><td  style='font-weight:bold;white-space:nowrap' align='left' class='ms-menutoolbar'>&nbsp;Genomics</td><td style='font-weight:bold'  align='left' class='ms-menutoolbar'>&nbsp;Statistics</td><td style='font-weight:bold;white-space:nowrap'  align='left' class='ms-menutoolbar'>&nbsp;Bioinformatics</td></tr>";
	
 var x = 1;
 if(myStudiesRPT!=null)
 {
 var xLen=myStudiesRPT.length;

	myStudiesRPT.each(function (i) {


				if(i>=parseInt(z)*10 && i<=parseInt(z)*10+9)
				{

				if ($(this).attr('ows_Study_x0020_Name')) {
					if ($(this).attr('ows_Author'))
						var BU = $(this).attr('ows_Author').split(";#")[1];
					else
						var BU = "";
					
					if ($(this).attr('ows_GC_x0020_Analyst'))
						var GC = $(this).attr('ows_GC_x0020_Analyst').split(";#")[1];
					else
						var GC = "";
					
					if ($(this).attr('ows_Statistics_x0020_Owner'))
						var Stats = $(this).attr('ows_Statistics_x0020_Owner').split(";#")[1];
					else
						var Stats = "";
					
					if ($(this).attr('ows_Bio_x0020_Informatics_x0020_Owne'))
						var BioInfo = $(this).attr('ows_Bio_x0020_Informatics_x0020_Owne').split(";#")[1];
					else
						var BioInfo = "";
					
					var majorMileStone=$(this).attr('ows_enableStage');
					
					if(majorMileStone=="StepM1" ||majorMileStone=="StepM2a" || majorMileStone=="StepM2b" || majorMileStone=="StepM2c")
					majorMileStone="Clinical"
					else if(majorMileStone=="StepM2d" || majorMileStone=="StepM3a")
					majorMileStone="Genomics"
					else if(majorMileStone=="StepM3b")
					majorMileStone="Statistics"
					else if(majorMileStone=="StepM4")
					majorMileStone="Bio Informatics"
					else
					majorMileStone=""
					
					if (x % 2 != 0)
						strHtml += "<tr><td height='20' style='padding-left:10px' align='left' >" + $(this).attr('ows_GSSID') + "</td><td height='20' style='padding-left:10px;' align='left' ><a style='text-decoration:none' href='http://teamspace.pg.com/sites/genomics/Site%20Assets/Pages/studyForm.aspx?itmid=" + $(this).attr('ows_ID') + "'>" + $(this).attr('ows_Study_x0020_Name') + "</a></td><td height='20' style='padding-left:10px;white-space:nowrap' align='left' >" + majorMileStone + "</td><td height='20' style='padding-left:10px;white-space:nowrap' align='left' >" + BU + "</td><td height='20' style='padding-left:10px;white-space:nowrap' align='left' >" + GC + "</td><td height='20' style='padding-left:10px;white-space:nowrap' align='left' >" + Stats + "</td><td height='20' style='padding-left:10px;white-space:nowrap' align='left' >" + BioInfo + "</td></tr>";
					else
						strHtml += "<tr class='ms-alternating'><td height='20' style='padding-left:10px' align='left' >" + $(this).attr('ows_GSSID') + "</td><td height='20' style='padding-left:10px;' align='left' ><a style='text-decoration:none' href='http://teamspace.pg.com/sites/genomics/Site%20Assets/Pages/studyForm.aspx?itmid=" + $(this).attr('ows_ID') + "'>" + $(this).attr('ows_Study_x0020_Name') + "</a></td><td height='20' style='padding-left:10px;white-space:nowrap' align='left' >" +majorMileStone + "</td><td height='20' style='padding-left:10px;white-space:nowrap' align='left' >" + BU + "</td><td height='20' style='padding-left:10px;white-space:nowrap' align='left' >" + GC + "</td><td height='20' style='padding-left:10px;white-space:nowrap' align='left' >" + Stats + "</td><td height='20' style='padding-left:10px;white-space:nowrap' align='left' >" + BioInfo + "</td></tr>";
					
					x++;
					}
				}
			});
			
			
	}
	if(x>1)
	{
	strHtml+="</table>";
	
	strHtml+="<br/><br/><table width='100%' cellpadding=0 cellspacing=0 align=right><tr><td>";

	
	for(var j=0;j<xLen/10;j++)
	{
	if(j==0)
		strHtml+="<a href='javascript:void(0)' style='color:red' id='navi"+j+"' onclick='getMyStudiesRPT(&quot;"+j+"&quot;);highlightAnchor($(this).attr(&quot;id&quot;))'>"+(parseInt(j)+1)+"</a>&nbsp;&nbsp;&nbsp;";
	else
	strHtml+="<a href='javascript:void(0)' id='navi"+j+"' onclick='getMyStudiesRPT(&quot;"+j+"&quot;);highlightAnchor($(this).attr(&quot;id&quot;))'>"+(parseInt(j)+1)+"</a>&nbsp;&nbsp;&nbsp;";
		//<a href='javascript:void()' onclick='getNextPage(&quot;1&quot;)'>2</a>&nbsp;&nbsp;&nbsp;<a href='javascript:void()' onclick='getNextPage(&quot;2&quot;)'>3</a>&nbsp;&nbsp;&nbsp;<a href='javascript:void()' onclick='getNextPage(&quot;3&quot;)'>4</a>&nbsp;&nbsp;&nbsp;<a href='javascript:void()' onclick='getNextPage(&quot;4&quot;)'>5</a></td></tr></table>";
	}

	strHtml+="</td></tr></table>";
	
	
	}
	else
	{
		strHtml="<span style='font-weight:bold'> Studies are not available</span>";
	}
	$("#studyStatusDiv").html(strHtml);
	
	$(".ms-dlgOverlay").hide();
}


 function highlightAnchor(currObj)
 {

	 var anchorParent=$("#"+currObj).parent().find('a');
 
	 anchorParent.each(function(){
 	$(this).css('color','blue')
 	})
 
 	$("#"+currObj).css('color','red');
 }
 
