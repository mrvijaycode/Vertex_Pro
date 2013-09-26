var context, 
    web, 
    spItems, 
    position, 
    nextPagingInfo, 
    previousPagingInfo, 
    listName = 'Job Description', 
    pageIndex = 1, 
    pageSize=4,
    list, 
    camlQuery, 
    sortColumn = 'Title',flag=0; 
    var title,EffectiveDate,level,rolesresp,Notes,status,upidval,idval;
$(document).ready(function(){
$("#EffectiveDate").datepicker();	
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
    function update(){
   
			getInputFormValues();
    		item.set_item('Title', title);
		    item.set_item('Effective_x0020_Date', EffectiveDate);		    
		    item.set_item('Level', level);		    
			item.set_item('Roles_x0020_Responsibilities', rolesresp);
			item.set_item('Notes', Notes);
			item.set_item('Status', status);
			    
		    item.update();
		    context.load(item);
		    context.executeQueryAsync(Function.createDelegate(this,this.OnSuccess), Function.createDelegate(this,this.onFail));  
    }
    function OnSuccess(){
    
    alert("Item Updated Successfully....");
    
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

    function Edit(idval){
	 $("#" + idval).css("background-color", "#e2edff");	 	
	 	this.item=this.list.getItemById(idval);	 
		context.load(item);		
		context.executeQueryAsync(
		Function.createDelegate(this, this.fillJobdescForm),Function.createDelegate(this, this.onFail));

 }
 
 function fillJobdescForm(){
 
				var efctdate=item.get_item('Effective_x0020_Date');
			 	var efctdate= new Date(efctdate);
	 			efctdate=(efctdate.getMonth()+1)+'/'+efctdate.getDate()+'/'+efctdate.getFullYear();	 
				$("#title").val(item.get_item('Title'));
				$("#EffectiveDate").val(efctdate);
				$("#level").val(item.get_item('Level'));
				$("#Notes").val(item.get_item('Notes'));
				$("#status").val(item.get_item('Status'));	
				$("#rolesresp").val(item.get_item('Roles_x0020_Responsibilities'));
								
				upidval=item.get_id();
				alert(upidval);	
				$('#savebutton').hide();
				$('#updatebutton').show(); 
 } 

    function getInputFormValues(){
    
		   title=$("#title").val();
		   EffectiveDate=$("#EffectiveDate").val();
		   
   			if(EffectiveDate== "" || typeof EffectiveDate=== 'undefined' || EffectiveDate== null)
			{
			alert("EffectiveDate must entered");
			EffectiveDate='';
			return false;				
			}
			else{
			EffectiveDate=$('#EffectiveDate').val().split('/')[2]+"-"+$('#EffectiveDate').val().split('/')[0]+"-"+$('#EffectiveDate').val().split('/')[1]+"T00:00:00Z";
			}

		   level=$("#level option:selected").val();
		   if(level== "" || typeof level=== 'undefined' || level== null)
			{			
			alert("please select level");
			level='';
			return false;				
			}
		
			   rolesresp=$("#rolesresp").val();		   
		  	 Notes=$("#Notes").val(); 

		   status=$("#status option:selected").val(); 
		   if(status== "" || typeof status=== 'undefined' || status== null)
			{	
			status='';		
			alert("please select level");			
			return false;				
			}
  
    
    }
    function Save(){
   ExecuteOrDelayUntilScriptLoaded(AddlistItems,"sp.js");
    
    }
    function AddlistItems(){
    getInputFormValues();
   		context= new SP.ClientContext.get_current();
		
	 		list= context.get_web().get_lists().getByTitle('Job Description');	 				
	 		 var listItemCreateInfo = new SP.ListItemCreationInformation();
	  	  	this.oListItem = list.addItem(listItemCreateInfo);
	  	  	oListItem.set_item('Title',title);
		    oListItem.set_item('Roles_x0020_Responsibilities', rolesresp);		    
		    oListItem.set_item('Level', level);		    
			oListItem.set_item('Effective_x0020_Date', EffectiveDate);
			oListItem.set_item('Status', status);
			oListItem.set_item('Notes', Notes);
			oListItem.update();
		    context.load(oListItem);       
		    
			context.executeQueryAsync(Function.createDelegate(this,this.itemAdded), Function.createDelegate(this,this.onFail));	
   
    }
    function itemAdded(){
    
    alert("Job Added successfully...");
    }
     function RetrieveListItems(){	
	
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
	 			
        items.push('<tr id='+item.get_id()+'><td class="inner_table_flip" align="left" valign="middle">'+item.get_item('Title') + '</td>');
        items.push('<td class="inner_table_flip" align="left" valign="middle">'+item.get_item('Status')+ '</td>');
		items.push('<td class="inner_table_flip" align="left" valign="middle"><a onclick="Edit('+item.get_id()+')"><img alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/edit.png" width="14" height="16" /></a></td>');
		items.push('<td class="inner_table_flip" align="left" valign="middle"><a onclick="Delete('+item.get_id()+')"><img alt="Delete" src="http://inhydpc151:34981/Style%20Library/Images/delete_icon.png" width="14" height="16" /></a></td></tr>');
 
    } 

    var content = '<table style="border:#d2d7da solid 1px;" width="100%" border="0" id="listitem1" cellspacing="0" cellpadding="10"><thead><tr><th class="inner_table_header" align="left" valign="middle"><a onclick="Sorting()"><u><font style="cursor:hand" size="2">Title</font ></u><img id="sortingimage" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>' 
    				+'<th class="inner_table_header" align="left" valign="middle"><u><font  size="2">Status</font ></u></th>'
    				+'<th width="30" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Edit</font ></u></th><th width="30" align="left" valign="middle" class="inner_table_header"><u><font  size="2">Delete</font ></u></th></thead></tr><tbody>'
                + items.join("") + "</tbody></table>"; 
    $('#inner_table_list1').html(content); 
    $("#listitem1 tbody tr:nth-child(even)").css("background-color", "white");  
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
            Function.createDelegate(this, onSuccess), 
            Function.createDelegate(this, onFail)); 
          flag=0;
            $('#sortingimage').attr('src',"http://inhydpc151:34981/Style%20Library/Images/downarrow.jpg");

}

}


function Resetform(){

	$("#title").val('');
	$("#EffectiveDate").val("");
	$("#level").val("");
	$("#Notes").val();
	$("#status").val();	
	$("#rolesresp").val();
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


