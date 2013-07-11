
//****************************************************************************************
//-----------------Global CBD Capability Curriculum Search Results------------------
//---This java script file is intended to Get the Lookup values---
//--- ---
//---Created By - RajeshN 23nd Oct 2012 date---
//---Modified By - RajeshN ---
//---Reviewed By -- VenkatCH---
//****************************************************************************************
//http://teamspace.pg.com/sites/cbdglobal/Pages/OneCBD/FindYourLearningResources.aspx
//---Configuration Variables ---


var trainigID = 0;
var siteurl = "http://teamspace.pg.com/sites/cbdglobal";
var oLists = new SPAPI_Lists(siteurl);
var oRolesList = "CBD Learning Resources Roles";
var oCategoriesList = "CBD Learning Resources Power";
var oTrainingTypesList = "CBD Learning Resources Categories";//CBD Learning Resources Categories
var oTrainingsList = "CBD Learning Resources";

//--Global Variable---
var varRole;
var viewRole;
var varRoleRows;
var strRole = "";
var valueRole;
var valueRole1;

var varTrainingType;
var viewTrainingType;
var varTrainingTypeRows;
var strTrainingType="";
var valueTrainingType;

var varCategories;
var viewCategories; 
var varCategoriesRows;
var strCategories="";
var valueCategories;

var searchView;
var searchResult;
var searchRows;
var selRole;
var selSubRole;
var selRRole;
var selTrainibgType;
var selCategories;
var MaxValueQuery;
var MaxID=0;
var leastID=0;
var actualCount=0;
var searchQuery='';
var TrainingTitle="All Learning Resources";

$(document).ready(function(){

     drpRole();
     //drpCompetency(); 
     drpCBDSubject();
     //drpTrainingType();
    drpCategories();
	searchResults('Next',trainigID,'');
	GetMaxId();
	 $('#btnSearch').click(function(){
TrainingTitle="All Learning Resources";
		 $('#selRole').get(0).selectedIndex=0;
		 $('#selSubRole').get(0).selectedIndex=0;
		 $('#selRRole').get(0).selectedIndex=0;
		 $('#selCategories').get(0).selectedIndex=0;
		  $('#selSubject').get(0).selectedIndex=0;
		 //selSubject
		getAll('All');
	 });
	 $('#selCategories').change(function(){TrainingTitle=$(this).find('option:selected').text()+" Learning Resources";  getAll('Power')})
	 $('#selRole').change(function(){TrainingTitle=$(this).find('option:selected').text()+" Learning Resources";  getAll('Role')})
	 $('#selSubRole').change(function(){ TrainingTitle=$(this).find('option:selected').text()+" Learning Resources"; getAll('SubRole')})
	 $('#selRRole').change(function(){TrainingTitle=$(this).find('option:selected').text()+" Learning Resources"; getAll('RRole')})
	 $('#selSubject').change(function(){TrainingTitle=$(this).find('option:selected').text()+" Learning Resources"; getAll('Subject')})

 	
});

function getAll(SelID)
{

MaxID=0;
		leastID=0;
		trainigID=0;
		actualCount=0;
	 	searchResults('Next',trainigID,SelID); 
		GetMaxId();
		
		if(SelID == 'Power')
		{
		    //$('#selCategories').get(0).selectedIndex=0;
			 //$('#selRole').get(0).selectedIndex=0;
		     $('#selSubRole').get(0).selectedIndex=0;
		     $('#selRRole').get(0).selectedIndex=0;
			 $('#selSubject').get(0).selectedIndex=0;

		}
		else if (SelID == 'Subject')
		{
			$('#selCategories').get(0).selectedIndex=0;
			$('#selRole').get(0).selectedIndex=0;
		    //$('#selSubRole').get(0).selectedIndex=0;
		    $('#selRRole').get(0).selectedIndex=0;
			//$('#selSubject').get(0).selectedIndex=0;

		}
		else if (SelID == 'RRole')
		{
			$('#selCategories').get(0).selectedIndex=0;
			$('#selRole').get(0).selectedIndex=0;
		    $('#selSubRole').get(0).selectedIndex=0;
		    // $('#selRRole').get(0).selectedIndex=0;
			$('#selSubject').get(0).selectedIndex=0;

		}

			 //$('#selCategories').get(0).selectedIndex=0;
			 //$('#selRole').get(0).selectedIndex=0;
		     //$('#selSubRole').get(0).selectedIndex=0;
		    // $('#selRRole').get(0).selectedIndex=0;
			// $('#selSubject').get(0).selectedIndex=0;
		
		
}
 
 var viewfields = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='ID' /></ViewFields>";
 var qry = '<Query><OrderBy><FieldRef Name="ID" Ascending="True" /></OrderBy></Query>';
 // Bind Role to Dropdown
 function drpRole()
 {
  	$(document).attr("title", "Find Your CBD Learning Resources");
	$().SPServices({
   	 operation: "GetListItems",
   	 async: false,
   	 listName: oRolesList,
   	 CAMLQuery:qry,
   	 CAMLViewFields:viewfields , 
   	 completefunc: function(xData,Status){
		$(xData.responseXML).SPFilterNode("z:row").each(function(i) {
	    	valueRole =  $(this).attr("ows_Title");
	    	var RoleID=$(this).attr("ows_ID");
	    	if(strRole.indexOf(valueRole)==-1)
	    	{
	    		 strRole = strRole+valueRole;     
	    		 $("#selRole").append($('<option value="'+RoleID+'"></option>').html(valueRole )); 
	    		 $("#selSubRole").append($('<option value="'+RoleID+'"></option>').html(valueRole ));
	    		  $("#selRRole").append($('<option value="'+RoleID+'"></option>').html(valueRole ));    
	    	} 
    	});
      }
    });
 	
 }
  // Bind Role to Dropdown
 function drpCBDSubject()
 {
  	$(document).attr("title", "Find Your CBD Learning Resources");
	$().SPServices({
   	 operation: "GetListItems",
   	 async: false,
   	 listName: "CBD Subject",
   	 CAMLQuery:'<Query><OrderBy><FieldRef Name="Title" /></OrderBy><Where><IsNotNull><FieldRef Name="Title" /></IsNotNull></Where></Query>',
   	 CAMLViewFields:viewfields , 
   	 completefunc: function(xData,Status){
		$(xData.responseXML).SPFilterNode("z:row").each(function(i) {
	    	valueRole1 =  $(this).attr("ows_Title");
	    	var RoleID1=$(this).attr("ows_ID");
	    	if(strRole.indexOf(valueRole1)==-1)
	    	{
	    		 strRole = strRole+valueRole1;
	    		 if(valueRole1 != null)     
	    		 $("#selSubject").append($('<option value="'+RoleID1+'"></option>').html(valueRole1 )); 
	    		
	    	} 
    	});
      }
    });
 	
 }

 // Bind Role to Dropdown
 function drpCompetency()
 {
  	$(document).attr("title", "Find Your CBD Learning Resources");
	$().SPServices({
   	 operation: "GetListItems",
   	 async: false,
   	 listName: oTrainingsList,
   	 CAMLQuery:'<Query><OrderBy><FieldRef Name="Title" /></OrderBy><Where><IsNotNull><FieldRef Name="Title" /></IsNotNull></Where></Query>',
   	 CAMLViewFields:viewfields , 
   	 completefunc: function(xData,Status){
		$(xData.responseXML).SPFilterNode("z:row").each(function(i) {
	    	valueRole =  $(this).attr("ows_Title");
	    	var RoleID=$(this).attr("ows_ID");
	    	if(strRole.indexOf(valueRole)==-1)
	    	{
	    		 strRole = strRole+valueRole;
	    		 if(valueRole != null)     
	    		 $("#selCategories").append($('<option value="'+valueRole+'"></option>').html(valueRole )); 
	    		
	    	} 
    	});
      }
    });
 	
 }

 //var btnDesign+='';
  // Bind Training Type to Dropdown
 function drpTrainingType()
 {
	$().SPServices({
    operation: "GetListItems",
    async: false,
    listName: oTrainingTypesList,
    CAMLQuery:qry,
    CAMLViewFields:viewfields , 
    completefunc: function(xData,Status){
    $(xData.responseXML).SPFilterNode("z:row").each(function(i) {
    valueTrainingType=  $(this).attr("ows_Title");
    var TrainingTypeID=$(this).attr("ows_ID");
   	if(strTrainingType.indexOf(valueTrainingType)==-1)
    {
        strTrainingType= strTrainingType+valueTrainingType;     
        $("#selTrainingType").append($('<option value="'+TrainingTypeID+'"></option>').html(valueTrainingType));   
    }
   });
 }
});
}

 // Bind Categories to Dropdown
 function drpCategories()
 {
 var  viewfields1 = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='ID' /><FieldRef Name='UIDisplay' /></ViewFields>";

var qry1 = "<Query><OrderBy><FieldRef Name='ID' Ascending='True' /></OrderBy><Where><Eq><FieldRef Name='UIDisplay' /><Value Type='Boolean'>1</Value></Eq></Where></Query>";

	$().SPServices({
    operation: "GetListItems",
    async: false,
    listName: oCategoriesList,
    CAMLQuery:qry1,
    CAMLViewFields:viewfields1, 
    completefunc: function(xData,Status){
	 $(xData.responseXML).SPFilterNode("z:row").each(function(i) {
        valueCategories=  $(this).attr("ows_Title");
        var CategoryID=$(this).attr("ows_ID");
       if(strCategories.indexOf(valueCategories)==-1)
       {
        strCategories= strCategories+valueCategories;     
        $("#selCategories").append($('<option value="'+CategoryID+'"></option>').html(valueCategories));   
       }
       });
       }
    });

 }
  var QueryStatus=false;
  var QueryMiddlePart="";
 //---Summary---
 // Function to construct query dynamically 
 //---Summary---
 function GenerateQuery(Position,currID)
 {
	 debugger
 	var QueryBeginPart="";
  //  var QueryMiddlePart="";
    var QueryEndPart="";
    var counter=1;
    

    var Fields=new Array("Categories","Role","Subject","Role","Role");
    var ControlNames=new Array("#selCategories","#selRole","#selSubject","#selSubRole","#selRRole");
    QueryBeginPart="<Query><Where>";
    QueryEndPart="</Where></Query>";
    if(!QueryStatus)
    {
    QueryMiddlePart="";
   
 	for(var i=0; i<Fields.length; i++)
 	{
 		var FieldName=ControlNames[i];
 		var FieldValue=$(FieldName).val();
 		//&amp;
 		if(FieldValue.indexOf("&") != -1)
 		   FieldValue = FieldValue.replace("&","&amp;");
 		var FieldText=$(FieldName).text();
 		var selVal=  $(FieldName).get(0).selectedIndex
 		if(selVal!=0)
 		{
 		var valtype="<Value Type='Lookup'>"
 		if(Fields[i]=="Role") 		
 		valtype="<Value Type='LookupMulti'>"
 		if(Fields[i]=="Subject") 		
 		valtype="<Value Type='LookupMulti'>"
			if(counter==1)
 			{
 				QueryMiddlePart="<Eq><FieldRef Name='"+Fields[i]+"' LookupId='TRUE' />"+valtype+FieldValue+"</Value></Eq>";
 				
 			}
 			else
 			{
 				QueryMiddlePart="<And>"+QueryMiddlePart+"<Eq><FieldRef Name='"+Fields[i]+"' LookupId='TRUE' />"+valtype+FieldValue+"</Value></Eq></And>";
 			}
 			counter++;
 		}
 		
 	}
 }

 	if(QueryMiddlePart!="")
 	{
 	if(Position=='Previous')
 	var Query="<Query><OrderBy><FieldRef Name='ID' Ascending='False'  /></OrderBy><Where><And><Lt><FieldRef Name='ID' /><Value Type='Counter'>"+currID+"</Value></Lt>"+QueryMiddlePart+"</And>"+QueryEndPart;
 	else if(Position=='Next')
	var Query=QueryBeginPart+"<And><Gt><FieldRef Name='ID' /><Value Type='Counter'>"+currID+"</Value></Gt>"+QueryMiddlePart+"</And>"+QueryEndPart; 	
	}
	else
	{
	 	if(Position=='Previous')
	var Query="<Query><OrderBy><FieldRef Name='Colleges' /></OrderBy><Where><Lt><FieldRef Name='ID' /><Value Type='Counter'>"+currID+"</Value></Lt></Where></Query>";
	
	 	else if(Position=='Next')
	 		var Query="<Query><OrderBy><FieldRef Name='Colleges' /></OrderBy><Where><Gt><FieldRef Name='ID' /><Value Type='Counter'>"+currID+"</Value></Gt></Where></Query>";
	}



	if(QueryMiddlePart!="")
 	MaxValueQuery="<Query><OrderBy><FieldRef Name='ID' Ascending='False' /></OrderBy><Where>"+QueryMiddlePart+"</Where></Query>";
 	else
 	MaxValueQuery="<Query><OrderBy><FieldRef Name='ID' Ascending='False' /></OrderBy></Query>";
 	return Query;
 	
 	
 	
 }
 
 
 
 function getSelRole(selVal)
 {
 $("#selRole option").each(function(){
 
 if($(this).val()==selVal)
 TrainingTitle=$(this).text()+" Learning Resources";

 })
 
 
 searchQuery="";
 $("#selRole").val(selVal)
 
 getAll();
 
 }
/* function getSelType(selVal)
 {
 
  $("#selTrainingType option").each(function(){
 
 if($(this).val()==selVal)
 TrainingTitle=$(this).text()+" Learning Resources";
 })
 

  searchQuery="";
  $("#selTrainingType").val(selVal)
 
getAll()

 }*/
 
//Shows search results
var PreviousID=0;
var listNextPos;
var strtID;
var endID;
var Fullcount=0;
 function searchResults(Position,currID,SeldrpID)
 {
	 debugger
    if(SeldrpID == 'Power')
		{
		    //$('#selCategories').get(0).selectedIndex=0;
			 //$('#selRole').get(0).selectedIndex=0;
		     $('#selSubRole').get(0).selectedIndex=0;
		     $('#selRRole').get(0).selectedIndex=0;
			 $('#selSubject').get(0).selectedIndex=0;

		}
		else if (SeldrpID == 'Subject')
		{
			$('#selCategories').get(0).selectedIndex=0;
			$('#selRole').get(0).selectedIndex=0;
		    //$('#selSubRole').get(0).selectedIndex=0;
		    $('#selRRole').get(0).selectedIndex=0;
			//$('#selSubject').get(0).selectedIndex=0;

		}
		else if (SeldrpID == 'RRole')
		{
			$('#selCategories').get(0).selectedIndex=0;
			$('#selRole').get(0).selectedIndex=0;
		    $('#selSubRole').get(0).selectedIndex=0;
		    // $('#selRRole').get(0).selectedIndex=0;
			$('#selSubject').get(0).selectedIndex=0;

		}

if(Position!='Next')
	{
	actualCount-=Fullcount;
	actualCount-=5;
	}
	var listNext=0;
    
 searchQuery=GenerateQuery(Position,currID);
 
debugger;

var totalItems = 0;
 $().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		listName : oTrainingsList, // List Name
		 CAMLViewFields: "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /><FieldRef Name='LinkTitle' /><FieldRef Name='Colleges' /><FieldRef Name='Format1' /><FieldRef Name='Objective' /><FieldRef Name='LinkForTraining' /><FieldRef Name='Training_x0020_Type' /><FieldRef Name='Categories' /><FieldRef Name='Role' /> </ViewFields>",
		CAMLQuery : searchQuery,
		completefunc : function (xData, Status) {
			alert(xData.responseText);
			if (xData.status == 200) {
				totalItems = $(xData.responseXML).SPFilterNode("rs:data").attr('ItemCount');
				
				$(xData.responseXML).SPFilterNode("z:row").each(function (i) {
					
					//var new_obj = {'itmid':"vij"};
					
					if ($(this).attr("ows_ID") != null)
						var itmid = $(this).attr("ows_ID");
					else
						var itmid = "";

					if ($(this).attr("ows_Title") != null)
						var itmTitle = $(this).attr("ows_Title");
					else
						var itmTitle = "";

					if ($(this).attr("ows_LinkTitle") != null)
						var itmLinkTitle = $(this).attr("ows_LinkTitle");
					else
						var itmLinkTitle = "";

					if ($(this).attr("ows_Colleges") != null)
						var itmColleges = $(this).attr("ows_Colleges");
					else
						var itmColleges = "";

					if ($(this).attr("ows_Format1") != null)
						var itmFormat1 = $(this).attr("ows_Format1");
					else
						var itmFormat1 = "";

					if ($(this).attr("ows_Objective") != null)
						var itmObjective = $(this).attr("ows_Objective");
					else
						var itmObjective = "";

					if ($(this).attr("ows_LinkForTraining") != null)
						var itmLinkForTraining = $(this).attr("ows_LinkForTraining");
					else
						var itmLinkForTraining = "";

					if ($(this).attr("ows_Training_x0020_Type") != null)
						var itmTraining = $(this).attr("ows_Training_x0020_Type");
					else
						var itmTraining = "";

					if ($(this).attr("ows_Categories") != null)
						var itmCategories = $(this).attr("ows_Categories");
					else
						var itmCategories = "";

					if ($(this).attr("ows_Role") != null)
						var itmRole = $(this).attr("ows_Role");
					else
						var itmRole = "";
						
					
					var new_obj = {
						"itmid" : itmid,
						"itmTitle" : itmTitle,
						"itmLinkTitle" : itmLinkTitle,
						"itmColleges" : itmColleges,
						"itmFormat1" : itmFormat1,
						"itmObjective" : itmObjective,
						"itmLinkForTraining" : itmLinkForTraining,
						"itmTraining" : itmTraining,
						"itmCategories" : itmCategories,
						"itmRole" : itmRole
					};
					
					spfiles.push(new_obj);
				});
	
			} else {
				alert(xData.status);
			}
		}
	});
	
	mainload();
	
	// old style program
  /*
     $().SPServices({
    operation: "GetListItems",
    async: false,
    listName: oTrainingsList,
    CAMLQuery:searchQuery,
    CAMLViewFields: "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /><FieldRef Name='LinkTitle' /><FieldRef Name='Colleges' /><FieldRef Name='Format1' /><FieldRef Name='Objective' /><FieldRef Name='LinkForTraining' /><FieldRef Name='Training_x0020_Type' /><FieldRef Name='Categories' /><FieldRef Name='Role' /> </ViewFields>",
    CAMLRowLimit:5,
    completefunc: function(xData,Status){

	if($(xData.responseXML).SPFilterNode("rs:data").attr('ListItemCollectionPositionNext')!=null)    
	 listNext=$(xData.responseXML).SPFilterNode("rs:data").attr('ListItemCollectionPositionNext');

   	Fullcount=$(xData.responseXML).SPFilterNode("z:row").length;
   	var responseArray;
   	if(Position=='Previous')
   	responseArray=sortArray($(xData.responseXML).SPFilterNode("z:row"));
   	else
   	responseArray=$(xData.responseXML).SPFilterNode("z:row");
   	
	var table='';
	
	if(Fullcount!=0){
	//Give this code for function if needed btn's..........
	table ="<table width='100%' bgcolor='#e2e2e2' cellspacing='2px' cellpadding='2px'><tr><td bgcolor=white><table>";
		
	$.each(responseArray,function(i) {
 	var bgColor="#ffffff";
 	if(i==0)
 	strtID=$(this).attr("ows_ID");
 	
 	if(i==Fullcount-1)
 	endID=$(this).attr("ows_ID");
 		
	if(i%2!=0)
	bgColor="#e5e5e5";
	
	if(!$(this).attr("ows_LinkTitle"))
	lnTitle="";
	else
	lnTitle=$(this).attr("ows_LinkTitle");
	
	if(!$(this).attr("ows_Colleges"))
	colleges="";
	else
	colleges=$(this).attr("ows_Colleges");
	if(!$(this).attr("ows_Objective"))
	objective="";
	else
	objective=$(this).attr("ows_Objective");
	
	if(!$(this).attr("ows_LinkForTraining"))
	trainingLink="";
	else
	trainingLink=$(this).attr("ows_LinkForTraining");
	
	table += "<tr><td>";	

	innerTbl="<table width='100%' cellspacing='0px' cellpadding='0px'><tr>"
	if(trainingLink!="")
	innerTbl+="<td class='itemTitle'><a href='"+trainingLink.split(',')[0]+"' target='_blank'>"+colleges+"</a></td></tr>"
	else
	innerTbl+="<td class='itemTitle' >"+colleges+"</td></tr>";
	
	innerTbl+="<tr><td class='itemTitle' style='padding-top:5px;font-weight:normal;color:black;line-height:120%''>"+objective+"</td></tr>";
	if(!$(this).attr("ows_Format1"))
	innerTbl+="<tr><td line-height:200%'><span class='info2'>Power:</span>&nbsp;&nbsp;<span class='info3'>"+$(this).attr("ows_Categories").split("#")[1]+"</span>&nbsp;&nbsp;<span class='info2'>Format:</span>&nbsp;&nbsp;<span class='info3'></span></td>"
	else if($(this).attr("ows_Format1").indexOf(";#")!=-1)
	{
	var formats=$(this).attr("ows_Format1").split(';#');
	var formatCount=formats.length-1;
	var format='';
	for(i=0;i<formatCount;i++)
	{
		if(formats[i]!="")
		format+=formats[i]+', ';
		else
		format+=formats[i];
	}
	format=format.substring(0,format.length-2)
	innerTbl+="<tr><td line-height:200%'><span class='info2'>Power:</span>&nbsp;&nbsp;<span class='info3'>"+$(this).attr("ows_Categories").split("#")[1]+"</span>&nbsp;&nbsp;<span class='info2'>Format:</span>&nbsp;&nbsp;<span class='info3'>"+format+"</span></td>"
	}
	else
	innerTbl+="<tr><td line-height:200%'><span class='info2'>Power:</span>&nbsp;&nbsp;<span class='info3'>"+$(this).attr("ows_Categories").split("#")[1]+"</span>&nbsp;&nbsp;<span class='info2'>Format:</span>&nbsp;&nbsp;<span class='info3'>"+$(this).attr("ows_Format1")+"</span></td>"
	//alert($(this).attr("ows_Format1"))
	var roleArray=$(this).attr("ows_Role").split(';#');
	var roleCount=roleArray.length;
	var roles="";
	$.each(roleArray,function(i){
	if((i+1)%2==0){
	roles+="<a href='javascript:void(0)' onclick='getSelRole(&quot;"+roleArray[i-1]+"&quot;)'>"+roleArray[i]+"</a>";
	if((i+1)!=roleCount)
	roles+=", ";
	}
	
	})
	
	if($(this).attr("ows_Role")=="0;#")
	innerTbl+="<tr><td line-height:200%'><span class='info2'> Role:</span>&nbsp;&nbsp;<span class='info3'> None</span>&nbsp;&nbsp;   <span class='info2'> Category:</span>&nbsp;&nbsp;<span class='info3'>"+$(this).attr("ows_Training_x0020_Type").split("#")[1]+"</span> </td></tr></table>";
	else
	innerTbl+="<tr><td line-height:200%'><span class='info2'> Role:</span>&nbsp;&nbsp;<span class='info3'>"+roles+"</span> &nbsp;&nbsp;  <span class='info2'> Category:</span>&nbsp;&nbsp;<span class='info3'>"+$(this).attr("ows_Training_x0020_Type").split("#")[1]+"</span> </td></tr></table>";
	
	table +=innerTbl+"</td></tr><tr><td height='5px'></td></tr>";
		 if(i!=Fullcount-1)
		table +="<tr><td height='1px' bgcolor='#e2e2e2'></td></tr>";
	
	});
	//....End of table construction.....
	}
	
	else
	table +="<table width='100%' bgColor='#c4c5c6' border='0' cellSpacing='0' align='center' cellPadding='0'><tr><td align=center class='norTxt' style='padding-left: 5px;' bgColor='#ffffff'>No Learning Resources Found...</td></tr>";
	

	
	table += "</table></td></tr></table>";
	
	

	var pagetable ="";
	
	if((actualCount==0 && listNext!=0)||(actualCount==0 && endID<MaxID) )
	pagetable +="<table width='100%' border='0' cellSpacing='0' align='center' cellPadding='0'><tr><td class='itemTitle' style='14px;color:#70655e'> Results : "+(actualCount+1)+" - "+(actualCount+Fullcount)+" of "+totalItems+"</td><td align=right class='norTxt' style='padding: 5px;'><a href='javascript:void(0)' onclick='QueryStatus=true;searchResults(&quot;Next&quot;,&quot;"+endID+"&quot;);QueryStatus=false;'>Next</a></td></tr><tr><td height=3px></td></tr></table>";
	else if(actualCount!=0 && listNext==0 )
	pagetable +="<table width='100%' border='0' cellSpacing='0' align='center' cellPadding='0'><tr><td class='itemTitle' style='14px;color:#70655e'> Results : "+(actualCount+1)+" - "+(actualCount+Fullcount)+" of "+totalItems+"</td><td align=right class='norTxt' style='padding: 5px;'><a href='javascript:void(0)' onclick='QueryStatus=true;searchResults(&quot;Previous&quot;,&quot;"+strtID+"&quot;);QueryStatus=false;'>Previous</a></td></tr><tr><td height=3px></td></tr></table>";
	else if(actualCount!=0 && listNext!=0 && endID!=MaxID)
	pagetable +="<table width='100%' border='0' cellSpacing='0' align='center' cellPadding='0'><tr><td class='itemTitle' style='14px;color:#70655e'> Results : "+(actualCount+1)+" - "+(actualCount+Fullcount)+" of "+totalItems+"</td><td align=right class='norTxt' style='padding: 5px;'><a href='javascript:void(0)' onclick='QueryStatus=true;searchResults(&quot;Previous&quot;,&quot;"+strtID+"&quot;);QueryStatus=false;'>Previous</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' onclick='QueryStatus=true;searchResults(&quot;Next&quot;,&quot;"+endID+"&quot;);QueryStatus=false;'>Next</a></td></tr><tr><td height=3px></td></tr></table>";



	if(trainigID==0)
	trainigID=strtID;
	if(pagetable=="" && Fullcount!=0)
	pagetable +="<table width='100%' border='0' cellSpacing='0' align='center' cellPadding='0'><tr><td class='itemTitle' style='14px;color:#70655e'> Results : 1 - "+Fullcount+" of "+totalItems+"</td></tr><tr><td>&nbsp;</td></tr></table>";
	
	table=pagetable +table+pagetable ;

	$("#tdResult").html(table );
	
	
	$("#tdSelTitle").text(TrainingTitle);
	}
	});

	//end of the old style Navigation

	actualCount+=Fullcount;
	
	$('#tdResult').find('a').each(function () {
		var href = $(this).attr('href');
		var target = "";
		if ($(this).attr('target'))
			var target = $(this).attr('target')

				if (href != null) {
					if (href.indexOf('#') < 0) {
						if ((href.indexOf('/sites/cbdglobal/') < 0) && (href.indexOf('/sites/cbdcareers/') < 0)) {
							if (target == "" && href.indexOf('javascript') < 0)
								$(this).attr('target', '_blank');
						}
					}
				}
	});
	
	*/
 }

 function sortArray(trainingArray)
 {
 var count=trainingArray.length;
 var x=count-1;
 var sortedArray=new Array(count);
 $.each(trainingArray,function(i)
 {
 sortedArray[x]=$(this);
 x--; 
 })
 return sortedArray;
 }
 
 function GetMaxId()
 {
 	 $().SPServices({
  		  operation: "GetListItems",
    		async: false,
   			listName: oTrainingsList,
    		CAMLQuery:MaxValueQuery,
    		completefunc: function(xData,Status){
    						var count=$(xData.responseXML).SPFilterNode("z:row").length;
    		 $(xData.responseXML).SPFilterNode("z:row").each(function(i) {
			if(i==0)
    		 MaxID=$(this).attr('ows_ID');
    		 if(i==count-1)
    		 leastID=$(this).attr('ows_ID');
    		 
    		 });
    		}
    		});
 }
 

 var spfiles = [];
 var i = -1;
 var t = "";
 var k = 0;
 var PageNo = 0;

 function mainload() {
 debugger
 	t = spfiles.length - 1;
 	var start = PageNo * 5;
 	var end = start + 5;
 	var str = "";
	var tbl="<table>"; 
 	for (var j = start; j < end; j++) {
 		if (j <= t) {
			tbl+="<tr><td>";
			tbl+="<table id='innerTbl'>";
 			tbl+="<tr><td class='itemTitle'><a href='#' target='_blank'>"+spfiles[j].itmColleges+"</a></td></tr>";
			tbl+="</table>";
			tbl+="</td></tr>";
 		}
 	}
	tbl+="</table>";
	var mainTable="<table><tr><td bgcolor=white>"+tbl+"</td></tr></table>";
		
	$("#tdResult").html(mainTable);
 }