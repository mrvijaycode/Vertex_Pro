var context = "";
var web = "";
var list = "";
var listName = "Employees";
var item = '';
var lists = '';
var collListItem = '';

$(document).ready(function () {

	$('#brdcrmbTitle').hide();
	$('#leftdiv').hide();

	ExecuteOrDelayUntilScriptLoaded(RetrieveListItems, "sp.js");
});

function RetrieveListItems() {

	context = new SP.ClientContext.get_current();

	web = context.get_web();
	lists = web.get_lists();
	list = context.get_web().get_lists().getByTitle(listName);

	context.load(this.web);
	context.load(this.list);

	context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onFailure));
}

function onQuerySucceeded() {
	context.load(list);
	var itemsCount = list.get_itemCount();
	//if you are not passing any CAML query then have to use createAllItemsQuery()
	//var camlQuery = new SP.CamlQuery.createAllItemsQuery();
	var camlQuery = new SP.CamlQuery();
	//camlQuery.set_viewXml('<View><Query><Where><Gt><FieldRef Name="Marks" /><Value Type="Number">40</Value></Gt></Where></Query></View>');

	var strXML = "<View><Query>" +
		"<Where>" +
		"<And>" +
		"<Geq>" +
		"<FieldRef Name='Employee_x0020_ConfirmationDate' />" +
		"<Value Type='DateTime'><Today/></Value>" +
		"</Geq>" +
		"<Leq>" +
		"<FieldRef Name='Employee_x0020_ConfirmationDate' />" +
		"<Value Type='DateTime'>" + today()[2] + "-" + today()[0] + "-" + today()[1] + "T00:00:00Z</Value>" +
		"</Leq>" +
		"</And>" +
		"</Where>" +
		"</Query></View>";

	camlQuery.set_viewXml(strXML);
	collListItem = list.getItems(camlQuery);

	context.load(collListItem);
	context.executeQueryAsync(
		Function.createDelegate(this, this.viewItems),
		Function.createDelegate(this, this.onFailure));
}

function viewItems() {
	var listItemInfo = '';
	var listItemEnumerator = collListItem.getEnumerator();
	while (listItemEnumerator.moveNext()) {
		var oListItem = listItemEnumerator.get_current();

		var frmtDate = new Date(oListItem.get_item('Employee_x0020_ConfirmationDate'));

		listItemInfo += '<tr>' +
		'<td class="home_table_flip" align="left" valign="middle">' + oListItem.get_item('Employee_x0020_Id') + '</td>' +
		'<td class="home_table_flip" align="left" valign="middle">' + oListItem.get_item('Title') + '</td>' +
		' <td class="home_table_flip" align="left" valign="middle">' + frmtDate.toLocaleDateString() + '</td>' +
		'<td class="home_table_flip" align="left" valign="middle">' + oListItem.get_item('Employee_x0020_type') + '</td>' +
		'</tr>';
	}
	if (listItemInfo == "") {
		listItemInfo += '<tr><td colspan="4" class="home_table_flip" align="left" valign="middle">No records found.<td></tr>';
	}

	var tblwpCnf = '<h3>Employees to be permanent soon</h3>' +
		'<table width="100%" border="0" cellspacing="0" cellpadding="10">' +
		'<tr >' +
		'<td class="home_table_header" align="left" valign="middle">Employee ID</td>' +
		'<td class="home_table_header" align="left" valign="middle">Employee Name</td>' +
		' <td class="home_table_header" align="left" valign="middle">Confirmation Date</td>' +
		'<td class="home_table_header" align="left" valign="middle">Employment Type</td>' +
		'</tr>' +
		listItemInfo +
		'</table>';

	$('#home_status_left').html(tblwpCnf);
}

function today() {
	var today = new Date();
	//to add days
	var dd = today.getDate() + 10;
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	today = mm + '/' + dd + '/' + yyyy;
	//document.write(today);
	return [mm, dd, yyyy];
}

function onFailure(sender, args) {
	alert('Request failed.' + args.get_message() + ' \n' + args.get_stackTrace());
}