var context,
web,
spItems,
position,
nextPagingInfo,
previousPagingInfo,
listName = 'Certification',
pageIndex = 1,
pageSize = 4,
list,
camlQuery,
sortColumn = 'Title', flag = 1;
var certby, certname, certdetails, SkillCategory, Skill, Notes, idval, upidval, conval = 0;
var ItemContainer = { ItemList: [] }, skillItemEnumerator = { skillItemList: [] };

$(document).ready(function () {
    
    $('#updatebutton').hide();
    ExecuteOrDelayUntilScriptLoaded(retrieveSkilllookUpItems, "sp.js");


    $("#updatebutton").click(function () {
        update();
    });

    $("#savebutton").click(function () {
        AddListItems();
        Resetform();
    });

});

function RetrieveListItems() {
    
    context = SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(listName);
    web = context.get_web();
    camlQuery = new SP.CamlQuery.createAllItemsQuery();
    //camlQuery = new SP.CamlQuery();

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

    retrieveChoiceFields();

    context.load(list);

    var itemsCount = list.get_itemCount();
    var camlQuery = new SP.CamlQuery.createAllItemsQuery();

    collListItem = list.getItems(camlQuery);

    context.load(collListItem);
    context.executeQueryAsync(Function.createDelegate(this, this.viewItems), Function.createDelegate(this, this.onFail));
}

var items = [];

function viewItems() {
    var listEnumerator = collListItem.getEnumerator();

    items = [];
    var item;
    //context.load(list);
    var itemsCount = list.get_itemCount();
    while (listEnumerator.moveNext()) {
        item = listEnumerator.get_current();

        if (item.get_item('Title') != null)
            var strSkill = item.get_item('Title');
        else
            var strSkill = "";

        if (item.get_item('Certified_x0020_By') != null)
            var strCertBy = item.get_item('Certified_x0020_By');
        else
            var strCertBy = "";

        if (item.get_item('Skill_x0020_Category') != null)
            var strSkillCat = item.get_item('Skill_x0020_Category').get_lookupValue();
        else
            var strSkillCat = "";

        if (item.get_item('Skill') != null)
            var strSkill2 = item.get_item('Skill').get_lookupValue();
        else
            var strSkill2 = "";

        var new_obj = {
            "itmid": item.get_id(),
            "certTitle": strSkill,
            "certBy": strCertBy,
            "certSkillCat": strCertBy,
            "certSkill": strSkill2
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

                tbl += '<tr id=' + items[j].itmid + '><td class="inner_table_flip" align="left" valign="middle">' + items[j].certTitle + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + items[j].certBy + '</td>';
                var certskillcatid = items[j].certSkillCat;
                if (certskillcatid == null) {
                    certskillcatid = '';
                }

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + certskillcatid + '</td>';
                var certskill = items[j].certSkill;
                if (certskill == null) {
                    certskill = '';
                }

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + certskill + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle"><a onclick="Edit(' + items[j].itmid + ')"><img alt="Edit" src="http://inhy2ksprnd2010:5555/Style%20Library/Images/edit.png" width="14" height="16" /></a></td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle"><a onclick="Delete(' + items[j].itmid + ')"><img alt="Delete" src="http://inhy2ksprnd2010:5555/Style%20Library/Images/delete_icon.png" width="14" height="16" /></a></td></tr>';
            }
        }
    } else {
        tbl += "<tr><td>No records found.</td></tr>";
    }

    var maintble = '<table style="border:#d2d7da solid 1px;" width="100%" border="0" id="listitem1" cellspacing="0" cellpadding="10"><thead><tr><th class="inner_table_header" align="left" valign="middle"><a onclick="Sorting()"><u><font style="cursor:hand" size="2">Certification Name</font ></u><img id="sortingimage" alt="Edit" src="http://inhy2ksprnd2010:5555/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>'
		 + '<th class="inner_table_header" align="left" valign="middle"><u><font  size="2">Certified By</font ></u></th>'
		 + '<th width="120" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Skill Category</font ></u></th>'
		 + '<th width="30" align="left" valign="middle" class="inner_table_header"><u><font size="2">Skill</font ></u></th>'
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
    this.item = this.list.getItemById(upidval);

    //item.set_item('Title', "Test");
    item.set_item('Title', certname);
    item.set_item('Skill_x0020_Category', SkillCategory.options[SkillCategory.selectedIndex].value + ";#" + SkillCategory.options[SkillCategory.selectedIndex].text);
    item.set_item('Skill', Skill.options[Skill.selectedIndex].value + ";#" + Skill.options[Skill.selectedIndex].text);

    //item.set_item('Skill_x0020_Category', SkillCategory);
    //item.set_item('Skill', Skill);
    item.set_item('Certification_x0020_Details', certdetails);
    item.set_item('Certified_x0020_By', certby);
    item.set_item('Notes', Notes);
    item.update();
    context.load(item);
    context.executeQueryAsync(
		Function.createDelegate(this, this.onQuerySucceeded),
		Function.createDelegate(this, this.onFail));
}

function Resetform() {

    $("#certby").val(0);
    $("#certname").val("");
    $("#certdetails").val("");
    $("#Skill").val(0);
    $("#Notes").val("");
    $("#SkillCategory").val(0);
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

    certname = $('#certname').val();
    if (certname == "" || typeof certname === 'undefined' || certname == null) {
        certname = '';
        alert("Enter Certification Name...");
        conval = 1;
        return false;
    }

    certby = $('#certby option:selected').text();
    if (certby == "" || typeof certby === 'undefined' || certby == null || certby == "Select") {
        certby = '';
        alert('Select Certified By...');
        conval = 1;
        return false;
    }
    certname = $('#certname').val();
    if (certname == "" || typeof certname === 'undefined' || certname == null) {
        certname = '';
        conval = 1;
        alert('Certification Name');
        conval = 1;
        return false;
    }
    certdetails = $('#certdetails').val();
    if (certdetails == "" || typeof certdetails === 'undefined' || certdetails == null) {
        certdetails = '';
        conval = 1;
        alert("Enter Certification Details....");

        return false;
    }
    SkillCategory = document.getElementById('SkillCategory');
    Skill = document.getElementById('Skill');

    /*SkillCategory = $('#SkillCategory option:selected').text();
    if (SkillCategory == "" || typeof SkillCategory === 'undefined' || SkillCategory == "Select") {
    SkillCategory = '';
    conval = 1;
    alert("Select Skill category ....");

    return false;
    }

    Skill = $('#Skill option:selected').text();
    if (Skill == "" || typeof Skill === 'undefined' || Skill == "Select") {
    Skill = '';
    conval = 1;
    alert("Select skill ....");
    return false;
    } */
    Notes = $('#Notes').val();
    return true;

}
// Add List items Function.......


function AddListItems() {
    var listItemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = list.addItem(listItemCreateInfo);
    //getInputFormValues();

    if (getInputFormValues() == true) {
        //oListItem.set_item('Title', certname);
        oListItem.set_item('Certified_x0020_By', certby);
        oListItem.set_item('Title', certname);
        oListItem.set_item('Certification_x0020_Details', certdetails);
        oListItem.set_item('Skill_x0020_Category', SkillCategory.options[SkillCategory.selectedIndex].value + ";#" + SkillCategory.options[SkillCategory.selectedIndex].text);
        oListItem.set_item('Skill', Skill.options[Skill.selectedIndex].value + ";#" + Skill.options[Skill.selectedIndex].text);
        oListItem.set_item('Notes', Notes);

        oListItem.update();
        context.load(oListItem);

        context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onFail));
    }
}

function Edit(idval) {
    $("#" + idval).css("background-color", "#e2edff");
    this.item = this.list.getItemById(idval);
    context.load(item);

    context.executeQueryAsync(
		Function.createDelegate(this, this.fillProjectForm), Function.createDelegate(this, this.onFail));
}

function fillProjectForm() {

    $("#Notes").val(item.get_item('Notes'));
    $("#certby").val(item.get_item('Certified_x0020_By'));
    $("#certname").val(item.get_item('Title'));
    $("#certdetails").val(item.get_item('Certification_x0020_Details'));
    $("#SkillCategory").val(item.get_item('Skill_x0020_Category'));
    $("#Skill").val(item.get_item('Skill'));

    upidval = item.get_id();
    $('#savebutton').hide();
    $('#updatebutton').show();
}

function retrieveChoiceFields() {
    certby = context.castTo(list.get_fields().getByInternalNameOrTitle('Certified_x0020_By'), SP.FieldChoice);
    context.load(certby);
    context.executeQueryAsync(
		Function.createDelegate(this, this.fillSkillCategory),
		Function.createDelegate(this, this.onListDataLoadQueryFailed));
}
function onListDataLoadQueryFailed(sender, args) {
    alert('Request failed.' + args.get_message() + ' \n' + args.get_stackTrace());
}
function fillSkillCategory() {
    var Authoritychoices = certby.get_choices();

    var ddlAuthority = document.getElementById('certby');
    if (ddlAuthority != null) {
        for (var i = 0; i < Authoritychoices.length; i++) {
            var theoption = new Option;
            theoption.text = Authoritychoices[i];
            theoption.value = i;
            ddlAuthority.options[i] = theoption;
        }
    }
}

function retrieveSkilllookUpItems() {
    //	debugger;
    context = new SP.ClientContext.get_current();
    var oList = context.get_web().get_lists().getByTitle('Skill Category Master');
    var camlQuery = SP.CamlQuery.createAllItemsQuery();
    this.collListItem = oList.getItems(camlQuery);
    context.load(collListItem);

    context.executeQueryAsync(
            Function.createDelegate(this, this.onListDataLoadQuerySucceeded),
            Function.createDelegate(this, this.onListDataLoadQueryFailed));
}

function onListDataLoadQuerySucceeded(sender, args) {
    var listItemInfo = '';
    var listItemEnumerator = collListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        var titletempItem = { Id: oListItem.get_id(), Value: oListItem.get_item('Title') };
        skillItemEnumerator.skillItemList.push(titletempItem);
        var tempItem = { Id: oListItem.get_id(), Value: oListItem.get_item('Skill_x0020_Category') };
        ItemContainer.ItemList.push(tempItem);
    }

    fillissuingAuthorityDropDown();
    RetrieveListItems();
}

function onListDataLoadQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
function fillissuingAuthorityDropDown() {
    var ddlskillcat = document.getElementById('SkillCategory');
    if (ddlskillcat != null) {
        for (var i = 0; i < ItemContainer.ItemList.length; i++) {
            var theOption = new Option;
            theOption.value = ItemContainer.ItemList[i].Id;
            theOption.text = ItemContainer.ItemList[i].Value;
            ddlskillcat.options[i] = theOption;
        }
    }


    var ddlSkill = document.getElementById('Skill');
    if (ddlSkill != null) {
        for (var i = 0; i < skillItemEnumerator.skillItemList.length; i++) {
            var theOption = new Option;
            theOption.value = skillItemEnumerator.skillItemList[i].Id;
            theOption.text = skillItemEnumerator.skillItemList[i].Value;
            ddlSkill.options[i] = theOption;

        }
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