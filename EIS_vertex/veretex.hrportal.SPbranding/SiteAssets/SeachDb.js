
//***************************************************************
//* Project Name     : EIS
//* Application name : HR Portal
//* Dependencies     :
//* Limitations      :
//* Reusables	     : Export to excel is implemented		
//* Created Date     : 6 oct 2012
//* Author           : Vijay Bhaskar C
//****************************************************************


var context = "";
var web = "";
var list = "";
var item = '';
var lists = '';
var collListItem = '';
var listName = "Employees";

function getDeatils() {

    var items = 0;
    var ANDs = '';
    var builtQuery = '';
    var Fquery = '';

    var qDept = '';
    if ($("#idDept").val() != 0) {
        var dept = $("#idDept option:selected").text();
        qDept = '<Eq>' +
			"<FieldRef Name='Department' />" +
			"<Value Type='Choice'>" + dept + "</Value>" +
			"</Eq>";
        items += 1;
    }

    var qeid = '';
    if ($('#txtEID').val() != '') {
        var eid = $("#txtEID").val();
        qeid = "<Eq>" +
			"<FieldRef Name='Employee_x0020_Id' />" +
			"<Value Type='Text'>" + eid + "</Value>" +
			"</Eq>";
        items += 1;
        if (items > 1) {
            qeid += '</And>';
        }
    }


    var qEmpName = '';
    if ($("#txtEName").val() != '') {
        var eName = $("#txtEName").val();
        qEmpName = "<Contains>" +
			"<FieldRef Name='Employee_x0020_Name' />" +
			"<Value Type='User'>" + eName + "</Value>" +
			"</Contains>";
        items += 1;
        if (items > 1) {
            qEmpName += '</And>';
        }
    }


    var datesQry = '';
    if ($("#txtStdate").val() != '' && $("#txtEndate").val() != '') {

        var dtSt = $("#txtStdate").val();
        var dtEnd = $("#txtEndate").val();

        datesQry = "<And>" +
			"<Geq>" +
			"<FieldRef Name='Date_x0020_Of_x0020_Joining' />" +
			"<Value Type='DateTime'>" + dtSt.split('/')[2] + "-" + dtSt.split('/')[0] + "-" + dtSt.split('/')[1] + "T00:00:00Z</Value>" +
			"</Geq>" +
			"<Leq>" +
			"<FieldRef Name='Date_x0020_Of_x0020_Joining' />" +
			"<Value Type='DateTime'>" + dtEnd.split('/')[2] + "-" + dtEnd.split('/')[0] + "-" + dtEnd.split('/')[1] + "</Value>" +
			"</Leq>" +
			"</And>";

        items += 1;
        if (items > 1) {
            datesQry += '</And>';
        }
    }


    for (var i = 1; i < items; i++) {
        ANDs += "<And>";
    }

    builtQuery = qDept + qeid + qEmpName + datesQry;
    var Fquery = '<View><Query><Where>' + ANDs + builtQuery + '</Where></Query></View>';

    searchQry = Fquery;
}


var searchQry = "";

function onSuccess() {
    debugger
    getDeatils();
    context.load(list);


    var itemsCount = list.get_itemCount();
    //if you are not passing any CAML query then have to use createAllItemsQuery()
    //var camlQuery = new SP.CamlQuery.createAllItemsQuery();
    var camlQuery = new SP.CamlQuery();

    camlQuery.set_viewXml(searchQry);

    collListItem = list.getItems(camlQuery);
    context.load(collListItem);
    context.executeQueryAsync(Function.createDelegate(this, this.viewItems), Function.createDelegate(this, this.onFailure));
}

var items = [];
function viewItems() {

    var listItemEnumerator = collListItem.getEnumerator();
    items = [];
    var oListItem = "";

    while (listItemEnumerator.moveNext()) {
        oListItem = listItemEnumerator.get_current();

        var new_obj = {
            "itmid": oListItem.get_id(),
            "empID": oListItem.get_item('Employee_x0020_Id'),
            "empName": oListItem.get_item('Title')
        };
        items.push(new_obj);
    }

    context.executeQueryAsync(
		Function.createDelegate(this, this.getSuccess),
		Function.createDelegate(this, this.onFailure));
}


var totCount = 0;
var PageNo = 0;

function getSuccess() {
    builtContents(PageNo);
}

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

                tbl += '<tr id=' + items[j].itmid + '><td class="inner_table_flip" align="left" valign="middle">' + items[j].empID + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + items[j].empName + '</td>';

                tbl += '</tr>';
            }
        }
    } else {
        tbl += "<tr><td>No records found.</td></tr>";
    }

    var maintble = '<table style="border:#d2d7da solid 1px;" width="100%" border="0" id="listitem1" cellspacing="0" cellpadding="10"><thead><tr><th class="inner_table_header" align="left" valign="middle"><a onclick="Sorting()"><u><font style="cursor:hand" size="2">Emp ID</font ></u><img id="sortingimage" alt="Edit" src="http://hydpcnew00123:7777/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>'
		 + '<th class="inner_table_header" align="left" valign="middle"><u><font  size="2">Emp Name</font ></u></th>'
		 + '</thead></tr><tbody>'
		 + tbl + '</tbody></table>';

    var tot = parseInt(t) + 1;
    if (end > tot) {
        end = tot;
    }

    var headers = "<table width='100%' border='0' cellSpacing='0' align='center' cellPadding='0'><tr><td class='itemTitle' style='14px;color:black'> Results :" + start + " - " + end + " of " + tot + "</td><td align=right class='norTxt' style='padding: 5px;'><a href='javascript:void(0)' id='btnPrev' onclick='prev()'>Previous</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' id='btnNext' onclick='next()'>Next</a></td></tr><tr><td height=3px></td></tr></table>";

    //$("#tdResult").html(headers + maintble);

    $('#inner_table_list1').html(headers + maintble);
    $("#listitem1 tbody tr:nth-child(even)").css("background-color", "white");
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

function onFailure(sender, args) {
    alert('Request failed.' + args.get_message() + ' \n' + args.get_stackTrace());
}


$(document).ready(function () {

    $('#txtStdate').datepicker();
    $('#txtEndate').datepicker();

    ExecuteOrDelayUntilScriptLoaded(RetrieveListItems, "sp.js");

    $('#rptButton').click(function () {
        generateReport();
    });
});
var deptChoiceField = '';

function retrieveChoiceItems() {
    deptChoiceField = context.castTo(list.get_fields().getByInternalNameOrTitle('Department'), SP.FieldChoice);
    context.load(deptChoiceField);
    context.executeQueryAsync(
		Function.createDelegate(this, this.fillDropDown),
		Function.createDelegate(this, this.onFailure));
}


function fillDropDown() {
    var choices = deptChoiceField.get_choices();
    var ddlCategory = document.getElementById('idDept');
    if (ddlCategory != null) {
        for (var i = 0; i < choices.length; i++) {
            var theOption = new Option;
            theOption.text = choices[i];
            theOption.value = i;
            ddlCategory.options[i] = theOption;
        }
    }
}

function RetrieveListItems() {

    context = new SP.ClientContext.get_current();

    list = context.get_web().get_lists().getByTitle(listName);

    context.load(this.list);

    context.executeQueryAsync(
	Function.createDelegate(this, this.retrieveChoiceItems),
	Function.createDelegate(this, this.onFailure));
}


function generateReport() {
    getDeatils();
    context.load(list);


    var itemsCount = list.get_itemCount();
    //if you are not passing any CAML query then have to use createAllItemsQuery()
    //var camlQuery = new SP.CamlQuery.createAllItemsQuery();
    var camlQuery = new SP.CamlQuery();

    camlQuery.set_viewXml(searchQry);

    collListItem = list.getItems(camlQuery);
    context.load(collListItem);
    context.executeQueryAsync(Function.createDelegate(this, this.reportGen), Function.createDelegate(this, this.onFailure));
}


function reportGen() {
    debugger
    var listItemEnumerator = collListItem.getEnumerator();
    items = [];
    var oListItem = "";
    while (listItemEnumerator.moveNext()) {
        oListItem = listItemEnumerator.get_current();

        var new_obj = {
            "itmid": oListItem.get_id(),
            "empID": oListItem.get_item('Employee_x0020_Id'),
            "empName": oListItem.get_item('Title')
        };
        items.push(new_obj);
    }

    context.executeQueryAsync(
		Function.createDelegate(this, this.createExcel),
		Function.createDelegate(this, this.onFailure));

}


function createExcel() {



    var ExcelApp = new ActiveXObject("Excel.Application");
    var ExcelSheet = new ActiveXObject("Excel.Sheet");

    ExcelSheet.Application.Visible = true;

    //if any issue occur please refer http://www.lansweeper.com/kb/10/customactions.html

    if (items.length > 0) {
        ExcelSheet.ActiveSheet.Cells(1, 1).Value = "ID";
        ExcelSheet.ActiveSheet.Cells(1, 2).Value = "Emp ID";
        ExcelSheet.ActiveSheet.Cells(1, 3).Value = "Employee Name";

        for (var j = 0; j < items.length; j++) {
            var i = j + 2;
            ExcelSheet.ActiveSheet.Cells(i, 1).Value = items[j].itmid;
            ExcelSheet.ActiveSheet.Cells(i, 2).Value = items[j].empID;
            ExcelSheet.ActiveSheet.Cells(i, 3).Value = items[j].empName;
        }
    }
}
