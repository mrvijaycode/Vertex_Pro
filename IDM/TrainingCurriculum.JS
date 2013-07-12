var CATE='';
var lists;
var trainingTitle=new Array();
var trainingSubSection=new Array();
var trainingItemType=new Array();
var trainingID=new Array();
var trainingCourse=new Array();
var trainingSubHead=new Array();
var trainingMandatory=new Array();
var courseAvailable=new Array();
var trainingCategory=new Array();
var tcells;
var catName='';
//debugger
function LoadTraining()
{
	var urlpath=window.location.href;
	var qryStrPos=urlpath.indexOf('?id=');
	catName=urlpath.substring(qryStrPos+4);
	CATE=catName;
	lists=new SPAPI_Lists('http://teamspace.pg.com/sites/idm');
	//var query = "<Query><Where><Eq><FieldRef Name='Category' /><Value Type='Choice'>"+catName+"</Value></Eq></Where></Query>";
	//var lstDetails=lists.getListItems('Training Details','',query,'','','','');
	var lstDetails=lists.getListItems('Training Details','','','','','','');
	//alert(lstDetails.responseText);
	var rows = lstDetails.responseXML.getElementsByTagName('z:row');
	if(rows.length > 0)
	{
		for(var rNo=0; rNo<rows.length;rNo++)
		{
			trainingTitle[rNo]=rows[rNo].getAttribute('ows_LinkTitle');
			trainingSubSection[rNo]=rows[rNo].getAttribute('ows_SubSection');
			trainingCourse[rNo]=rows[rNo].getAttribute('ows_CourseLevel');
			trainingCategory[rNo]=rows[rNo].getAttribute('ows_Category');
			trainingItemType[rNo]=rows[rNo].getAttribute('ows_ItemType');
			trainingID[rNo]=rows[rNo].getAttribute('ows_ID');
			if(rows[rNo].getAttribute('ows_SubHead')!= null)
			trainingSubHead[rNo]=rows[rNo].getAttribute('ows_SubHead');
			else
			trainingSubHead[rNo]=0;
			if(rows[rNo].getAttribute('ows_MandatoryCourses')!= null)
			trainingMandatory[rNo]=rows[rNo].getAttribute('ows_MandatoryCourses');
			else
			trainingMandatory[rNo]="No Course Selected";
			if(rows[rNo].getAttribute('ows_CourseAvailability')!= null)
			courseAvailable[rNo]=rows[rNo].getAttribute('ows_CourseAvailability');
			else
			courseAvailable[rNo]="No";
		}
	}
	getLinksnRollovers(catName);// to get SubItems of MainItems(i.e Lable).
}

var trnBasicPM="";
var trnBasicBOrg="";
var trnBasicSucDrivers="";
var trnIntermediatePM="";
var trnIntermediateBOrg="";
var trnIntermediateSucDrivers="";
var trnAdvancedPM="";
var trnAdvancedBOrg="";
var trnAdvancedSucDrivers="";
var trnMasterPM="";
var trnMasterBOrg="";
var trnMasterSucDrivers="";

var tblTraining="";

var coachBasic="";
var coachIntermediate="";
var coachAdvanced="";
var coachMaster="";

function getLinksnRollovers(catName)
{
	hideNenableTabs();
	CATE=catName;
	tblTraining = document.getElementById('{D659FA9D-7489-422F-8F71-F67326D03D26}-{922FA459-81DF-4281-8CA0-953A05426DD9}');
	if(tblTraining!=null)
	{
		var trows = tblTraining.getElementsByTagName('tr');
		var rowCount=trows.length;
		var divText = document.getElementById('divTextbox');
		if(catName == "Training")
		{
			trnBasicPM=getValues(catName,"Basic","Professional Mastery");
			trnBasicBOrg=getValues(catName,"Basic","Business and Org Understanding");
			trnBasicSucDrivers=getValues(catName,"Basic","Success Drivers");
			trnIntermediatePM=getValues(catName,"Intermediate","Professional Mastery");
			trnIntermediateBOrg=getValues(catName,"Intermediate","Business and Org Understanding");
			trnIntermediateSucDrivers=getValues(catName,"Intermediate","Success Drivers");
			trnAdvancedPM=getValues(catName,"Advanced","Professional Mastery");
			trnAdvancedBOrg=getValues(catName,"Advanced","Business and Org Understanding");
			trnAdvancedSucDrivers=getValues(catName,"Advanced","Success Drivers");
			trnMasterPM=getValues(catName,"Master","Professional Mastery");
			if(trnMasterPM == '')
				trnMasterPM="<tr><td class='trainingRollOver'><span>No specific training has been identified for Master PMs.<br/><br/>However, maintaining the PMI certification requires 20 hours of professional development per year. These requirements can be met via participation in a wide range of PM related internal and external courses.</span></td></tr>"; 
			else
				trnMasterPM=getValues(catName,"Master","Professional Mastery");
			trnMasterBOrg=getValues(catName,"Master","Business and Org Understanding");
			trnMasterSucDrivers=getValues(catName,"Master","Success Drivers");
		}
		else
		{
			coachBasic=getCoachValues(catName,"Basic");
			coachIntermediate=getCoachValues(catName,"Intermediate");
			coachAdvanced=getCoachValues(catName,"Advanced");
			coachMaster=getCoachValues(catName,"Master");
		}
	}
	
	var tblMatrix =  document.getElementById('tblTrainingMatrix');
	if(catName =="Training")
	{
		
		var ctable="<table cellpadding='0' cellspacing='0' border='0' width='100%'>";
		ctable+="<tr style='background-color: #006fc1;line-height:20px;'>";
		ctable+="<td style='width:17%;background-color: #ffffff;'><span>&nbsp;</td>"
		ctable+="<td style='width:19%;color:white;font-weight:bold;font-size:12px;' align='center'><span>Basic</td>"
		ctable+="<td style='width:19%;color:white;font-weight:bold;font-size:12px;' align='center'><span>Intermediate</span></td>";
		ctable+="<td style='width:20%;color:white;font-weight:bold;font-size:12px;' align='center'><span>Advanced</span></td>";
		ctable+="<td style='color:white;font-weight:bold;font-size:12px;' align='center'><span>Master</span></td>";
		//ctable+="<td><span>
		ctable+="</tr>";
		ctable+="</table>";
		
		ctable+="<table cellpadding='0' cellspacing='0' border='0' width='100%'>";
		ctable+="<tr style='line-height:10px;'><td>&nbsp;</td></tr>";		
		
		ctable+="<tr>";
		ctable+="<td valign='top'>";
		ctable+="<table cellpadding='0' cellspacing='0' border='0' width='100%'>";
		var TrnBasic="<tr><td valign='top' style='width:17%;padding-left:15px;'><b><span style='color:#0b70b7;'>Professional Mastery</span></b><br/>-Scope<br/>-Time<br/>-Cost/Financials<br/>-Risk<br/>-Communication<br/>-Integration</td><td valign='top'  style='width:20%;padding-left:10px;' bgColor='#cff0fb'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnBasicPM+"</table></td>";
		TrnBasic+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";
		TrnBasic+="<td valign='top' style='width:20%;padding-left:10px;padding-bottom:10px;' bgColor='#cff0fb'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnIntermediatePM+"</table></td>";
		TrnBasic+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";
		TrnBasic+="<td valign='top' style='width:20%;padding-left:10px;padding-bottom:10px;' bgColor='#cff0fb'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnAdvancedPM+"</table></td>";
		TrnBasic+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";
		TrnBasic+="<td valign='top' style='width:19%;padding-left:10px;padding-bottom:10px;' bgColor='#cff0fb'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnMasterPM+"</table></td>";
		TrnBasic+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td></tr>";
		ctable+=TrnBasic;
		ctable+="</table></td></tr>";
		
		ctable+="<tr style='line-height:10px;'><td>&nbsp;</td></tr>";
		
		ctable+="<tr>";
		ctable+="<td valign='top'>";
		ctable+="<table cellpadding='0' cellspacing='0' border='0' width='100%'>";
		var TrnIntermediate="<tr><td valign='top'  style='width:17%;padding-left:15px;'><b><span style='color:#0b70b7;'>Business & Organizational Understanding</span></b></td><td valign='top' style='width:20%;padding-left:10px;' bgColor='#cff0fb'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnBasicBOrg+"</table></td>";
		TrnIntermediate+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";
		TrnIntermediate+="<td valign='top' style='width:20%;padding-left:10px;padding-bottom:10px;' bgColor='#cff0fb'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnIntermediateBOrg+"</table></td>";
		TrnIntermediate+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";
		TrnIntermediate+="<td valign='top' style='width:20%;padding-left:10px;padding-bottom:10px;' bgColor='#cff0fb'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnAdvancedBOrg+"</table></td>";
		TrnIntermediate+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";
		
		if(trnMasterBOrg != '')
		TrnIntermediate+="<td valign='top' style='width:19%;padding-left:10px;padding-bottom:10px;' bgColor='#cff0fb'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnMasterBOrg+"</table></td>";
		else
		TrnIntermediate+="<td valign='top' style='border:#000000 1px solid;width:19%;padding-left:10px;' ><table style='display:none' cellpadding='0' cellspacing='0' border='0' width='100%'><tr><td class='trainingRollOver' style='padding-top:5px;'><span style='text-decoration:underline'>Course Availability</span><br/><br/><span style='font-weight:bold;'>Bold- course available now</span><br/><br/><span style='font-style:italic;color:blue'>Blue Italics - courses in pilot for 2010</span><br/><br/><span style='color:gray;'>Grey - Future plans</span></td></tr></table></td>";
		
		TrnIntermediate+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td></tr>";
		ctable+=TrnIntermediate;
		ctable+="</table></td></tr>";

		ctable+="<tr style='line-height:10px;'><td>&nbsp;</td></tr>";

		ctable+="<tr>";
		ctable+="<td valign='top'>";
		ctable+="<table cellpadding='0' cellspacing='0' border='0' width='100%'>";
		var TrnBasic="<tr><td valign='top' style='width:17%;padding-left:15px;'><b><span style='color:#0b70b7;'>Success Drivers</span></b> <br/>-Leads<br/>-Forms Collaborative Relationships<br/>-Thinks & Acts Decisively<br/>-Operates with Discipline</td><td valign='top'  style='width:20%;padding-left:10px;' bgColor='#cff0fb'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnBasicSucDrivers+"</table></td>";
		TrnBasic+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";
		TrnBasic+="<td valign='top' style='width:20%;padding-left:10px;padding-bottom:10px;' bgColor='#cff0fb'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnIntermediateSucDrivers+"</table></td>";
		TrnBasic+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";
		TrnBasic+="<td valign='top' style='width:20%;padding-left:10px;padding-bottom:10px;' bgColor='#cff0fb'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnAdvancedSucDrivers+"</table></td>";
		TrnBasic+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";
		if(trnMasterSucDrivers != '')
		TrnBasic+="<td valign='top' style='width:19%;padding-left:10px;padding-bottom:10px;' bgColor='#cff0fb'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnMasterSucDrivers+"</table></td>";
		else
		TrnBasic+="<td valign='top' style='width:19%;padding-left:10px;'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+trnMasterSucDrivers+"</table></td>";
		TrnBasic+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td></tr>";
		ctable+=TrnBasic;
		ctable+="</table></td></tr></table>";
		
	}
	
	else
	{
		var bgColValue='';
		var ctable="<table cellpadding='0' cellspacing='0' border='0' width='100%'>";

		if(catName == "Coaching")
		{
			bgColValue="#edf5df";
			ctable+="<tr style='background-color: #10a355;line-height:20px;'>";
		}
		else
		{
			bgColValue="#fffaed";
			ctable+="<tr style='background-color: #ef8d2a;line-height:20px;'>";
		}
		
		//ctable+="<td style='width:18%'><span>&nbsp;</td>"
		ctable+="<td style='width:25%;color:white;font-weight:bold;font-size:12px;' align='center'><span>Basic</td>"
		ctable+="<td style='width:25%;color:white;font-weight:bold;font-size:12px;' align='center'><span>Intermediate</span></td>";
		ctable+="<td style='width:25%;color:white;font-weight:bold;font-size:12px;' align='center'><span>Advanced</span></td>";
		ctable+="<td style='width:25%;color:white;font-weight:bold;font-size:12px;' align='center'><span>Master</span></td>";
		//ctable+="<td><span>
		ctable+="</tr>";
		ctable+="</table>";
		
		ctable+="<table cellpadding='0' cellspacing='0' border='0' width='100%'>";

		ctable+="<tr style='line-height:10px;'><td>&nbsp;</td></tr>";
		
		ctable+="<tr>";
		ctable+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";

		ctable+="<td valign='top' style='width:24%;' bgColor="+bgColValue+">";
		ctable+="<table cellpadding='0' cellspacing='0' border='0' width='100%'>";
		var catBasic="<tr><td valign='top'  style='width:25%;padding-left:10px;padding-bottom:10px;'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+coachBasic+"</table></td>";
		ctable+=catBasic;
		ctable+="</table></td>";
		
		ctable+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";
		
		ctable+="<td valign='top' style='width:24%;' bgColor="+bgColValue+">";
		ctable+="<table cellpadding='0' cellspacing='0' border='0' width='100%'>";
		var catIntermediate="<tr><td valign='top'  style='width:25%;padding-left:10px;padding-bottom:10px;'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+coachIntermediate+"</table></td>";
		ctable+=catIntermediate;
		ctable+="</table></td>";

		ctable+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";
		
		ctable+="<td valign='top' style='width:24%;' bgColor="+bgColValue+">";
		ctable+="<table cellpadding='0' cellspacing='0' border='0' width='100%'>";
		var catAdvanced="<tr><td valign='top'  style='width:25%;padding-left:10px;padding-bottom:10px;'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+coachAdvanced+"</table></td>";
		ctable+=catAdvanced;
		ctable+="</table></td>";

		ctable+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td>";

		ctable+="<td valign='top' style='width:23%;' bgColor="+bgColValue+">";
		ctable+="<table cellpadding='0' cellspacing='0' border='0' width='100%'>";
		var catMaster="<tr><td valign='top'  style='width:25%;padding-left:10px;padding-bottom:10px;'><table cellpadding='0' cellspacing='0' border='0' width='100%'>"+coachMaster+"</table></td>";
		ctable+=catMaster;
		ctable+="</table></td>";
		
		ctable+="<td valign='top' style='width:1%' bgColor='#ffffff'>&nbsp;</td></tr>";

		ctable+="</table>";
		
		
		ctable+="<table cellpadding='0' cellspacing='0' border='0' width='25%' align='right'>";
		ctable+="<tr style='line-height:15px'><td>&nbsp;</td></tr>";
		ctable+="<tr><td style='width:1%'>&nbsp;</td>";
		ctable+="<td valign='top' style='width:23%;padding-left:10px;border:#000000 1px solid;'><table style='display:none' cellpadding='0' cellspacing='0' border='0' width='100%'><tr><td class='trainingRollOver' style='padding-top:5px;'><span style='text-decoration:underline'>Course Availability</span><br/><br><span style='font-weight:bold;'>Bold- course available now</span><br/><br/><span style='font-style:italic;color:blue'>Blue Italics - courses in pilot for 2010</span><br/><br/><span style='color:gray;'>Grey - Future plans</span></td></tr></table></td>";
		ctable+="<td style='width:1%'>&nbsp;</td></tr></table>";
	}
	//tblMatrix.innerHTML ="<table width='100%'>"+TrainingHTML+"</table>" ;
	tblMatrix.innerHTML =ctable ;
}

var ctext='';
function getValues(category,courseLevel,subsection)
{
//debugger
	var trows = tblTraining.getElementsByTagName('tr');
	var rowCount=trows.length;
	var itmLength=trainingID.length;
	ctext='';
	for(var itm=0; itm<itmLength;itm++)
	{
		if(trainingCategory[itm] == category)
		{
			if(trainingCourse[itm] == courseLevel)
			{	
				if(trainingSubSection[itm] ==subsection)
				{
					if(trainingItemType[itm]=="Label")
					{
						var courseNo=fetchCourses(trainingMandatory[itm]);	
						var itmExists=0;
						var lblExists=0;
						if((courseNo == "7")||(courseNo == "6")||(courseNo == "5")||(courseNo == "4")||(courseNo == "3")||(courseNo == "2")||(courseNo == "1"))
							fetchlblDetails(courseAvailable[itm],trainingTitle[itm],itmExists,courseNo,trainingID[itm],lblExists);
						else
							fetchlblDetails(courseAvailable[itm],trainingTitle[itm],itmExists,courseNo,trainingID[itm],lblExists);
					}	
					
					else if((trainingItemType[itm]=="Roll Over")&&(trainingSubHead[itm] ==0))
					{
						var courseNo=fetchCourses(trainingMandatory[itm]);
						var itmExists=1;
						var lblExists=1;
						if((courseNo == "7")||(courseNo == "6")||(courseNo == "5")||(courseNo == "4")||(courseNo == "3")||(courseNo == "2")||(courseNo == "1"))
							fetchlblDetails(courseAvailable[itm],trainingTitle[itm],itmExists,courseNo,trainingID[itm],lblExists);
						else
							fetchlblDetails(courseAvailable[itm],trainingTitle[itm],itmExists,courseNo,trainingID[itm],lblExists);
					}
		
					if(rowCount != 0)
					{
						for(var sr=11;sr<rowCount;sr++) // to get aLEBELS[j] related subItems.
						{
							tcells = trows[sr].getElementsByTagName('TD');
							if(tcells[7].innerText==trainingTitle[itm])// if subItem's SubHead is equal to Item Title
							{
								if(tcells[7].innerText!=" ") // if ItemInfo is empty we need to hide the div.
								{
									var courseIndex=fetchCourses(tcells[8].innerText);
									var itemExists=1;
									var cAvail=tcells[9].innerText;
									var cTitle=tcells[1].innerText;
									var cID=tcells[10].innerText;
									var lblExists=0;
									if((courseIndex == "7")||(courseIndex == "6")||(courseIndex == "5")||(courseIndex == "4")||(courseIndex == "3")||(courseIndex == "2")||(courseIndex == "1"))
										fetchlblDetails(cAvail,cTitle,itemExists,courseIndex,cID,lblExists);
									else
										fetchlblDetails(cAvail,cTitle,itemExists,courseIndex,cID,lblExists);
										//getDetails(courseIndex,itemExists);
								}
								else
								{
									var courseIndex=fetchCourses(tcells[8].innerText);
									var itemExists=0;
									var cAvail=tcells[9].innerText;
									var cTitle=tcells[1].innerText;
									var cID=tcells[10].innerText;
									var lblExists=0;
									if((courseIndex == "7")||(courseIndex == "6")||(courseIndex == "5")||(courseIndex == "4")||(courseIndex == "3")||(courseIndex == "2")||(courseIndex == "1"))
										fetchlblDetails(cAvail,cTitle,itemExists,courseIndex,cID,lblExists);
									else
										fetchlblDetails(cAvail,cTitle,itemExists,courseIndex,cID,lblExists);
								}
							}
						}
					}
				}
			}
		}
	}
	return ctext;
}


function getCoachValues(category,courseLevel)
{
	var trows = tblTraining.getElementsByTagName('tr');
	var rowCount=trows.length;
	var itmLength=trainingID.length;
	ctext='';
	
	
	for(var itm=0; itm<itmLength;itm++)
	{
		if(trainingCategory[itm] == category)
		{
			if(trainingCourse[itm] == courseLevel)
			{
				if(trainingItemType[itm]=="Label")
				{
					var courseNo=fetchCourses(trainingMandatory[itm]);	
					var itmExists=0;
					var lblExists=0;
					if((courseNo == "7")||(courseNo == "6")||(courseNo == "5")||(courseNo == "4")||(courseNo == "3")||(courseNo == "2")||(courseNo == "1"))
					fetchlblDetails(courseAvailable[itm],trainingTitle[itm],itmExists,courseNo,trainingID[itm],lblExists);
					else
					fetchlblDetails(courseAvailable[itm],trainingTitle[itm],itmExists,courseNo,trainingID[itm],lblExists);
				}
				else if((trainingItemType[itm]=="Roll Over")&&(trainingSubHead[itm] ==0))
				{
					var courseNo=fetchCourses(trainingMandatory[itm]);	
					var itmExists=1;
					var lblExists=1;
					if((courseNo == "7")||(courseNo == "6")||(courseNo == "5")||(courseNo == "4")||(courseNo == "3")||(courseNo == "2")||(courseNo == "1"))
					fetchlblDetails(courseAvailable[itm],trainingTitle[itm],itmExists,courseNo,trainingID[itm],lblExists);
					else
					fetchlblDetails(courseAvailable[itm],trainingTitle[itm],itmExists,courseNo,trainingID[itm],lblExists);
				}
				
				if(rowCount != 0)
				{
					for(var sr=11;sr<rowCount;sr++) // to get aLEBELS[j] related subItems.
					{
						tcells = trows[sr].getElementsByTagName('TD');
						if(tcells[7].innerText==trainingTitle[itm])// if subItem's SubHead is equal to Item Title
						{
							if(tcells[7].innerText!=" ") // if ItemInfo is empty we need to hide the div.
							{
								var courseIndex=fetchCourses(tcells[8].innerText);
								var itemExists=1;
								var cAvail=tcells[9].innerText;
								var cTitle=tcells[1].innerText;
								var cID=tcells[10].innerText;
								var lblExists=0;
								if((courseIndex == "7")||(courseIndex == "6")||(courseIndex == "5")||(courseIndex == "4")||(courseIndex == "3")||(courseIndex == "2")||(courseIndex == "1"))
									fetchlblDetails(cAvail,cTitle,itemExists,courseIndex,cID,lblExists);
								else
									fetchlblDetails(cAvail,cTitle,itemExists,courseIndex,cID,lblExists);
									//getDetails(courseIndex,itemExists);
							}
							else
							{
								var courseIndex=fetchCourses(tcells[8].innerText);
								var itemExists=0;
								var cAvail=tcells[9].innerText;
								var cTitle=tcells[1].innerText;
								var cID=tcells[10].innerText;
								var lblExists=0;
								if((courseIndex == "7")||(courseIndex == "6")||(courseIndex == "5")||(courseIndex == "4")||(courseIndex == "3")||(courseIndex == "2")||(courseIndex == "1"))
									fetchlblDetails(cAvail,cTitle,itemExists,courseIndex,cID,lblExists);
								else
									fetchlblDetails(cAvail,cTitle,itemExists,courseIndex,cID,lblExists);
							}
						}
					}
				}
			}
		}
	}
	return ctext;
}


function fetchlblDetails(cAvailabale,title,item,cNo,itemID,lblExists)
{
//debugger
	if(cNo =="7")
	{
		if(item == "0")
		{
			if(cAvailabale =="Course available now")
			ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;font-weight:bold' class='trainingRollOver'>"+title+"</span></td></tr>";
			else if(cAvailabale =="Courses in pilot for 2010")
			ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;color:blue;font-style:italic;' class='trainingRollOver'>"+title+"</span></td></tr>";
			else 
			ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;color:gray;' class='trainingRollOver'>"+title+"</span></td></tr>";
		}
		else
		{
			if(lblExists == "1")
			{
				if(cAvailabale =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
			else
			{
				if(cAvailabale =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
		}
	}
	
	else if(cNo =="6")
	{
		if(item == "0")
		{
			if(cAvailabale =="Course available now")
			ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;font-weight:bold' class='trainingRollOver'  >"+title+"</span></td></tr>";
			else if(cAvailabale =="Courses in pilot for 2010")
			ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;color:blue;font-style:italic;' class='trainingRollOver'  >"+title+"</span></td></tr>";
			else 
			ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;color:gray;' class='trainingRollOver'  >"+title+"</span></td></tr>";
		}
		else
		{
			if(lblExists == "1")
			{
				if(cAvailabale =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
			else
			{
				if(cAvailabale =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
		}
	}
	
	else if(cNo == "5")
	{
		if(item == "0")
		{
			if(cAvailabale  =="Course available now")
			ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;font-weight:bold' class='trainingRollOver'>"+title+"</span></td></tr>";
			else if(cAvailabale =="Courses in pilot for 2010")
			ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;color:blue;font-style:italic;' class='trainingRollOver'>"+title+"</span></td></tr>";
			else 
			ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;color:gray;' class='trainingRollOver'>"+title+"</span></td></tr>";
		}
		else
		{
			if(lblExists == "1")
			{
				if(cAvailabale  =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
			else
			{
				if(cAvailabale  =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";

			}
		}
	}
	
	else if(cNo == "4")
	{
		if(item == "0")
		{
			if(cAvailabale  =="Course available now")
			ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;font-weight:bold' class='trainingRollOver'  >"+title+"</span></td></tr>";
			else if(cAvailabale =="Courses in pilot for 2010")
			ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;color:blue;font-style:italic;' class='trainingRollOver'  >"+title+"</span></td></tr>";
			else 
			ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;color:gray;' class='trainingRollOver'  >"+title+"</span></td></tr>";
		}
		else
		{
			if(lblExists == "1")
			{
				if(cAvailabale  =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
			else
			{
				if(cAvailabale  =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;<SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
		}
	}
	
	else if(cNo == "3")
	{
		if(item == "0")
		{
			if(cAvailabale =="Course available now")
			ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;font-weight:bold' class='trainingRollOver'  >"+title+"</span></td></tr>";
			else if(cAvailabale =="Courses in pilot for 2010")
			ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;color:blue;font-style:italic;' class='trainingRollOver'  >"+title+"</span></td></tr>";
			else 
			ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;color:gray;' class='trainingRollOver'  >"+title+"</span></td></tr>";
		}
		else
		{
			if(lblExists == "1")
			{
				if(cAvailabale =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;</span><span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;</span><span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;</span><span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
			else
			{
				if(cAvailabale =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/red_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
		}
	}
	
	else if(cNo =="2")
	{
		if(item == "0")
		{
			if(cAvailabale =="Course available now")
			ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;</span><span style='text-indent:10px;font-weight:bold;cursor:default' class='trainingRollOver'  >"+title+"</span></td></tr>";
			else if(cAvailabale=="Courses in pilot for 2010")
			ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;</span>&nbsp;<span></span><span style='text-indent:10px;color:blue;font-style:italic;cursor:default' class='trainingRollOver'  >"+title+"</span></td></tr>";
			else 
			ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;</span>&nbsp;<span></span><span style='text-indent:10px;color:gray;cursor:default' class='trainingRollOver'  >"+title+"</span></td></tr>";
		}
		else
		{
			if(lblExists == "1")
			{
				if(cAvailabale =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;</span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale=="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;</span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;</span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
			else
			{
				if(cAvailabale =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;</span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale=="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;</span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block; FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/blue_diamond_icon.png, sizingMethod=scale); WIDTH: 7px; HEIGHT: 10px'></SPAN>&nbsp;</span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
		}
	}
	
	else if(cNo == "1")
	{
		if(item == "0")
		{
			if(cAvailabale  =="Course available now")
			ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;font-weight:bold' class='trainingRollOver'  >"+title+"</span></td></tr>";
			else if(cAvailabale  =="Courses in pilot for 2010")
			ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;color:blue;font-style:italic;' class='trainingRollOver'  >"+title+"</span></td></tr>";
			else 
			ctext+="<tr><td style='padding-top:10px;'><span ><SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;color:gray;' class='trainingRollOver'  >"+title+"</span></td></tr>";
		}
		else
		{
			if(lblExists == "1")
			{
				if(cAvailabale  =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale  =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span><SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
			else
			{
				if(cAvailabale  =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;font-weight:bold' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else if(cAvailabale  =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:blue;font-style:italic;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
				else 
				ctext+="<tr><td style='padding-top:10px;'><span style='text-indent:20px;'><SPAN style='DISPLAY: inline-block;vertical-align:middle;FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://teamspace.pg.com/sites/idm/images/star_icon.png); WIDTH: 7px; HEIGHT: 7px'></SPAN></span>&nbsp;<span></span><span style='text-indent:10px;cursor:hand;color:gray;' class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\">"+title+"</span></td></tr>";
			}
		}
	}
	else
	{
		if(item == "0")
		{
			if(cAvailabale =="Course available now")
			ctext+="<tr><td style='padding-top:10px;'><span class='trainingRollOver'   style='font-weight:bold;' >"+title+"</span></td></tr>";
			else if(cAvailabale =="Courses in pilot for 2010")
			ctext+="<tr><td style='padding-top:10px;'><span class='trainingRollOver'   style='color:blue;font-style:italic;' >"+title+"</span></td></tr>";
			else if(cAvailabale == "Future Plans")
			ctext+="<tr><td style='padding-top:10px;'><span class='trainingRollOver'   style='color:gray;' >"+title+"</span></td></tr>";
			else
			ctext+="<tr><td style='padding-top:10px;'><span class='trainingRollOver'    >"+title+"</span></td></tr>";
		}
		else
		{
			if(lblExists == "1")
			{
				if(cAvailabale =="Course available now")
				ctext+="<tr><td style='padding-top:10px;'><span class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\" style='font-weight:bold;cursor:hand;' >"+title+"</span></td></tr>";
				else if(cAvailabale =="Courses in pilot for 2010")
				ctext+="<tr><td style='padding-top:10px;'><span class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\" style='color:blue;cursor:hand;font-style:italic;' >"+title+"</span></td></tr>";
				else if(cAvailabale == "Future Plans")
				ctext+="<tr><td style='padding-top:10px;'><span class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\" style='color:gray;cursor:hand;' >"+title+"</span></td></tr>";
				else
				ctext+="<tr><td style='padding-top:10px;'><span class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\" style='cursor:hand;' >"+title+"</span></td></tr>";
			}
			else
			{
				if(cAvailabale =="Course available now")
				ctext+="<tr><td style='text-indent:20px;padding-top:10px;'><span width='5px'>&nbsp;</span><span class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\" style='font-weight:bold;cursor:hand;' >"+title+"</span></td></tr>";
				else if(cAvailabale =="Courses in pilot for 2010")
				ctext+="<tr><td style='text-indent:20px;padding-top:10px;'><span width='5px'>&nbsp;</span><span class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\" style='color:blue;cursor:hand;font-style:italic;' >"+title+"</span></td></tr>";
				else if(cAvailabale == "Future Plans")
				ctext+="<tr><td style='text-indent:20px;padding-top:10px;'><span width='5px'>&nbsp;</span><span class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\" style='color:gray;cursor:hand;' >"+title+"</span></td></tr>";
				else
				ctext+="<tr><td style='text-indent:20px;padding-top:10px;'><span width='5px'>&nbsp;</span><span class='trainingRollOver' onclick=\"Fetch_Tooltip('"+itemID+"')\" style='cursor:hand;' >"+title+"</span></td></tr>";
			}
		}
	}
	
}

function fetchCourses(courseName)
{
	if((courseName.indexOf('Recommended to Commercial Leaders')!= -1)&&(courseName.indexOf('Required for ILs')!= -1)&&(courseName.indexOf('Required for Master level ILs')!= -1))
	var fCourse=7;
	else if((courseName.indexOf('Recommended to Commercial Leaders')!= -1)&&(courseName.indexOf('Required for ILs')!= -1))
	var fCourse=6;
	else if((courseName.indexOf('Recommended to Commercial Leaders')!= -1)&&(courseName.indexOf('Required for Master level ILs')!= -1))
	var fCourse=5;
	else if((courseName.indexOf('Required for ILs')!= -1)&&(courseName.indexOf('Required for Master level ILs')!= -1))
	var fCourse=4;
	else if(courseName.indexOf('Required for ILs')!= -1)
	var fCourse=3;
	else if(courseName.indexOf('Recommended to Commercial Leaders')!= -1)
	var fCourse=2;
	else if(courseName.indexOf('Required for Master level ILs')!= -1)
	var fCourse=1;
	else
	var fCourse=0;
		
	return fCourse;
}


function Fetch_Tooltip(id) //parameter description = itemInfo field  ie., roll over text 
{
	var desc ='';
	var spnAttachment='';
  	var tblTraining = document.getElementById('{D659FA9D-7489-422F-8F71-F67326D03D26}-{922FA459-81DF-4281-8CA0-953A05426DD9}');
	if(tblTraining!=null)
	{ 
		var trows = tblTraining.getElementsByTagName('tr');
		var rowlen=trows.length;
		 if(rowlen!=0) 
		 {
		  	for(var sr=11;sr<rowlen;sr++) 
			{
			  var tcells = trows[sr].getElementsByTagName('TD');
			//alert('tcells[8].innerText' + tcells[8].innerText)
			  if(id==tcells[10].innerText)
			  {
			   if(tcells[6].innerText!="")
			   {
			     desc = tcells[6].innerHTML;
			      MM_setTextOfLayer('divTextbox','',desc,spnAttachment);
   				  MM_showHideLayers('divTextbox','','show');
			   }
			   else
			   {
   				  MM_showHideLayers('divTextbox','','hidden');
			   }
			  }
			}
		 }
	}
}

// Temporary variables to hold mouse x-y pos.s
var tempX = 0
var tempY = 0

function MM_setTextOfLayer(objId,x,newText,spnAttachment) 
{ 
	//v9.0
  var alength = spnAttachment.length;
  var attachments ="";
 if(alength!=0)
 {
  attachments = "<font size='1px' style='font-family:Frutiger'>Attachments:</font><br>"
  for(var i=0; i<alength; i++)
  {
    var url = spnAttachment[i];
    attachments += "<a href="+spnAttachment[i] +" target='_blank'>"+url.substring(url.lastIndexOf('/')+1)+"</a>";
    attachments +="<br> ";
  }
 }  
  with (document) if (getElementById && ((obj=getElementById(objId))!=null))
    with (obj) innerHTML ="<span class='Close' style='padding-left:300px' align='right' ><a style='padding-left:250px' href=javascript:hidediv()>Close</a></span>"  + "<BR><div class='divText'  >" +newText+ "</div><BR>" +"<BR>" +"<span>"+attachments+"</span>";
  
  //var divText =  document.getElementById('divTextbox');
  // getMouseXY(event); // will capture the mouse location.
 
 //document.onmousemove= captureMousePosition;
 captureMousePosition(event);
 	/*
  if(screen.width==1024)
  {
     divText.style.left = (screen.width - 810);
  }
  else
  {
      divText.style.left = (screen.width - 930);
  }

  //divText.style.top = tempY; 
	divText.style.top = '250px'; 
	*/

}

// Main function to retrieve mouse x-y pos.s


function captureMousePosition(e) {

  var divText =  document.getElementById('divTextbox');

  if (IE) { // grab the x-y pos.s if browser is IE
    tempX = event.clientX + document.body.scrollLeft
    tempY = event.clientY + document.body.scrollTop
  } else {  // grab the x-y pos.s if browser is NS
    tempX = e.pageX
    tempY = e.pageY
  }  
  // catch possible negative values in NS4
  if (tempX < 0){tempX = 0}
  if (tempY < 0){tempY = 0}  
  // show the position values in the form named Show
  // in the text fields named MouseX and MouseY
  
	tempX=parseInt(tempX)+50;
	//alert("Temp.."+tempX);
	if(screen.width==1280)
	{
		if(tempX > 950)
		tempX=parseInt(tempX)-550;
	}
	else
	{
		if(tempX > 700)
		tempX=parseInt(tempX)-450;
	}
 	divText.style.left = tempX;
 	
 	tempY=parseInt(tempY)-50;
 	if(screen.width==1280)
	{
 		if(tempY > 750)
 		tempY=parseInt(tempY)-250;
 	}
 	else
 	{
 		if(tempY > 740)
 		tempY=parseInt(tempY)-150;
 		//alert("Temp.."+tempY);
 	}
 	
	divText.style.top=tempY;
	divText.style.width='330px';
  return true

}


function MM_showHideLayers() { //v9.0

  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}



function hidediv()
{
   var divText =  document.getElementById('divTextbox');
   divText.style.visibility = 'hidden';
}

function calendarNav()
{
	window.location.href='http://teamspace.pg.com/sites/IDM/RedesignedWebPages/Organization_Design_Career/People_Systems/TrainingCalendar.aspx';
}

function hideNenableTabs()
{
 //alert("Calling.."+cNAME);
  var Category = CATE;
  var trainingTab = document.getElementById('btnTrainTab');
  var coachingTab = document.getElementById('btnCoachingTab');
  var ExperienceTab = document.getElementById('btnExpTab');
  var CalendarTab=document.getElementById('btnCalendarTab');
  var cornerTab=document.getElementById('btnCornerTab');
  if(Category=='Coaching')
  {
    trainingTab.src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Blue_Btn.gif"; 
    coachingTab.src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Green_Btn_hover.gif"; 
    ExperienceTab.src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Org_Btn.gif"; 
    CalendarTab.src="http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/view_training_calendar.gif"; 
 	cornerTab.src="http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/training_corner.gif"; 
 }
  else if(Category=='Experience')
  {
    trainingTab.src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Blue_Btn.gif"; 
  	coachingTab.src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Green_Btn.gif";  
    ExperienceTab.src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Org_Btn_hover.gif"; 
    CalendarTab.src="http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/view_training_calendar.gif"; 
 	cornerTab.src="http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/training_corner.gif"; 
 }
  else
  {
    trainingTab.src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Blue_Btn_hover.gif"; 
  	coachingTab.src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Green_Btn.gif";  
    ExperienceTab.src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Org_Btn.gif"; 
    CalendarTab.src="http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/view_training_calendar.gif"; 
 	cornerTab.src="http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/training_corner.gif"; 
 }
 
}


 var NEWS = "";
 var NEWSID = "";
 var NEWSITEM = "";
 var SCTIMEINERVAL;
 function getPMCWhatsNew()
 {
	var lists = new SPAPI_Lists('http://teamspace.pg.com/sites/idm');	
	var query = "<Query><Where><And><Eq><FieldRef Name='Category' /><Value Type='Choice'>Training News</Value></Eq><Eq><FieldRef Name='Show' /><Value Type='Choice'>Yes</Value></Eq></And></Where></Query>";	
	var ws = lists.getListItems('WhatsNew','',query,'','3','','');
    if(ws.status==200)
    { //alert(ws.status);
		var rows = ws.responseXML.getElementsByTagName('z:row');
		var rlength = rows.length;
		if(rlength!=0)
		{
			var tblPMCWhatsNew = document.getElementById('tblPMCWhatsNew');
			var tblrow;
			var tbl;
			var tblCell;
			tblPMCWhatsNew.innerText = "";
			
			NEWS = new Array;
			NEWSID = new Array;
			for(var i=0; i<rlength; i++)
			{
				NEWSID[i] = rows[i].getAttribute('ows_ID'); // Array of News Title's ID
				NEWS[i] = rows[i].getAttribute('ows_Title');// Array of News Title 
			}
			var nlength =  NEWS.length;
			NEWSITEM = 0;
	      
			for(var item=0;item<rlength;item++)//while(nlength<2) Arpitha
			{
				tblrow = tblPMCWhatsNew.insertRow();
				tblCell = tblrow.insertCell();
				tblCell.innerHTML = "<img src='http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/blue_bullet.jpg' />";
				tblCell.innerHTML += "&nbsp;";
				tblCell.style.verticalAlign="top";
				tblCell.style.width = "2px";
				tblCell = tblrow.insertCell();
				var ntext = NEWS[NEWSITEM].toString();
				if(NEWS[NEWSITEM].length>90)
				{
					ntext = NEWS[NEWSITEM].substring(0,90);
					ntext +="...";
				}
				tblCell.innerHTML = "<a href='http://teamspace.pg.com/sites/idm/Lists/WhatsNew/DispForm.aspx?ID="+NEWSID[NEWSITEM] +"&source="+window.location+"' class='NewsAbstract' style='color:#01a9f2'>"+ntext+"</a>" ;
				tblCell.innerHTML += "<br>";
				tblCell.style.verticalAlign="top";
				
				NEWSITEM++;
			}
		}
    }
 }

 function getNextPMCWhatsNew()
 {
	var nlength = NEWS.length;
	var tblPMCWhatsNew = document.getElementById('tblPMCWhatsNew');
	var tblrow;
	var tbl;
	var tblCell;
	tblPMCWhatsNew.innerText = "";
	for(var item=0;item<nlength;item++)//while(nlength<2)
	{
		if(NEWSITEM>=nlength)
		{
			NEWSITEM = 0;
		}
		tblrow = tblPMCWhatsNew.insertRow();
		tblCell = tblrow.insertCell();
		tblCell.innerHTML = "<img src='http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/blue_bullet.jpg' />";
		tblCell.innerHTML += "&nbsp;";
		tblCell.style.verticalAlign="top";
		tblCell.style.width = "2px";
		tblCell = tblrow.insertCell();
		var ntext = NEWS[NEWSITEM].toString();
		if(NEWS[NEWSITEM].length>90)
		{
		ntext = NEWS[NEWSITEM].substring(0,90);
		ntext +="...";
		}
		tblCell.innerHTML = "<a href='http://teamspace.pg.com/sites/idm/Lists/WhatsNew/DispForm.aspx?ID="+NEWSID[NEWSITEM] +"&source="+window.location+"' class='NewsAbstract' style='color:#01a9f2'>"+ntext+"</a>" ;
		tblCell.innerHTML += "<br>";
		tblCell.style.verticalAlign="top";
		
		NEWSITEM++;
	}
 }
 
 
 function getprePMCWhatsNew()
 {
	var nlength = NEWS.length;
	var tblPMCWhatsNew = document.getElementById('tblPMCWhatsNew');
	var tblrow;
	var tbl;
	var tblCell;
	tblPMCWhatsNew.innerText = "";
	 
	for(var item=nlength;item>0;item--)//while(nlength<2)
	{
		 if(NEWSITEM<0)
		 {
		  	NEWSITEM = nlength-1;
		 }
		 if(NEWSITEM==nlength)
		 {
		  	NEWSITEM =0;
		 }
		 tblrow = tblPMCWhatsNew.insertRow();
		 tblCell = tblrow.insertCell();
		 tblCell.innerHTML = "<img src='http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/blue_bullet.jpg' />";
		 tblCell.innerHTML += "&nbsp;";
		 tblCell.style.verticalAlign="top";
		 tblCell.style.width = "2px";
		 tblCell = tblrow.insertCell();
		 var ntext = NEWS[NEWSITEM].toString();
		 if(NEWS[NEWSITEM].length>90)
		 {
		   	ntext = NEWS[NEWSITEM].substring(0,90);
		  	ntext +="...";
		 }
		 tblCell.innerHTML = "<a href='http://teamspace.pg.com/sites/idm/Lists/WhatsNew/DispForm.aspx?ID="+NEWSID[NEWSITEM] +"&source="+window.location+"' class='NewsAbstract' style='color:#01a9f2'>"+ntext+"</a>" ;
		 tblCell.innerHTML += "<br>";
		 tblCell.style.verticalAlign="top";
		
		 NEWSITEM--;
	}
 }

 
function callPMCWhatsNew()
{	
	getPMCWhatsNew();
	SCTIMEINERVAL = window.setInterval(function () {
	getNextPMCWhatsNew(NEWSITEM+1);
	},5000);
} 

function pausedata()
{
	window.clearInterval(SCTIMEINERVAL);
}

function playdata()
{
	SCTIMEINERVAL = window.setInterval(function () {
	getNextPMCWhatsNew(NEWSITEM+1);
	},5000);
}
 
 
 var aTRAININGPICS= new Array;
 var pTIMEINERVAL;
 var pNUM;
// to retrieve the Training Pictures
function getTrainingPhoto()
{
	pNUM =0;
	var query = "<Query><OrderBy><FieldRef Name='Show_x0020_Order' Ascending='True' /></OrderBy></Query>";
	var ws = lists.getListItems('TrainingPhotos','',query,'','','','');
	if(ws.status==200)
	{
	  var rows = ws.responseXML.getElementsByTagName('z:row');
	  var picsCount = rows.length;
	  
	  for(var i=0; i<picsCount; i++)
	  {
	   aTRAININGPICS[i] = 'http://teamspace.pg.com/'+rows[i].getAttribute('ows_RequiredField');
	  }
	  
	}
}
 
 // to display the Training Pictures
function playTrainingPics(num)
{
	pNUM = num;
	var cTPics = aTRAININGPICS.length;
	if(num<cTPics-1 )
	{
	 	document.getElementById('imgTrainingPics').src = aTRAININGPICS[num];
		 pNUM++;
	}
	else
	{
	 	pNUM = 0;
	 	document.getElementById('imgTrainingPics').src = aTRAININGPICS[num];
	}
}
 
 // to set time intravel for Training Pictures
function setPicsTimeIntravel()
{
	getTrainingPhoto();
	
	if(aTRAININGPICS.length >0)
	{
		playTrainingPics(0);
	}
	
	pTIMEINERVAL= window.setInterval(function () {
		playTrainingPics(pNUM);
	},5000);
}


function trim(str) {
        return str.replace(/^\s+|\s+$/g,"");
    }


function trainerCorner()
{
	window.location.href='http://inetsp.pg.com/sites/IM/trainerscornerv2/default.aspx';
}
/*
function tabTrainingHover(btnId)
{
  tabExpOut('btnExpTab')
  tabCoachingOut('btnCoachingTab')

 document.getElementById(btnId).src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Blue_Btn_hover.gif";
}

function tabCoachingHover(btnId)
{
	alert("calling..");
   tabTrainingOut('btnTrainTab');
   tabExpOut('btnExpTab');

 document.getElementById(btnId).src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Green_Btn_hover.gif";
}

function tabExpHover(btnId)
{
  tabTrainingOut('btnTrainTab');
  tabCoachingOut('btnCoachingTab');
 document.getElementById(btnId).src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Org_Btn_hover.gif";
 
}

function tabTrainingOut(btnId)
{
 document.getElementById(btnId).src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Blue_Btn.gif";
}

function tabCoachingOut(btnId)
{
 document.getElementById(btnId).src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Green_Btn.gif";
}

function tabExpOut(btnId)
{
 document.getElementById(btnId).src = "http://teamspace.pg.com/sites/idm/SiteImages/Training_Matrix/Cropped_Imgs/Org_Btn.gif";
}
*/