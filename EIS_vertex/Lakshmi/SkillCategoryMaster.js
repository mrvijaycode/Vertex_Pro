var context, 
    web, 
    spItems, 
    position, 
    nextPagingInfo, 
    previousPagingInfo, 
    listName = 'Skills', 
    pageIndex = 1, 
    pageSize = 4,
    list, 
    camlQuery, 
    sortColumn = 'Skill_x0020_Category_x0020_Name',flag=1,idval,upidval;
    var skillcatname,skill,Notes; 
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
ExecuteOrDelayUntilScriptLoaded(AddListItems, "sp.js");

}

    function getInputFormValues(){

			skillcatname=$('#skillcatname').val();     
			if(skillcatname== "" || typeof skillcatname=== 'undefined' || skillcatname== null)
			{			
			alert("Skil category must entered");
			skillcatname='';
			return false;
				
			}

	       	skill=$("#skill").val();	
			if(skill== "" || typeof skill=== 'undefined' || skill== null)
			{
			alert("skill must entered");
			skill='';
			return false;				
			}			
			Notes=$("#Notes").val();			
			} 
			function AddListItems(){			
			context= new SP.ClientContext.get_current();
	 		list= context.get_web().get_lists().getByTitle('Skills');
	 				
	 		 var listItemCreateInfo = new SP.ListItemCreationInformation();
	  	  	this.oListItem = list.addItem(listItemCreateInfo);	 
	      	getInputFormValues();    	 		
		    oListItem.set_item('Title', "Test");
		    oListItem.set_item('Skill_x0020_Category_x0020_Name', skillcatname);		    
		    oListItem.set_item('Skill', skill);		    
			oListItem.set_item('Notes', Notes);			     
		    oListItem.update();
		    context.load(oListItem);

  context.executeQueryAsync(Function.createDelegate(this,this.OnSuccesseeded), Function.createDelegate(this,this.onFail));

}
function OnSuccesseeded(){
alert("Item added successfully ...");
}
function Edit(idval){
	 $("#" + idval).css("background-color", "#e2edff");	 	
	 	this.item=this.list.getItemById(idval);	 
		context.load(item);
		
		context.executeQueryAsync(
		Function.createDelegate(this, this.fillSkillForm),Function.createDelegate(this, this.onFail));

 }
 
 function fillSkillForm(){
				
				$("#skillcatname").val(item.get_item('Skill_x0020_Category_x0020_Name'));
				$("#skill").val(item.get_item('Skill'));
				$("#Notes").val(item.get_item('Notes'));				
				upidval=item.get_id();	
				$('#savebutton').hide();
				$('#updatebutton').show(); 
 }  
 function update(){
    
    			getInputFormValues();  			

    			this.item = this.list.getItemById(upidval);

		    item.set_item('Title', "Test");
		    item.set_item('Skill_x0020_Category_x0020_Name', skillcatname);		    
		    item.set_item('Skill', skill);		    
			item.set_item('Notes', Notes);			 
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

    function RetrieveListItems(){	
	
	context = SP.ClientContext.get_current(); 
    list = context.get_web().get_lists().getByTitle(listName); 
    camlQuery = new SP.CamlQuery(); 
 
    camlQuery.set_listItemCollectionPosition(position); 
 
    camlQuery.set_viewXml("<View>" + 
                                "<ViewFields>" +                                       
                                       "<FieldRef Name='Title'/>" +
                                       "<FieldRef Name='Skill_x0020_Category_x0020_Name'/>" + 
										"<FieldRef Name='Skill'/>" +
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
	 			
        items.push('<tr id='+item.get_id()+'><td class="inner_table_flip" align="left" valign="middle">'+item.get_item('Skill_x0020_Category_x0020_Name') + '</td>');
        items.push('<td class="inner_table_flip" align="left" valign="middle">'+item.get_item('Skill')+ '</td>');
		items.push('<td class="inner_table_flip" align="left" valign="middle"><a onclick="Edit('+item.get_id()+')"><img alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/edit.png" width="14" height="16" /></a></td>');
		items.push('<td class="inner_table_flip" align="left" valign="middle"><a onclick="Delete('+item.get_id()+')"><img alt="Delete" src="http://inhydpc151:34981/Style%20Library/Images/delete_icon.png" width="14" height="16" /></a></td></tr>');
 
    } 

    var content = '<table style="border:#d2d7da solid 1px;" width="100%" border="0" id="listitem1" cellspacing="0" cellpadding="10"><thead><tr><th class="inner_table_header" align="left" valign="middle"><a onclick="Sorting()"><u><font style="cursor:hand" size="2">Skill Category Name</font ></u><img id="sortingimage" alt="Edit" src="http://inhydpc151:34981/Style%20Library/Images/Uparrow.jpg" width="16" height="15" /></a></th>' 
    				+'<th class="inner_table_header" align="left" valign="middle"><u><font  size="2">Skill</font ></u></th>'
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
                                       "<FieldRef Name='Skill_x0020_Category_x0020_Name'/>" + 
										"<FieldRef Name='Skill'/>" +
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
	$("#skill").val('');
	$("#EffectiveDate").val("");
	$("#Notes").val("");
	
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

