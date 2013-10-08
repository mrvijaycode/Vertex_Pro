var context,
web,
spItems,
position,
nextPagingInfo,
previousPagingInfo,
listName = 'Projects',
pageIndex = 1,
pageSize = 4,
list,
camlQuery,
sortColumn, flag = 1;

var eststartdate, estenddate, actstartdate, actenddate, description, projecttype, projectname, status, idval, upidval, projChoiceField, projectMembers;

$(document).ready(function () {

    $("#eststartdate").datepicker();
    $("#estenddate").datepicker();
    $("#actstartdate").datepicker();
    $("#actenddate").datepicker();
    $('#updatebutton').hide();

    ExecuteOrDelayUntilScriptLoaded(RetrieveListItems, "sp.js");

    $("#updatebutton").click(function () {
        update();
        Resetform();
    });

    $("#savebutton").click(function () {
        AddListItems();
        Resetform();
    });


});
var projectMembers = "";

function getProjectMembersInformation() {

    $("#ctl00_PlaceHolderMain_projectMembers_upLevelDiv").find('span').each(function (i) {
        if ((i + 1) % 2 != 0) {
            var userName = $(this).attr('title');
            if (userName != "undefined") {
                projectMembers += getuserId(userName) + ";#a;#";

            }
        }
    });
    alert(projectMembers);
}
function getuserId(userName) {
    var Uid = '';
    $().SPServices({
        operation: 'GetUserInfo',
        userLoginName: userName,
        async: false,
        debug: true,
        completefunc: function (xData, Status) {
            alert(xData.responseText);
            $(xData.responseXML).SPFilterNode("User").each(function () {
                Uid = $(this).attr("ID");
            });
        }
    });
    return Uid;
}


function RetrieveListItems() {

    context = SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(listName);
    web = context.get_web();

    camlQuery = new SP.CamlQuery.createAllItemsQuery();

    spItems = list.getItems(camlQuery);
    context.load(spItems);
    context.load(this.web);
    context.load(this.list);

    context.executeQueryAsync(
		Function.createDelegate(this, onQuerySucceeded),
		Function.createDelegate(this, onFail));
}

function onQuerySucceeded() {

    retrieveChoiceFields();

    context.load(list);

    var itemsCount = list.get_itemCount();
    collListItem = list.getItems(camlQuery);

    context.load(collListItem);
    context.executeQueryAsync(Function.createDelegate(this, this.viewItems), Function.createDelegate(this, this.onFail));
}

var items = [];
var content = "";

function viewItems() {

    var listEnumerator = collListItem.getEnumerator();

    items = [];
    var oListItem;

    context.load(list);
    var itemsCount = list.get_itemCount();
    while (listEnumerator.moveNext()) {

        oListItem = listEnumerator.get_current();

        var actdate1 = oListItem.get_item('Actual_x0020_Start_x0020_Date');
        var actdate2 = new Date(actdate1);
        actdate2 = (actdate2.getUTCMonth() + 1) + '/' + actdate2.getDate() + '/' + actdate2.getFullYear();

        var actenddate1 = oListItem.get_item('Actual_x0020_End_x0020_Date');
        var actenddate2 = new Date(actenddate1);
        actenddate2 = (actenddate2.getMonth() + 1) + '/' + actenddate2.getDate() + '/' + actenddate2.getFullYear();

        var new_obj = {
            "itmid": oListItem.get_id(),
            "projTitle": oListItem.get_item('Title'),
            "projType": oListItem.get_item('Project_x0020_Type'),
            "actStDate": actdate2,
            "actEndDate": actenddate2,
            "projStatus": oListItem.get_item('Status')
        };
        items.push(new_obj);
    }
    context.executeQueryAsync(
		Function.createDelegate(this, this.getSuccess),
		Function.createDelegate(this, this.onFail));
}

var totCount = 0;
var PageNo = 0;

function getSuccess() {

    builtContents(PageNo);

}

//taken from CBD
function builtContents(pageN) {
    t = items.length - 1;
    var start = pageN * 5;
    var end = start + 5;
    var str = "";
    totCount = t / 5;

    var tbl = "";
    if (items.length > 0) {
        for (var j = start; j < end; j++) {
            if (j <= t) {

                tbl += '<tr id=' + items[j].itmid + '><td class="inner_table_flip" align="left" valign="middle">' + items[j].projTitle + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + items[j].projType + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + items[j].actStDate + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + items[j].actEndDate + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + items[j].projStatus + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle"><a onclick="Edit(' + items[j].itmid + ')"><img alt="Edit" src="http://inhy2ksprnd2010:5555/Style%20Library/Images/edit.png" width="14" height="16" /></a></td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle"><a onclick="Delete(' + items[j].itmid + ')"><img alt="Delete" src="http://inhy2ksprnd2010:5555/Style%20Library/Images/delete_icon.png" width="14" height="16" /></a></td></tr>';

            }
        }
    } else {
        tbl += "<tr><td>No records found.</td></tr>";
    }

    var maintble = '<table style="border:#d2d7da solid 1px;" width="100%" border="0" id="listitem1" cellspacing="0" cellpadding="10"><thead><tr><th class="inner_table_header" align="left" valign="middle"><a onclick="Sorting(\'Title\')"><u><font style="cursor:hand" size="2">Project Name</font ></u><img id="Title" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>'
		 + '<th class="inner_table_header" align="left" valign="middle"><a onclick="Sorting(\'Project_x0020_Type\')"><u><font style="cursor:hand" size="2">ProjectType</font ></u><img id="Project_x0020_Type" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>'
		 + '<th width="120" align="left" valign="middle" class="inner_table_header"><a onclick="Sorting(\'Actual_x0020_Start_x0020_Date\')"><u><font style="cursor:hand" size="2">Actual Start Date</font ></u><img id="Actual_x0020_Start_x0020_Date" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th><th width="30" align="left" valign="middle" class="inner_table_header"><a onclick="Sorting(\'Actual_x0020_End_x0020_Date\')"><u><font style="cursor:hand" size="2">Actual End Date</font ></u><img id="Actual_x0020_End_x0020_Date" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>'
		 + '<th width="30" align="left" valign="middle" class="inner_table_header"><u><font size="2">Status</font ></u></th>'
		 + '<th width="30" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Edit</font ></u></th><th width="30" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Delete</font ></u></th></thead></tr><tbody>'
		 + tbl + "</tbody></table>";

    var tot = parseInt(t) + 1;
    if (end > tot) {
        end = tot;
    }

    var headers = "<table width='100%' border='0' cellSpacing='0' align='center' cellPadding='0'><tr><td class='itemTitle' style='14px;color:black'> Results :" + start + " - " + end + " of " + tot + "</td><td align=right class='norTxt' style='padding: 5px;'><a href='javascript:void(0)' id='btnPrev' onclick='prev()'>Previous</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' id='btnNext' onclick='next()'>Next</a></td></tr><tr><td height=3px></td></tr></table>";

    //$("#tdResult").html(headers + maintble);


    $('#inner_table_list1').html(headers + maintble);
    $("#listitem1 tbody tr:nth-child(even)").css("background-color", "white");
}

function update() {
    getInputFormValues();
    getProjectMembersInformation();
    debugger;
    this.item = this.list.getItemById(upidval);
    item.set_item('Title', projectname);
    item.set_item('Project_x0020_Type', projecttype);
    item.set_item('Actual_x0020_Start_x0020_Date', actstartdate);
    item.set_item('Actual_x0020_End_x0020_Date', actenddate);
    item.set_item('Estimated_x0020_Start_x0020_Date', eststartdate);
    item.set_item('Project_x0020_Members', projectMembers);
    item.set_item('Description', description);
    item.set_item('Status', status);
    item.update();
    context.load(item);
    context.executeQueryAsync(
		Function.createDelegate(this, this.onQuerySucceeded),
		Function.createDelegate(this, this.onFail));
}

function Resetform() {
    $("#eststartdate").val('');
    $("#estenddate").val("");
    $("#actstartdate").val("");
    $("#actenddate").val("");
    $("#description").val("");
    $("#statusO").val("");
    $("#projectname").val("");
    $("#projecttype").val(0);
    $('#savebutton').show();
    $('#updatebutton').hide();
}

function Delete(idval) {
    $("#" + idval).css("background-color", "#e2edff");
    this.item = this.list.getItemById(idval);
    item.deleteObject();
    //alert("Item Deleted...");
    context.executeQueryAsync(
		Function.createDelegate(this, this.onQuerySucceeded),
		Function.createDelegate(this, this.onFail));
}

function getInputFormValues() {
    projectname = $('#projectname').val();
    if (projectname == "" || typeof projectname === 'undefined' || projectname == null) {
        alert("ProjectName must entered");
        return false;
        projectname = '';
    }

    eststartdate = $("#eststartdate").val();
    if (eststartdate == "" || typeof eststartdate === 'undefined' || eststartdate == null) {
        alert("eststartdate must entered");
        return false;

        eststartdate = '';
    } else {
        eststartdate = $('#eststartdate').val().split('/')[2] + "-" + $('#eststartdate').val().split('/')[0] + "-" + $('#eststartdate').val().split('/')[1] + "T00:00:00Z";
    }

    estenddate = $("#estenddate").val();
    if (estenddate == "" || typeof estenddate === 'undefined' || estenddate == null) {
        alert("Estimated start date must entered");
        return false;

        estenddate = '';
    } else {
        estenddate = $('#estenddate').val().split('/')[2] + "-" + $('#estenddate').val().split('/')[0] + "-" + $('#estenddate').val().split('/')[1] + "T00:00:00Z";
    }

    actstartdate = $("#actstartdate").val();
    if (actstartdate == "" || typeof actstartdate === 'undefined' || actstartdate == null) {
        actstartdate = '';
    } else {
        actstartdate = $('#actstartdate').val().split('/')[2] + "-" + $('#actstartdate').val().split('/')[0] + "-" + $('#actstartdate').val().split('/')[1] + "T00:00:00Z";
    }

    actenddate = $("#actenddate").val();
    if (actenddate == "" || typeof actenddate === 'undefined' || actenddate == null) {
        alert("Actual end date must entered");
        return false;

        actenddate = '';
    } else {
        actenddate = $('#actenddate').val().split('/')[2] + "-" + $('#actenddate').val().split('/')[0] + "-" + $('#actenddate').val().split('/')[1] + "T00:00:00Z";
    }

    projecttype = $('#projecttype option:selected').text();
    if (projecttype == "" || typeof projecttype === 'undefined') {
        projecttype = '';
    }
    debugger;
    status = $('input[name=status]:checked').val();



    description = $('#description').val();
    if (description == "" || typeof description === 'undefined' || description == null) {
        description = '';
    }
}
// Add List items Function.......


function AddListItems() {
    //context = new SP.ClientContext.get_current();
    //list = context.get_web().get_lists().getByTitle('Projects');
debugger
    var listItemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = list.addItem(listItemCreateInfo);
    getInputFormValues();
    getProjectMembersInformation();

    oListItem.set_item('Title', projectname);
    oListItem.set_item('Project_x0020_Type', projecttype);
    oListItem.set_item('Actual_x0020_Start_x0020_Date', actstartdate);
    oListItem.set_item('Actual_x0020_End_x0020_Date', actenddate);
    oListItem.set_item('Estimated_x0020_Start_x0020_Date', eststartdate);
    oListItem.set_item('Estimated_x0020_End_x0020_Date', estenddate);
    oListItem.set_item('Project_x0020_Members', projectMembers);


    oListItem.set_item('Description', description);
    oListItem.set_item('Status', status);
    oListItem.update();
    context.load(oListItem);

    context.executeQueryAsync(
		Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onFail));
}

function Edit(idval) {
    $("#" + idval).css("background-color", "#e2edff");
    this.item = this.list.getItemById(idval);
    context.load(item);

    context.executeQueryAsync(
		Function.createDelegate(this, this.fillProjectForm), Function.createDelegate(this, this.onFail));
}

function fillProjectForm() {
    var actdate1 = item.get_item('Actual_x0020_Start_x0020_Date');
    var actdate2 = new Date(actdate1);
    actdate2 = (actdate2.getMonth() + 1) + '/' + actdate2.getDate() + '/' + actdate2.getFullYear();
    var actenddate1 = item.get_item('Actual_x0020_End_x0020_Date');
    var actenddate2 = new Date(actenddate1);
    actenddate2 = (actenddate2.getMonth() + 1) + '/' + actenddate2.getDate() + '/' + actenddate2.getFullYear();
    var eststartdate1 = item.get_item('Estimated_x0020_Start_x0020_Date');
    var eststartdate2 = new Date(eststartdate1);
    eststartdate2 = (eststartdate2.getMonth() + 1) + '/' + eststartdate2.getDate() + '/' + eststartdate2.getFullYear();
    var estenddate1 = item.get_item('Estimated_x0020_End_x0020_Date');
    var estenddate2 = new Date(estenddate1);
    estenddate2 = (estenddate2.getMonth() + 1) + '/' + estenddate2.getDate() + '/' + estenddate2.getFullYear();
    $("#eststartdate").val(eststartdate2);

    var length = item.get_item('Project_x0020_Members').length;
    var projmem = '';
    if (length != null) {
        for (var p = 0; p <= length - 1; p++) {
            projmem += item.get_item('Project_x0020_Members')[p].get_lookupValue() + ";";



        }
    }
    $("#ctl00_PlaceHolderMain_projectMembers_upLevelDiv").text(projmem);
    $("#ctl00_PlaceHolderMain_projectMembers_checkNames").click();
    $("#ctl00_PlaceHolderMain_projectMembers_checkNames").attr('disabled', 'false');

    $("#estenddate").val(estenddate2);
    $("#actstartdate").val(actdate2);
    $("#actenddate").val(actenddate2);
    $("#description").val(item.get_item('Description'));
    status = item.get_item('Status');

    if (status == "Open") {
        $('#statusO').attr('checked', 'checked');
    }
    else
        if (status == "Closed") {
            $('#statusC').attr('checked', 'checked');

        }

    $("#projectname").val(item.get_item('Title'));
    $("#projecttype").val(item.get_item('Project_x0020_Type'));
    $('#projectMembers').val(item.get_item('Project_x0020_Members'));
    upidval = item.get_id();
    $('#savebutton').hide();
    $('#updatebutton').show();
}

function retrieveChoiceFields() {
    projChoiceField = context.castTo(list.get_fields().getByInternalNameOrTitle('Project_x0020_Type'), SP.FieldChoice);
    context.load(projChoiceField);
    context.executeQueryAsync(
		Function.createDelegate(this, this.fillProjDropDown),
		Function.createDelegate(this, this.onFail));
}

function fillProjDropDown() {
    var choices = projChoiceField.get_choices();
    var ddlproject = document.getElementById('projecttype');
    if (ddlproject != null) {
        for (var i = 0; i < choices.length; i++) {
            var theOption = new Option;
            theOption.text = choices[i];
            theOption.value = i;
            ddlproject.options[i] = theOption;
        }
    }
}

function Sorting(sortColumn) {
    if (flag == "0") {

        context = SP.ClientContext.get_current();
        list = context.get_web().get_lists().getByTitle(listName);
        camlQuery = new SP.CamlQuery();

        //camlQuery.set_listItemCollectionPosition(position);

        camlQuery.set_viewXml("<View>" +
			"<ViewFields>" +
			"<FieldRef Name='Title'/>" +
			"<FieldRef Name='Project_x0020_Type'/>" +
			"<FieldRef Name='Actual_x0020_Start_x0020_Date'/>" +
			"<FieldRef Name='Actual_x0020_End_x0020_Date'/>" +
			"<FieldRef Name='Status'/>" +
			"</ViewFields>" +
			"<Query>" +
			"<OrderBy>" +
			"<FieldRef Name='" + sortColumn + "' Ascending='true' />" +
			"</OrderBy>" +
			"</Query></View>");
        spItems = list.getItems(camlQuery);
        flag = 1;
        context.load(spItems);
        context.executeQueryAsync(
			Function.createDelegate(this, onQuerySucceeded),
			Function.createDelegate(this, onFail));

        $('#' + sortColumn).attr('src', "http://inhy2ksprnd2010:5555/Style%20Library/Images/Uparrow.jpg");
    } else if (flag == "1") {


        context = SP.ClientContext.get_current();
        list = context.get_web().get_lists().getByTitle(listName);
        camlQuery = new SP.CamlQuery();

        //camlQuery.set_listItemCollectionPosition(position);

        camlQuery.set_viewXml("<View>" +
			"<ViewFields>" +
			"<FieldRef Name='Title'/>" +
			"<FieldRef Name='Project_x0020_Type'/>" +
			"<FieldRef Name='Actual_x0020_Start_x0020_Date'/>" +
			"<FieldRef Name='Actual_x0020_End_x0020_Date'/>" +
			"<FieldRef Name='Status'/>" +
			"</ViewFields>" +
			"<Query>" +
			"<OrderBy>" +
			"<FieldRef Name='" + sortColumn + "' Ascending='flase' />" +
			"</OrderBy>" +
			"</Query></View>");
        spItems = list.getItems(camlQuery);
        flag = 0;
        $('#' + sortColumn).attr('src', "http://inhydpc151:34981/Style Library/Images/downarrow.jpg");
        context.load(spItems);
        context.executeQueryAsync(
			Function.createDelegate(this, onQuerySucceeded),
			Function.createDelegate(this, onFail));

    }
}


function onFail(sender, args) {
    alert('Request failed.' + args.get_message() + ' \n' + args.get_stackTrace());
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