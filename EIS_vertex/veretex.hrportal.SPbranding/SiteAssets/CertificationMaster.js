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

$(document).ready(function () {

    $('#updatebutton').hide();

    ExecuteOrDelayUntilScriptLoaded(RetrieveListItems, "sp.js");

    $("#updatebutton").click(function () {
        update();
    });

});

validate = function RetrieveListItems() {

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
function viewItems() {
    var listEnumerator = collListItem.getEnumerator();

    var items = [];
    var item;
    //context.load(list);
    var itemsCount = list.get_itemCount();
    if (itemsCount != 0) {
        while (listEnumerator.moveNext()) {
            item = listEnumerator.get_current();

            items.push('<tr id=' + item.get_id() + '><td class="inner_table_flip" align="left" valign="middle">' + item.get_item('Title') + '</td>');
            items.push('<td class="inner_table_flip" align="left" valign="middle">' + item.get_item('Certified_x0020_By') + '</td>');
            items.push('<td class="inner_table_flip" align="left" valign="middle">' + item.get_item('Skill_x0020_Category') + '</td>');
            items.push('<td class="inner_table_flip" align="left" valign="middle">' + item.get_item('Skill') + '</td>');
            items.push('<td class="inner_table_flip" align="left" valign="middle"><a onclick="Edit(' + item.get_id() + ')"><img alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/edit.png" width="14" height="16" /></a></td>');
            items.push('<td class="inner_table_flip" align="left" valign="middle"><a onclick="Delete(' + item.get_id() + ')"><img alt="Delete" src="http://inhydpc151:34981/Style%20Library/Images/delete_icon.png" width="14" height="16" /></a></td></tr>');
        }

        var content = '<table style="border:#d2d7da solid 1px;" width="100%" border="0" id="listitem1" cellspacing="0" cellpadding="10"><thead><tr><th class="inner_table_header" align="left" valign="middle"><a onclick="Sorting()"><u><font style="cursor:hand" size="2">Certification Name</font ></u><img id="sortingimage" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>'
			 + '<th class="inner_table_header" align="left" valign="middle"><u><font  size="2">Certified By</font ></u></th>'
			 + '<th width="120" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Skill Category</font ></u></th>'
			 + '<th width="30" align="left" valign="middle" class="inner_table_header"><u><font size="2">Skill</font ></u></th>'
			 + '<th width="30" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Edit</font ></u></th><th width="30" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Delete</font ></u></th></thead></tr><tbody>'
			 + items.join("") + "</tbody></table>";
        $('#inner_table_list1').html(content);
        $("#listitem1 tbody tr:nth-child(even)").css("background-color", "white");

    } else {
        alert("No Records Were Found");
    }
    Resetform();

}

function update() {
    getInputFormValues();
    this.item = this.list.getItemById(upidval);

    //item.set_item('Title', "Test");
    item.set_item('Title', certname);
    item.set_item('Skill_x0020_Category', SkillCategory);
    item.set_item('Skill', Skill);
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
    SkillCategory = $('#SkillCategory option:selected').text();
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
    }
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
        oListItem.set_item('Skill_x0020_Category', SkillCategory);
        oListItem.set_item('Skill', Skill);
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
    SkillCategory = context.castTo(list.get_fields().getByInternalNameOrTitle('Skill_x0020_Category'), SP.FieldChoice);
    Skill = context.castTo(list.get_fields().getByInternalNameOrTitle('Skill'), SP.FieldChoice);
    certby = context.castTo(list.get_fields().getByInternalNameOrTitle('Certified_x0020_By'), SP.FieldChoice);

    context.load(Skill);
    context.load(SkillCategory);
    context.load(certby);
    context.executeQueryAsync(
		Function.createDelegate(this, this.fillSkillCategory),
		Function.createDelegate(this, this.onListDataLoadQueryFailed));
}

function onListDataLoadQueryFailed(sender, args) {
    alert('Request failed.' + args.get_message() + ' \n' + args.get_stackTrace());
}

function fillSkillCategory() {
    var choices = SkillCategory.get_choices();
    var skillchoices = Skill.get_choices();
    var Authoritychoices = certby.get_choices();
    var ddlskill = document.getElementById('Skill');
    if (ddlskill != null) {
        for (var i = 0; i < skillchoices.length; i++) {
            var theoption = new Option;
            theoption.text = skillchoices[i];
            ddlskill.options[i] = theoption;

        }
    }
    var ddlAuthority = document.getElementById('certby');
    if (ddlAuthority != null) {
        for (var i = 0; i < Authoritychoices.length; i++) {
            var theoption = new Option;
            theoption.text = Authoritychoices[i];
            ddlAuthority.options[i] = theoption;
        }
    }

    var ddlSkillCategory = document.getElementById('SkillCategory');
    if (ddlSkillCategory != null) {
        for (var i = 0; i < choices.length; i++) {
            var theOption = new Option;
            theOption.text = choices[i];
            ddlSkillCategory.options[i] = theOption;
        }
    }
}

function onFail(sender, args) {
    alert('Request failed.' + args.get_message() + ' \n' + args.get_stackTrace());
}