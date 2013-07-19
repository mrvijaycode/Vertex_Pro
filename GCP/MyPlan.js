//----------------------------------------------------------------------------------
//Project Name: Global Capital Purchasing
//File Type : JS file
//Purpose  : Display Sourcing Plans and related Speding Items
//Created By : China Veeraiah B
//Created Date: Jun 15th 2013.
//----------------------------------------------------------------------------------

var strUrl = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc";
var loginUserName = '';
var sQuery = '';

var curUser = $().SPServices.SPGetCurrentUser({
		fieldName : "Title",
		debug : false
	});

//alert(curUser);

var viewflds = "";


$(document).ready(function () {
	getSourcePlans();
});


function getSourcePlans()
{
	var strContents = '<table id="myPlans" width="100%" class="tablesorter"  border="0" cellSpacing="0" cellPadding="5" >';
	strContents += '<thead><tr><th colspan="2">Sourcing Plan</th><th>Status</th><th colspan="3">Approved Date</th></tr></thead>';

	sQuery = '<Query><Where><Eq><FieldRef Name="ProjectPurchasesManager" /><Value Type="User">' + curUser + '</Value></Eq></Where></Query>';

	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : "SourcingPlan",
		CAMLQuery : sQuery,
		completefunc : function (xData, Status) {

			//debugger
			$(xData.responseXML).SPFilterNode("z:row").each(function () {
				var PlanId = $(this).attr('ows_ID');
				var SrcPlan = $(this).attr('ows_SourcingPlan');
				var planStatus = $(this).attr('ows_LinkTitle');
				if (planStatus == null || planStatus == undefined)
					planStatus = '';

				var estimatedCost = $(this).attr('ows_Total_Estimated_Cost');

				var date = "";
				if (estimatedCost < 5000000) {
					date = $(this).attr('ows_S_SiteBuyer1_UpManager_ClusterLe0');
				} else if (estimatedCost >= 5000000 && estimatedCost < 10000000) {
					date = $(this).attr('ows_S_CapitalPurchasesPGM_Date');
				} else {
					date = $(this).attr('ows_S_CapitalPurchasesAD_Date');
				}

				if (date == null || date == undefined) {
					date = '';
				} else {
					date = reformDate(date);
				}

				if (planStatus == "Pending" || planStatus == "") {
					date = "";
					if (planStatus == "") {
						planStatus = 'Not yet sent for approval';
					}
				}
				
				strContents += '<tr><td class="ms-vb2" vAlign="top"><input type="radio" name="dynradio" id="btnRadio" onclick="javascript:getSpendingItem(&quot;' + PlanId + '&quot;)"; /></td><td class="ms-vb2">' + SrcPlan + '</td><td class="ms-vb2">' + planStatus + '</td><td class="ms-vb2">' + date + '</td>';
				strContents += '<td class="ms-vb2" vAlign="top"><a href="http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Lists/SourcingPlan/EditSourcingPlan.aspx?ID=' + PlanId + '&Source=http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Site%20Pages/MyPlan.aspx">Edit</a></td>';
				strContents += '<td class="ms-vb2" vAlign="top"><a href="http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/WPPages/MyPlanItems.aspx?SId=' + PlanId + '&Source=http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Site%20Pages/MyPlan.aspx">View</a></td>';
				
				strContents += '<td class="ms-vb2" vAlign="top"><a href="javascript:void(0)" onclick="javascript:deleteSourcePlan('+PlanId+')">Delete</a></td>';
				
				strContents += '</tr>';
			});
		}
	});

	strContents += '<table width="100%" border="0" cellSpacing="0" cellPadding="0"><TBODY><TR><TD class=ms-partline colSpan=2><IMG alt="" src="/_layouts/images/blank.gif" width=1 height=1></TD></TR>';
	strContents += '	<TR><TD style="PADDING-BOTTOM: 3px; PADDING-TOP: 10px" class=ms-addnew><IMG alt="" src="/_layouts/images/rect.gif">&nbsp;<B><A style="FONT-SIZE: x-small" id=idAddNewItem class=ms-addnew  href="http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Lists/SourcingPlan/NewForm.aspx?Source=http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Site%20Pages/MyPlan.aspx" target=_self>Create Sourcing Plan</A></B></TD></TR><TR><TD><IMG alt="" src="/_layouts/images/blank.gif" width=1 height=5></TD></TR></TBODY><table>';

	strContents += '</table>';
	$('#poolID').html(strContents);

	$("#myPlans").tablesorter({
		// sort on the first column and third column, order asc
		//sortList: [[0,0],[2,0]]
	});

}



// Customm date format
function reformDate(date) {
	var curdate = date.split(" ")[0];
	curdate = curdate.split("-");
	curdate = curdate[1] + "/" + curdate[2] + "/" + curdate[0];
	return curdate
}

// Function to get spending items
var xml = '';
var rowlength = '';
var sourceId = "";


function getSpendingItem(PoolId) {
	sourceId = PoolId;
	$('#tblSpendingItem').html("");
	var strTable = '<table id="myTasks" width="100%" class="tablesorter"  border="0" cellSpacing="0" cellPadding="5" ><THEAD>';
	strTable += '<tr id="trSpend" vAlign="top"><th width="15%">Spending Pool</th><th width="10%">Material Code</th><th width="10%">Sourcing Timing</th><th width="10%">Buyer / Spend Pool Owner</th><th width="10%" align="center">Status</th><th width="10%"></th></tr></THEAD>';

	//	var spendItemID = PoolId;
	var spedQuery = '<Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + PoolId + '</Value></Eq></Where></Query>';
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : "SourcingPlanItems",
		CAMLQuery : spedQuery,
		completefunc : function (xData, Status) {
			//debugger;
			xml = xData.responseXML;
			rowlength = $(xData.responseXML).SPFilterNode("z:row").length;

			if (rowlength > 0) {

				$(xData.responseXML).SPFilterNode("z:row").each(function () {
					var SpendItemID = $(this).attr('ows_ID');
					var spendingPool = $(this).attr('ows_SpendingPool');
					var mtrlCode = $(this).attr('ows_MaterialCode');
					var srcTiming = $(this).attr('ows_SourcingTiming');
					if (srcTiming == null || srcTiming == undefined) {
						srcTiming = "";
					} else {
						srcTiming = reformDate(srcTiming);
					}
					var poolOwner = $(this).attr('ows_Buyer_SpendPoolOwner');
					poolOwner = poolOwner.split(';#')[1];

					var status = $(this).attr('ows_Status');
					if (status == null || status == undefined)
						status = '';

					strTable += '<tr><td class="ms-vb2" vAlign="top">' + spendingPool + '</td><td class="ms-vb2">' + mtrlCode + '</td><td class="ms-vb2">' + srcTiming + '</td><td class="ms-vb2">' + poolOwner + '</td><td class="ms-vb2" align="center">' + status + '</td><td class="ms-vb2"><a href="javascript:deleteSpendingItem(&quot;' + SpendItemID + '&quot;,true)";>Delete</a></td></tr>';
				});
			} else {
			
			strTable +="<tr><td colspan='6' align='center'>No data found.</td></tr>";
			}

		}
	});
	strTable += '</table>';

	$('#tblSpendingItem').html(strTable);

	$("#myTasks").tablesorter({
		// sort on the first column and third column, order asc
		//sortList: [[0,0],[2,0]]
	});

	var urlLink = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Lists/SourcingPlanItems/NewSourcingPlanItems.aspx?List=a39c2441-e8d7-479e-9090-45e3d863c103&SId=" + PoolId + "&Source=http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Site Pages/MyPlan.aspx?SId=" + PoolId;

	var newTask = '<table width="100%" border="0" cellSpacing="0" cellPadding="0"><TBODY><TR><TD class=ms-partline colSpan=2><IMG alt="" src="/_layouts/images/blank.gif" width=1 height=1></TD></TR><TR>';
	newTask += '<TD style="PADDING-BOTTOM: 3px; HEIGHT: 21px; PADDING-TOP: 10px" class=ms-addnew><IMG alt="" src="/_layouts/images/rect.gif">&nbsp;<A style="FONT-SIZE: x-small" id=idAddNewItem0 class=ms-addnew  href="' + urlLink + '" target=_self>Add New Material Item</A></TD></TR>';
	newTask += '<TR><TD><IMG alt="" src="/_layouts/images/blank.gif" width=1 height=5></TD></TR></TBODY></table>';

	$('#divNew').html(newTask);
}

//function to delete Speding pool Item

function deleteSpendingItem(itemID, Isalert) {
	var docId = itemID;

	if (Isalert) {
		var response = confirm("Are you sure you want to delete the Sourcing Plan Item ?");
	} else {
		var response = true;
	}
	if (response == true) {
		var sQuery = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">' + docId + '</Value></Eq></Where></Query>';
		$().SPServices({
			operation : "UpdateListItems",
			async : false,
			batchCmd : "Delete",
			listName : "SourcingPlanItems",
			ID : docId,
			completefunc : function (xData, Status) {

				if (Isalert)
					alert('Souece Plan Item deleted successfully');

				//location.reload();
				getSpendingItem(sourceId);
			}
		});
	}
}

function deleteSourcePlan(planid)
{
var response = confirm("Are you sure you want to delete the Sourcing Plan Item ?");
//debugger;
	if (response == true) {	
	getAllSpendPoolsOf(planid);
		$().SPServices({
			operation : "UpdateListItems",
			async : false,
			batchCmd : "Delete",
			listName : "SourcingPlan",
			ID : planid,
			completefunc : function (xData, Status) {
				alert('Souece Plan & SpendPool items are deleted successfully');
				getSourcePlans();
			}
		});
	}
}


//var SpendPools=[];
function getAllSpendPoolsOf(poolid) {
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : "SourcingPlanItems",
		CAMLQuery : '<Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">'+poolid+'</Value></Eq></Where></Query>',
		completefunc : function (xData, Status) {
			//location.reload();
				if (xData.status == 200) {
					$(xData.responseXML).SPFilterNode("z:row").each(function () {
						deleteSpendingItem($(this).attr("ows_ID"),false);
					});
				} else {
					alert(xData.status);
				}
		}
	});
}