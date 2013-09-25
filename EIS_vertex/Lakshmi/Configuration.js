var context, 
    web, 
    spItems, 
    position, 
    nextPagingInfo, 
    previousPagingInfo, 
    listName = 'EmployeeConfiguration', 
    pageIndex = 1, 
    pageSize=4,
    list, 
    camlQuery, 
    sortColumn = 'Employee_x0020_Name',flag=1; 
    var empname,HRPrimary,HRSecondary,nofrec,hrpid,upidval,hrsecid,conval=0,upval=0;
$(document).ready(function(){	
    $('#updatebutton').hide();
    	ExecuteOrDelayUntilScriptLoaded(RetrieveListItems,"sp.js");

    $("#btnNext").click(function () { 
   		
        pageIndex = pageIndex + 1; 
        if (nextPagingInfo) { 
            position = new SP.ListItemCollectionPosition(); 
            position.set_pagingInfo(nextPagingInfo); 
        } 
        else { 
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
   $("#updatebutton").click(function(){
   update();
   
   });
   $("#resetbutton").click(function(){
   Resetform();
   
   });

    });
	 function Save(){
	 		
		    	ExecuteOrDelayUntilScriptLoaded(AddListItems,"sp.js");

	
	}
	function getInputFormValues(){	
			empname=$('#empname option:selected').text();
	      	 if(empname== "" || typeof empname=== 'undefined' || empname== null || empname== "Select" )
			{
			alert("Select Employee Name...");
			return false;
			}
			HRSecondary=$('#ctl00_PlaceHolderMain_HRSecondary_upLevelDiv').text();	       
	       if(HRSecondary== "" || typeof HRSecondary=== 'undefined' || HRSecondary== null)
			{
			alert("Add HR Secondary value...");			
			return false;			
			}
			else{			
			HRSecondary=HRSecondary.replace(";",' ');
			HRSecondary=$.trim(HRSecondary);       
	       	getSeconUserID(HRSecondary);
	       	}
	       	HRPrimary=$('#ctl00_PlaceHolderMain_HRPrimary_upLevelDiv').text();
	       if(HRPrimary== "" || typeof HRPrimary=== 'undefined' || HRPrimary== null)
			{
			alert("Add HR Primary value...");
			return false;			
			}
			else{
			HRPrimary=HRPrimary.replace(";",' ');
			HRPrimary=$.trim(HRPrimary);       
	       	getUserID(HRPrimary);
	       	}  	
			
	       	
	
	}
	function getUserID(HRPrimary){
	var query='<Query><Where><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">'+HRPrimary+'</Value></Eq></Where></Query>';
	$().SPServices({         
		 operation: "GetListItems",   
		   
		 async: false,         
		 listName: "User Information List",         
		  CAMLQuery:query,         
		 completefunc: function (xData, Status) {           
		 if (Status == "success") {                         
		     
		  $(xData.responseXML).SPFilterNode("z:row").each(function() {
		       hrpid=  $(this).attr('ows_ID'); 
		       
		 
		  });
		  hrpid=hrpid+";#"+HRPrimary;
		                
		 }                 
		   }    
		   
		 }); 

	}
	function getSeconUserID(HRSecondary){
	var query='<Query><Where><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">'+HRSecondary+'</Value></Eq></Where></Query>';
	$().SPServices({         
		 operation: "GetListItems",   
		   
		 async: false,         
		 listName: "User Information List",         
		  CAMLQuery:query,         
		 completefunc: function (xData, Status) {           
		 if (Status == "success") {                         
		     
		  $(xData.responseXML).SPFilterNode("z:row").each(function() {
		       hrsecid=  $(this).attr('ows_ID'); 
		       
		 
		  });
		  hrsecid=hrsecid+";#"+HRSecondary;
		                
		 }                 
		   }    
		   
		 }); 

	}
	
	function AddListItems(){		
	      				
			context= new SP.ClientContext.get_current();
	 		list= context.get_web().get_lists().getByTitle('EmployeeConfiguration');	 				
	 		 var listItemCreateInfo = new SP.ListItemCreationInformation();
	  	  	this.oListItem = list.addItem(listItemCreateInfo);	 
	      	getInputFormValues();
	      	      	
	      	 if(hrpid== "" || typeof hrpid=== 'undefined' || hrpid== null)
			{
			alert("Added HR primary Not there in Sharepoint Site...");
			conval=1;			
			return false;
						
			}
			if(hrsecid== "" || typeof hrsecid=== 'undefined' || hrsecid== null)
			{
			alert("Added HR secondary Not there in Sharepoint Site...");	
			conval=1;		
			return false;			
			}
			
			if(conval == "0"){
			oListItem.set_item('Title', "Employee");
		    oListItem.set_item('HR_x0020_Primary', hrpid);		    
		    oListItem.set_item('HR_x0020_Secondary', hrsecid);		    
			oListItem.set_item('Employee_x0020_Name', empname);
			oListItem.update();
		    context.load(oListItem);       
		    
			context.executeQueryAsync(Function.createDelegate(this,this.itemAdded), Function.createDelegate(this,this.onFail));	
			}
	}
	function Edit(idval){
	 $("#" + idval).css("background-color", "#e2edff");	 	
	 	this.item=this.list.getItemById(idval);	 
		context.load(item);		
		context.executeQueryAsync(
		Function.createDelegate(this, this.fillConfigForm),Function.createDelegate(this, this.onFail));

 }
 
 function fillConfigForm(){

			var hrPrim=item.get_item('HR_x0020_Primary').get_lookupValue();			
				
			if($("#ctl00_PlaceHolderMain_HRPrimary_upLevelDiv").length !=0)
			{
			$("#ctl00_PlaceHolderMain_HRPrimary_upLevelDiv").text(hrPrim); 
			$("#ctl00_PlaceHolderMain_HRPrimary_checkNames").click();
			}
			$("#ctl00_PlaceHolderMain_HRPrimary_checkNames").attr('disabled','false');
			var hrsec=item.get_item('HR_x0020_Secondary').get_lookupValue();
			if($("#ctl00_PlaceHolderMain_HRSecondary_upLevelDiv").length !=0)
			{
			$("#ctl00_PlaceHolderMain_HRSecondary_upLevelDiv").text(hrPrim); 
			$("#ctl00_PlaceHolderMain_HRSecondary_checkNames").click();
			}
			$("#ctl00_PlaceHolderMain_HRSecondary_checkNames").attr('disabled','false');
				$("#empname").val(item.get_item('Employee_x0020_Name'));				
				upidval=item.get_id();
				alert(upidval);	
				$('#savebutton').hide();
				$('#updatebutton').show(); 
 } 
	function itemAdded(){
	alert("Employee Configured info added successfully...");
	
	}	
	 function update(){
    
    			getInputFormValues();  
    		
	       				
					
    			this.item = this.list.getItemById(upidval);

		    if(hrpid== "" || typeof hrpid=== 'undefined' || hrpid== null)
			{
			alert("Added HR Not there in Sharepoint Site...");
			upval=1;			
			return false;
						
			}
			if(hrsecid== "" || typeof hrsecid=== 'undefined' || hrsecid== null)
			{
			alert("Added HR Not there in Sharepoint Site...");	
			upval=1;		
			return false;			
			}
			debugger;
			if(upval== "0"){
			item.set_item('Title', "Employee");
		    item.set_item('HR_x0020_Primary', hrpid);		    
		    item.set_item('HR_x0020_Secondary', hrsecid);		    
			item.set_item('Employee_x0020_Name', empname);
			item .update();	   			
		 
		    context.load(item);
		    context.executeQueryAsync(Function.createDelegate(this,this.OnSuccess), Function.createDelegate(this,this.onFail));  
		    }
    }
    function OnSuccess(){
    
    alert("Item Updated Successfully....");
    
    }
    function Resetform(){
	$("#empname").val('');
	$("#ctl00_PlaceHolderMain_HRSecondary_upLevelDiv").text("");
	$("#ctl00_PlaceHolderMain_HRPrimary_upLevelDiv").text("");	
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
function getItemsOnDelete(){
	Resetform();
	RetrieveListItems();

}

// RetrieveListItems function starts here................
    function RetrieveListItems(){	
	
	context = SP.ClientContext.get_current(); 
    list = context.get_web().get_lists().getByTitle(listName); 
    camlQuery = new SP.CamlQuery(); 
 
    camlQuery.set_listItemCollectionPosition(position); 
 
    camlQuery.set_viewXml("<View>" + 
                                "<ViewFields>" +                                       
                                       "<FieldRef Name='Title'/>" +
                                       "<FieldRef Name='Employee_x0020_Name'/>" + 
										"<FieldRef Name='HR_x0020_Secondary'/>" +
											"<FieldRef Name='HR_x0020_Primary'/>" +							
									
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
	 			
        items.push('<tr id='+item.get_id()+'><td class="inner_table_flip" align="left" valign="middle">'+item.get_item('Employee_x0020_Name') + '</td>');
        items.push('<td class="inner_table_flip" align="left" valign="middle">'+item.get_item('HR_x0020_Primary').get_lookupValue()+ '</td>');
        items.push('<td class="inner_table_flip" align="left" valign="middle">'+item.get_item('HR_x0020_Secondary').get_lookupValue()+ '</td>');       
		items.push('<td class="inner_table_flip" align="left" valign="middle"><a onclick="Edit('+item.get_id()+')"><img alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/edit.png" width="14" height="16" /></a></td>');
		items.push('<td class="inner_table_flip" align="left" valign="middle"><a onclick="Delete('+item.get_id()+')"><img alt="Delete" src="http://inhydpc151:34981/Style%20Library/Images/delete_icon.png" width="14" height="16" /></a></td></tr>');
 
    } 

    var content = '<table style="border:#d2d7da solid 1px;" width="100%" border="0" id="listitem1" cellspacing="0" cellpadding="10"><thead><tr><th class="inner_table_header" align="left" valign="middle"><a onclick="Sorting()"><u><font style="cursor:hand" size="2">Employee Name</font ></u><img id="sortingimage" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>' 
    				+'<th class="inner_table_header" align="left" valign="middle"><u><font  size="2">HR Primary</font ></u></th>'
    				+'<th width="120" align="left" valign="middle" class="inner_table_header"><u><font  size="2">HR Secondary</font ></u></th>'    				
    				+'<th width="30" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Edit</font ></u></th><th width="30" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Delete</font ></u></th></thead></tr><tbody>'
                + items.join("") + "</tbody></table>"; 
    $('#inner_table_list1').html(content); 
    $("#listitem1 tbody tr:nth-child(even)").css("background-color", "white");
    retrieveChoiceFields(); 
    managePagerControl(); 
    Resetform();
} 
function Sorting(){
if(flag=="0"){

RetrieveListItems();
flag=1;
$('#sortingimage').attr('src',"http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg");
}
else if(flag=="1"){

context = SP.ClientContext.get_current(); 
    list = context.get_web().get_lists().getByTitle(listName); 
    camlQuery = new SP.CamlQuery(); 
 
    camlQuery.set_listItemCollectionPosition(position); 
 
   camlQuery.set_viewXml("<View>" + 
                                "<ViewFields>" +                                       
                                       "<FieldRef Name='Title'/>" +
                                       "<FieldRef Name='Employee_x0020_Name'/>" + 
										"<FieldRef Name='HR_x0020_Secondary'/>" +
											"<FieldRef Name='HR_x0020_Primary'/>" +							
									
                                         "</ViewFields>" + 
                               "<Query>" + 
                                    "<OrderBy>" + 
                                      "<FieldRef Name='" + sortColumn + "' Ascending='false' />" + 
                                    "</OrderBy>" + 
                               "</Query>" + 
                               "<RowLimit>" + pageSize + "</RowLimit></View>"); 
    spItems = list.getItems(camlQuery); 
 	flag=0;
    context.load(spItems); 
    context.executeQueryAsync( 
            Function.createDelegate(this, onSuccess), 
            Function.createDelegate(this, onFail)); 
           
            $('#sortingimage').attr('src',"http://inhydpc151:34981/Style%20Library/Images/downarrow.jpg");
            }
}


function retrieveChoiceFields(){
	empChoiceField = context.castTo(list.get_fields().getByInternalNameOrTitle('Employee_x0020_Name'), SP.FieldChoice);
	context.load(empChoiceField);
	context.executeQueryAsync(
		Function.createDelegate(this, this.fillEmpDropDown),
		Function.createDelegate(this, this.onFail));
	
	}
	function fillEmpDropDown(){
	var choices = empChoiceField.get_choices();
	var ddlempname = document.getElementById('empname');
	if (ddlempname != null) {
		for (var i = 0; i < choices.length; i++) {
			var theOption = new Option;
			theOption.text = choices[i];
			ddlempname.options[i] = theOption;
		}
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

    } 
    else { 
        $("#btnBack").removeAttr('disabled'); 
    } 
 
    if (nextPagingInfo) { 
        $("#btnNext").removeAttr('disabled'); 
    } 
    else { 
        $("#btnNext").attr('disabled', 'disabled'); 
    } 
 
}

   function onFail(sender, args) {
alert("failed. Message:" + args.get_message());
}


