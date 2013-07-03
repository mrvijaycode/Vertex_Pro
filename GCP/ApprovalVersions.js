/*
----------------------------------------------------------------------------------
Project Name: Global Capital Purchasing
File Type : JS file
Purpose  : Maintain the Approval versions
Created By : Rambabu CH
Created Date: Feb 24th, 2012
----------------------------------------------------------------------------------
 */

// For send Approval
function planApproval(status) {
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var currentDate = year + "-" + month + "-" + day;
	var ApproverDate = "";
	var planId = gup('SId');
	ETCval = ETCval.replace(/,/gi, "");
	if (ETCval < 5000000) {
		ApproverDate = 'S_SiteBuyer1_UpManager_ClusterLe0';
	} else if (ETCval >= 5000000 && ETCval < 10000000) {
		ApproverDate = 'S_CapitalPurchasesPGM_Date';
	} else {
		ApproverDate = 'S_CapitalPurchasesAD_Date';
	}

	if (planId != "") { //debugger;
		// fr update Sourcing Plan
		//alert( +planId + " " +status + " "+comments+ " ");
		var comments = document.getElementById('Comments').value;
		var updatett = '<Batch PreCalc="TRUE" OnError="Continue">' +
			'<Method ID="1" Cmd="Update">' +
			'<Field Name="Title">' + status + '</Field>' +
			'<Field Name="Comments">' + comments + '</Field>'+
			'<Field Name="ID">' + planId + '</Field>' ;
		if (status != "Rejected") {
			updatett += '<Field Name="' + ApproverDate + '">' + currentDate + '</Field>';
		} else {
			updatett += '<Field Name="' + ApproverDate + '"></Field>'

		}

		updatett += '</Method>' +
		'</Batch>';
		//currentDate
		var oWs = oLists.updateListItems("SourcingPlan", updatett);
		//var oWs = oLists.quickUpdateListItem("SourcingPlan", [{ Title: status,Comments: comments ,ID: planId}]);

		if (oWs.status == 200) {
			alert('The Sourcing Plan is ' + status);

		}
		if (status != "Rejected") {
			// updating Versions List

			// Source Plan Items
			var sourcingPlan = "";
			var PPM = "";
			var PEL = "";
			var ETC = "";
			var planApprover = "";
			var planComments = "";
			var planID = planId;
			var planVersion = "";
			var sDate = "";
			var eDate = "";
			var LCS = "";
			var IR = "";
			var LCS_IR_Comments = "";
			var Strategy = "";
			var GBU = "";
			var Country = "";
			var Region = "";
			var Plants = "";
			var SAGoal = "";
			var WMBEGoal = "";
			var LCSSpendingGoal = "";
			var Preliminary = "";
			var PreliminaryDate = "";
			var Partial = "";
			var PartialDate = "";
			var Total_Final = "";
			var Total_FinalDate = "";
			var LocalCurrency = "";
			var SPPM = "";
			var SPPMDate = "";
			var SCPPGM = "";
			var SCPPGMDate = "";
			var SCPAD = "";
			var SCPADDate = "";
			var SSELPE = "";
			var SSELPEDate = "";
			var SSBCL = "";
			var SSBCLDate = "";
			var SPMEL = "";
			var SPMELDate = "";
			var SSB = "";
			var SSBDate = "";
			var status = "";

			// SOurce Plan items
			// Create a folder for Plan
			var res = oLists.createFolder('ApprovalVersions', planId, '/sites/sourcingplanmanager/capitalsrc/Lists/ApprovalVersions');
			if (res.status == 200) {
				//return true;
			}

			// get latest version of the plan
			//var Query='<Query><Where><Eq> <FieldRef Name="ContentType" /><Value Type="Choice">Plan</Value></Eq></Where></Query>';
			var Query = '<Query><Where><Eq> <FieldRef Name="PlanID" /><Value Type="Text">' + planId + '</Value></Eq></Where></Query>';
			var ViewFields = '<ViewFields><FieldRef Name="PlanID"/><FieldRef Name="PlanVersion"/></ViewFields>';
			var QueryOption = '<QueryOptions><Folder>/sites/sourcingplanmanager/capitalsrc/Lists/ApprovalVersions/' + planId + '</Folder></QueryOptions>';
			var items = oLists.getListItems("ApprovalVersions", "", Query, ViewFields, "", QueryOption, "");
			if (items.status == 200) {
				var rows = items.responseXML.getElementsByTagName('z:row');
				planVersion = rows.length + 1;
			}

			var SourcePlan = RetrivePlan(planId, 'SourcingPlan');
			//set source plan items the items
			//debugger;
			sourcingPlan = SourcePlan[0].getAttribute('ows_SourcingPlan');
			PPM = SourcePlan[0].getAttribute('ows_ProjectPurchasesManager');
			PEL = SourcePlan[0].getAttribute('ows_ProjectManager_EngineeringLead');
			ETC = SourcePlan[0].getAttribute('ows_Total_Estimated_Cost');
			planApprover = SourcePlan[0].getAttribute('ows_Plan_Approver');

			sDate = SourcePlan[0].getAttribute('ows_StartDate');
			eDate = SourcePlan[0].getAttribute('ows_EndDate');
			LCS = SourcePlan[0].getAttribute('ows_LCS');
			IR = SourcePlan[0].getAttribute('ows_IR');
			LCS_IR_Comments = SourcePlan[0].getAttribute('ows_IR_LCS_Comments');
			Strategy = SourcePlan[0].getAttribute('ows_OverallSourcingStrategy');
			GBU = SourcePlan[0].getAttribute('ows_GBU');
			Country = SourcePlan[0].getAttribute('ows_Country');
			Region = SourcePlan[0].getAttribute('ows_Region');
			Plants = SourcePlan[0].getAttribute('ows_Plants');
			SAGoal = SourcePlan[0].getAttribute('ows_Savings_Avoidance_Goal');
			WMBEGoal = SourcePlan[0].getAttribute('ows_W_MBESpending_Goal');
			LCSSpendingGoal = SourcePlan[0].getAttribute('ows_LCSSpendingGoal');
			Preliminary = SourcePlan[0].getAttribute('ows_Preliminary');
			PreliminaryDate = SourcePlan[0].getAttribute('ows_Preliminary_Date');
			Partial = SourcePlan[0].getAttribute('ows_Partial');
			PartialDate = SourcePlan[0].getAttribute('ows_Partial_Date');
			Total_Final = SourcePlan[0].getAttribute('ows_Total_Final');
			Total_FinalDate = SourcePlan[0].getAttribute('ows_Total_Final_Date');
			SPPM = SourcePlan[0].getAttribute('ows_S_Project_Purchases_Manager');
			SPPMDate = SourcePlan[0].getAttribute('ows_S_Project_Purchases_Manager_Date');
			SCPPGM = SourcePlan[0].getAttribute('ows_S_CapitalPurchasesPGM');
			SCPPGMDate = SourcePlan[0].getAttribute('ows_S_CapitalPurchasesPGM_Date');
			SCPAD = SourcePlan[0].getAttribute('ows_S_CapitalPurchasesAD');
			SCPADDate = SourcePlan[0].getAttribute('ows_S_CapitalPurchasesAD_Date');
			SSELPE = SourcePlan[0].getAttribute('ows_S_SiteEngineeringLeader_PlantEng');
			SSELPEDate = SourcePlan[0].getAttribute('ows_S_SiteEngineeringLeader_PlantEng0');
			SSBCL = SourcePlan[0].getAttribute('ows_S_SiteBuyer1_UpManager_ClusterLe');
			SSBCLDate = SourcePlan[0].getAttribute('ows_S_SiteBuyer1_UpManager_ClusterLe0');
			SPMEL = SourcePlan[0].getAttribute('ows_S_ProjectManager_EngineeringLead');
			SPMELDate = SourcePlan[0].getAttribute('ows_S_ProjectManager_EngineeringLead0');
			SSB = SourcePlan[0].getAttribute('ows_S_SiteBuyer');
			SSBDate = SourcePlan[0].getAttribute('ows_S_SiteBuyer_Date');
			LocalCurrency = SourcePlan[0].getAttribute('ows_Local_Currency');
			status == SourcePlan[0].getAttribute('ows_Status');
			planComments = comments;
			GBU = GBU.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			var FolderPath = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Lists/ApprovalVersions/" + planId;
			var query = '<Batch PreCalc="TRUE" OnError="Continue" RootFolder="' + FolderPath + '">' +
				'<Method ID="1" Cmd="New">' +
				'<Field Name="Title">P</Field>' +
				'<Field Name="SourcingPlan">' + sourcingPlan + '</Field>' +
				'<Field Name="ProjectPurchasesManager">' + PPM + '</Field>' +
				'<Field Name="ProjectManager_EngineeringLead">' + PEL + '</Field>' +
				'<Field Name="Total_Estimated_Cost">' + ETC + '</Field>' +
				'<Field Name="Plan_Approver">' + planApprover + '</Field>' +
				'<Field Name="PlanComments">' + planComments + '</Field>' +
				'<Field Name="PlanID">' + planID + '</Field>' +
				'<Field Name="PlanVersion">' + planVersion + '</Field>' +
				'<Field Name="LCS">' + LCS + '</Field>' +
				'<Field Name="IR">' + IR + '</Field>' +
				'<Field Name="OverallSourcingStrategy">' + Strategy + '</Field>' +
				'<Field Name="Region1">' + Region + '</Field>' +
				'<Field Name="Country1">' + Country + '</Field>' +
				'<Field Name="Plants">' + Plants + '</Field>' +
				'<Field Name="Savings_Avoidance_Goal">' + SAGoal + '</Field>' +
				'<Field Name="W_MBESpending_Goal">' + WMBEGoal + '</Field>' +
				'<Field Name="LCSSpendingGoal">' + LCSSpendingGoal + '</Field>' +
				'<Field Name="Preliminary">' + Preliminary + '</Field>' +
				'<Field Name="Partial">' + Partial + '</Field>' +
				'<Field Name="Total_Final">' + Total_Final + '</Field>' +
				'<Field Name="Local_Currency">' + LocalCurrency + '</Field>' +
				'<Field Name="StartDate1">' + sDate + '</Field>' +
				'<Field Name="EndDate1">' + eDate + '</Field>' +
				'<Field Name="_x0047_BU1">' + GBU + '</Field>' +
				'<Field Name="Status2">' + status + '</Field>';

			// '<Field Name="GBU1">'+GBU+'</Field>' +;
			if (LCS_IR_Comments != "" && LCS_IR_Comments != null)
				query += '<Field Name="IR_LCS_Comments">' + LCS_IR_Comments + '</Field>';
			if (PreliminaryDate != "" && PreliminaryDate != null)
				query += '<Field Name="Preliminary_Date">' + PreliminaryDate + '</Field>';
			if (PreliminaryDate != "" && PreliminaryDate != null)
				query += '<Field Name="Partial_Date">' + PartialDate + '</Field>';

			if (Total_FinalDate != "" && Total_FinalDate != null)
				query += '<Field Name="Total_Final_Date">' + Total_FinalDate + '</Field>';

			if (SPPM != "" && SPPM != null)
				query += '<Field Name="S_Project_Purchases_Manager">' + SPPM + '</Field>';
			if (SPPMDate != "" && SPPMDate != null)
				query += '<Field Name="S_Project_Purchases_Manager_Date">' + SPPMDate + '</Field>';
			if (SCPPGM != "" && SCPPGM != null)
				query += '<Field Name="S_CapitalPurchasesPGM">' + SCPPGM + '</Field>';
			if (SCPPGMDate != "" && SCPPGMDate != null)
				query += '<Field Name="S_CapitalPurchasesPGM_Date">' + SCPPGMDate + '</Field>';
			if (SCPAD != "" && SCPAD != null)
				query += '<Field Name="S_CapitalPurchasesAD">' + SCPAD + '</Field>';
			if (SCPADDate != "" && SCPADDate != null)
				query += '<Field Name="S_CapitalPurchasesAD_Date">' + SCPADDate + '</Field>';
			if (SSB != "" && SSB != null)
				query += '<Field Name="S_SiteBuyer">' + SSB + '</Field>';
			if (SSBDate != "" && SSBDate != null)
				query += '<Field Name="S_SiteBuyer_Date">' + SSBDate + '</Field>';
			if (SPMEL != "" && SPMEL != null)
				query += '<Field Name="S_ProjectMgr_EngLead">' + SPMEL + '</Field>';
			if (SPMELDate != "" && SPMELDate != null)
				query += '<Field Name="S_ProjectMgr_EngLead_Date">' + SPMELDate + '</Field>';
			if (SSELPE != "" && SSELPE != null)
				query += '<Field Name="S_SiteEngLeader_PlantEng">' + SSELPE + '</Field>';
			if (SSELPEDate != "" && SSELPEDate != null)
				query += '<Field Name="S_SiteEngLeader_PlantEng_Date">' + SSELPEDate + '</Field>';
			if (SSBCL != "" && SSBCL != null)
				query += '<Field Name="S_SiB1_UpMgr_ClusterLeader">' + SSBCL + '</Field>';
			if (SSBCLDate != "" && SSBCLDate != null)
				query += '<Field Name="S_SiB1_UpMgr_ClusterLeader_Date">' + SSBCLDate + '</Field>';
			query += '</Method></Batch>';

			var aID = ""; // Approval ID
			var result = oLists.updateListItems("ApprovalVersions", query);
			//var result = oLists.quickAddListItem('ApprovalVersions', [{ Title: 'P', SourcingPlan: sourcingPlan ,ProjectPurchasesManager: PPM,ProjectManager_EngineeringLead: PEL,Total_Estimated_Cost:ETC,Plan_Approver:planApprover,PlanComments:planComments,PlanVersion:planVersion,PlanID: planID }],FolderPath);

			if (result.status == 200) {

				var msResultSet = result.responseXML.getElementsByTagName('z:row');
				aID = msResultSet[0].getAttribute('ows_ID');
				var planItems = RetrivePlan(planId, 'SourcingPlanItems');
				var updateqry = '';
				for (var i = 0; i < planItems.length; i++) {
					updateqry += '<Method ID="1" Cmd="New">'
					 + '<Field Name="ApprovalId">' + aID + '</Field>'
					 + '<Field Name="Title">PI</Field>';

					if (planItems[i].getAttribute('ows_PoolType') != "" && planItems[i].getAttribute('ows_PoolType') != null)
						updateqry += '<Field Name="PoolType">' + planItems[i].getAttribute('ows_PoolType') + '</Field>';

					if (planItems[i].getAttribute('ows_SpendingPool') != "" && planItems[i].getAttribute('ows_SpendingPool') != null)
						updateqry += '<Field Name="SpendingPool">' + planItems[i].getAttribute('ows_SpendingPool') + '</Field>';

					if (planItems[i].getAttribute('ows_MaterialCode') != "" && planItems[i].getAttribute('ows_MaterialCode') != null)
						updateqry += '<Field Name="MaterialCode">' + planItems[i].getAttribute('ows_MaterialCode') + '</Field>';

					if (planItems[i].getAttribute('ows_EstimatedSpend') != "" && planItems[i].getAttribute('ows_EstimatedSpend') != null)
						updateqry += '<Field Name="EstimatedSpend">' + planItems[i].getAttribute('ows_EstimatedSpend') + '</Field>';

					if (planItems[i].getAttribute('ows_SourcingTiming') != "" && planItems[i].getAttribute('ows_SourcingTiming') != null)
						updateqry += '<Field Name="SourcingTiming">' + planItems[i].getAttribute('ows_SourcingTiming') + '</Field>';

					if (planItems[i].getAttribute('ows_SourcingEndDate') != "" && planItems[i].getAttribute('ows_SourcingEndDate') != null)
						updateqry += '<Field Name="SourcingEndDate">' + planItems[i].getAttribute('ows_SourcingEndDate') + '</Field>';

					if (planItems[i].getAttribute('ows_Buyer_SpendPoolOwner') != "" && planItems[i].getAttribute('ows_Buyer_SpendPoolOwner') != null)
						updateqry += '<Field Name="Buyer_SpendPoolOwner">' + planItems[i].getAttribute('ows_Buyer_SpendPoolOwner') + '</Field>';

					if (planItems[i].getAttribute('ows_TechSupport') != "" && planItems[i].getAttribute('ows_TechSupport') != null)
						updateqry += '<Field Name="TechSupport">' + planItems[i].getAttribute('ows_TechSupport') + '</Field>';

					if (planItems[i].getAttribute('ows_Supplier') != "" && planItems[i].getAttribute('ows_Supplier') != null)
						updateqry += '<Field Name="Supplier">' + planItems[i].getAttribute('ows_Supplier') + '</Field>';

					if (planItems[i].getAttribute('ows_SpecificationAvailableDate') != "" && planItems[i].getAttribute('ows_SpecificationAvailableDate') != null)
						updateqry += '<Field Name="SpecificationAvailableDate">' + planItems[i].getAttribute('ows_SpecificationAvailableDate') + '</Field>';

					if (planItems[i].getAttribute('ows_PurchasingProcess') != "" && planItems[i].getAttribute('ows_PurchasingProcess') != null)
						updateqry += '<Field Name="PurchasingProcess">' + planItems[i].getAttribute('ows_PurchasingProcess') + '</Field>';

					if (planItems[i].getAttribute('ows_Notes') != "" && planItems[i].getAttribute('ows_Notes') != null)
						updateqry += '<Field Name="Notes1">' + planItems[i].getAttribute('ows_Notes') + '</Field>';

					if (planItems[i].getAttribute('ows_Status') && planItems[i].getAttribute('ows_Status') != null)
						updateqry += '<Field Name="Status1">' + planItems[i].getAttribute('ows_Status') + '</Field>';

					updateqry += '</Method>';

				}

				updateqry = '<Batch OnError="Continue" RootFolder="' + FolderPath + '">' + updateqry + '</Batch>';
				var Owsres = oLists.updateListItems("ApprovalVersions", updateqry);
				if (Owsres.status = 200) {
					window.location = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Home.aspx";
				}
				//window.location="http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Home.aspx";
			}
		} else {
			window.location = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Home.aspx";
		}

	}
}

function RetrivePlan(PlanID, Listname) {

	var sQuery = "<Query>";
	sQuery += "<Where>";
	sQuery += "<Eq>";
	if (Listname == "SourcingPlan") {
		sQuery += "<FieldRef Name='ID' />";
		sQuery += "<Value Type='Counter'>" + PlanID + "</Value>";
	} else if (Listname == "SourcingPlanItems") {
		sQuery += "<FieldRef Name='Title' />";
		sQuery += "<Value Type='Text'>" + PlanID + "</Value>";

	}

	sQuery += "</Eq>";
	sQuery += "</Where>";
	sQuery += "</Query>";
	var res = oLists.getListItems(Listname, "", sQuery, "", "", '', "");

	if (res.status == 200) {
		var rows = res.responseXML.getElementsByTagName("z:row");
		if (rows.length > 0) {
			return rows;
		}
	}
}