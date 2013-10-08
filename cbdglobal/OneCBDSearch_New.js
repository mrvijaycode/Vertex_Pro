
//****************************************************************************************
//-----------------Global CBD Capability Curriculum Search Results------------------
//---This java script file is intended to Get the Lookup values---
//--- ---
//---Created By - RajeshN 23nd Oct 2012 date---
//---Modified By - RajeshN ---
//---Reviewed By -- VenkatCH---
//****************************************************************************************
//http://teamspace.pg.com/sites/cbdglobal/Pages/OneCBD/FindYourLearningResources.aspx
//---Configuration Variables ---


var trainigID = 0;
var siteurl = "http://teamspace.pg.com/sites/cbdglobal";
var oLists = new SPAPI_Lists(siteurl);
var oRolesList = "CBD Learning Resources Roles";
var oCategoriesList = "CBD Learning Resources Power";
var oTrainingTypesList = "CBD Learning Resources Categories"; //CBD Learning Resources Categories
var oTrainingsList = "CBD Learning Resources";

//--Global Variable---
var varRole;
var viewRole;
var varRoleRows;
var strRole = "";
var valueRole;
var valueRole1;

var varTrainingType;
var viewTrainingType;
var varTrainingTypeRows;
var strTrainingType = "";
var valueTrainingType;

var varCategories;
var viewCategories;
var varCategoriesRows;
var strCategories = "";
var valueCategories;

var searchView;
var searchResult;
var searchRows;
var selRole;
var selSubRole;
var selRRole;
var selTrainibgType;
var selCategories;
var MaxValueQuery;
var MaxID = 0;
var leastID = 0;
var actualCount = 0;
var searchQuery = '';
var TrainingTitle = "All Learning Resources";

$(document).ready(function () {

	drpRole();
	//drpCompetency();
	drpCBDSubject();
	//drpTrainingType();
	drpCategories();
	searchResults('Next', trainigID, '');
	GetMaxId();
	$('#btnSearch').click(function () {
		TrainingTitle = "All Learning Resources";
		$('#selRole').get(0).selectedIndex = 0;
		$('#selSubRole').get(0).selectedIndex = 0;
		$('#selRRole').get(0).selectedIndex = 0;
		$('#selCategories').get(0).selectedIndex = 0;
		$('#selSubject').get(0).selectedIndex = 0;
		//selSubject
		getAll('All');
	});
	$('#selCategories').change(function () {
		TrainingTitle = $(this).find('option:selected').text() + " Learning Resources";
		getAll('Power')
	})
	$('#selRole').change(function () {
		TrainingTitle = $(this).find('option:selected').text() + " Learning Resources";
		getAll('Role')
	})
	$('#selSubRole').change(function () {
		TrainingTitle = $(this).find('option:selected').text() + " Learning Resources";
		getAll('SubRole')
	})
	$('#selRRole').change(function () {
		TrainingTitle = $(this).find('option:selected').text() + " Learning Resources";
		getAll('RRole')
	})
	$('#selSubject').change(function () {
		TrainingTitle = $(this).find('option:selected').text() + " Learning Resources";
		getAll('Subject')
	})
});

function getAll(SelID) {

	MaxID = 0;
	leastID = 0;
	trainigID = 0;
	actualCount = 0;
	searchResults('Next', trainigID, SelID);
	GetMaxId();

	if (SelID == 'Power') {
		//$('#selCategories').get(0).selectedIndex=0;
		//$('#selRole').get(0).selectedIndex=0;
		$('#selSubRole').get(0).selectedIndex = 0;
		$('#selRRole').get(0).selectedIndex = 0;
		$('#selSubject').get(0).selectedIndex = 0;

	} else if (SelID == 'Subject') {
		$('#selCategories').get(0).selectedIndex = 0;
		$('#selRole').get(0).selectedIndex = 0;
		//$('#selSubRole').get(0).selectedIndex=0;
		$('#selRRole').get(0).selectedIndex = 0;
		//$('#selSubject').get(0).selectedIndex=0;

	} else if (SelID == 'RRole') {
		$('#selCategories').get(0).selectedIndex = 0;
		$('#selRole').get(0).selectedIndex = 0;
		$('#selSubRole').get(0).selectedIndex = 0;
		// $('#selRRole').get(0).selectedIndex=0;
		$('#selSubject').get(0).selectedIndex = 0;
	}
}

var viewfields = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='ID' /></ViewFields>";
var qry = '<Query><OrderBy><FieldRef Name="ID" Ascending="True" /></OrderBy></Query>';
// Bind Role to Dropdown
function drpRole() {
	$(document).attr("title", "Find Your CBD Learning Resources");
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : oRolesList,
		CAMLQuery : qry,
		CAMLViewFields : viewfields,
		completefunc : function (xData, Status) {
			$(xData.responseXML).SPFilterNode("z:row").each(function (i) {
				valueRole = $(this).attr("ows_Title");
				var RoleID = $(this).attr("ows_ID");
				if (strRole.indexOf(valueRole) == -1) {
					strRole = strRole + valueRole;
					$("#selRole").append($('<option value="' + RoleID + '"></option>').html(valueRole));
					$("#selSubRole").append($('<option value="' + RoleID + '"></option>').html(valueRole));
					$("#selRRole").append($('<option value="' + RoleID + '"></option>').html(valueRole));
				}
			});
		}
	});

}
// Bind Role to Dropdown
function drpCBDSubject() {
	$(document).attr("title", "Find Your CBD Learning Resources");
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : "CBD Subject",
		CAMLQuery : '<Query><OrderBy><FieldRef Name="Title" /></OrderBy><Where><IsNotNull><FieldRef Name="Title" /></IsNotNull></Where></Query>',
		CAMLViewFields : viewfields,
		completefunc : function (xData, Status) {
			$(xData.responseXML).SPFilterNode("z:row").each(function (i) {
				valueRole1 = $(this).attr("ows_Title");
				var RoleID1 = $(this).attr("ows_ID");
				if (strRole.indexOf(valueRole1) == -1) {
					strRole = strRole + valueRole1;
					if (valueRole1 != null)
						$("#selSubject").append($('<option value="' + RoleID1 + '"></option>').html(valueRole1));

				}
			});
		}
	});

}

// Bind Role to Dropdown
function drpCompetency() {
	$(document).attr("title", "Find Your CBD Learning Resources");
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : oTrainingsList,
		CAMLQuery : '<Query><OrderBy><FieldRef Name="Title" /></OrderBy><Where><IsNotNull><FieldRef Name="Title" /></IsNotNull></Where></Query>',
		CAMLViewFields : viewfields,
		completefunc : function (xData, Status) {
			$(xData.responseXML).SPFilterNode("z:row").each(function (i) {
				valueRole = $(this).attr("ows_Title");
				var RoleID = $(this).attr("ows_ID");
				if (strRole.indexOf(valueRole) == -1) {
					strRole = strRole + valueRole;
					if (valueRole != null)
						$("#selCategories").append($('<option value="' + valueRole + '"></option>').html(valueRole));

				}
			});
		}
	});

}

//var btnDesign+='';
// Bind Training Type to Dropdown
function drpTrainingType() {
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : oTrainingTypesList,
		CAMLQuery : qry,
		CAMLViewFields : viewfields,
		completefunc : function (xData, Status) {
			$(xData.responseXML).SPFilterNode("z:row").each(function (i) {
				valueTrainingType = $(this).attr("ows_Title");
				var TrainingTypeID = $(this).attr("ows_ID");
				if (strTrainingType.indexOf(valueTrainingType) == -1) {
					strTrainingType = strTrainingType + valueTrainingType;
					$("#selTrainingType").append($('<option value="' + TrainingTypeID + '"></option>').html(valueTrainingType));
				}
			});
		}
	});
}

// Bind Categories to Dropdown
function drpCategories() {
	var viewfields1 = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='ID' /><FieldRef Name='UIDisplay' /></ViewFields>";

	var qry1 = "<Query><OrderBy><FieldRef Name='ID' Ascending='True' /></OrderBy><Where><Eq><FieldRef Name='UIDisplay' /><Value Type='Boolean'>1</Value></Eq></Where></Query>";

	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : oCategoriesList,
		CAMLQuery : qry1,
		CAMLViewFields : viewfields1,
		completefunc : function (xData, Status) {
			$(xData.responseXML).SPFilterNode("z:row").each(function (i) {
				valueCategories = $(this).attr("ows_Title");
				var CategoryID = $(this).attr("ows_ID");
				if (strCategories.indexOf(valueCategories) == -1) {
					strCategories = strCategories + valueCategories;
					$("#selCategories").append($('<option value="' + CategoryID + '"></option>').html(valueCategories));
				}
			});
		}
	});

}
var QueryStatus = false;
var QueryMiddlePart = "";

//---Summary---
// Function to construct query dynamically
//---Summary---


function GenerateQuery(Position, currID) {
	//debugger
	var QueryBeginPart = "";
	//  var QueryMiddlePart="";
	var QueryEndPart = "";
	var counter = 1;

	var Fields = new Array("Categories", "Role", "Subject", "Role", "Role");
	var ControlNames = new Array("#selCategories", "#selRole", "#selSubject", "#selSubRole", "#selRRole");
	QueryBeginPart = "<Query><OrderBy><FieldRef Name='Colleges_x0020_Trainings' /></OrderBy><Where>";
	QueryEndPart = "</Where></Query>";
	if (!QueryStatus) {
		QueryMiddlePart = "";

		for (var i = 0; i < Fields.length; i++) {
			var FieldName = ControlNames[i];
			var FieldValue = $(FieldName).val();
			//&amp;
			if (FieldValue.indexOf("&") != -1)
				FieldValue = FieldValue.replace("&", "&amp;");
			var FieldText = $(FieldName).text();
			var selVal = $(FieldName).get(0).selectedIndex
				if (selVal != 0) {
					var valtype = "<Value Type='Lookup'>"
						if (Fields[i] == "Role")
							valtype = "<Value Type='LookupMulti'>"
								if (Fields[i] == "Subject")
									valtype = "<Value Type='LookupMulti'>"
										if (counter == 1) {
											QueryMiddlePart = "<Eq><FieldRef Name='" + Fields[i] + "' LookupId='TRUE' />" + valtype + FieldValue + "</Value></Eq>";

										} else {
											QueryMiddlePart = "<And>" + QueryMiddlePart + "<Eq><FieldRef Name='" + Fields[i] + "' LookupId='TRUE' />" + valtype + FieldValue + "</Value></Eq></And>";
										}
										counter++;
				}
		}
	}

	if (QueryMiddlePart != "") {
		if (Position == 'Previous')
			var Query = "<Query><OrderBy><FieldRef Name='Colleges_x0020_Trainings' /></OrderBy><Where><And><Lt><FieldRef Name='ID' /><Value Type='Counter'>" + currID + "</Value></Lt>" + QueryMiddlePart + "</And>" + QueryEndPart;
		else if (Position == 'Next')
			var Query = QueryBeginPart + "<And><Gt><FieldRef Name='ID' /><Value Type='Counter'>" + currID + "</Value></Gt>" + QueryMiddlePart + "</And>" + QueryEndPart;
	} else {
		if (Position == 'Previous')
			var Query = "<Query><OrderBy><FieldRef Name='Colleges_x0020_Trainings' /></OrderBy><Where><Lt><FieldRef Name='ID' /><Value Type='Counter'>" + currID + "</Value></Lt></Where></Query>";
		else if (Position == 'Next')
			var Query = "<Query><OrderBy><FieldRef Name='Colleges_x0020_Trainings' /></OrderBy><Where><Gt><FieldRef Name='ID' /><Value Type='Counter'>" + currID + "</Value></Gt></Where></Query>";
	}

	if (QueryMiddlePart != "")
		MaxValueQuery = "<Query><OrderBy><FieldRef Name='Colleges_x0020_Trainings' /></OrderBy><Where>" + QueryMiddlePart + "</Where></Query>";
	else
		MaxValueQuery = "<Query><OrderBy><FieldRef Name='Colleges_x0020_Trainings' /></OrderBy></Query>";
	return Query;
}

function getSelRole(selVal) {
	$("#selRole option").each(function () {
		if ($(this).val() == selVal)
			TrainingTitle = $(this).text() + " Learning Resources";
	});

	searchQuery = "";
	$("#selRole").val(selVal);
	getAll();
}

//Shows search results
var PreviousID = 0;
var listNextPos;
var strtID;
var endID;
var Fullcount = 0;


function searchResults(Position, currID, SeldrpID) {
	//debugger
	if (SeldrpID == 'Power') {
		//$('#selCategories').get(0).selectedIndex=0;
		//$('#selRole').get(0).selectedIndex=0;
		$('#selSubRole').get(0).selectedIndex = 0;
		$('#selRRole').get(0).selectedIndex = 0;
		$('#selSubject').get(0).selectedIndex = 0;

	} else if (SeldrpID == 'Subject') {
		$('#selCategories').get(0).selectedIndex = 0;
		$('#selRole').get(0).selectedIndex = 0;
		//$('#selSubRole').get(0).selectedIndex=0;
		$('#selRRole').get(0).selectedIndex = 0;
		//$('#selSubject').get(0).selectedIndex=0;

	} else if (SeldrpID == 'RRole') {
		$('#selCategories').get(0).selectedIndex = 0;
		$('#selRole').get(0).selectedIndex = 0;
		$('#selSubRole').get(0).selectedIndex = 0;
		// $('#selRRole').get(0).selectedIndex=0;
		$('#selSubject').get(0).selectedIndex = 0;

	}

	if (Position != 'Next') {
		actualCount -= Fullcount;
		actualCount -= 5;
	}
	var listNext = 0;

	searchQuery = GenerateQuery(Position, currID);
	
	//debugger;
				
	spfiles = [];

	var totalItems = 0;
	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		listName : oTrainingsList, // List Name
		CAMLViewFields : "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /><FieldRef Name='LinkTitle' /><FieldRef Name='Colleges_x0020_Trainings' /><FieldRef Name='Format1' /><FieldRef Name='Objective' /><FieldRef Name='LinkForTraining' /><FieldRef Name='Training_x0020_Type' /><FieldRef Name='Categories' /><FieldRef Name='Role' /> </ViewFields>",
		CAMLQuery : searchQuery,
		completefunc : function (xData, Status) {
			//alert(xData.responseText);
			if (xData.status == 200) {
				totalItems = $(xData.responseXML).SPFilterNode("rs:data").attr('ItemCount');

				$(xData.responseXML).SPFilterNode("z:row").each(function (i) {

					//var new_obj = {'itmid':"vij"};

					if ($(this).attr("ows_ID") != null)
						var itmid = $(this).attr("ows_ID");
					else
						var itmid = "";

					if ($(this).attr("ows_Title") != null)
						var itmTitle = $(this).attr("ows_Title");
					else
						var itmTitle = "";

					if ($(this).attr("ows_LinkTitle") != null)
						var itmLinkTitle = $(this).attr("ows_LinkTitle");
					else
						var itmLinkTitle = "";

					if ($(this).attr("ows_Colleges_x0020_Trainings") != null)
						var itmColleges = $(this).attr("ows_Colleges_x0020_Trainings");
					else
						var itmColleges = "";

					if ($(this).attr("ows_Format1") != null)
						var itmFormat1 = $(this).attr("ows_Format1");
					else
						var itmFormat1 = "";

					if ($(this).attr("ows_Objective") != null)
						var itmObjective = $(this).attr("ows_Objective");
					else
						var itmObjective = "";

					if ($(this).attr("ows_LinkForTraining") != null)
						var itmLinkForTraining = $(this).attr("ows_LinkForTraining");
					else
						var itmLinkForTraining = "";

					if ($(this).attr("ows_Training_x0020_Type") != null)
						var itmTraining = $(this).attr("ows_Training_x0020_Type");
					else
						var itmTraining = "";

					if ($(this).attr("ows_Categories") != null)
						var itmCategories = $(this).attr("ows_Categories");
					else
						var itmCategories = "";

					if ($(this).attr("ows_Role") != null)
						var itmRole = $(this).attr("ows_Role");
					else
						var itmRole = "";

					var new_obj = {
						"itmid" : itmid,
						"itmTitle" : itmTitle,
						"itmLinkTitle" : itmLinkTitle,
						"itmColleges" : itmColleges,
						"itmFormat1" : itmFormat1,
						"itmObjective" : itmObjective,
						"itmLinkForTraining" : itmLinkForTraining,
						"itmTraining" : itmTraining,
						"itmCategories" : itmCategories,
						"itmRole" : itmRole
					};

					spfiles.push(new_obj);
				});

			} else {
				alert(xData.status);
			}
		}
	});

	mainload();
}

function sortArray(trainingArray) {
	var count = trainingArray.length;
	var x = count - 1;
	var sortedArray = new Array(count);
	$.each(trainingArray, function (i) {
		sortedArray[x] = $(this);
		x--;
	})
	return sortedArray;
}

function GetMaxId() {
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : oTrainingsList,
		CAMLQuery : MaxValueQuery,
		completefunc : function (xData, Status) {
			var count = $(xData.responseXML).SPFilterNode("z:row").length;
			$(xData.responseXML).SPFilterNode("z:row").each(function (i) {
				if (i == 0)
					MaxID = $(this).attr('ows_ID');
				if (i == count - 1)
					leastID = $(this).attr('ows_ID');
			});
		}
	});
}

var spfiles = [];
var i = -1;
var t = "";
var k = 0;
var PageNo = 0;

var totCount= 0;

function mainload() {
	PageNo = 0;
	builtContents(PageNo);
	$("#tdSelTitle").text(TrainingTitle);
}

function roles(j) {
	
var roleArray=spfiles[j].itmRole.split(';#');
var roleCount=roleArray.length;

	var roles = "";
	$.each(roleArray, function (i) {
		if ((i + 1) % 2 == 0) {
			roles += "<a href='javascript:void(0)' onclick='getSelRole(&quot;" + roleArray[i - 1] + "&quot;)'>" + roleArray[i] + "</a>";
			if ((i + 1) != roleCount)
				roles += ", ";
		}
	});
	
	return roles;
}


function builtContents(pageN) {
	t = spfiles.length - 1;
	var start = pageN * 5;
	var end = start + 5;
	var str = "";
	totCount = t / 5;	
	
	var tbl = "<table width='100%' cellSpacing='0' cellPadding='0'>";
	if (spfiles.length > 0) {
		for (var j = start; j < end; j++) {
			if (j <= t) {
				tbl += "<tr><td>";
				tbl += "<table id='innerTbl'>";
				tbl += "<tr><td class='itemTitle'><a href='" + spfiles[j].itmLinkForTraining.split(',')[0] + "' target='_blank'>" + spfiles[j].itmColleges + "</a></td></tr>";

				tbl += "<tr><td class=\"itemtitle\" style=\"font-weight: normal; color: black; padding-top: 5px; line-height: 120%\">" + spfiles[j].itmObjective + "</td></tr>";

				tbl += "<tr><td><span class='info2'>Power:</span>&nbsp;&nbsp;<span class='info3'>" + spfiles[j].itmCategories.split("#")[1] + "</span>&nbsp;&nbsp;<span class='info2'>Format:</span>&nbsp;&nbsp;<span class='info3'>" + spfiles[j].itmFormat1.replace(/;#/gi, "");
				 + "</span></td></tr>";

				tbl += "<tr><td><span class='info2'>Role:</span>&nbsp;&nbsp;<span class='info3'><a onclick='getselrole(\"5\")' href=\"javascript:void(0)\">" + roles(j) + "</a></span> &nbsp;&nbsp; <span class='info2'>Category:</span>&nbsp;&nbsp;<span class='info3'>" + spfiles[j].itmTraining.split(';#')[1];
				 + "</span> </td></tr>";

				tbl += "</table>";
				tbl += "</td></tr>";
				tbl += "<tr><td height='5'></td></tr>";
				tbl += "<tr><td bgcolor='#e2e2e2' height='1'></td></tr>";
			}
		}
	} else {
		tbl += "<tr><td>No records found.</td></tr>";
	}
	
	tbl += "</table>";
	var maintble = "<table width='100%' bgColor='#e2e2e2' cellSpacing='2' cellPadding='2'><tr><td bgColor='white'>" + tbl + "</td></tr></table>";

	var tot= parseInt(t)+1;
	if(end>tot)
	{
		end=tot;
	}
	
	var headers = "<table width='100%' border='0' cellSpacing='0' align='center' cellPadding='0'><tr><td class='itemTitle' style='14px;color:#70655e'> Results :"+start+" - "+end+" of "+tot+"</td><td align=right class='norTxt' style='padding: 5px;'><a href='javascript:void(0)' id='btnPrev' onclick='prev()'>Previous</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' id='btnNext' onclick='next()'>Next</a></td></tr><tr><td height=3px></td></tr></table>";

	$("#tdResult").html(headers + maintble);
}

function next() {
	if (PageNo < totCount - 1) {
		$('#btnPrev').show();
		$('#btnNext').show();
		PageNo = PageNo + 1;
		builtContents(PageNo);
	} else {
		$('#btnNext').hide();
		$('#btnPrev').show();
	}
}

function prev() {
	if (PageNo > 0) {
		$('#btnPrev').show();
		$('#btnNext').show();
		PageNo = PageNo - 1;
		builtContents(PageNo);
	} else {
		$('#btnPrev').hide();
		$('#btnNext').show();
	}
}