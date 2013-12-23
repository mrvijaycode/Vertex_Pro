
var context,
web, item, empitem,
spItems,
listName = 'Employees',
list, oList,
camlQuery,
idval, upidval, collListItem;

var listNameskillcat = 'Skill Category Master',
certListName = 'Certification',
projectslistName = "Projects";

var ename, empid, fname, mname, lname, username, mstatus, gender, dbirth, etype, estatus, dept, ucal, designation, djoin, emailid, notes, supname;

var mobile, residence, pmailid, locaddress, loccountry, locstate, loccity, locpcode, percountry, perstate, percity, perpcode, peraddress, emercontact, contactname;

var edutype, educourse, insname, edufromyear, edutoyear, university, eduscore, educountry, edustate, educity, edunotes;

var ItemContainer = {
    ItemList: []
}, certnameItemContainer = {
    certnameItemList: []
}, ProjItemContainer = {
    ProjItem: []
};

var certname, issueAuth, certid, dateofcert, validtill, scoregrade, certnotes;
var passportnumber, passportdateofissue, passportdatexp, passnotes, typeofvisa, visadateofissue, visaexpirydate, visanotes;

var totExpyrs, totEexpmnths, expyrsvrtx, expinmonthsvrtx, relexpdomain, relexpyrs1, relexpinmnths1, confirmDate, AppraisalDate, bloodgroup, text1, text2, text3, date1;

var totEXP, expinVrtx, relEXPVal;
var projname, projitemid, Uid;

$(document).ready(function () {
    $('#Empprofupdatebutton').hide();
    $('#AssignProjbutton').hide();
    ResetuserFields();
    getDatePIckerPluginAppend();
    cntdetTextBoxesValidation();
    ExecuteOrDelayUntilScriptLoaded(retrieveChoiceFields, "sp.js");
    ExecuteOrDelayUntilScriptLoaded(retrieveEduDetChoiceFields, "sp.js");
    ExecuteOrDelayUntilScriptLoaded(retrieveCertificationlookUpItems, "sp.js");


    $('#projname').change(function () {
        $('#NewProjbutton').hide()
        var val = $('#projname option:selected').text();
        projitemid = GetIdOFtheProjectListItem(val);
    });

    $('#Checkbox1').click(function () {
        if ($(this).is(':checked')) {
            locaddress = $('#locaddress').val();
            loccountry = $('#loccountry').val();
            locstate = $('#locstate').val();
            loccity = $('#loccity').val();
            locpcode = $('#locpcode').val();

            $('#peraddress').val(locaddress);
            $('#percountry').val(loccountry);
            $('#perstate').val(locstate);
            $('#percity').val(loccity);
            $('#perpcode').val(locpcode);
        }
        else {
            $('#peraddress').val("");
            $('#percountry').val("");
            $('#perstate').val("");
            $('#percity').val("");
            $('#perpcode').val("");

        }

        //$("input[name^='ename']").bind("keyup", profileDataFilling);


    });


    /* ............................ Employee Name Blur  function starts here .....*/
    $('#ctl00_PlaceHolderMain_ename_upLevelDiv').blur(function () {

        $('#ctl00_PlaceHolderMain_ename_checkNames').click();

        var userName = $('#ctl00_PlaceHolderMain_ename_upLevelDiv').find('span').attr('Title');
        getid(userName);
        profileDataFilling();

    });


    /* ................Supervisor blur function strats Here ..........*/

    $('#ctl00_PlaceHolderMain_supervisor_upLevelDiv').blur(function () {
        supname = $('#ctl00_PlaceHolderMain_supervisor_upLevelDiv').find('span').attr('Title');
        getsupid(supname);
        profileDataFilling()
    });

    $('#pmailid').blur(function () {
        var sEmail = $('#pmailid').val();
        if ($.trim(sEmail).length == 0) {
            alert('Please enter valid email address');
            e.preventDefault();
        }
        if (IsEmail(sEmail)) { }
        else {
            alert('Invalid Email Address');
            e.preventDefault();
        }
    });

    $('#emailid').blur(function () {
        var sEmail = $('#emailid').val();
        if ($.trim(sEmail).length == 0) {
            alert('Please enter valid email address');
            e.preventDefault();
        }
        if (IsEmail(sEmail)) { }
        else {
            alert('Invalid Email Address');
            e.preventDefault();
        }
    });


});

/* ...................................End of ready function ...........................................................*/
function profileDataFilling() {

    var returncount = getItemCount();
    if (returncount == '0') {
        $('#username').val(username);
        $("#emailid").val(emailid);
        $("#notes").val(notes);
    }


}
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

/* ........................................... Contact Details Function ..................................................*/

function getCondetInputFormValues() {
    mobile = $('#mobile').val();
    if (mobile == "" || typeof mobile === 'undefined' || mobile == null) {
        alert("Mobile Number Must Enter..");
        $('#mobile').focus();
        return false;
    }
    residence = $('#residence').val();
    pmailid = $('#pmailid').val();
    if (pmailid == "" || typeof pmailid === 'undefined' || pmailid == null) {
        alert("Personal Mail Id Must Enter..");
        $('#pmailid').focus();
        return false;
    }
    locaddress = $('#locaddress').val();
    if (locaddress == "" || typeof locaddress === 'undefined' || locaddress == null) {
        alert("Present Address Must Enter..");
        $('#locaddress').focus();

        return false;
    }
    loccountry = $('#loccountry').val();
    if (loccountry == "" || typeof loccountry === 'undefined' || loccountry == null) {
        alert("Present Country Must Enter..");
        $('#loccountry').focus();
        return false;
    }
    locstate = $('#locstate').val();
    if (locstate == "" || typeof locstate === 'undefined' || locstate == null) {
        alert("Present State Must Enter..");
        $('#locstate').focus();

        return false;
    }
    loccity = $('#loccity').val();
    if (loccity == "" || typeof loccity === 'undefined' || loccity == null) {
        alert("Present CityMust Enter..");
        $('#loccity').focus();

        return false;
    }
    locpcode = $('#locpcode').val();
    if (locpcode == "" || typeof locpcode === 'undefined' || locpcode == null) {
        alert("Present Address Pincode Must Enter..");
        $('#locpcode').focus();
        return false;
    }

    emercontact = $('#emercontact').val();
    if (emercontact == null) {
        emercontact = '';
    }
    contactname = $('#contactname').val();
    if (contactname == null) {
        contactname = '';
    }

    peraddress = $('#peraddress').val()
    if (peraddress == null) {
        peraddress = '';
    }
    percountry = $('#percountry').val();
    if (percountry == null) {
        percountry = '';
    }

    perstate = $('#perstate').val();
    if (perstate == null) {
        perstate = '';
    }

    percity = $('#percity').val();
    if (percity == null) {
        percity = '';
    }

    perpcode = $('#perpcode').val();
    if (perpcode == null) {
        perpcode = '';
    }

    return true;
}



function contactDetailsUpdate() {

    context = new SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(listName);
    this.item = this.list.getItemById(upidval);

    if (getCondetInputFormValues() == true) {

        item.set_item('Mobile', mobile);
        item.set_item('Residence', residence);
        item.set_item('Personal_x0020_Mail_x0020_ID', pmailid);
        item.set_item('Loc_x0020_Address', locaddress);
        item.set_item('Loc_x0020_Country', loccountry);
        item.set_item('Loc_x0020_State', locstate);
        item.set_item('Loc_x0020_City', loccity);
        item.set_item('Loc_x0020_PinCode', locpcode);
        item.set_item('Per_x0020_Address', peraddress);
        item.set_item('Per_x0020_Country', percountry);
        item.set_item('Per_x0020_State', perstate);
        item.set_item('Per_x0020_PinCode', perpcode);
        item.set_item('Per_x0020_City', percity);
        item.set_item('Emergency_x0020_Contact', emercontact);
        item.set_item('Contact_x0020_Name', contactname);
        item.update();
        context.load(item);

        context.executeQueryAsync(Function.createDelegate(this, this.contactDetitemUpdated), Function.createDelegate(this, this.onFail));
    }

}


function contactDetitemUpdated() {
    //resetForm();
    alert("Item Updated successfully...");
}

function getItemCount() {

    var itemCount;
    //var myQuery = "<Query><Where><Eq><FieldRef Name='User_x0020_Name' /><Value Type='Text'>" + username + "</Value></Eq></Where></Query>";
    var myQuery = "<Query><Where><Eq><FieldRef Name='Employee_x0020_Name' /><Value Type='User'>" + username + "</Value></Eq></Where></Query>";

    $().SPServices({
        operation: "GetListItems",
        async: false,
        debug: true,
        listName: listName,
        CAMLQuery: myQuery,
        CAMLRowLimit: 10,
        completefunc: function (xData, Status) {

            itemCount = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
            if (itemCount != 0) {
                resetForm();
                $('#savebutton').hide();
                $('#Empprofupdatebutton').show();
                var didConfirm = confirm("Employee already Exist \n you want to Update");
                if (didConfirm == true) {

                    $(xData.responseXML).SPFilterNode("z:row").each(function () {

                        upidval = $(this).attr('ows_ID');

                        if ($(this).attr('ows_User_x0020_Name'))
                            $('#username').val($(this).attr('ows_User_x0020_Name'));
                        if ($(this).attr('ows_Employee_x0020_Id'))
                            $("#empid").val($(this).attr('ows_Employee_x0020_Id'));
                        if ($(this).attr('ows_Title'))
                            $("#fname").val($(this).attr('ows_Title'));
                        if ($(this).attr('ows_Middle_x0020_Name'))
                            $("#mname").val($(this).attr('ows_Middle_x0020_Name'));
                        if ($(this).attr('ows_Last_x0020_Name'))
                            $("#lname").val($(this).attr('ows_Last_x0020_Name'));
                        if ($(this).attr('ows_Marital_x0020_Status'))
                            $("#mstatus option:contains(" + $(this).attr('ows_Marital_x0020_Status') + ")").attr('selected', 'selected');

                        if ($(this).attr('ows_Gender'))
                            $("#gender option:contains(" + $(this).attr('ows_Gender') + ")").attr('selected', 'selected');
                        //$("#gender").val($(this).attr('ows_Gender'))

                        var dbirth1 = $(this).attr('ows_Date_x0020_Of_x0020_Birth');
                        if (dbirth1 != null) {
                            dbirth1 = InputDate(dbirth1);
                            //dbirth1 = dbirth1.split('-')[1] + "/" + dbirth1.split('-')[2] + "/" + dbirth1.split('-')[0];
                        } else {
                            dbirth1 = '';
                        }
                        $("#dbirth").val(dbirth1);
                        if ($(this).attr('ows_Employee_x0020_type'))
                            $("#etype option:contains(" + $(this).attr('ows_Employee_x0020_type') + ")").attr('selected', 'selected');
                        //$("#etype").val($(this).attr('ows_Employee_x0020_type'));
                        if ($(this).attr('ows_Employee_x0020_Status')) {
                            var estatus = $(this).attr('ows_Employee_x0020_Status');
                            if (estatus == "Active") {
                                $('#statusA').attr('checked', 'checked')
                            }
                            if (estatus == "InActive") {
                                $('#statusI').attr('checked', 'checked')
                            }
                        }
                        if ($(this).attr('ows_Department'))
                            $("#dept option:contains(" + $(this).attr('ows_Department') + ")").attr('selected', 'selected');

                        if ($(this).attr('ows_Use_x0020_Calendar'))
                            $("#ucal option:contains(" + $(this).attr('ows_Use_x0020_Calendar') + ")").attr('selected', 'selected');

                        if ($(this).attr('ows_Supervisor')) {
                            var Supervisor = $(this).attr('ows_Supervisor');
                            if (Supervisor != null) {
                                Supervisor = Supervisor.split(';#')[1];
                                $("#ctl00_PlaceHolderMain_supervisor_upLevelDiv").text(Supervisor);
                                $("#ctl00_PlaceHolderMain_supervisor_checkNames").click();
                            }
                            $("#ctl00_PlaceHolderMain_supervisor_checkNames").attr('disabled', 'false');

                        }
                        $("#designation").val($(this).attr('ows_Designation'));
                        var djoin = $(this).attr('ows_Date_x0020_Of_x0020_Joining');
                        if (djoin != null) {
                            djoin = djoin.split(' ')[0];
                            djoin = djoin.split('-')[1] + "/" + djoin.split('-')[2] + "/" + djoin.split('-')[0];
                        } else {
                            djoin = '';
                        }
                        $("#djoin").val(djoin);
                        if ($(this).attr('ows_Email_x0020_Id'))
                            $("#emailid").val($(this).attr('ows_Email_x0020_Id'));
                        if ($(this).attr('ows_Notes'))
                            $("#notes").val($(this).attr('ows_Notes'));

                        /* ...Contact Details ...*/
                        if ($(this).attr('ows_Mobile'))
                            $("#mobile").val($(this).attr('ows_Mobile'));
                        if ($(this).attr('ows_Residence'))
                            $("#residence").val($(this).attr('ows_Residence'));
                        if ($(this).attr('ows_Personal_x0020_Mail_x0020_ID'))
                            $("#pmailid").val($(this).attr('ows_Personal_x0020_Mail_x0020_ID'));
                        if ($(this).attr('ows_Loc_x0020_Address'))
                            $("#locaddress").val($(this).attr('ows_Loc_x0020_Address'));
                        if ($(this).attr('ows_Loc_x0020_Country'))
                            $("#loccountry").val($(this).attr('ows_Loc_x0020_Country'));
                        if ($(this).attr('ows_Loc_x0020_State'))
                            $("#locstate").val($(this).attr('ows_Loc_x0020_State'));
                        if ($(this).attr('ows_Loc_x0020_City'))
                            $("#loccity").val($(this).attr('ows_Loc_x0020_City'));
                        if ($(this).attr('ows_Loc_x0020_PinCode'))
                            $("#locpcode").val($(this).attr('ows_Loc_x0020_PinCode'));
                        if ($(this).attr('ows_Per_x0020_Country'))
                            $("#percountry").val($(this).attr('ows_Per_x0020_Country'));
                        if ($(this).attr('ows_Per_x0020_City'))
                            $('#percity').val($(this).attr('ows_Per_x0020_City'))
                        if ($(this).attr('ows_Per_x0020_State'))
                            $("#perstate").val($(this).attr('ows_Per_x0020_State'));
                        if ($(this).attr('ows_Per_x0020_PinCode'))
                            $("#perpcode").val($(this).attr('ows_Per_x0020_PinCode'));
                        if ($(this).attr('ows_Per_x0020_Address'))
                            $('#peraddress').val($(this).attr('ows_Per_x0020_Address'));
                        if ($(this).attr('ows_Emergency_x0020_Contact'))
                            $('#emercontact').val($(this).attr('ows_Emergency_x0020_Contact'));
                        if ($(this).attr('ows_Contact_x0020_Name'))
                            $('#contactname').val($(this).attr('ows_Contact_x0020_Name'));

                        /* ...Education Deatails ...*/
                        if ($(this).attr('ows_Education_x0020_Type'))

                        //$('#edutype').val($(this).attr('ows_Education_x0020_Type'));
                            $("#edutype option:contains(" + $(this).attr('ows_Education_x0020_Type') + ")").attr('selected', 'selected');

                        if ($(this).attr('ows_Institute_x0020_Name'))
                            $('#insname').val($(this).attr('ows_Institute_x0020_Name'));
                        if ($(this).attr('ows_From_x0020_Year'))
                            $("#edufromyear option:contains(" + $(this).attr('ows_From_x0020_Year') + ")").attr('selected', 'selected');
                        // $('#edufromyear').val($(this).attr('ows_From_x0020_Year'));
                        if ($(this).attr('ows_To_x0020_Year'))
                            $("#edutoyear option:contains(" + $(this).attr('ows_To_x0020_Year') + ")").attr('selected', 'selected');

                        //$('#edutoyear').val($(this).attr('ows_To_x0020_Year'));
                        if ($(this).attr('ows_University'))
                            $('#university').val($(this).attr('ows_University'));
                        if ($(this).attr('ows_Score'))
                            $('#eduscore').val($(this).attr('ows_Score'));
                        if ($(this).attr('ows_Education_x0020_City'))
                            $('#educity').val($(this).attr('ows_Education_x0020_City'));
                        if ($(this).attr('ows_Education_x0020_Country'))
                            $('#educountry').val($(this).attr('ows_Education_x0020_Country'));
                        if ($(this).attr('ows_Education_x0020_State'))
                            $('#edustate').val($(this).attr('ows_Education_x0020_State'));
                        if ($(this).attr('ows_Education_x0020_Notes'))
                            $('#edunotes').val($(this).attr('ows_Education_x0020_Notes'));
                        if ($(this).attr('ows_Course'))
                            $('#educourse').val($(this).attr('ows_Course'));
                        djoin = $(this).attr('ows_Date_x0020_Of_x0020_Joining')
                        if (djoin != null) {
                            djoin = djoin.split(' ')[0];
                            djoin = djoin.split('-')[1] + "/" + djoin.split('-')[2] + "/" + djoin.split('-')[0];
                        } else {
                            djoin = '';
                        }
                        $("#djoin").val(djoin);

                        /*.....Certification details ...*/
                        var issueAuth1 = $(this).attr('ows_Issuing_x0020_Authority');
                        if (issueAuth1 != null) {
                            issueAuth1 = issueAuth1.split(';#')[1];
                            $("#issueAuth  option:contains(" + issueAuth1 + ")").attr('selected', 'selected');
                        } else {
                            issueAuth1 = '';
                        }

                        //$('#issueAuth option:selected').val(issueAuth1);
                        var certname = $(this).attr('ows_Certification_x0020_Name');
                        if (certname != null) {
                            certname = certname.split(';#')[1];
                            $("#certname option:contains(" + certname + ")").attr('selected', 'selected');
                        } else {
                            certname = '';
                        }

                        //$('#certname').val(certname);
                        $('#certid').val($(this).attr('ows_Certification_x0020_Id'));

                        dateofcert = $(this).attr('ows_Date_x0020_Of_x0020_Certificatio');
                        if (dateofcert != null) {
                            dateofcert = dateofcert.split(' ')[0];
                            dateofcert = dateofcert.split('-')[1] + "/" + dateofcert.split('-')[2] + "/" + dateofcert.split('-')[0];
                        } else {
                            dateofcert = '';
                        }
                        $('#dateofcert').val(dateofcert);
                        validtill = $(this).attr('ows_Valid_x0020_Till');
                        if (validtill != null) {
                            validtill = validtill.split(' ')[0];
                            validtill = validtill.split('-')[1] + "/" + validtill.split('-')[2] + "/" + validtill.split('-')[0];
                        } else {
                            validtill = '';
                        }
                        $('#validtill').val(validtill);
                        if ($(this).attr('ows_Score_x002f_Grade'))
                            $('#scoregrade').val($(this).attr('ows_Score_x002f_Grade'));
                        if ($(this).attr('ows_Certification_x0020_Notes'))
                            $('#certnotes').val($(this).attr('ows_Certification_x0020_Notes'));

                        /* ...... Passport Information ....*/
                        if ($(this).attr('ows_Passport_x0020_Number'))
                            $('#passportnumber').val($(this).attr('ows_Passport_x0020_Number'));
                        var dateofissue = $(this).attr('ows_Passport_x0020_Date_x0020_Of_x00')
                        if (dateofissue != null) {
                            dateofissue = dateofissue.split(' ')[0];
                            dateofissue = dateofissue.split('-')[1] + "/" + dateofissue.split('-')[2] + "/" + dateofissue.split('-')[0];
                        } else {
                            dateofissue = '';
                        }
                        $("#passportdateofissue").val(dateofissue);
                        var dateofexp = $(this).attr('ows_Passport_x0020_Date_x0020_Of_x000')
                        if (dateofexp != null) {
                            dateofexp = dateofexp.split(' ')[0];
                            dateofexp = dateofexp.split('-')[1] + "/" + dateofexp.split('-')[2] + "/" + dateofexp.split('-')[0];
                        } else {
                            dateofexp = '';
                        }
                        $("#passportdateofissue").val(dateofissue);
                        $('#passportdatexp').val(dateofexp);

                        $('#passnotes').val($(this).attr('ows_Passport_x0020_Notes'));
                        if ($(this).attr('ows_Type_x0020_Of_x0020_Visa'))
                            $('#typeofvisa').val($(this).attr('ows_Type_x0020_Of_x0020_Visa'));

                        var visadateofI = $(this).attr('ows_Visa_x0020_Date_x0020_Of_x0020_I')
                        if (visadateofI != null) {
                            visadateofI = visadateofI.split(' ')[0];
                            visadateofI = visadateofI.split('-')[1] + "/" + visadateofI.split('-')[2] + "/" + visadateofI.split('-')[0];
                        } else {
                            visadateofI = '';
                        }
                        $("#visadateofissue").val(visadateofI);

                        var visadateofE = $(this).attr('ows_Visa_x0020_Date_x0020_Of_x0020_E')
                        if (visadateofE != null) {
                            visadateofE = visadateofE.split(' ')[0];
                            visadateofE = visadateofE.split('-')[1] + "/" + visadateofE.split('-')[2] + "/" + visadateofE.split('-')[0];
                        } else {
                            visadateofE = '';
                        }
                        $("#visaexpirydate").val(visadateofE);
                        if ($(this).attr('ows_Visa_x0020_Notes'))
                            $('#visanotes').val($(this).attr('ows_Visa_x0020_Notes'));

                        /* ..... Experience Information ...*/

                        var totexp = $(this).attr('ows_Total_x0020_Years_x0020_Of_x0020');
                        if (totexp != null) {
                            $('#totExpyrs').val(totexp.split(';')[0].split('years')[0]);
                            $('#totEexpmnths').val(totexp.split(';')[1].split('Months')[0]);
                        }
                        var expinver = $(this).attr('ows_Experience_x0020_In_x0020_Vertex');
                        if (expinver != null) {
                            $('#expyrsvrtx').val(expinver.split(';')[0].split('Years')[0]);
                            $('#expinmonthsvrtx').val(expinver.split(';')[1].split('Months')[0]);
                        }
                        var exp = $(this).attr('ows_Relavent_x0020_Experience');
                        if (exp != null) {

                            exp = exp.split('##');

                            var relexpinfo = '';
                            for (var t = 1; t < exp.length; t++) {
                                relexpinfo = exp[t];

                                $('#relexpdomain' + t).val(relexpinfo.split('^')[0]);

                                $('#relexpyrs' + t).val(relexpinfo.split('^')[1].split('Years')[0]);
                                $('#relexpinmnths' + t).val(relexpinfo.split('^')[2].split('Months')[0]);
                                if (t < exp.length - 1) {

                                    AddTable();
                                }
                            }

                        }

                        var confdat = $(this).attr('ows_Employee_x0020_ConfirmationDate')
                        if (confdat) {
                            confdat = confdat.split(' ')[0];
                            confdat = confdat.split('-')[1] + "/" + confdat.split('-')[2] + "/" + confdat.split('-')[0];
                        } else {
                            confdat = '';
                        }
                        $("#confirmDate").val(confdat);

                        var aprdat = $(this).attr('ows_Employee_x0020_AppraisalDate')
                        if (aprdat != null) {
                            aprdat = aprdat.split(' ')[0];
                            aprdat = aprdat.split('-')[1] + "/" + aprdat.split('-')[2] + "/" + aprdat.split('-')[0];
                        } else {
                            confdat = '';
                        }
                        $("#AppraisalDate").val(aprdat);
                        if ($(this).attr('ows_Blood_x0020_Group'))
                            $('#bloodgroup').val($(this).attr('ows_Blood_x0020_Group'));

                        $('#text1').val($(this).attr('ows_Text1'));
                        if ($(this).attr('ows_Text2'))
                            $('#text2').val($(this).attr('ows_Text2'));
                        if ($(this).attr('ows_Text3'))
                            $('#text3').val($(this).attr('ows_Text3'));

                        var date1 = $(this).attr('ows_Date1')
                        if (date1) {
                            date1 = date1.split(' ')[0];
                            date1 = date1.split('-')[1] + "/" + date1.split('-')[2] + "/" + date1.split('-')[0];
                        } else {
                            date1 = '';
                        }
                        $("#date1").val(date1);
                        RetrieveProjectListItems(username);

                    });
                } else {
                    resetForm();
                }
            }
        }
    });
    return itemCount;
}


function empProfileUpdate() {
    list = context.get_web().get_lists().getByTitle(listName);
    this.empitem = this.list.getItemById(upidval);

    if (getEmployeeInputFormValues() == true) {

        empitem.set_item('Title', fname);
        empitem.set_item('Middle_x0020_Name', mname);
        empitem.set_item('Last_x0020_Name', lname);
        empitem.set_item('User_x0020_Name', username);
        empitem.set_item('Marital_x0020_Status', mstatus);
        empitem.set_item('Gender', gender);
        empitem.set_item('Date_x0020_Of_x0020_Birth', dbirth);
        empitem.set_item('Employee_x0020_type', etype);
        empitem.set_item('Employee_x0020_Status', estatus);
        empitem.set_item('Department', dept);
        empitem.set_item('Use_x0020_Calendar', ucal);
        supname = $('#ctl00_PlaceHolderMain_supervisor_upLevelDiv').find('span').attr('Title');

        supname = getsupid(supname);
        if (supname == null || supname == ';#') {
            supname = '';
        } else {
            empitem.set_item('Supervisor', supname);
        }
        empitem.set_item('Designation', designation);
        empitem.set_item('Date_x0020_Of_x0020_Joining', djoin);
        empitem.set_item('Email_x0020_Id', emailid);
        empitem.set_item('Notes', notes);
        empitem.set_item('Employee_x0020_Id', empid);
        empitem.set_item('Employee_x0020_Name', ename);

        empitem.update();
        context.load(empitem);

        context.executeQueryAsync(Function.createDelegate(this, this.EmprofileitemUpdated), Function.createDelegate(this, this.onFail));
    }
}


function EmprofileitemUpdated() {
    //resetForm();
    alert("Item Updated successfully...");
}

function getid(userName) {

    Uid = '';
    $().SPServices({
        operation: 'GetUserInfo',
        userLoginName: userName,
        async: false,
        debug: true,
        completefunc: function (xData, Status) {

            $(xData.responseXML).SPFilterNode("User").each(function () {
                Uid = $(this).attr("ID");
                username = $(this).attr("Name");
                ename = $(this).attr("ID") + ";#" + $(this).attr("Name");

                emailid = $(this).attr("Email");

                notes = $(this).attr("Notes");

            });
        }
    });
}


function getsupid(Supervisor) {

    var Uid = '';
    $().SPServices({
        operation: 'GetUserInfo',
        userLoginName: Supervisor,
        async: false,
        debug: true,
        completefunc: function (xData, Status) {
            $(xData.responseXML).SPFilterNode("User").each(function () {
                Uid = $(this).attr("ID");
                Supervisor = $(this).attr("Name");
                supname = $(this).attr("ID") + ";#" + $(this).attr("Name");

            });
        }
    });
    return supname;
}


function getEmployeeInputFormValues() {

    estatus = $('input[name=status]:checked').val();
    empid = $('#empid').val();
    if (empid == "" || typeof empid === 'undefined' || empid == null) {
        alert("Enter Employee ID must entered");
        empid = '';
        $('#empid').focus();
        return false;

    }

    fname = $('#fname').val();
    if (fname == "" || typeof fname === 'undefined' || fname == null) {
        alert("Enter First Name must entered");
        fname = '';
        $('#fname').focus();
        return false;
    }

    mname = $('#mname').val();
    if (mname == null || mname == 'undefined') {
        mname = '';
    }
    lname = $('#lname').val();
    if (lname == null || lname == 'undefined') {
        lname = '';
    }

    username = $('#username').val();
    if (username == "" || typeof username === 'undefined' || username == null || username == "Select") {
        username = '';
    }

    mstatus = $('#mstatus option:selected').text();
    if (mstatus == "" || typeof mstatus === 'undefined' || mstatus == null || mstatus == "Select") {
        alert("Enter marital Status must select");
        mstatus = '';
        $('#mstatus').focus();
        return false;

    }
    gender = $('#gender option:selected').text();
    if (gender == "" || typeof gender === 'undefined' || gender == null || gender == "Select") {
        alert("Select gender must select");
        gender = '';

        return false;
    }

    dbirth = $("#dbirth").val();
    if (dbirth == "" || typeof dbirth === 'undefined' || dbirth == null) {
        alert("dbirth must entered");
        dbirth = '';
        return false;

    } else {
        dbirth = $('#dbirth').val().split('/')[2] + "-" + $('#dbirth').val().split('/')[0] + "-" + $('#dbirth').val().split('/')[1] + "T00:00:00Z";
    }
    djoin = $("#djoin").val();
    if (djoin == "" || typeof djoin === 'undefined' || djoin == null) {
        alert("djoinmust entered");

        djoin = '';
        return false;
    } else {
        djoin = $('#djoin').val().split('/')[2] + "-" + $('#djoin').val().split('/')[0] + "-" + $('#djoin').val().split('/')[1] + "T00:00:00Z";
    }

    etype = $('#etype option:selected').text();
    if (etype == "" || typeof etype === 'undefined' || etype == null) {
        alert("Enter Employee Name must entered");
        etype = '';

        return false;

    }
    dept = $('#dept option:selected').text();
    if (dept == "" || typeof dept === 'undefined' || dept == null || dept == "Select") {
        alert("Select Department entered");
        dept = '';

        return false;
    }

    ucal = $('#ucal option:selected').text();
    if (ucal == "" || typeof ucal === 'undefined' || ucal == null || ucal == "Select") {
        alert("Select User Calendar ");
        ucal = '';

        return false;
    }

    designation = $("#designation").val();
    if (designation == "" || typeof designation === 'undefined' || designation == null) {
        designation = '';
    }
    emailid = $("#emailid").val();
    if (emailid == "" || typeof emailid === 'undefined' || emailid == null) {
        emailid = '';
    }
    notes = $("#notes").val();
    if (notes == "" || typeof notes === 'undefined' || notes == null) {
        notes = '';
    }
    return true;
}


function AddEmpProfileListItems() {

    context = new SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(listName);
    var listItemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = list.addItem(listItemCreateInfo);
    if (getEmployeeInputFormValues() == true) {
        oListItem.set_item('Title', fname);
        oListItem.set_item('Middle_x0020_Name', mname);
        oListItem.set_item('Last_x0020_Name', lname);
        oListItem.set_item('User_x0020_Name', username);
        oListItem.set_item('Marital_x0020_Status', mstatus);
        oListItem.set_item('Gender', gender);
        oListItem.set_item('Date_x0020_Of_x0020_Birth', dbirth);
        oListItem.set_item('Employee_x0020_type', etype);
        oListItem.set_item('Employee_x0020_Status', estatus);
        oListItem.set_item('Department', dept);
        oListItem.set_item('Use_x0020_Calendar', ucal);
        oListItem.set_item('Supervisor', supname);
        oListItem.set_item('Designation', designation);
        oListItem.set_item('Date_x0020_Of_x0020_Joining', djoin);
        oListItem.set_item('Email_x0020_Id', emailid);
        oListItem.set_item('Notes', notes);
        oListItem.set_item('Employee_x0020_Id', empid);
        oListItem.set_item('Employee_x0020_Name', ename);

        oListItem.update();
        context.load(oListItem);

        context.executeQueryAsync(Function.createDelegate(this, this.itemAdded), Function.createDelegate(this, this.onListDataLoadQueryFailed));
    }
}


function itemAdded() {
    //resetForm();
    alert("Item added successfully...");
}


function retrieveChoiceFields() {
    context = new SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(listName);
    mstatus = context.castTo(list.get_fields().getByInternalNameOrTitle('Marital_x0020_Status'), SP.FieldChoice);
    gender = context.castTo(list.get_fields().getByInternalNameOrTitle('Gender'), SP.FieldChoice);
    etype = context.castTo(list.get_fields().getByInternalNameOrTitle('Employee_x0020_type'), SP.FieldChoice);
    dept = context.castTo(list.get_fields().getByInternalNameOrTitle('Department'), SP.FieldChoice);
    ucal = context.castTo(list.get_fields().getByInternalNameOrTitle('Use_x0020_Calendar'), SP.FieldChoice);
    context.load(mstatus);
    context.load(gender);
    context.load(etype);
    context.load(dept);
    context.load(ucal);
    context.executeQueryAsync(
		Function.createDelegate(this, this.fillChoices),
		Function.createDelegate(this, this.onListDataLoadQueryFailed));
}


function onListDataLoadQueryFailed(sender, args) {
    alert('Request failed.' + args.get_message() + ' \n' + args.get_stackTrace());
}

function fillChoices() {

    var choices = mstatus.get_choices();
    var genderchoices = gender.get_choices();
    var etypechoices = etype.get_choices();
    var deptchoices = dept.get_choices();
    var ucalchoices = ucal.get_choices();
    var ddlmstatus = document.getElementById('mstatus');
    if (ddlmstatus != null) {
        for (var i = 0; i < choices.length; i++) {
            var theoption = new Option;
            theoption.text = choices[i];
            theoption.value = i;
            ddlmstatus.options[i] = theoption;

        }
    }
    var ddlgender = document.getElementById('gender');
    if (ddlgender != null) {
        for (var i = 0; i < genderchoices.length; i++) {
            var theoption = new Option;
            theoption.text = genderchoices[i];
            theoption.value = i;
            ddlgender.options[i] = theoption;
        }
    }
    var ddldept = document.getElementById('dept');
    if (ddldept != null) {
        for (var i = 0; i < deptchoices.length; i++) {
            var theoption = new Option;
            theoption.text = deptchoices[i];
            theoption.value = i;
            ddldept.options[i] = theoption;
        }
    }
    var ddlucal = document.getElementById('ucal');
    if (ddlucal != null) {
        for (var i = 0; i < ucalchoices.length; i++) {
            var theoption = new Option;
            theoption.text = ucalchoices[i];
            theoption.value = i;
            ddlucal.options[i] = theoption;
        }
    }
    var ddletype = document.getElementById('etype');
    if (ddletype != null) {
        for (var i = 0; i < etypechoices.length; i++) {
            var theOption = new Option;
            theOption.text = etypechoices[i];
            theOption.value = i;
            ddletype.options[i] = theOption;
        }
    }
}

/* ... Education Details Update functionality ..*/
function retrieveEduDetChoiceFields() {
    context = new SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(listName);
    edutype = context.castTo(list.get_fields().getByInternalNameOrTitle('Education_x0020_Type'), SP.FieldChoice);
    edufromyear = context.castTo(list.get_fields().getByInternalNameOrTitle('From_x0020_Year'), SP.FieldChoice);
    edutoyear = context.castTo(list.get_fields().getByInternalNameOrTitle('To_x0020_Year'), SP.FieldChoice);
    context.load(edutype);
    context.load(edufromyear);
    context.load(edutoyear);
    context.executeQueryAsync(
		Function.createDelegate(this, this.fillEmpDetChoices),
		Function.createDelegate(this, this.onListDataLoadQueryFailed));
}


function onListDataLoadQueryFailed(sender, args) {
    alert('Request failed.' + args.get_message() + ' \n' + args.get_stackTrace());
}

function fillEmpDetChoices() {

    var choices = edufromyear.get_choices();
    var edutoyearchoices = edutoyear.get_choices();
    var edutypechoices = edutype.get_choices();

    var ddledutype = document.getElementById('edutype');
    if (ddledutype != null) {
        for (var i = 0; i < edutypechoices.length; i++) {
            var theoption = new Option;
            theoption.text = edutypechoices[i];
            theoption.value = i;
            ddledutype.options[i] = theoption;
        }
    }

    var ddledufromyear = document.getElementById('edufromyear');
    if (ddledufromyear != null) {
        for (var i = 0; i < choices.length; i++) {
            var theoption = new Option;
            theoption.text = choices[i];
            theoption.value = i;
            ddledufromyear.options[i] = theoption;
        }
    }
    var ddledutoyear = document.getElementById('edutoyear');
    if (ddledutoyear != null) {
        for (var i = 0; i < edutoyearchoices.length; i++) {
            var theoption = new Option;
            theoption.text = edutoyearchoices[i];
            theoption.value = i;
            ddledutoyear.options[i] = theoption;
        }
    }
}

//..................... End  Choice filling function...........
/* .....................Get Education Details Input Form Values Function Strats Here ..................................................................*/

function getEduDetInputFormValues() {

    edutype = $('#edutype option:selected').text();
    if (edutype == "" || typeof edutype === 'undefined' || edutype == null || edutype == "Select") {
        alert("Education type Must Select..");
        $('#edutype').focus();
        return false;
    }
    educourse = $('#educourse').val();

    if (educourse == "" || typeof educourse === 'undefined' || educourse == null) {
        alert("Educational Course Must Enter..");
        $('#educourse').focus();
        return false;
    }
    insname = $('#insname').val();
    if (insname == "" || typeof insname === 'undefined' || insname == null) {
        alert("Institute Name Must Enter..");
        $('#insname').focus();
        return false;
    }
    edufromyear = $('#edufromyear option:selected').text();

    if (edufromyear == "" || typeof edufromyear === 'undefined' || edufromyear == null || edufromyear == "Select") {
        alert("Education from Year Must Select..");
        $('#edufromyear').focus();
        return false;
    }
    edutoyear = $('#edutoyear option:selected').text();
    if (edutoyear == "" || typeof edutoyear === 'undefined' || edutoyear == null || edutoyear == "Select") {
        alert("To Year Must Select..");
        $('#edutoyear').focus();

        return false;
    }
    university = $('#university').val();
    if (university == "" || typeof university === 'undefined' || university == null) {
        alert("University  Name Must Enter..");
        $('#university').focus();
        return false;
    }
    eduscore = $('#eduscore').val();
    if (eduscore == "" || typeof eduscore === 'undefined' || eduscore == null) {
        eduscore = '';
    }
    educountry = $('#educountry').val();
    if (educountry == "" || typeof educountry === 'undefined' || educountry == null) {
        educountry = '';
    }

    edustate = $('#edustate').val();
    if (edustate == "" || typeof edustate === 'undefined' || edustate == null) {
        edustate = '';
    }

    educity = $('#educity').val();
    if (educity == "" || typeof educity === 'undefined' || educity == null) {
        educity = '';
    }

    edunotes = $('#edunotes').val();
    if (edunotes == "" || typeof edunotes === 'undefined' || edunotes == null) {
        edunotes = '';
    }
    return true;
}



/* ......Update Function Starts Here   ........*/

function EducationDetupdate() {
    context = new SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(listName);
    this.item = this.list.getItemById(upidval);
    if (getEduDetInputFormValues() == true) {

        item.set_item('Education_x0020_Type', edutype);
        item.set_item('Course', educourse);
        item.set_item('Institute_x0020_Name', insname);
        item.set_item('From_x0020_Year', edufromyear);
        item.set_item('To_x0020_Year', edutoyear);
        item.set_item('University', university);
        item.set_item('Score', eduscore);
        item.set_item('Education_x0020_City', educity);
        item.set_item('Education_x0020_Country', educountry);
        item.set_item('Education_x0020_State', edustate);
        item.set_item('Education_x0020_Notes', edunotes);

        item.update();
        context.load(item);

        context.executeQueryAsync(Function.createDelegate(this, this.EduDetitemUpdated), Function.createDelegate(this, this.onFail));
    }
}


function EduDetitemUpdated() {
    //resetForm();
    alert("Item Updated successfully...");
}

/* ...... Look up Fields DropDwon Filling Function....*/
function retrieveCertificationlookUpItems() {
    context = new SP.ClientContext.get_current();
    var oList = context.get_web().get_lists().getByTitle(listNameskillcat);
    var Certificationlist = context.get_web().get_lists().getByTitle(certListName);

    var camlQuery = SP.CamlQuery.createAllItemsQuery();
    this.collListItem = oList.getItems(camlQuery);
    this.collitems = Certificationlist.getItems(camlQuery);

    context.load(collListItem);
    context.load(collitems);

    context.executeQueryAsync(
		Function.createDelegate(this, this.CertificationLookupLoaded),
		Function.createDelegate(this, this.onListDataLoadQueryFailed));
}

function CertificationLookupLoaded(sender, args) {
    var listItemInfo = '';
    var listItemEnumerator = collListItem.getEnumerator();
    var certnameItemEnumerator = collitems.getEnumerator();
    while (certnameItemEnumerator.moveNext()) {
        var oListItem = certnameItemEnumerator.get_current();

        var tempItem = {
            Id: oListItem.get_id(),
            Value: oListItem.get_item('Title')
        };
        certnameItemContainer.certnameItemList.push(tempItem);
    }
    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();

        var tempItem = {
            Id: oListItem.get_id(),
            Value: oListItem.get_item('Certified_x0020_By')
        };
        ItemContainer.ItemList.push(tempItem);
    }

    fillissuingAuthorityDropDown();
}

function onListDataLoadQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}


function fillissuingAuthorityDropDown() {
    var ddlIsuing = document.getElementById('issueAuth');
    if (ddlIsuing != null) {
        for (var i = 0; i < ItemContainer.ItemList.length; i++) {
            var theOption = new Option;
            theOption.value = ItemContainer.ItemList[i].Id;
            theOption.text = ItemContainer.ItemList[i].Value;
            ddlIsuing.options[i] = theOption;
        }
    }
    var ddlcertname = document.getElementById('certname');
    if (ddlcertname != null) {
        for (var i = 0; i < certnameItemContainer.certnameItemList.length; i++) {
            var theOption = new Option;
            theOption.value = certnameItemContainer.certnameItemList[i].Id;
            theOption.text = certnameItemContainer.certnameItemList[i].Value;
            ddlcertname.options[i] = theOption;

        }
    }
    // $("#ddlcertname").append('<option value="Select">Select</option>');
}

/* ....End LookUp filed Filling function....*/
/* Get Input Form Values Function Strats Here ....*/

function getEmployeeCertificationinputFormValues() {
    issueAuth = document.getElementById('issueAuth');
    certname = document.getElementById('certname');

    certid = $('#certid').val();
    if (certid == "" || typeof certid === 'undefined' || certid == null) {
        alert("Certification Id must Enter..");
        $('#certid').focus();
        return false;
    }
    dateofcert = $('#dateofcert').val();
    if (dateofcert == "" || typeof dateofcert === 'undefined' || dateofcert == null) {
        alert("Date Of Cerification Must Enter..");
        $('#dateofcert').focus();

        return false;
    } else {
        dateofcert = $('#dateofcert').val().split('/')[2] + "-" + $('#dateofcert').val().split('/')[0] + "-" + $('#dateofcert').val().split('/')[1] + "T00:00:00Z";
    }
    validtill = $('#validtill').val();
    if (validtill == "" || typeof validtill === 'undefined' || validtill == null) {
        alert("validtill Must Enter..");
        $('#validtill').focus();

        return false;
    } else {
        validtill = $('#validtill').val().split('/')[2] + "-" + $('#validtill').val().split('/')[0] + "-" + $('#validtill').val().split('/')[1] + "T00:00:00Z";
    }

    scoregrade = $('#scoregrade').val();
    if (scoregrade == "" || typeof scoregrade === 'undefined' || scoregrade == null) {
        alert("Score\Grade must Enter..");
        $('#scoregrade').focus();

        return false;
    }
    certnotes = $('#certnotes').val();
    if (certnotes == "" || typeof certnotes === 'undefined' || certnotes == null) {
        certnotes = '';
    }
    edunotes = $('#edunotes').val();
    if (edunotes == "" || typeof edunotes === 'undefined' || edunotes == null) {
        edunotes = '';
    }

    return true;
}


function EmployeeCertificationUpdate() {

    context = new SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(listName);

    this.item = this.list.getItemById(upidval);

    if (getEmployeeCertificationinputFormValues() == true) {

        item.set_item('Issuing_x0020_Authority', issueAuth.options[issueAuth.selectedIndex].value + ";#" + issueAuth.options[issueAuth.selectedIndex].text);
        item.set_item('Certification_x0020_Name', certname.options[certname.selectedIndex].value + ";#" + certname.options[certname.selectedIndex].text);
        item.set_item('Certification_x0020_Id', certid);
        item.set_item('Date_x0020_Of_x0020_Certificatio', dateofcert);
        item.set_item('Valid_x0020_Till', validtill);
        item.set_item('Score_x002f_Grade', scoregrade);
        item.set_item('Certification_x0020_Notes', certnotes);

        item.update();
        context.load(item);

        context.executeQueryAsync(Function.createDelegate(this, this.empCertitemUpdated), Function.createDelegate(this, this.onFail));
    }
}


function empCertitemUpdated() {
    //resetForm();
    alert("Item Updated successfully...");
}


/* Get Input Form Values Function Strats Here ....*/
function getEmployeePassportinputFormValues() {

    passportnumber = $('#passportnumber').val();
    if (passportnumber == "" || typeof passportnumber === 'undefined' || passportnumber == null) {
        alert("Passportnumber must Enter..");
        $('#passportnumber').focus();
        return false;
    }
    passportdateofissue = $('#passportdateofissue').val();
    if (passportdateofissue == "" || typeof passportdateofissue === 'undefined' || passportdateofissue == null) {
        alert("Date Of issue Must Must Enter..");
        $('#passportdateofissue').focus();

        return false;
    } else {
        passportdateofissue = $('#passportdateofissue').val().split('/')[2] + "-" + $('#passportdateofissue').val().split('/')[0] + "-" + $('#passportdateofissue').val().split('/')[1] + "T00:00:00Z";
    }
    passportdatexp = $('#passportdatexp').val();
    if (passportdatexp == "" || typeof passportdatexp === 'undefined' || passportdatexp == null) {
        alert("validtill Must Enter..");
        $('#passportdatexp').focus();

        return false;
    } else {
        passportdatexp = $('#passportdatexp').val().split('/')[2] + "-" + $('#passportdatexp').val().split('/')[0] + "-" + $('#passportdatexp').val().split('/')[1] + "T00:00:00Z";
    }
    visadateofissue = $('#visadateofissue').val();
    if (visadateofissue == "" || typeof visadateofissue === 'undefined' || visadateofissue == null) {
        alert("Visa Date Of Issue Must Enter..");
        $('#visadateofissue').focus();

        return false;
    } else {
        visadateofissue = $('#visadateofissue').val().split('/')[2] + "-" + $('#visadateofissue').val().split('/')[0] + "-" + $('#visadateofissue').val().split('/')[1] + "T00:00:00Z";
    }
    visaexpirydate = $('#visaexpirydate').val();
    if (visaexpirydate == "" || typeof visaexpirydate === 'undefined' || visaexpirydate == null) {
        alert("Visa Expiry DAte Must Enter..");
        $('#visaexpirydate').focus();

        return false;
    } else {
        visaexpirydate = $('#visaexpirydate').val().split('/')[2] + "-" + $('#visaexpirydate').val().split('/')[0] + "-" + $('#visaexpirydate').val().split('/')[1] + "T00:00:00Z";
    }

    passnotes = $('#passnotes').val();
    if (passnotes == '' || passnotes == 'undefined' || passnotes == null) {
        passnotes = '';
    }

    typeofvisa = $('#typeofvisa').val();
    if (typeofvisa == '' || typeofvisa == 'undefined' || typeofvisa == null) {
        typeofvisa = '';
    }

    visanotes = $('#visanotes').val();
    if (visanotes == '' || visanotes == 'undefined' || visanotes == null) {
        visanotes = '';
    }
    return true;
}


function EmployeePassportDetailsUpdate() {
    context = new SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(listName);
    this.item = this.list.getItemById(upidval);

    if (getEmployeePassportinputFormValues() == true) {

        item.set_item('Passport_x0020_Number', passportnumber);
        item.set_item('Passport_x0020_Date_x0020_Of_x00', passportdateofissue);
        item.set_item('Passport_x0020_Date_x0020_Of_x000', passportdatexp);
        item.set_item('Passport_x0020_Notes', passnotes);
        item.set_item('Type_x0020_Of_x0020_Visa', typeofvisa);
        item.set_item('Visa_x0020_Date_x0020_Of_x0020_I', visadateofissue);
        item.set_item('Visa_x0020_Date_x0020_Of_x0020_E', visaexpirydate);
        item.set_item('Visa_x0020_Notes', visanotes);
        item.update();
        context.load(item);

        context.executeQueryAsync(Function.createDelegate(this, this.itemUpdated), Function.createDelegate(this, this.onFail));
    }
}


function itemUpdated() {
    //resetForm();
    alert("Item Updated successfully...");
}


/*  .....getEmployeeExperienceInputFormValues function ...*/
function getEmployeeExperienceInputFormValues() {

    totExpyrs = $('#totExpyrs').val();
    if (totExpyrs == "" || typeof totExpyrs == 'undefined' || totExpyrs == null) {
        totExpyrs = 0;
    }

    totEexpmnths = $('#totEexpmnths').val();
    totEXP = totExpyrs + "years; " + totEexpmnths + "Months";

    expyrsvrtx = $('#expyrsvrtx').val();
    expinmonthsvrtx = $('#expinmonthsvrtx').val();
    if (expyrsvrtx == '' && expinmonthsvrtx == '') {
        expyrsvrtx = 0;
        expinmonthsvrtx = 0;
    } else {

        expinVrtx = expyrsvrtx + "Years ;" + expinmonthsvrtx + "Months";
    }

    confirmDate = $('#confirmDate').val();
    if (confirmDate) {
        confirmDate = $('#confirmDate').val().split('/')[2] + "-" + $('#confirmDate').val().split('/')[0] + "-" + $('#confirmDate').val().split('/')[1] + "T00:00:00Z";
    } else {
        alert("Must Enter Confirmation Date...");
        $('#confirmDate').focus();
    }
    AppraisalDate = $('#AppraisalDate').val();
    if (AppraisalDate) {
        AppraisalDate = $('#AppraisalDate').val().split('/')[2] + "-" + $('#AppraisalDate').val().split('/')[0] + "-" + $('#AppraisalDate').val().split('/')[1] + "T00:00:00Z";

    } else {
        alert("Must Enter Appraisal Date...");
        $('#AppraisalDate').focus();
    }

    bloodgroup = $('#bloodgroup').val();
    if (bloodgroup == "" || typeof bloodgroup == 'undefined' || bloodgroup == null) {
        bloodgroup = '';
    }
    text1 = $('#text1').val();
    if (text1 == "" || typeof text1 == 'undefined' || text1 == null) {
        text1 = '';
    }
    text2 = $('#text2').val();
    if (text2 == "" || typeof text2 == 'undefined' || text2 == null) {
        text2 = '';
    }
    text3 = $('#text3').val();
    if (text3 == "" || typeof text3 == 'undefined' || text3 == null) {
        text3 = '';
    }
    date1 = $('#date1').val();
    if (date1) {
        date1 = $('#date1').val().split('/')[2] + "-" + $('#date1').val().split('/')[0] + "-" + $('#date1').val().split('/')[1] + "T00:00:00Z";
    } else {
        date1 = '';
    }
    return true;
}


function EmployeeExpInfoUpdate() {
    context = new SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(listName);

    this.item = this.list.getItemById(upidval);

    if (getEmployeeExperienceInputFormValues() == true) {
        if (getRelExp() == true) {

            item.set_item('Total_x0020_Years_x0020_Of_x0020', totEXP);
            item.set_item('Experience_x0020_In_x0020_Vertex', expinVrtx);

            item.set_item('Relavent_x0020_Experience', relEXPVal);
            if (confirmDate) {
                item.set_item('Employee_x0020_ConfirmationDate', confirmDate);
            }
            if (AppraisalDate) {
                item.set_item('Employee_x0020_AppraisalDate', AppraisalDate);
            }
            item.set_item('Blood_x0020_Group', bloodgroup);
            item.set_item('Text1', text1);
            item.set_item('Text2', text2);
            item.set_item('Text3', text3);
            if (date1)
                item.set_item('Date1', date1);

            item.update();
            context.load(item);

            context.executeQueryAsync(Function.createDelegate(this, this.EMpExpinfoitemUpdated), Function.createDelegate(this, this.onFail));
        }
    }
}


function EMpExpinfoitemUpdated() {

    alert("Item Updated successfully...");
}

/* Add Rows Dynamically ....*/

var i = 2;
function AddTable() {

    var strHTML = '';
    strHTML += '<tr id="relexp' + i + '"><td></td><td nowrap="nowrap"><input type="text"  id="relexpdomain' + i + '" class="inner_textbox" name="relexpdomain"/></td>';
    strHTML += '<td></td><td width="20px"><input type="text"  id="relexpyrs' + i + '" class="inner_textbox" name="relexpyrs"/></td>';
    strHTML += '<td></td><td ><input type="text"   id="relexpinmnths' + i + '" class="inner_textbox" name="relexpinmnths"/></td></tr>';
    $('#AddTable tr:last').after(strHTML);
    i = i + 1;

}


//var relEXP="";
var relEXP = [];
/* .. get Relevent Experience Information...*/
function getRelExp() {
    var count = $("#AddTable tr").length;
    relEXP = [];
    for (var j = 1; j <= count; j++) {


        relexpdomain = $('#relexpdomain' + j).val();
        if (relexpdomain == null || typeof relexpdomain == 'undefined' || relexpdomain == '') {
            alert('Domain Must Enter...');
            return false;
        }
        relexpyrs = $('#relexpyrs' + j).val();
        if (relexpyrs == null || relexpyrs == 'undefined' || relexpyrs == '') {
            alert('Years Must Enter...');
            return false;
        }

        relexpinmnths = $('#relexpinmnths' + j).val();
        if (relexpinmnths == null || relexpinmnths == 'undefined' || relexpinmnths == '') {
            alert('Years Must Enter...');
            return false;
        }

        relEXPVal = "##" + relexpdomain + "^" + relexpyrs + "Years^" + relexpinmnths + "Months";
        relEXP.push(relEXPVal);

        relEXPVal = relEXP.join('');

    }
    return true;
}


function resetForm() {
    //username='',supname='';
    relExp = [];
    i = 2;
    ItemContainer = {
        ItemList: []
    },
	certnameItemContainer = {
	    certnameItemList: []
	};
    totEXP = '',
	expinVrtx = '',
	relEXPVal = '';
    ProjItemContainer = {
        ProjItem: []
    };
    CntDetresetForm();
    ProfresetForm();
    CertresetForm();
    PassportresetForm();
    EmpExpinforesetForm();
    EduresetForm();
    ProjectresetForm();
    //$("#ctl00_PlaceHolderMain_ename_upLevelDiv").text("");
    //$("#ctl00_PlaceHolderMain_supervisor_upLevelDiv").text("");

    $('#EmployeeProfile').find("input[type=text], textarea").val("");
    $('#savebutton').show();
    $('#Empprofupdatebutton').hide();

}


function onFail(sender, args) {
    alert('Request failed.' + args.get_message() + ' \n' + args.get_stackTrace());
}

/* ...................................................Assign Project Button Click ........................*/


function AssignProj() {
    $('#AssignProjbutton').show();
    $("#projname").attr("disabled", false);
}

/* .....................................retreive choice fields of Project Dvi.......................................................*/

function retrieveProjDetChoiceFields(username) {

    var oList = context.get_web().get_lists().getByTitle(projectslistName);

    var camlQuery = SP.CamlQuery.createAllItemsQuery();
    this.collListItems = oList.getItems(camlQuery);
    context.load(collListItems);

    context.executeQueryAsync(
		Function.createDelegate(this, this.ProjectLookupLoaded),
		Function.createDelegate(this, this.onListDataLoadQueryFailed));
}

function ProjectLookupLoaded(sender, args) {
    var listItemInfo = '';
    var projlistItemEnumerator = collListItems.getEnumerator();

    while (projlistItemEnumerator.moveNext()) {
        var oListItem = projlistItemEnumerator.get_current();



        if (!(oListItem.get_item('Project_x0020_Members'))) {
            var tempItem = {
                Id: oListItem.get_id(),
                Value: oListItem.get_item('Title')
            };
            ProjItemContainer.ProjItem.push(tempItem);
        }
        else if (oListItem.get_item('Project_x0020_Members').length) {
            var memlen = oListItem.get_item('Project_x0020_Members').length
            var projmem = '';
            for (var i = 0; i < memlen; i++) {
                projmem += oListItem.get_item('Project_x0020_Members')[i].get_lookupId() + ';';
            }

            if ((projmem.indexOf(Uid)) == -1) {

                var tempItem = {
                    Id: oListItem.get_id(),
                    Value: oListItem.get_item('Title')
                };
                ProjItemContainer.ProjItem.push(tempItem);

            }
        }

    }


    fillProjectnameDropDown();
}

function onListDataLoadQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}


function fillProjectnameDropDown() {
    var ddlproj = document.getElementById('projname');
    if (ddlproj != null) {
        for (var i = 0; i < ProjItemContainer.ProjItem.length; i++) {
            var theOption = new Option;
            theOption.value = ProjItemContainer.ProjItem[i].Id;
            theOption.text = ProjItemContainer.ProjItem[i].Value;
            ddlproj.options[i] = theOption;
        }
    }
}

/* ............................................Projname choice filed DropDown Filling is complted.............*/

function RetrieveProjectListItems(username) {
    retrieveProjDetChoiceFields(username);
    context = SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(projectslistName);
    web = context.get_web();

    camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><ViewFields>" +
		"<FieldRef Name='Estimated_x0020_Start_x0020_Date' />" +
		"<FieldRef Name='Estimated_x0020_End_x0020_Date' />" +
		"<FieldRef Name='Actual_x0020_Start_x0020_Date' /> <FieldRef Name='Project_x0020_Type' />" +
		"<FieldRef Name='Actual_x0020_End_x0020_Date' />" +
		"<FieldRef Name='Title' /><FieldRef Name='Status' /></ViewFields>" +
		"<Query>" +
		"<Where><Eq><FieldRef Name='Project_x0020_Members' /><Value Type='UserMulti'>" + username + "</Value>" +
		"</Eq></Where></Query></View>");

    spItems = list.getItems(camlQuery);
    context.load(spItems);
    context.load(this.web);
    context.load(this.list);

    context.executeQueryAsync(
		Function.createDelegate(this, onProjectListItemDisplay),
		Function.createDelegate(this, onFail));
}

function onProjectListItemDisplay() {

    context.load(list);
    var itemsCount = list.get_itemCount();
    //alert(itemsCount);

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
    username = '';
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

                tbl += '<tr id=' + items[j].itmid + '><td class="inner_table_flip" align="left" valign="middle">' + items[j].projTitle + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + items[j].projType + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + items[j].actStDate + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + items[j].actEndDate + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle">' + items[j].projStatus + '</td>';

                tbl += '<td class="inner_table_flip" align="left" valign="middle"><a onclick="UnAssign(' + items[j].itmid + ')"><img alt="Delete" src="http://inhy2ksprnd2010:5555/Style%20Library/Images/delete_icon.png" width="14" height="16" /></a></td></tr>';

            }
        }
    } else {
        tbl += "<tr><td>No records found.</td></tr>";
    }

    var maintble = '<table style="border:#d2d7da solid 1px;" width="100%" border="0" id="listitem1" cellspacing="0" cellpadding="10"><thead><tr><th class="inner_table_header" align="left" valign="middle"><a onclick="Sorting(\'Title\')"><u><font style="cursor:hand" size="2">Project Name</font ></u><img id="Title" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>'
		 + '<th class="inner_table_header" align="left" valign="middle"><a onclick="Sorting(\'Project_x0020_Type\')"><u><font style="cursor:hand" size="2">ProjectType</font ></u><img id="Project_x0020_Type" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>'
		 + '<th width="120" align="left" valign="middle" class="inner_table_header"><a onclick="Sorting(\'Actual_x0020_Start_x0020_Date\')"><u><font style="cursor:hand" size="2">Actual Start Date</font ></u><img id="Actual_x0020_Start_x0020_Date" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th><th width="30" align="left" valign="middle" class="inner_table_header"><a onclick="Sorting(\'Actual_x0020_End_x0020_Date\')"><u><font style="cursor:hand" size="2">Actual End Date</font ></u><img id="Actual_x0020_End_x0020_Date" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>'
		 + '<th width="30" align="left" valign="middle" class="inner_table_header"><u><font size="2">Status</font ></u></th>'
		 + '<th width="30" align="left" valign="middle" class="inner_table_header"><u><font  size="2">UnAssign</font ></u></th></thead></tr><tbody>'
		 + tbl + "</tbody></table>";

    var tot = parseInt(t) + 1;
    if (end > tot) {
        end = tot;
    }

    var headers = "<table width='100%' border='0' cellSpacing='0' align='center' cellPadding='0'><tr><td class='itemTitle' style='14px;color:black'> Results :" + start + " - " + end + " of " + tot + "</td><td align=right class='norTxt' style='padding: 5px;'><a href='javascript:void(0)' id='btnPrev' onclick='prev()'>Previous</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' id='btnNext' onclick='next()'>Next</a></td></tr><tr><td height=3px></td></tr></table>";

    $('#inner_table_list1').html(headers + maintble);
    $("#listitem1 tbody tr:nth-child(even)").css("background-color", "white");
    //Resetform();
}

/* ...................GetIdOFtheProjectListItem function ...................*/

var projmembers = '';
function GetIdOFtheProjectListItem(selectedValue) {
    var projitemId;
    var query = "<Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" + selectedValue + "</Value></Eq></Where></Query>";

    $().SPServices({
        debug: true,
        operation: "GetListItems",
        async: false,
        CAMLQuery: query,
        listName: projectslistName,
        completefunc: function (xData, Status) {
            $(xData.responseXML).SPFilterNode("z:row").each(function () {
                projitemId = $(this).attr("ows_ID");
                projmembers = $(this).attr("ows_Project_x0020_Members");

            });
        }
    });
    return projitemId;
}

function UnAssign(idval) {

    var query = "<Query><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>" + idval + "</Value></Eq></Where></Query>";
    $().SPServices({
        debug: true,
        operation: "GetListItems",
        async: false,
        CAMLQuery: query,
        listName: projectslistName,
        completefunc: function (xData, Status) {
            $(xData.responseXML).SPFilterNode("z:row").each(function () {
                projmembers = $(this).attr("ows_Project_x0020_Members");

                //alert(projmembers)
                UnAssignProjectToMem(projmembers, idval);

            });
        }

    });

}

function UnAssignProjectToMem(projmembers, idval) {
    projmembers = projmembers.replace(ename, '')
    context = new SP.ClientContext.get_current();
    list = context.get_web().get_lists().getByTitle(projectslistName);

    this.item = this.list.getItemById(idval);
    item.set_item('Project_x0020_Members', projmembers);
    item.update();
    context.load(item);

    context.executeQueryAsync(Function.createDelegate(this, this.onProjectListItemDisplay), Function.createDelegate(this, this.onFail));
    projmembers = '',
	ProjItemContainer = {
	    ProjItem: []
	};

}

/*..............................AssignProjectToMembers function starts here ................... */

function AssignProjectToMem() {

    var projname = $('#projname option:selected').text();

    if (projmembers == "")
        projmembers += "" + Uid + ";#a;#";
    else
        projmembers += ";#" + Uid + ";#a";

    list = context.get_web().get_lists().getByTitle(projectslistName);

    item = list.getItemById(projitemid);

    item.set_item('Project_x0020_Members', projmembers);
    item.update();

    context.load(item);

    context.executeQueryAsync(Function.createDelegate(this, this.onProjectListItemDisplay), Function.createDelegate(this, this.onFail));
    projmembers = '',
	ProjItemContainer = {
	    ProjItem: []
	};
}

/* .............................................................RemoveTable Function ...*/
function removeTable() {

    var count = $("#AddTable tr").length;
    for (var j = 1; j <= count; j++) {
        $('#relexp' + j).remove()
    }
}

/* .......................................................................Validation Method  ............................*/
function cntdetTextBoxesValidation() {

    $("#locpcode").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g))
            return false;
    });
    $("#emercontact").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g))
            return false;
    });

    $("#mobile").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g))
            return false;
    });
    $("#scoregrade").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g))
            return false;
    });
    $("#eduscore").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g))
            return false;
    });
    $("#totEexpmnths").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g))
            return false;
    });

    $("#totEexpmnths").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g))
            return false;
    });
    $("#totExpyrs").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g))
            return false;
    });
    $("#expinmonthsvrtx").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g))
            return false;
    });
    $("#relexpyrs1").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g))
            return false;
    });
    $("#relexpinmnths1").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g))
            return false;
    });

}

function getDatePIckerPluginAppend() {
    $('#dbirth').datepicker();
    $('#djoin').datepicker();
    $('#passportdateofissue').datepicker();
    $('#passportdatexp').datepicker();
    $('#visadateofissue').datepicker();
    $('#visaexpirydate').datepicker();
    $('#confirmDate').datepicker();
    $('#AppraisalDate').datepicker();
    $('#date1').datepicker();
    $('#dateofcert').datepicker();
    $('#validtill').datepicker();
}
/*.............................................................. ResetForms Starts here ..........................................................*/

function ResetuserFields() {
    $("#ctl00_PlaceHolderMain_ename_upLevelDiv").text("");
    resetForm();
    ProjectresetForm();
    CntDetresetForm();
    ProfresetForm();
    CertresetForm();
    PassportresetForm();
    EmpExpinforesetForm();
    EduresetForm();

}

function CntDetresetForm() {
    $('#contactdetails').find("input[type=text], textarea").val("");

}

function EmpExpinforesetForm() {
    removeTable();
    $('#addinfotab').find("input[type=text], textarea").val("");
}

function EduresetForm() {
    $('#edufromyear').val(0);
    $('#edutoyear').val(0);
    $('#etype').val(0);
    $('#educationdet').find("input[type=text], textarea").val("");

}

function CertresetForm() {
    $('#EmpCerttab').find("input[type=text], textarea").val("");
    $('#issueAuth').val(0);
    $('#certname').val(0);

}
function PassportresetForm() {
    $('#passinfotab').find("input[type=text], textarea").val("");
}

function ProfresetForm() {
    //$("#ctl00_PlaceHolderMain_ename_upLevelDiv").text("");
    $("#ctl00_PlaceHolderMain_supervisor_upLevelDiv").text("");
    $('#dept').val(0);
    $('#mname').val(0);
    $('#gender').val(0);
    $('#mstatus').val(0);
    $('#etype').val(0);
    $('#ucal').val(0);
    $('#EmployeeProfile').find("input[type=text], textarea").val("");
    $('#savebutton').show();
    $('#Empprofupdatebutton').hide();
    $('input[name="status"]').attr('checked', false);

}

function ProjectresetForm() {
    $('#projtable').find("input[type=text], textarea").val("");
    $('#projname').val(0);
    $('#AssignProjbutton').hide();
}
function InputDate(date) {
    var ndate = date.split(" ")[0];
    ndate = ndate.split('-')[1] + "/" + ndate.split('-')[2] + "/" + ndate.split('-')[0];
    //alert(ndate);
    return ndate;
}
