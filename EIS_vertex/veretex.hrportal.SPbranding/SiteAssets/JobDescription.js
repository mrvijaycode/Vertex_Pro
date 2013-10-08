var context,
web,
spItems,
position,
nextPagingInfo,
previousPagingInfo,
listName = 'Job Description',
pageIndex = 1,
pageSize = 4,
list,
camlQuery,
sortColumn = 'Title', flag = 0;
var title, EffectiveDate, level, rolesresp, Notes, status, upidval, idval;

$(document).ready(function () {

    $("#EffectiveDate").datepicker();
    $('#updatebutton').hide();

    ExecuteOrDelayUntilScriptLoaded(RetrieveListItems, "sp.js");

    $("#updatebutton").click(function () {
        update();
    });

    $("#resetbutton").click(function () {
        Resetform();
    });

    $("#savebutton").click(function () {
        isfill = true;
        AddlistItems();
    });

});


function RetrieveListItems() {

    context = SP.ClientContext.get_current();
    web = context.get_web();
    list = context.get_web().get_lists().getByTitle(listName);

    camlQuery = new SP.CamlQuery.createAllItemsQuery();
    camlQuery.set_listItemCollectionPosition(position);

    spItems = list.getItems(camlQuery);

    context.load(spItems);
    context.load(this.web);
    context.load(this.list);

    context.executeQueryAsync(
		Function.createDelegate(this, onQuerySucceeded),
		Function.createDelegate(this, onFail));
}

function onQuerySucceeded() {

    //managePagerControl();
    Resetform();
    retrieveChoiceFields();

    context.load(list);
    var itemsCount = list.get_itemCount();

    //if you are not passing any CAML query then have to use createAllItemsQuery()
    var camlQuery = new SP.CamlQuery.createAllItemsQuery();
    collListItem = list.getItems(camlQuery);

    context.load(collListItem);

    context.executeQueryAsync(
		Function.createDelegate(this, this.viewItems),
		Function.createDelegate(this, this.onFailure));
}

var items = [];

function viewItems() {

    var listEnumerator = collListItem.getEnumerator();
    items = [];
    var item;
    while (listEnumerator.moveNext()) {
        item = listEnumerator.get_current();


        var new_obj = {
            "itmid": item.get_id(),
            "jobTitle": item.get_item('Title'),
            "jobStatus": item.get_item('Status')
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

                tbl += '<tr id=' + items[j].itmid + '><td class="inner_table_flip" align="left" valign="middle">' + items[j].jobTitle + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + items[j].jobStatus + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle"><a onclick="Edit(' + items[j].itmid + ')"><img alt="Edit" src="http://hydpcnew00123:7777/Style%20Library/Images/edit.png" width="14" height="16" /></a></td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle"><a onclick="Delete(' + items[j].itmid + ')"><img alt="Delete" src="http://hydpcnew00123:7777/Style%20Library/Images/delete_icon.png" width="14" height="16" /></a></td></tr>';
            }
        }
    } else {
        tbl += "<tr><td>No records found.</td></tr>";
    }

    var maintble = '<table style="border:#d2d7da solid 1px;" width="100%" border="0" id="listitem1" cellspacing="0" cellpadding="10"><thead><tr><th class="inner_table_header" align="left" valign="middle"><a onclick="Sorting()"><u><font style="cursor:hand" size="2">Title</font ></u><img id="sortingimage" alt="Edit" src="http://hydpcnew00123:7777/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>'
		 + '<th class="inner_table_header" align="left" valign="middle"><u><font  size="2">Status</font ></u></th>'
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
    item.set_item('Title', title);
    item.set_item('Effective_x0020_Date', EffectiveDate);
    item.set_item('Level', level);
    item.set_item('Roles_x0020_Responsibilities', rolesresp);
    item.set_item('Notes', Notes);
    item.set_item('Status', status);

    item.update();
    context.load(item);
    context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onFail));
}

function Delete(idval) {
    $("#" + idval).css("background-color", "#e2edff");
    this.item = this.list.getItemById(idval);
    item.deleteObject();
    //alert("Item Deleted...");
    context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onFail));

}

function Edit(idval) {
debugger
    $("#" + idval).css("background-color", "#e2edff");
    this.item = this.list.getItemById(idval);
    context.load(item);
    context.executeQueryAsync(
		Function.createDelegate(this, this.fillJobdescForm), Function.createDelegate(this, this.onFail));

}

function fillJobdescForm() {

    var efctdate = item.get_item('Effective_x0020_Date');
    var efctdate = new Date(efctdate);
    efctdate = (efctdate.getMonth() + 1) + '/' + efctdate.getDate() + '/' + efctdate.getFullYear();
    $("#title").val(item.get_item('Title'));
    $("#EffectiveDate").val(efctdate);
    $("#level").val(item.get_item('Level'));
    $("#Notes").val(item.get_item('Notes'));
    $("#status").val(item.get_item('Status'));
    $("#rolesresp").val(item.get_item('Roles_x0020_Responsibilities'));

    upidval = item.get_id();
   //alert(upidval);
    $('#savebutton').hide();
    $('#updatebutton').show();
}


var isfill = true;

function getInputFormValues() {

    title = $("#title").val();
    EffectiveDate = $("#EffectiveDate").val();

    if (EffectiveDate == "" || typeof EffectiveDate === 'undefined' || EffectiveDate == null) {
        alert("EffectiveDate must entered");
        EffectiveDate = '';
        $('#EffectiveDate').focus();
        isfill = false;
    } else {
        EffectiveDate = $('#EffectiveDate').val().split('/')[2] + "-" + $('#EffectiveDate').val().split('/')[0] + "-" + $('#EffectiveDate').val().split('/')[1] + "T00:00:00Z";
    }

    level = $("#level option:selected").val();
    if (level == "" || typeof level === 'undefined' || level == null) {
        alert("please select level");
        level = '';
        $('#level').focus();
        isfill = false;
    }

    rolesresp = $("#rolesresp").val();
    Notes = $("#Notes").val();

    status = $("#status option:selected").val();
    if (status == "" || typeof status === 'undefined' || status == null) {
        status = '';
        alert("please select level");
        $('#status').focus();
        isfill = false;
    }

}

function AddlistItems() {
    getInputFormValues();
    context = new SP.ClientContext.get_current();
    //debugger;
    list = context.get_web().get_lists().getByTitle('Job Description');

    if (isfill) {
        var listItemCreateInfo = new SP.ListItemCreationInformation();
        this.oListItem = list.addItem(listItemCreateInfo);
        oListItem.set_item('Title', title);
        oListItem.set_item('Roles_x0020_Responsibilities', rolesresp);
        oListItem.set_item('Level', level);
        oListItem.set_item('Effective_x0020_Date', EffectiveDate);
        oListItem.set_item('Status', status);
        oListItem.set_item('Notes', Notes);
        oListItem.update();
        context.load(oListItem);

        context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onFail));
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
			"<FieldRef Name='Status'/>" +
			"<FieldRef Name='Roles_x0020_Responsibilities'/>" +
			"<FieldRef Name='Level'/>" +
			"<FieldRef Name='Effective_x0020_Date'/>" +
			"<FieldRef Name='Notes'/>" +

			"</ViewFields>" +
			"<Query>" +
			"<OrderBy>" +
			"<FieldRef Name='" + sortColumn + "' Ascending='false' />" +
			"</OrderBy>" +
			"</Query>" +
			"<RowLimit>" + pageSize + "</RowLimit></View>");

        spItems = list.getItems(camlQuery);

        context.load(spItems);
        context.executeQueryAsync(
			Function.createDelegate(this, onQuerySucceeded),
			Function.createDelegate(this, onFail));
        flag = 0;
        $('#sortingimage').attr('src', "http://hydpcnew00123:7777/Style%20Library/Images/downarrow.jpg");
    }
}

function Resetform() {

    $("#title").val('');
    $("#EffectiveDate").val("");
    $("#level").val(0);
    $("#Notes").val('');
    $("#status").val('');
    $("#rolesresp").val('');
    $('#savebutton').show();
    $('#updatebutton').hide();
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



function retrieveChoiceFields() {
    projChoiceField = context.castTo(list.get_fields().getByInternalNameOrTitle('Level'), SP.FieldChoice);
    context.load(projChoiceField);
    context.executeQueryAsync(
		Function.createDelegate(this, this.fillProjDropDown),
		Function.createDelegate(this, this.onFail));
}

function fillProjDropDown() {
    var choices = projChoiceField.get_choices();
    var ddlproject = document.getElementById('level');
    if (ddlproject != null) {
        for (var i = 0; i < choices.length; i++) {
            var theOption = new Option;
            theOption.text = choices[i];
            theOption.value = i;
            ddlproject.options[i] = theOption;
        }
    }
}