

//Checking for current user
var curUser = $().SPServices.SPGetCurrentUser();

var userName=curUser;

//Get user id if user exists already else add the user in to one group
function getuserId(userName) {
	var uId = '';
	uId = getid(userName);
	if (uId != '') {
		return uId;
	} else {
		addUser(userName);
		return getid(userName);
	}
}

//Get user id by passing login name
function getid(userName) {
	var Uid = '';
	$().SPServices({
		operation : 'GetUserInfo',
		userLoginName : userName,
		async : false,
		debug : true,
		completefunc : function (xData, Status) {
			//alert(xData.responseText);
			$(xData.responseXML).SPFilterNode("User").each(function () {
				Uid = $(this).attr("ID");
			});
		}
	});
	return Uid;
}

//Get user name by passing login name
function getuserName(userName) {
	var uName = '';
	var uId = '';
	$().SPServices({
		operation : 'GetUserInfo',
		userLoginName : userName,
		async : false,
		completefunc : function (xData, Status) {
			//alert(xData.responseText);
			$(xData.responseXML).SPFilterNode("User").each(function () {
				uName = $(this).attr("Name");
			});
		}
	});
	return uName;
}

//Add user to the group if user is not existed
function addUser(userName) {
	$().SPServices({
		operation : "AddUserToGroup",
		groupName : "Genomics",
		async : false,
		userLoginName : userName,
		userNotes : "Added by system automate while updating Studyform",
		debug : true,
		completefunc : function (xData, Status) {
			//alert(Status + " added to Genomics Group");
		}
	});
}


//Check user existance in a group by passing the Group ID.
var IsAdmin = false;
function checkAdmin() {
	$().SPServices({
		operation : "GetGroupCollectionFromUser",
		userLoginName : curUser,
		async : false,
		completefunc : function (xData, Status) {
			//alert(xData.responseText);
			if ($(xData.responseXML).find("Group[ID='6']").length == 1) {
				IsAdmin = true;
				//$("#spnAdmin").show();
			} else {
				IsAdmin = false;
				//$("#spnAdmin").hide();
			}
		}
	});
	return IsAdmin;
}


//To add item into list
function addPurpose() {
	var strPurpose = $("select[id='selPurpose'] option:selected").text();
	var strPurposeval = $("select[id='selPurpose'] option:selected").val();
	var strQuestion = $("textarea#txtQuestion").val();
	var studyAuthor = $("a[id$='_Menu']").text().split(' ')

		if (chkAllfilled('divmain')) {
			//alert(strPurpose + "," + strQuestion);
			$().SPServices({
				operation : "UpdateListItems",
				async : false,
				batchCmd : "New",
				listName : "Study",
				updates : "<Batch OnError='Continue' PreCalc='TRUE'>" +
				"<Method ID='1' Cmd='New'>" +
				"<Field Name='Fundamental_questions'>" + CorrectStringAsSPData(strQuestion) + "</Field>" +
				"<Field Name='Purpose' Type='LookUp' LookUpID='True'>" + strPurposeval + "</Field>" +
				"<Field Name='StudyAuthor'>" + studyAuthor[2] + " " + studyAuthor[1].split(",")[0] + "</Field>" +
				"<Field Name='enableStage'>Step1</Field>" +
				"<Field Name='EnableWF'>1</Field>" +
				"</Method>" +
				"</Batch>",
				completefunc : function (xData, Status) {
					resetControls();
					jAlert('Successfully added', 'Alert Dialog');
					if (Status != 'success')
						alert(Status);
				}
			});
		}
}


//To delete List  items
function deleteSpendingItem(itemID) {
	var docId = itemID;
	var response = confirm("Are you sure you want to delete the Sourcing Plan Item ?");
	if (response == true) {
		//debugger;
		var sQuery = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">' + docId + '</Value></Eq></Where></Query>';
		$().SPServices({
			operation : "UpdateListItems",
			async : false,
			batchCmd : "Delete",
			listName : "SourcingPlanItems",
			ID : docId,
			completefunc : function (xData, Status) {

				alert('Souece Plan Item deleted successfully');
				//location.reload();
				getSpendingItem(sourceId);
			}
		});
	}
}


//To display all items using SPServices
$(document).ready(function () {
	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		//webURL : webUrl,//pass webUrl dynamically
		listName : "Members", // List Name
		CAMLQueryOptions : "<QueryOptions><IncludeAttachmentUrls>TRUE</IncludeAttachmentUrls></QueryOptions>",
		CAMLViewFields : "<ViewFields><FieldRef Name='Title' /></ViewFields>",
		CAMLQuery : "",
		CAMLRowLimit : 1,
		completefunc : function (xData, Status) {

			alert(xData.responseText);

			if (xData.status == 200) {
				$(xData.responseXML).SPFilterNode("z:row").each(function () {

					//var keyMeasure = $(this).attr("ows_Key_x0020_Measure");

				});
			} else {
				alert(xData.status);
			}
		}
	});
});


//Update List Items
function updateItem(idOfItem, num) {
	var status = $("#selStatus" + num + "").val(); 
	var supplier = $("#txtSupplier" + num + "").val();
	var purProcess = $("#txtPurProcess" + num + "").val();
	var SpecAvaDate = $("#txtSpecAvaDate" + num + "").val();
	var comments = $("#txtComments" + num + "").val();
	SpecAvaDate = formDate(SpecAvaDate);

	$().SPServices({
		operation : "UpdateListItems",
		listName : "ListName",
		ID : idOfItem,
		valuepairs : [["Notes", comments], ["Status", status], ["Supplier", supplier], ["PurchasingProcess", purProcess], ["SpecificationAvailableDate", SpecAvaDate]],
		completefunc : function (xData, Status) {
			if (Status)
				getPools(clickID);
		}
	});
}