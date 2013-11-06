var curUser = $().SPServices.SPGetCurrentUser();

var userName=curUser;

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