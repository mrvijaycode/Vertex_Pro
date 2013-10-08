/*
----------------------------------------------------------------------------------

Project Name: Global Capital Purchasing
File Type : JS file
Purpose  : Plan view and send for Approval
Created By : Rambabu CH
Created Date: Feb 24th, 2012
----------------------------------------------------------------------------------

 */

$(document).ready(function () {
	//debugger
	LoadFunction();
	AllSpensPoolItems();

	if (IsApprovalEnable) {
		$('#tdplanApproval').show();
	} else {
		$('#tdplanApproval').hide();
	}
	$('#MyPlan1').attr('src', 'http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/images/MasterPage%20Images/my_plans_hover_btn.jpg');
});

var sitePath = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc";
var oLists = new SPAPI_Lists(sitePath);

var IsApprovalEnable = false;

var planId = "";

function LoadFunction() {
	document.title = "My Plan Items";
	planId = gup('SId');
	if (planId == "") {
		window.location = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Home.aspx";
	} else {
		// For approval
		ApprovalStatus(planId)
	}
	ChangeNewMessage();
}
function ChangeNewMessage() {

	var a = document.getElementsByTagName("TD")
		for (var i = 0; i < a.length; i++) {
			if (a[i].className == "ms-vb") {
				if (a[i].innerText.indexOf('To create a new item, click "New" above.') > -1) {
					a[i].innerHTML = "No Items Found";
				}
			}
		}
}

// For Plan is send for Approval o Not
var Clusterleader = "";
var PGM = "";
var AD = "";
var ETC = "";
var Total_Final = "";

function ApprovalStatus(planId) {
	//debugger
	var sQuery = "<Query>";
	sQuery += "<Where>";
	sQuery += "<Eq>";
	sQuery += "<FieldRef Name='ID' />";
	sQuery += "<Value Type='Counter'>" + planId + "</Value>";
	sQuery += "</Eq>";
	sQuery += "</Where>";
	sQuery += "</Query>";
	var viewfields = "<ViewFields><FieldRef Name='Title' /> <FieldRef Name='S_SiteBuyer1_UpManager_ClusterLe' /><FieldRef Name='S_CapitalPurchasesPGM' /><FieldRef Name='S_CapitalPurchasesAD' /><FieldRef Name='Total_Estimated_Cost' /></ViewFields>";

	var res = oLists.getListItems("SourcingPlan", "", sQuery, viewfields, "", '', "");

	if (res.status == 200) {
		var rows = res.responseXML.getElementsByTagName("z:row");
		if (rows.length > 0) {
			var Title = rows[0].getAttribute('ows_Title');

			Clusterleader = rows[0].getAttribute('ows_S_SiteBuyer1_UpManager_ClusterLe');
			PGM = rows[0].getAttribute('ows_S_CapitalPurchasesPGM');
			AD = rows[0].getAttribute('ows_S_CapitalPurchasesAD');
			SiteOwner = rows[0].getAttribute('ows_ProjectPurchasesManager');

			ETC = rows[0].getAttribute('ows_Total_Estimated_Cost');
			Total_Final = rows[0].getAttribute('ows_Total_Final');

			if (Title != "Pending" && Title != "Approved") {
				//document.getElementById('tdplanApproval').style.display = 'block'; // for Approval
				IsApprovalEnable = true;
			} else {
				//document.getElementById('tdplanApproval').style.display = 'none'; // for Approval
				IsApprovalEnable = false;
			}

		}
	}

}
// edit plan
function planEdit() {

	var planId = gup('SId');
	if (planId != "")
		window.location = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Lists/SourcingPlan/EditSourcingPlan.aspx?ID=" + planId + "&Source=http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/WPPages/MyPlanItems.aspx?SId=" + planId;
}
// For send Approval
function planApproval() {
	//debugger
	var PlanApprover = "";
	var planId = gup('SId');
	var SpenPoolTotal = document.getElementById('SpenPoolTotal');
	if (SpenPoolTotal != null) {
		SpenPoolTotal = SpenPoolTotal.innerText.replace(/,/gi, "").replace("$", "");
	} else {
		alert('Please add the spend pool items to the plan before sending for approval');
		return false
	}

	if ((SiteOwner == AD) || (SiteOwner == PGM) || (SiteOwner == Clusterleader)) {
		alert('The Appover cannot be the same person as the Purchases sourcing Plan Owner.Please go back and edit the required data.');
		return false;
	}

	ETC = ETC.replace(/,/gi, "");
	if (Number(ETC) != Number(SpenPoolTotal)) {
		alert('Total Estimated Cost must match with Total Estimated Spend ');
		return false;
	}
	if (planId != "") {
		if (ETC < 5000000) {
			if (Clusterleader != null)
				PlanApprover = Clusterleader;
			else {
				alert('Select user in the Plan ');
				return false
			}
		} else if (ETC >= 5000000 && ETC < 10000000) {
			if (PGM != null)
				PlanApprover = PGM;
			else {
				alert('Select PGM in the Plan ');
				return false
			}

		} else {
			if (AD != null)
				PlanApprover = AD;
			else {
				alert('Select AD in the Plan ');
				return false
			}

		}
		var oWs = oLists.quickUpdateListItem("SourcingPlan", [{
						Title : "Pending",
						Plan_Approver : PlanApprover,
						ID : planId
					}
				]);
		if (oWs.status == 200) {
			//document.getElementById('tdplanApproval').style.display = 'none'; // for Approval
			IsApprovalEnable = false;
			alert('Sourcing Plan sent for approval');
			$('#tdplanApproval').hide();
		}
	}
}

function AllSpensPoolItems() {
//debugger;
	
	var qry='<Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">'+planId+'</Value></Eq></Where></Query>';
	chkCount(qry,"Total");
	
	qry='<Query><Where><And><Eq><FieldRef Name="Title" /><Value Type="Text">'+planId+'</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Cancelled</Value></Eq></And></Where></Query>';
	chkCount(qry,"Cancel");

	qry='<Query><Where><And><Eq><FieldRef Name="Status" /><Value Type="Choice">Create</Value></Eq><Eq><FieldRef Name="Title" /><Value Type="Text">'+planId+'</Value></Eq></And></Where></Query>';
	chkCount(qry,"Active");
}


var totalSpendPoolsForThisItem = null;
function chkCount(qry, state) {
	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		listName : "SourcingPlanItems", // List Name
		CAMLQuery : qry,
		completefunc : function (xData, Status) {
		
			//alert(xData.responseText);
			switch (state) {

			case "Total":
				totalSpendPoolsForThisItem = $(xData.responseXML).SPFilterNode("rs:data").attr('ItemCount');
				break;

			case "Cancel":
				var itemCount = $(xData.responseXML).SPFilterNode("rs:data").attr('ItemCount');
				if (totalSpendPoolsForThisItem == itemCount) {
					IsApprovalEnable = false;
				}
				break;

			case "Active":
				var itemCount = $(xData.responseXML).SPFilterNode("rs:data").attr('ItemCount');
				if (parseInt(itemCount) > 0) {
					IsApprovalEnable = false;
				}
				break;
			}
		}
	});
}