var context = "";
var web = "";
var oList = "";
var item = '';
var lists = '';
var collListItem = '';
var deptChoiceField = '';

$(document).ready(function () {
	ExecuteOrDelayUntilScriptLoaded(RetrieveListItems, "sp.js");
});

function RetrieveListItems() {
	debugger;
	//alert("Entered");
	context = new SP.ClientContext.get_current();
	web = context.get_web();
	context.load(this.web, 'Title');

	oList = web.get_lists().getByTitle('Projects');
	context.load(this.web);
	context.load(this.oList);

	context.executeQueryAsync(Function.createDelegate(this, this.onSuccess), Function.createDelegate(this, this.onFailure));
}

function onSuccess() {
	retrieveChoiceItems();
	alert("Success");
	
	context.load(oList);
	var itemsCount = oList.get_itemCount();
	//if you are not passing any CAML query then have to use createAllItemsQuery()
	var camlQuery = new SP.CamlQuery.createAllItemsQuery();
	//var camlQuery = new SP.CamlQuery();
	//camlQuery.set_viewXml('<View><Query><Where><Gt><FieldRef Name="Marks" /><Value Type="Number">40</Value></Gt></Where></Query></View>');
	collListItem = oList.getItems(camlQuery);

	context.load(collListItem);
	context.executeQueryAsync(Function.createDelegate(this, this.viewItems), Function.createDelegate(this, this.onFailure));
}
function viewItems() {
	var listItemInfo = '<table style="border:#d2d7da solid 1px;" width="100%" border="0" cellspacing="0" cellpadding="10">';

	listItemInfo += '<tr>'
	 + '<td class="inner_table_header" align="left" valign="middle">Project Name</td>'
	 + '<td class="inner_table_header" align="left" valign="middle">Project Type</td>'
	 + '<td width="120" align="left" valign="middle" class="inner_table_header">Actual Start Date</td>'
	 + '<td width="120" align="left" valign="middle" class="inner_table_header">Actual End Date</td>'
	 + '<td width="40" align="left" valign="middle" class="inner_table_header">Status</td>'
	 + '<td width="30" align="left" valign="middle" class="inner_table_header">Edit</td>'
	 + '<td width="30" align="left" valign="middle" class="inner_table_header">Delete</td>'
	 + '</tr>';

	var listItemEnumerator = collListItem.getEnumerator();
	while (listItemEnumerator.moveNext()) {
		var oListItem = listItemEnumerator.get_current();

		listItemInfo += "<tr>";
		//listItemInfo += "<td>" + oListItem.get_id() + "</td>";
		//listItemInfo += "<td>" + oListItem.get_item('Title') + "</td>";
		//listItemInfo += "<td>" + oListItem.get_item('Marks') + "</td>";

		listItemInfo += '<td class="inner_table_flip" align="left" valign="middle">' + oListItem.get_item('Title') + '</td>'
		 + '<td class="inner_table_flip" align="left" valign="middle">' + oListItem.get_item('Project_x0020_Type') + '</td>'
		 + '<td class="inner_table_flip" align="left" valign="middle">08/27/2013 </td>'
		 + '<td class="inner_table_flip" align="left" valign="middle">08/27/2013</td>'
		 + '<td class="inner_table_flip" align="left" valign="middle">Open</td>'
		 
		 + '<td class="inner_table_flip" align="left" valign="middle"><img onclick="editItems('+oListItem.get_id()+')" src="../Style Library/images/edit.png" style="cursor:pointer" width="14" height="16"  /></td>'
		 
		 + '<td class="inner_table_flip" align="left" valign="middle"><img onclick="deleteItem('+oListItem.get_id()+')" src="../Style Library/images/delete_icon.png" style="cursor:pointer" width="16" height="16" /></td>'

		listItemInfo += "</tr>";
	}
	listItemInfo += "</table>";
	$('#divReport').html(listItemInfo);
	resetForm();
}

function onFailure(sender, args) {
	alert('Request failed.' + args.get_message() + ' \n' + args.get_stackTrace());
}

function createItem() {
	alert("goint to crate");
	var pName = $("#projName").val();
	var pType = $("#projType").val();
	var pDesc = $("#projDesc").val();

	var itemCreateInfo = new SP.ListItemCreationInformation();
	this.item = this.oList.addItem(itemCreateInfo);

	item.set_item('Title', pName);
	item.set_item('Project_x0020_Type', pType);
	item.set_item('Description', pDesc);
		
	var estStrDate=new Date("2013/1/16");
	var estEndDate=new Date("2014/12/16");
	
	item.set_item('Estimated_x0020_Start_x0020_Date',estStrDate);
	item.set_item('Estimated_x0020_End_x0020_Date',estEndDate);
	
	item.update();
	context.load(item);

	context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onFailure));
}

function onQuerySucceeded() {
	//alert("Inserted");
	$('#txtName').val('');
	$('#txtMarks').val('');
	onSuccess();
}

var upItmid="";
function updateItem() {
	alert("updated..");

	var strName = $("#projName").val();
	var strType = $("#projType").val();
	var strDesc = $("#projDesc").val();

	this.item = this.oList.getItemById(upItmid);

	item.set_item('Title', strName);
	item.set_item('Project_x0020_Type', strType);
	item.set_item('Description', strDesc);

	item.update();
	context.load(item);
	context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onFailure));
}

function deleteItem(strid) {
	this.item = this.oList.getItemById(strid);
	item.deleteObject();
	context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onFailure));
}

function retrieveChoiceItems() {

	deptChoiceField = context.castTo(oList.get_fields().getByInternalNameOrTitle('Project Type'), SP.FieldChoice);
	context.load(deptChoiceField);
	context.executeQueryAsync(
		Function.createDelegate(this, this.fillDropDown),
		Function.createDelegate(this, this.onListDataLoadQueryFailed));
}

function onListDataLoadQueryFailed(sender, args) {
	alert('Request failed.' + args.get_message() + ' \n' + args.get_stackTrace());
}

function fillDropDown() {
	var choices = deptChoiceField.get_choices();
	var ddlCategory = document.getElementById('projType');
	if (ddlCategory != null) {
		for (var i = 0; i < choices.length; i++) {
			var theOption = new Option;
			theOption.text = choices[i];
			ddlCategory.options[i] = theOption;
		}
	}
}

function editItems(strid) {

	this.item = this.oList.getItemById(strid);
	context.load(item);

	context.executeQueryAsync(
		Function.createDelegate(this, this.fillForm),
		Function.createDelegate(this, this.onFailure));
}

function fillForm() {
	
	$("#projName").val(item.get_item('Title'));
	$("#projType").val(item.get_item('Project_x0020_Type'));
	$("#projDesc").val(item.get_item('Description'));

	$("#btnCreate").hide();
	$("#btnUpdate").show();
	
	upItmid = item.get_id();
	alert(upItmid);
}


function resetForm()
{
	$("#projName").val('');
	$("#projType").val(0);
	$("#projDesc").val('');
		
	$("#btnCreate").show();
	$("#btnUpdate").hide();
}