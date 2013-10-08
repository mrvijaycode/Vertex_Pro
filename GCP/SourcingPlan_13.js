/*
----------------------------------------------------------------------------------
Project Name: Global Capital Purchasing
File Type : JS file
Purpose  : Add and Edit the Sourcing paln
Created By : Rambabu CH
Created Date: Feb 24th, 2012
----------------------------------------------------------------------------------
*/

_spBodyOnLoadFunctionNames.push('LoadFunction');
var sitePath = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc";

var newForm = "NewSourcePlan.aspx";
var editForm = "EditSourcingPlan.aspx";
var FormUrl = "";
var SavingAvoidanceGoal = "";
var W_MBESpending_Goal = "";
var LCSSpendingGoal = "";
var Preliminary = "";
var Partial = "";
var Total_Final = "";
var Total_Estimated_Cost = "";
var Local_Currency = "";
var Country = "";
var Region = "";
var Plants = "";
var StartDate = "";
var EndDate = "";
var Status = "";
var SPPreliminaryDate = "";
var SPPartialDate = "";
var SPTotalDate = "";
var SPPPMDate = "";
var SPSUCLDate = "";
var SPCPPGMDate = "";
var SPCPADDate = "";
var SPSBDate = "";
//var SPPMELDate="";
var SPSELPDate = "";

var sDate = "";
var eDate = "";
var PreliminaryDate = "";
var PartialDate = "";
var TotalDate = "";
//var PPMDate= "";
var SUCLDate = "";
var CPPGMDate = "";
var CPADDate = "";
var SBDate = "";
//var PMELDate= "";
var SELPDate = "";

function LoadFunction() {
	//debugger;
	SavingAvoidanceGoal = getField("input", "Savings_Avoidance_Goal");
	W_MBESpending_Goal = getField("input", "W_MBESpending_Goal");
	LCSSpendingGoal = getField("input", "LCSSpendingGoal");
	Preliminary = getField("input", "Preliminary");
	Partial = getField("input", "Partial");
	Total_Final = getField("input", "Total_Final");
	Total_Estimated_Cost = getField("input", "Total_Estimated_Cost");
	Local_Currency = getField("input", "Local_Currency");
	Country = getField("input", "Country");
	Region = getField("input", "Region");
	Plants = getField("input", "Plants");
	StartDate = getField("input", "StartDate");
	EndDate = getField("input", "EndDate");
	SPPreliminaryDate = getField("input", "Preliminary_Date");
	SPPartialDate = getField("input", "Partial_Date");
	SPTotalDate = getField("input", "Total_Final_Date");
	//SPPPMDate=getField("input","S_Project_Purchases_Manager_Date");

	SPCPPGMDate = getField("input", "S_CapitalPurchasesPGM_Date");
	SPCPADDate = getField("input", "S_CapitalPurchasesAD_Date");
	SPSBDate = getField("input", "S_SiteBuyer_Date");
	//SPPMELDate=getField("input","S_ProjectManager_EngineeringLead_Date");
	SPSUCLDate = getField("input", "S_SiteBuyer1_UpManager_ClusterLeader_Date");
	SPSELPDate = getField("input", "S_SiteEngineeringLeader_PlantEngineer_Date");
	Status = getField("select", "Status");

	sDate = document.getElementById('txtStartDate');
	sDate.readOnly = true;
	eDate = document.getElementById('txtEndDate');
	eDate.readOnly = true;
	PreliminaryDate = document.getElementById('txtPreliminaryDate');
	PreliminaryDate.readOnly = true;
	PartialDate = document.getElementById('txtPartialDate');
	PartialDate.readOnly = true;
	TotalDate = document.getElementById('txtTotalDate');
	TotalDate.readOnly = true;
	//PPMDate= document.getElementById('txtPPMDate');
	// PPMDate.readOnly=true;
	SUCLDate = document.getElementById('txtSUCLDate');
	SUCLDate.readOnly = true;
	CPPGMDate = document.getElementById('txtCPPGMDate');
	CPPGMDate.readOnly = true;
	CPADDate = document.getElementById('txtCPADDate');
	CPADDate.readOnly = true;
	SBDate = document.getElementById('txtSBDate');
	SBDate.readOnly = true;
	//PMELDate= document.getElementById('txtPMELDate');
	// PMELDate.readOnly=true;
	SELPDate = document.getElementById('txtSELPDate');
	SELPDate.readOnly = true;

	var Title = getField("input", "Title");

	FormUrl = window.location.href;
	if (FormUrl.indexOf(newForm) != -1) {
		document.title = "New Sourcing Plan";
		Status.disabled = true;

		//Populate Current Login User
		var curLoginname = curLoginName();
		document.getElementById('ctl00_PlaceHolderMain_g_4a80095d_76c7_41ec_b62f_7c43259cec8a_ff3_1_ctl00_ctl00_UserField_upLevelDiv').innerText = curLoginname;
		document.getElementById('ctl00_PlaceHolderMain_g_4a80095d_76c7_41ec_b62f_7c43259cec8a_ff3_1_ctl00_ctl00_UserField_checkNames').click();
	} else {
		document.title = "Edit Sourcing Plan";
		//  Checking  the Plan is created by Current Login User or Not
		var valPPM = document.getElementById('ctl00_PlaceHolderMain_g_a28cc90d_d34f_4d82_b06d_d3f8490a03bd_ff3_1_ctl00_ctl00_UserField_upLevelDiv');
		var Spname = getField("input", "SourcingPlan");
		Spname.readOnly = true;

		if (trim(valPPM.innerText) != curLoginName()) {
			alert('This Sourcing Plan created by another Plan Owner');
			window.location = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/WPPages/MyPlan.aspx";
			return false;
		}
		//The Plan is send for approval
		if (Title.value == "Pending") {
			alert('This Sourcing Plan has been sent for Approval. It cannot be edit until the Approver takes action.');
			window.location = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Site Pages/MyPlan.aspx";
		}
	}

	SavingAvoidanceGoal.attachEvent('onkeypress', function () {
		return numbersonly(event)
	});
	W_MBESpending_Goal.attachEvent('onkeypress', function () {
		return numbersonly(event)
	});
	LCSSpendingGoal.attachEvent('onkeypress', function () {
		return numbersonly(event)
	});
	Preliminary.attachEvent('onkeypress', function () {
		return numbersonly(event)
	});
	Partial.attachEvent('onkeypress', function () {
		return numbersonly(event)
	});
	Total_Final.attachEvent('onkeypress', function () {
		return numbersonly(event)
	});
	Total_Estimated_Cost.attachEvent('onkeypress', function () {
		return numbersonly(event)
	});
	Local_Currency.attachEvent('onkeypress', function () {
		return numbersonly(event)
	});

	// set master page image
	document.getElementById('MyPlan1').src = 'http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/images/MasterPage%20Images/my_plans_hover_btn.jpg';

	// set width for GBU
	var GBU = getField("select", "GBU");
	GBU.style.width = '175';
	// Country code

	/*  Create Country dropdown */
	var drpFram = document.createElement("select");
	drpFram.id = "drpCountries";
	drpFram.onchange = LoadPlants;
	drpFram.style.width = '175';

	theOption = document.createElement("OPTION");
	theOption.innerText = "- Select Country -";
	theOption.setAttribute("value", "- Select Country -");
	drpFram.appendChild(theOption);

	Country.parentElement.style.display = 'none';
	Country.parentElement.parentElement.appendChild(drpFram);

	// Region Code

	Region.parentElement.style.display = 'none';

	//  Create Regions dropdown */
	var drpRegions = document.createElement("select");
	drpRegions.id = "drpRegions";
	drpRegions.onchange = LoadCountries;
	drpRegions.style.width = '175';
	drpRegions.style.display = 'block';

	theOption = document.createElement("OPTION");
	theOption.innerText = "- Select Region -";
	theOption.setAttribute("value", "- Select Region -");
	drpRegions.appendChild(theOption);

	/*  Create Regions dropdown */

	Region.parentElement.parentElement.appendChild(drpRegions);

	loadRegions(drpRegions)

	// Plant Code
	// add ListBox to Select the multiple Plants

	Plants.parentElement.style.display = 'none';
	var drpFram = document.createElement("select");
	drpFram.id = "drpPlants";
	drpFram.setAttribute("multiple", "multiple");
	drpFram.style.width = '175';
	theOption = document.createElement("OPTION");
	theOption.innerText = "- Select Plant -";
	theOption.setAttribute("value", "- Select Plant -");
	drpFram.appendChild(theOption);
	Plants.parentElement.parentElement.appendChild(drpFram);
	// Set edit form parameters
	if (FormUrl.indexOf(editForm) != -1) { // set Region
		if (Region.value != "")
			drpRegions.value = Region.value;
		// set Country
		if (Country.value != "") {
			LoadCountries();
			document.getElementById('drpCountries').value = Country.value;
		}

		// set Plants
		if (Plants.value != "") {
			LoadPlants();

			var objplant = document.getElementById('drpPlants');
			var Plantsval = Plants.value.split(';');
			var count = 0;

			for (var items = 0; items < objplant.options.length; items++) {
				if (objplant.options[items].value == Plantsval[count]) {
					objplant.options[items].selected = true;
					count++;

				} //if
			} //for

		} //if

	} //if edit
	//debugger;
	// Set the date fields
	if (StartDate.value != "")
		sDate.value = CustomFormat(StartDate.value);
	if (EndDate.value)
		eDate.value = CustomFormat(EndDate.value);
	if (SPPreliminaryDate.value != "")
		PreliminaryDate.value = CustomFormat(SPPreliminaryDate.value);
	if (SPPartialDate.value != "")
		PartialDate.value = CustomFormat(SPPartialDate.value);
	if (SPTotalDate.value != "")
		TotalDate.value = CustomFormat(SPTotalDate.value);
	// if( SPPPMDate.value!="")
	// PPMDate.value = CustomFormat( SPPPMDate.value);
	if (SPCPPGMDate.value != "")
		CPPGMDate.value = CustomFormat(SPCPPGMDate.value);
	if (SPCPADDate.value != "")
		CPADDate.value = CustomFormat(SPCPADDate.value);
	if (SPSBDate.value != "")
		SBDate.value = CustomFormat(SPSBDate.value);
	// if(SPPMELDate.value!="")
	//  PMELDate.value = CustomFormat(SPPMELDate.value);
	if (SPSELPDate.value != "")
		SELPDate.value = CustomFormat(SPSELPDate.value);
	if (SPSUCLDate.value != "")
		SUCLDate.value = CustomFormat(SPSUCLDate.value);

}

function PreSaveItem() {

	var check = validateAll();
	if (check) {
		return true;
	} else {
		return false;
	}

}

function validateAll() {

	//debugger;
	var Spname = getField("input", "SourcingPlan");
	if (trim(Spname.value) == '') {
		alert('Please enter source plan name');
		Spname.focus();
		return false;
	}
	var PPM = "";
	var EngLead = "";
	if (FormUrl.indexOf(newForm) != -1) {
		//Purchase Project Manager
		PPM = document.getElementById('ctl00_PlaceHolderMain_g_4a80095d_76c7_41ec_b62f_7c43259cec8a_ff3_1_ctl00_ctl00_UserField_upLevelDiv');
		if (trim(PPM.innerText) == '') {
			alert('Please select Purchases Sourcing Plan Owner');
			PPM.focus();
			return false;
		}
		//Project Manager / Engineering Lead
		EngLead = document.getElementById('ctl00_PlaceHolderMain_g_4a80095d_76c7_41ec_b62f_7c43259cec8a_ff4_1_ctl00_ctl00_UserField_upLevelDiv');
		if (trim(EngLead.innerText) == '') {
			alert('Please select Project Manager / Engineering Lead');
			EngLead.focus();
			return false;
		}
	} else {
		//Purchase Project Manager ctl00_m1_g_9039321e_d981_43af_baae_2dcbed09431f_ff3_1_ctl00_ctl00_UserField_upLevelDiv
		PPM = document.getElementById('ctl00_PlaceHolderMain_g_a28cc90d_d34f_4d82_b06d_d3f8490a03bd_ff3_1_ctl00_ctl00_UserField_upLevelDiv');
		if (trim(PPM.innerText) == '') {
			alert('Please select Purchases Sourcing Plan Owner');
			PPM.focus();
			return false;
		}
		//Project Manager / Engineering Lead
		EngLead = document.getElementById('ctl00_PlaceHolderMain_g_a28cc90d_d34f_4d82_b06d_d3f8490a03bd_ff4_1_ctl00_ctl00_UserField_upLevelDiv');
		if (trim(EngLead.innerText) == '') {
			alert('Please select Project Manager / Engineering Lead');
			EngLead.focus();
			return false;
		}
	}

	// start date
	//var sDate= document.getElementById('txtStartDate');
	if (trim(sDate.value) == "") {
		alert('Select the start date');
		sDate.focus();
		return false;
	}
	// end date
	//var eDate=document.getElementById('txtEndDate');
	if (trim(eDate.value) == "") {
		alert('Select the end date');
		eDate.focus();
		return false;
	}
	var Sdate1 = SpDateformat(sDate.value).split('/');
	var Edate2 = SpDateformat(eDate.value).split('/');

	var date1 = new Date(Sdate1[2], Sdate1[0], Sdate1[1]);
	var date2 = new Date(Edate2[2], Edate2[0], Edate2[1]);

	if (date2 < date1) {
		alert("Start date cannot be greater than End date");
		return false;
	}

	//GBU
	var GBU = getField("select", "GBU");
	if (trim(GBU.value) == '- Select GBU -' || trim(GBU.value) == "") {
		alert('Select GBU');
		GBU.focus();
		return false;
	}
	//Region
	var dRegion = document.getElementById('drpRegions');
	if (trim(dRegion.value) == '- Select Region -') {
		alert('Select Region Name');
		dRegion.focus();
		return false;
	}
	//Country
	var dCountry = document.getElementById('drpCountries');
	if (trim(dCountry.value) == '- Select Country -') {
		alert('Select Country Name');
		dCountry.focus();
		return false;
	}

	//debugger;
	// Saving Avoidance Goal
	//var sAvoidance=document.getElementById('ctl00_m1_g_d98ff00c_bbec_4387_9c0c_3436b7b18644_ctl00_ctl04_ctl13_ctl00_ctl00_ctl04_ctl00_ctl00_TextField');
	var sAvoidancevalue = SavingAvoidanceGoal.value.replace(/,/gi, "");
	if (trim(sAvoidancevalue) == "") {
		alert('Enter Savings/Avoidance goal');
		SavingAvoidanceGoal.focus();
		return false;
	} else if (!IsNumeric(sAvoidancevalue)) {
		alert('Enter whole number for Savings/Avoidance goal ');
		SavingAvoidanceGoal.focus();
		return false;
	} else if (IsNumeric(sAvoidancevalue)) {
//	debugger
/*
		if (Number(sAvoidancevalue) < 100000) {
			//alert('Enter threshold value for Savings/Avoidance goal');
			var r = confirm("Enter threshold value for Savings/Avoidance goal");
			if (r == true) {
				$("#ctl00_PlaceHolderMain_g_4a80095d_76c7_41ec_b62f_7c43259cec8a_ff14_1_ctl00_ctl00_TextField").focus();
				return false;
				//x = "You pressed OK!";
			} 
			SavingAvoidanceGoal.focus();
			//return false;
		}*/
	}

	//W_MBESpending_Goal
	//var wMBESpending=document.getElementById('ctl00_m1_g_d98ff00c_bbec_4387_9c0c_3436b7b18644_ctl00_ctl04_ctl14_ctl00_ctl00_ctl04_ctl00_ctl00_TextField');
	var wMBESpendingval = W_MBESpending_Goal.value.replace(/,/gi, "");
	if (trim(wMBESpendingval) == "") {
		alert('Enter W/MBESpending goal ');
		W_MBESpending_Goal.focus();
		return false;
	} else if (!IsNumeric(wMBESpendingval)) {
		alert('Enter whole number for W/MBESpending goal ');
		W_MBESpending_Goal.focus();
		return false;

	} else if (IsNumeric(wMBESpendingval)) {
		if (Number(wMBESpendingval) < 0) {
			alert('Enter threshold value for W/MBESpending goal');
			W_MBESpending_Goal.focus();
			return false;
		}
	}

	//LCS Spending Goal
	//var LCSSpending=document.getElementById('ctl00_m1_g_d98ff00c_bbec_4387_9c0c_3436b7b18644_ctl00_ctl04_ctl15_ctl00_ctl00_ctl04_ctl00_ctl00_TextField');
	var LCSSpendingval = LCSSpendingGoal.value.replace(/,/gi, "");
	if (trim(LCSSpendingval) == "") {
		alert('Enter LCS Spending goal ');
		LCSSpendingGoal.focus();
		return false;
	} else if (!IsNumeric(LCSSpendingval)) {
		alert('Enter whole number for LCS Spending goal ');
		LCSSpendingGoal.focus();
		return false;

	} else if (IsNumeric(LCSSpendingval)) {
		if (Number(LCSSpendingval) < 0) {
			alert('Enter threshold value for LCS Spending goal');
			LCSSpendingGoal.focus();
			return false;
		}
	}

	// Prelimenary
	//var Preliminary=document.getElementById('ctl00_m1_g_d98ff00c_bbec_4387_9c0c_3436b7b18644_ctl00_ctl04_ctl16_ctl00_ctl00_ctl04_ctl00_ctl00_TextField');
	var Preliminaryval = Preliminary.value.replace(/,/gi, "");
	if (trim(Preliminaryval) == "") {
		alert('Enter Preliminary amount ');
		Preliminary.focus();
		return false;
	} else if (!IsNumeric(Preliminaryval)) {
		alert('Enter whole number for Preliminary amount ');
		Preliminary.focus();
		return false;

	} else if (IsNumeric(Preliminaryval)) {
		if (Number(Preliminaryval) < 0) {
			alert('Enter threshold value for Preliminary amount');
			Preliminary.focus();
			return false;
		}
	}

	// Partial
	//var Partial=document.getElementById('ctl00_m1_g_d98ff00c_bbec_4387_9c0c_3436b7b18644_ctl00_ctl04_ctl18_ctl00_ctl00_ctl04_ctl00_ctl00_TextField');
	var Partialval = Partial.value.replace(/,/gi, "");
	if (trim(Partialval) == "") {
		alert('Enter Partial amount ');
		Partial.focus();
		return false;
	} else if (!IsNumeric(Partialval)) {
		alert('Enter whole number for Partial amount ');
		Partial.focus();
		return false;

	} else if (IsNumeric(Partialval)) {
		if (Number(Partialval) < 0) {
			alert('Enter threshold value for Partial amount');
			Partial.focus();
			return false;
		}
	}

	// Total final
	//var Total=document.getElementById('ctl00_m1_g_d98ff00c_bbec_4387_9c0c_3436b7b18644_ctl00_ctl04_ctl20_ctl00_ctl00_ctl04_ctl00_ctl00_TextField');
	var Totalval = Total_Final.value.replace(/,/gi, "");
	if (trim(Totalval) == "") {
		alert('Enter Total/Final amount ');
		Total_Final.focus();
		return false;
	} else if (!IsNumeric(Totalval)) {
		alert('Enter whole number for Total/Final amount ');
		Total_Final.focus();
		return false;

	} else if (IsNumeric(Totalval)) {
		if (Number(Totalval) < 0) {
			alert('Enter threshold value for Total/Final amount');
			Total_Final.focus();
			return false;
		}
	}

	// Estimated Total Cost
	//var ETC=document.getElementById('ctl00_m1_g_d98ff00c_bbec_4387_9c0c_3436b7b18644_ctl00_ctl04_ctl22_ctl00_ctl00_ctl04_ctl00_ctl00_TextField');
	var ETCval = Total_Estimated_Cost.value.replace(/,/gi, "");
	if (trim(ETCval) == '') {
		alert('Enter Total Estimated Cost');
		Total_Estimated_Cost.focus();
		return false;
	} else if (!IsNumeric(ETCval)) {
		alert('Enter whole number for Total Estimated Cost ');
		Total_Estimated_Cost.focus();
		return false;

	} else if (IsNumeric(ETCval)) {
		if (Number(ETCval) < 500000) {
			alert('Enter threshold value for Total Estimated Cost');
			Total_Estimated_Cost.focus();
			return false;
		}
	}

	//Local_Currency

	var Localval = Local_Currency.value.replace(/,/gi, "");
	if (trim(Localval) == '') {
		alert('Enter Local Currency');
		Local_Currency.focus();
		return false;
	} else if (!IsNumeric(Localval)) {
		alert('Enter whole number for Local Currency ');
		Local_Currency.focus();
		return false;

	} else if (IsNumeric(Localval)) {
		if (Number(ETCval) < 0) {
			alert('Enter threshold value for Local Currency');
			Local_Currency.focus();
			return false;
		}
	}

	// list Box Validation
	var objplant = document.getElementById('drpPlants');
	var plantValues = "";
	for (var count = 0; count < objplant.options.length; count++) {
		if (objplant.options[count].selected == true) {
			var option = objplant.options[count];
			plantValues += option.value + ";";

		}
	}
	if (plantValues == "") {
		alert('Select Plant Name');
		objplant.focus();
		return false;
	}
	//debugger;
	// New
	var newCleader = document.getElementById('ctl00_PlaceHolderMain_g_4a80095d_76c7_41ec_b62f_7c43259cec8a_ff27_1_ctl00_ctl00_UserField_upLevelDiv');
	var newPGM = document.getElementById('ctl00_PlaceHolderMain_g_4a80095d_76c7_41ec_b62f_7c43259cec8a_ff29_1_ctl00_ctl00_UserField_upLevelDiv');
	var newAD = document.getElementById('ctl00_PlaceHolderMain_g_4a80095d_76c7_41ec_b62f_7c43259cec8a_ff31_1_ctl00_ctl00_UserField_upLevelDiv');
	//Edit
	var editCleader = document.getElementById('ctl00_PlaceHolderMain_g_a28cc90d_d34f_4d82_b06d_d3f8490a03bd_ff25_1_ctl00_ctl00_UserField_upLevelDiv');
	var editAD = document.getElementById('ctl00_PlaceHolderMain_g_a28cc90d_d34f_4d82_b06d_d3f8490a03bd_ff29_1_ctl00_ctl00_UserField_upLevelDiv');
	var editPGM = document.getElementById('ctl00_PlaceHolderMain_g_a28cc90d_d34f_4d82_b06d_d3f8490a03bd_ff27_1_ctl00_ctl00_UserField_upLevelDiv');
	var PlanApprover = "";

	// checks the approver

	if (FormUrl.indexOf(newForm) != -1) {

		if (ETCval < 5000000) {
			if (newCleader.innerText != "")
				PlanApprover = newCleader.innerText;
			else {
				alert('Select Cluster Leader in the Plan ');
				newCleader.focus();
				return false
			}
		} else if (ETCval >= 5000000 && ETCval < 10000000) {
			if (newPGM.innerText != "")
				PlanApprover = newPGM.innerText;
			else {
				alert('Select PGM in the Plan ');
				newPGM.focus();
				return false
			}

		} else {
			if (newAD.innerText != "")
				PlanApprover = newAD.innerText;
			else {
				alert('Select AD in the Plan ');
				newAD.focus();
				return false
			}

		}
	} else {
		if (ETCval < 5000000) {
			if (editCleader.innerText != "")
				PlanApprover = editCleader.innerText;
			else {
				alert('Select Cluster Leader in the Plan ');
				editCleader.focus();
				return false
			}
		} else if (ETCval >= 5000000 && ETCval < 10000000) {
			if (editPGM.innerText != "")
				PlanApprover = editPGM.innerText;
			else {
				alert('Select PGM in the Plan ');
				editPGM.focus();
				return false
			}

		} else {
			if (editAD.innerText != "")
				PlanApprover = editAD.innerText;
			else {
				alert('Select AD in the Plan ');
				editAD.focus();
				return false
			}

		}

	}

	// fill Region,Country,Plant
	Country.value = document.getElementById('drpCountries').value;
	Region.value = document.getElementById('drpRegions').value;
	Plants.value = plantValues; // Store Multiple Plant
	//Fill Dates
	StartDate.value = SpDateformat(sDate.value);
	EndDate.value = SpDateformat(eDate.value);

	if (PreliminaryDate.value != "") {
		SPPreliminaryDate.value = SpDateformat(PreliminaryDate.value);
	}
	if (PartialDate.value != "") {
		SPPartialDate.value = SpDateformat(PartialDate.value);
	}
	if (TotalDate.value != "") {
		SPTotalDate.value = SpDateformat(TotalDate.value);
	}
	// if(PPMDate.value!="")
	//{
	//	SPPPMDate.value=SpDateformat(PPMDate.value);
	//}
	if (SUCLDate.value != "") {
		SPSUCLDate.value = SpDateformat(SUCLDate.value);

	}
	if (CPPGMDate.value != "") {
		SPCPPGMDate.value = SpDateformat(CPPGMDate.value);

	}
	if (CPADDate.value != "") {
		SPCPADDate.value = SpDateformat(CPADDate.value);
	}
	if (SBDate.value != "") {
		SPSBDate.value = SpDateformat(SBDate.value);
	}
	// if(PMELDate.value!="")
	//{
	//	SPPMELDate.value=SpDateformat(PMELDate.value);
	//}
	if (SELPDate.value != "") {
		SPSELPDate.value = SpDateformat(SELPDate.value);
	}
	if (FormUrl.indexOf(newForm) != -1) {
		alert('Sourcing Plan created successfully');
	} else {
		alert('Sourcing Plan updated successfully ');
	}
	return true;
}
