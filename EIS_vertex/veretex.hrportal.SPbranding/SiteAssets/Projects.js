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
sortColumn = 'Project_x0020_Name', flag = 1;
var eststartdate, estenddate, actstartdate, actenddate, description, projecttype, projectname, statusC, statusO, idval, upidval, projChoiceField;

$(document).ready(function () {

    $("#eststartdate").datepicker();
    $("#estenddate").datepicker();
    $("#actstartdate").datepicker();
    $("#actenddate").datepicker();
    $('#updatebutton').hide();

    ExecuteOrDelayUntilScriptLoaded(RetrieveListItems, "sp.js");

    $("#btnNext").click(function () {
        pageIndex = pageIndex + 1;
        if (nextPagingInfo) {
            position = new SP.ListItemCollectionPosition();
            position.set_pagingInfo(nextPagingInfo);
        } else {
            position = null;
        }
        RetrieveListItems();
    });

    $("#btnBack").click(function () {
        pageIndex = pageIndex - 1;
        position = new SP.ListItemCollectionPosition();
        position.set_pagingInfo(previousPagingInfo);
        RetrieveListItems();
    });
    $("#updatebutton").click(function () {
        update();
    });
});

function update() {

    getInputFormValues();
    this.item = this.list.getItemById(upidval);
    item.set_item('Title', "Test");
    item.set_item('Project_x0020_Name', projectname);
    item.set_item('Project_x0020_Type', projecttype);
    item.set_item('Actual_x0020_Start_x0020_Date', actstartdate);
    item.set_item('Actual_x0020_End_x0020_Date', actenddate);
    item.set_item('Estimated_x0020_Start_x0020_Date', eststartdate);
    item.set_item('Estimated_x0020_End_x0020_Date', estenddate);
    item.set_item('Description', description);
    item.set_item('Status', statusO);
    item.update();
    context.load(item);
    context.executeQueryAsync(Function.createDelegate(this, this.OnSuccess), Function.createDelegate(this, this.onFail));
}
function OnSuccess() {
    alert("Item Updated Successfully....");
}

function Resetform() {
    $("#eststartdate").val('');
    $("#estenddate").val("");
    $("#actstartdate").val("");
    $("#actenddate").val("");
    $("#description").val("");
    $("#statusO").val("");
    $("#projectname").val("");
    $("#projecttype").val("");
    $('#savebutton').show();
    $('#updatebutton').hide();
}

function Delete(idval) {
    $("#" + idval).css("background-color", "#e2edff");
    this.item = this.list.getItemById(idval);
    item.deleteObject();
    alert("Item Deleted...");
    context.executeQueryAsync(Function.createDelegate(this, this.getItemsOnDelete), Function.createDelegate(this, this.onFail));
}


function getItemsOnDelete() {
    Resetform();
    RetrieveListItems();
}

function Save() {
    ExecuteOrDelayUntilScriptLoaded(AddListItems, "sp.js");
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


    statusC = $('#statusC').val();
    if (statusC == "" || typeof statusC === 'undefined') {
        statusC = '';
    }


    $(':input[type="checkbox"]').each(function () {
        var name = this.name;
        var val = this.checked;
        if (val) {
            checked[name] = val;
        }
    });


    statusO = $('#statusO').val();
    debugger;
    if (statusO == "" || typeof statusO === 'undefined') {
        statusO = '';
    }

    description = $('#description').val();
    if (description == "" || typeof description === 'undefined' || description == null) {
        description = '';
    }
}
// Add List items Function.......


function AddListItems() {
    context = new SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle('Projects');

    var listItemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = list.addItem(listItemCreateInfo);
    getInputFormValues();

    oListItem.set_item('Title', "Test");
    oListItem.set_item('Project_x0020_Name', projectname);
    oListItem.set_item('Project_x0020_Type', projecttype);
    oListItem.set_item('Actual_x0020_Start_x0020_Date', actstartdate);
    oListItem.set_item('Actual_x0020_End_x0020_Date', actenddate);
    oListItem.set_item('Estimated_x0020_Start_x0020_Date', eststartdate);
    oListItem.set_item('Estimated_x0020_End_x0020_Date', estenddate);
    oListItem.set_item('Description', description);
    oListItem.set_item('Status', statusO);
    oListItem.update();
    context.load(oListItem);

    context.executeQueryAsync(Function.createDelegate(this, this.OnSuccesseeded), Function.createDelegate(this, this.onFail));

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

    $("#estenddate").val(estenddate2);
    $("#actstartdate").val(actdate2);
    $("#actenddate").val(actenddate2);
    $("#description").val(item.get_item('Description'));
    $("#statusO").val(item.get_item('Status'));
    $("#projectname").val(item.get_item('Project_x0020_Name'));
    $("#projecttype").val(item.get_item('Project_x0020_Type'));
    upidval = item.get_id();
    $('#savebutton').hide();
    $('#updatebutton').show();
}

function OnSuccesseeded() {
    alert("Item added successfully ...");
}

function RetrieveListItems() {

    context = SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(listName);
    camlQuery = new SP.CamlQuery();

    camlQuery.set_listItemCollectionPosition(position);

    camlQuery.set_viewXml("<View>" +
		"<ViewFields>" +
		"<FieldRef Name='Title'/>" +
		"<FieldRef Name='Project_x0020_Name'/>" +
		"<FieldRef Name='Project_x0020_Type'/>" +
		"<FieldRef Name='Actual_x0020_Start_x0020_Date'/>" +
		"<FieldRef Name='Actual_x0020_End_x0020_Date'/>" +
		"<FieldRef Name='Status'/>" +
		"</ViewFields>" +
		"<Query>" +
		"<OrderBy>" +
		"<FieldRef Name='" + sortColumn + "' Ascending='true' />" +
		"</OrderBy>" +
		"</Query>" +
		"<RowLimit>" + pageSize + "</RowLimit></View>");

    spItems = list.getItems(camlQuery);
    context.load(spItems);
    context.executeQueryAsync(
		Function.createDelegate(this, onSuccess),
		Function.createDelegate(this, onFail));
}

function onSuccess() {
    var listEnumerator = spItems.getEnumerator();
    var items = [];
    var item;
    while (listEnumerator.moveNext()) {
        item = listEnumerator.get_current();
        var actdate1 = item.get_item('Actual_x0020_Start_x0020_Date');
        var actdate2 = new Date(actdate1);
        actdate2 = (actdate2.getUTCMonth() + 1) + '/' + actdate2.getDate() + '/' + actdate2.getFullYear();
        var actenddate1 = item.get_item('Actual_x0020_End_x0020_Date');
        var actenddate2 = new Date(actenddate1);
        actenddate2 = (actenddate2.getMonth() + 1) + '/' + actenddate2.getDate() + '/' + actenddate2.getFullYear();

        items.push('<tr id=' + item.get_id() + '><td class="inner_table_flip" align="left" valign="middle">' + item.get_item('Project_x0020_Name') + '</td>');
        items.push('<td class="inner_table_flip" align="left" valign="middle">' + item.get_item('Project_x0020_Type') + '</td>');
        items.push('<td class="inner_table_flip" align="left" valign="middle">' + actdate2 + '</td>');
        items.push('<td class="inner_table_flip" align="left" valign="middle">' + actenddate2 + '</td>');
        items.push('<td class="inner_table_flip" align="left" valign="middle">' + item.get_item('Status') + '</td>');
        items.push('<td class="inner_table_flip" align="left" valign="middle"><a onclick="Edit(' + item.get_id() + ')"><img alt="Edit" src="http://hydpcnew00123:7777/Style%20Library/Images/edit.png" width="14" height="16" /></a></td>');
        items.push('<td class="inner_table_flip" align="left" valign="middle"><a onclick="Delete(' + item.get_id() + ')"><img alt="Delete" src="http://hydpcnew00123:7777/Style%20Library/Images/delete_icon.png" width="14" height="16" /></a></td></tr>');

    }

    var content = '<table style="border:#d2d7da solid 1px;" width="100%" border="0" id="listitem1" cellspacing="0" cellpadding="10"><thead><tr><th class="inner_table_header" align="left" valign="middle"><a onclick="Sorting()"><u><font style="cursor:hand" size="2">Project Name</font ></u><img id="sortingimage" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>'
		 + '<th class="inner_table_header" align="left" valign="middle"><u><font  size="2">Project Type</font ></u></th>'
		 + '<th width="120" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Actual Start Date</font ></u></th><th width="30" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Actual End Date</font ></u></th>'
		 + '<th width="30" align="left" valign="middle" class="inner_table_header"><u><font size="2">Status</font ></u></th>'
		 + '<th width="30" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Edit</font ></u></th><th width="30" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Delete</font ></u></th></thead></tr><tbody>'
		 + items.join("") + "</tbody></table>";
    $('#inner_table_list1').html(content);
    $("#listitem1 tbody tr:nth-child(even)").css("background-color", "white");
    retrieveChoiceFields();
    managePagerControl();
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
            ddlproject.options[i] = theOption;
        }
    }
}


function Sorting() {
    if (flag == "0") {

        RetrieveListItems();
        flag = 1;
        $('#sortingimage').attr('src', "http://hydpcnew00123:7777/Style%20Library/Images/Uparrow.jpg");
    } else if (flag == "1") {

        context = SP.ClientContext.get_current();
        list = context.get_web().get_lists().getByTitle(listName);
        camlQuery = new SP.CamlQuery();

        camlQuery.set_listItemCollectionPosition(position);

        camlQuery.set_viewXml("<View>" +
			"<ViewFields>" +
			"<FieldRef Name='Title'/>" +
			"<FieldRef Name='Project_x0020_Name'/>" +
			"<FieldRef Name='Project_x0020_Type'/>" +
			"<FieldRef Name='Actual_x0020_Start_x0020_Date'/>" +
			"<FieldRef Name='Actual_x0020_End_x0020_Date'/>" +
			"<FieldRef Name='Status'/>" +
			"</ViewFields>" +
			"<Query>" +
			"<OrderBy>" +
			"<FieldRef Name='" + sortColumn + "' Ascending='flase' />" +
			"</OrderBy>" +
			"</Query>" +
			"<RowLimit>" + pageSize + "</RowLimit></View>");

        spItems = list.getItems(camlQuery);
        flag = 0;
        context.load(spItems);
        context.executeQueryAsync(
			Function.createDelegate(this, onSuccess),
			Function.createDelegate(this, onFail));
        $('#sortingimage').attr('src', "http://hydpcnew00123:7777/Style%20Library/Images/downarrow.jpg");
    }
}


function managePagerControl() {

    if (spItems.get_listItemCollectionPosition()) {
        nextPagingInfo = spItems.get_listItemCollectionPosition().get_pagingInfo();

    } else {
        nextPagingInfo = null;
    }

    $("#pageInfo").html((((pageIndex - 1) * pageSize) + 1) + " - " + ((pageIndex * pageSize) - (pageSize - spItems.get_count())));

    previousPagingInfo = "PagedPrev=TRUE&Paged=TRUE&p_ID=" + spItems.itemAt(0).get_item('ID') + "&p_" + sortColumn + "=" + encodeURIComponent(spItems.itemAt(0).get_item(sortColumn));

    if (pageIndex <= 1) {
        $("#btnBack").attr('disabled', 'disabled');

    } else {
        $("#btnBack").removeAttr('disabled');
    }

    if (nextPagingInfo) {
        $("#btnNext").removeAttr('disabled');
    } else {
        $("#btnNext").attr('disabled', 'disabled');
    }
}

function onFail(sender, args) {
    alert('Request failed.' + args.get_message() + ' \n' + args.get_stackTrace());
}