//***************************************************************
//* Project Name     : GBU-HR
//* Application name : Reports
//* Dependencies     :
//* Limitations      :
//* Created Date     : 23 May 2013
//* Author           : China veeraiah B
//****************************************************************

var webUrl = "https://hrteamspace.pg.com/sites/gbuhr";
var xml;
$(document).ready(function () {
	//alert("OK");
	loaddata();
	loadAllReports();
});


function loaddata() {

	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		webURL : webUrl,
		listName : "TestGBUReports", // List Name
		CAMLQueryOptions : '<QueryOptions><ViewAttributes Scope="RecursiveAll"/></QueryOptions>',
		completefunc : function (xData, Status)
		{
			xml = xData.responseXML;
			//completefunc : loadAllReports,
		}
	});
}

var table = "";
table += "<table>"; //</table>";

function loadAllReports()
 {
		//xml = xData.responseXML;
		$(xml).SPFilterNode("z:row").each(function ()
		{
			var filechk = $(this).attr('ows_FileRef');
			var fileref = $(this).attr('ows_FileRef');
			fileref = fileref.split('/');
			if (fileref.length == 4)
			 {
				fileref = fileref[3];
				table += "<tr><td valign='top'><a  style='font-size:14px'><img id="+fileref+"  src='https://hrteamspace.pg.com/sites/gbuhr/Site Pages/Images/Orange_down_arrow.jpg'/>" + fileref + "</a></td></tr>";
				filldata(fileref, filechk);
			 }
			//var folder = $(this).attr('ows_LinkFilename');
			//table += "<tr><td><a href=javascript:expand(&quot;"+fileref+"&quot;);>"+folder+"</a></td></tr>";
		});

		table += "<tr><td id='tbl3'></table></td></tr></table>";
		//alert(table);
		$('#tblID').html(table);

}

function filldata(folder, filechk)
{

	table += "<tr><td><table style='padding-left:10px'>";
	$(xml).SPFilterNode("z:row").each(function ()
	{
		var fileref = $(this).attr('ows_FileRef');
		//var nulcheck='3;#sites/gbuhr/TestGBUReports/'+folder;
		var nulcheck = filechk;
		if (fileref != nulcheck)
		{
			var filepath = "sites/gbuhr/TestGBUReports/" + folder;
			if (fileref.indexOf(filepath) > -1)
			{
				var fsobj = $(this).attr('ows_FSObjType').split(';#')[1];
				if (fsobj == 1)
				{
					var document = $(this).attr('ows_LinkFilename');
					table += "<tr><td><a style='font-size:12px'><img id='image"+document+"' onclick='displaySubcat("+document+")'  src='https://hrteamspace.pg.com/sites/gbuhr/Site Pages/Images/Orange_right_arrow.jpg'/><img id='image1"+document+"' onclick='hideSubcat("+document+")'  src='https://hrteamspace.pg.com/sites/gbuhr/Site Pages/Images/Orange_down_arrow.jpg' style='display:none'/>" + document + "</a></td></tr>";
					filldocuments(folder, fileref, document);
				}
			}
		}
	});
	table += "</table></td></tr>";
}


function filldocuments(folder, filechk, document)
{//debugger;
	var fol = folder;
	var doc = document;
	table += "<tr><td><table id='"+doc+"' style='padding-left:15px;display:none' >";
	
	$(xml).SPFilterNode("z:row").each(function ()
	{
		var fileref = $(this).attr('ows_FileRef');
		//var nulcheck='3;#sites/gbuhr/TestGBUReports/'+folder;
		var nulcheck = filechk;
		if (fileref != nulcheck)
		{
			// checkfolder(folder,filechk);
			var filepath = "sites/gbuhr/TestGBUReports/" + fol + "/" + doc;
			if (fileref.indexOf(filepath) > -1)
			{
				var fsobj = $(this).attr('ows_FSObjType').split(';#')[1];
				if (fsobj == 0)
				{
					var document = $(this).attr('ows_LinkFilename');
					table += "<tr><td>" + document + "</td></tr>";
					//filllastdocuments(folder, filechk, document,filepath)
				}
			}
		}
	});
	table += "</table></td></tr>";
}

function filllastdocuments(folder, filechk, document,filepath)
{
}


//function checkfolder(folder, filechk) {}

function displaySubcat(doc)
{
	var id=doc.id;

	$('#'+id+'').show();
		$('#image'+id+'').hide();
	$('#image1'+id+'').show();

}


function hideSubcat(doc)
{
	var id=doc.id;
	$('#'+id+'').hide();
	$('#image'+id+'').show();
	$('#image1'+id+'').hide();
}

