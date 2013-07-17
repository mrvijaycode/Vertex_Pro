/*
----------------------------------------------------------------------------------

Project Name: Global Capital Purchasing
File Type : JS file
Purpose  : Add and Edit the Spend Pool items
Created By : Rambabu CH
Created Date: Feb 24th, 2012
----------------------------------------------------------------------------------

 */

_spBodyOnLoadFunctionNames.push('LoadFunction');
var sitePath = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/";
var lists = new SPAPI_Lists(sitePath);

var newForm = "NewSourcingPlanItems.aspx";
var editForm = "EditSourcingPlanItems.aspx";
var FormUrl = "";

var Title = "";
var SourcngPlan = "";
var PoolType = "";
var Materials = "";
var SpendingPool = "";
var MaterialCode = "";
var EstimatedSpend = "";
var SourcingTiming = "";
var SourcingEndDate = "";
var SpecificationAvailableDate = "";
var SPSourcingTimingDate = "";
var SPSourcingEndDate = "";
var SPSpecificationAvailableDate = "";
var TechSupport1 = "";
var Status = "";

function PreSaveAction() {
	
	var check = validateAll();
	//debugger
	if (check) {
		return true;
	} else
		return false;
}


function validateAll() {

	//debugger;
	if (SourcngPlan != null) {
		setSelectedIndex(SourcngPlan, Title.value)
	} else {
		document.getElementById('Plan').style.display = "block";
		var DrpImg = document.getElementById('SourcingPlan').getElementsByTagName("span")[1].getElementsByTagName('img');
		DrpImg[0].onclick();
		var Drpsel = document.getElementById('SourcingPlan').getElementsByTagName("span")[1].getElementsByTagName('select');
		setSelectedIndex(Drpsel[0], Title.value);
		OptLoseFocus(Drpsel[0]);
		document.getElementById('Plan').style.display = "none";
	}

	if (PoolType.value == "" || PoolType.value == '- Select Pool Type -') {
		alert('Please select pooltype');
		PoolType.focus();
		return false;
	}
	if (FormUrl.indexOf(newForm) != -1) {
		var matrailcode = document.getElementById('drpMaterialGroup');
		if (PoolType.value != "Other") {
			if (matrailcode.value == "- Select Material Group -") {
				alert('Please select material ');
				matrailcode.focus();
				return false;
			}
		}
		if (PoolType.value == "Other") {

			if (SpendingPool.value == "") {
				alert('Enter Spending Pool');
				SpendingPool.focus();
				return false;
			}
			if (MaterialCode.value == "") {
				alert('Enter Material code ');
				MaterialCode.focus();
				return false;
			}
		}
	}

	var EstSpendval = EstimatedSpend.value.replace(',', "");
	if (trim(EstSpendval) == '') {
		alert('Enter Estimate Spend');
		EstimatedSpend.focus();
		return false;
	} else if (!IsNumeric(EstSpendval)) {
		alert('Enter whole number for Estimate Spend ');
		EstimatedSpend.focus();
		return false;

	} else if (IsNumeric(EstSpendval)) {
		if (Number(EstSpendval) < 1) {
			alert('Enter Estimate Spend greater than zero ');
			EstimatedSpend.focus();
			return false;
		}
		if (TechSupport1.value == "") {
			alert('Enter Tech Support');
			TechSupport1.focus();
			return false;

		}
	}
	if (FormUrl.indexOf(newForm) != -1) {

		var buyer = document.getElementById('ctl00_PlaceHolderMain_g_d6275621_1440_40ec_a0de_8003cd9ce5c7_ff9_1_ctl00_ctl00_UserField_upLevelDiv');
		if (buyer.innerText == "") {
			alert('Select buyer/spend pool owner');
			buyer.focus();
			return false;
		}
		/*
		var techSupport=document.getElementById('ctl00_PlaceHolderMain_g_d6275621_1440_40ec_a0de_8003cd9ce5c7_ff10_1_ctl00_ctl00_UserField_upLevelDiv');
		if(trim(techSupport.innerText)==''){
		alert('Select Tech Support ');
		techSupport.focus();
		return false;

		}*/
		// set the material code
		Materials.value = matrailcode.value;
	} else {
		var buyer = document.getElementById('ctl00_PlaceHolderMain_g_38e7e938_e0e5_48b4_8ed1_4f24ed21f349_ff9_1_ctl00_ctl00_UserField_upLevelDiv');
		if (buyer.innerText == "") {
			alert('Select buyer/spend pool owner');
			buyer.focus();
			return false;
		}
		/*
		var techSupport=document.getElementById('ctl00_PlaceHolderMain_g_38e7e938_e0e5_48b4_8ed1_4f24ed21f349_ff10_1_ctl00_ctl00_UserField_upLevelDiv');
		if(trim(techSupport.innerText)==''){
		alert('Select Tech Support ');
		techSupport.focus();
		return false;

		}*/
		//debugger;
		if (buyer.innerText != curLoginName()) {
			if (Status.value != "Create") {
				alert("Please set the item  status in Create");
				return false;
			} else {
				var planId = gup('ID');
				var oWs = lists.quickUpdateListItem("SourcingPlanItems", [{
								SendMail : '1',
								Counter : '0',
								ID : planId
							}
						]);
				if (oWs.status == 200) {
					//alert('Success');
				}
			}
		} else if (Status.value == "Create") {
			alert("Please update the item Status");
			return false;
		} else if (Status.value == "Cancelled") {
			document.getElementById("ctl00_PlaceHolderMain_g_38e7e938_e0e5_48b4_8ed1_4f24ed21f349_ff7_1_ctl00_ctl00_TextField").value = 0;
			alert("Estimated Spend value will be changed 0");
		}
	}

	//Dates comparision
	if (SPSourcingTimingDate.value != "" && SPSourcingEndDate.value != "") {
		var Sdate1 = SpDateformat(SPSourcingTimingDate.value).split('/');
		var Edate2 = SpDateformat(SPSourcingEndDate.value).split('/');

		var date1 = new Date(Sdate1[2], Sdate1[0], Sdate1[1]);
		var date2 = new Date(Edate2[2], Edate2[0], Edate2[1]);

		if (date2 < date1) {
			alert("Sourcing Start date cannot be greater than Sourcing End date");
			return false;
		}

	}
	// set Dates
	if (SPSourcingTimingDate.value != "") {
		SourcingTiming.value = SpDateformat(SPSourcingTimingDate.value);

	}
	if (SPSpecificationAvailableDate.value != "") {
		SpecificationAvailableDate.value = SpDateformat(SPSpecificationAvailableDate.value);
	}
	if (SPSourcingEndDate.value != "") {
		SourcingEndDate.value = SpDateformat(SPSourcingEndDate.value);
	}
	if (FormUrl.indexOf(newForm) != -1) {
		alert('Spend Pool item added successfully');
	} else {
		PoolType.disabled = false;

		alert('Spend Pool item updated successfully');
	}
	return true;
}

function setSelectedIndex(s, v) {
	for (var i = 0; i < s.options.length; i++) {
		if (s.options[i].value == v) {
			s.options[i].selected = true;
			break;
		}
	}
}

//Created by Vijay on Apr 26
function SetspendVal() {
	alert('k');
}

function LoadFunction() {
	//debugger
	//document.getElementById('ctl00_PlaceHolderMain_g_38e7e938_e0e5_48b4_8ed1_4f24ed21f349_ff15_1_ctl00_DropDownChoice').setAttribute("onChange", "SetspendVal()");
	//$('#ctl00_PlaceHolderMain_g_38e7e938_e0e5_48b4_8ed1_4f24ed21f349_ff15_1_ctl00_DropDownChoice').change(function() {
	//alert('Handler for .change() called.');
	//});

	FormUrl = window.location.href;
	Title = getField("input", "Title");
	SourcngPlan = getField("select", "SourcngPlan");
	PoolType = getField("select", "PoolType");
	Materials = getField("input", "Materials");
	SpendingPool = getField("input", "SpendingPool");
	MaterialCode = getField("input", "MaterialCode");
	EstimatedSpend = getField("input", "EstimatedSpend");
	SourcingTiming = getField("input", "SourcingTiming");
	SourcingEndDate = getField("input", "SourcingEndDate");
	SpecificationAvailableDate = getField("input", "SpecificationAvailableDate");
	Status = getField("select", "Status");
	TechSupport1 = getField("input", "TechSupport1");
	SPSourcingTimingDate = document.getElementById('txtSourcingDate');
	SPSourcingEndDate = document.getElementById('txtSourcingEndDate');
	SPSpecificationAvailableDate = document.getElementById('txtAvailableDate');

	// set the master page MY task  image
	document.getElementById('Image7').src = 'http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/images/MasterPage Images/my_tasks_hover_btn.jpg';

	LoadPlanPlants(Title.value);
	// Set Number
	EstimatedSpend.attachEvent('onkeypress', function () {
		return numbersonly(event)
	});
	// Set read only the Material code
	SpendingPool.readOnly = true;
	MaterialCode.readOnly = true;

	var urlParameterValue = gup('SId');
	if (urlParameterValue == "") {
		// alert('Please select source plan');
		//window.location="http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/WPPages/MyPlan.aspx";
	} else {
		// set Source Plan id
		Title.value = urlParameterValue; // for new item
		// check for approval
		// planStatus(urlParameterValue );
	}
	// add dropdown to SpendPool

	/*  Create Material Group dropdown */

	//var lkupName =document.getElementById('ctl00_m1_g_508672f2_74df_4a49_b049_77759a5eec2a_ctl00_ctl04_ctl03_ctl00_ctl00_ctl04_ctl00_ctl00_TextField');
	//var lkupName =document.getElementById('ctl00_m1_g_508672f2_74df_4a49_b049_77759a5eec2a_ctl00_ctl04_ctl03_ctl00_ctl00_ctl04_ctl00_ctl00_TextField');

	if (FormUrl.indexOf(newForm) != -1) {
		planStatus(urlParameterValue, "New"); //// check for approval
		Status.disabled = true;
		document.title = "New Spend Pool Item";
		var drpFram = document.createElement("select");
		drpFram.id = "drpMaterialGroup";
		drpFram.onchange = LoadMaterialCode;
		drpFram.style.width = '175';

		theOption = document.createElement("OPTION");
		theOption.innerText = "- Select Material Group -";
		theOption.setAttribute("value", "- Select Material Group -");
		drpFram.appendChild(theOption);

		Materials.parentElement.style.display = 'none';
		Materials.parentElement.parentElement.appendChild(drpFram);

		PoolType.onchange = LoadMaterial;

	} else {
		// Checking for the spend pool item is assigned to Current user or not
		var buyer = document.getElementById('ctl00_PlaceHolderMain_g_38e7e938_e0e5_48b4_8ed1_4f24ed21f349_ff9_1_ctl00_ctl00_UserField_upLevelDiv');
		if (buyer.innerText != curLoginName()) {
			alert('This task assigned to another SpendPool Buyer ');
			window.location = "http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/WPPages/MyTaskView.aspx";
		}
		var planLink = document.getElementById('tdSourcingPlan');
		planLink.innerHTML = "<span class='ms-standardheader' style='font-size:15px'>Click <a class='ms-addnew' style='font-size:1em' href='http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/WPPages/PlanItems.aspx?SId=" + Title.value + "'>here</a> to view the Sourcing Plan</span>";
		planStatus(urlParameterValue, "Edit"); // check for approval
		document.title = "Edit Spend Pool Item";
		PoolType.disabled = true;
		Materials.readOnly = true;
		SpendingPool.readOnly = true;
		MaterialCode.readOnly = true;
		// set  custom dates
		if (SourcingTiming.value != "")
			SPSourcingTimingDate.value = CustomFormat(SourcingTiming.value);
		if (SpecificationAvailableDate.value != "")
			SPSpecificationAvailableDate.value = CustomFormat(SpecificationAvailableDate.value);
		if (SourcingEndDate.value != "")
			SPSourcingEndDate.value = CustomFormat(SourcingEndDate.value);
	}
}


function LoadMaterialCode() {
	var material = document.getElementById('drpMaterialGroup');
	if (material.value != "- Select Material Group -") {
		//debugger;
		var mateiallength = material.value.indexOf("-");
		var materialcode = trim(material.value.split('-')[0]);
		var materialval = trim(material.value.substring(mateiallength + 1));
		MaterialCode.value = materialcode;
		SpendingPool.value = materialval;
	} else {
		SpendingPool.value = "";
		MaterialCode.value = "";
	}
}

function LoadPlanPlants(SPId) {
	//debugger;
	var PlanName = document.getElementById('txtSourcePlan');
	var Plants = document.getElementById('txtPlants');

	var Query = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">' + SPId + '</Value></Eq></Where></Query>';
	var ViewFields = '<ViewFields><FieldRef Name="ID"/><FieldRef Name=""/></ViewFields>';
	var items = lists.getListItems("SourcingPlan", "", Query, ViewFields, "", "", "");
	var rows = items.responseXML.getElementsByTagName("z:row");
	if (rows.length > 0) {
		PlanName.value = rows[0].getAttribute('ows_SourcingPlan');
		var str = rows[0].getAttribute('ows_Plants'); //str.substring(3

		if (str.substring(str.length - 1) != ";")
			Plants.value = str;
		else
			Plants.value = str.substring(0, str.length - 1);
	}
}
