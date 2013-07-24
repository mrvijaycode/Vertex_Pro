
//***************************************************************
//* Project Name     : One Health
//* Application name :
//* Dependencies     :
//* Limitations      :
//* Created Date     :15 July 2013
//* Author           :Vijay Bhaskar C
//****************************************************************

$(document).ready(function () {
	//alert('working fine sop');
	/*$("#divSop").accordion({
		header : "div"
	}, {
		heightStyle : "content"
	});*/
	
	$('#divSop').multiAccordion({
				active: [1, 2],
				click: function(event, ui) {
					//console.log('clicked')
				},
				init: function(event, ui) {
					//console.log('whoooooha')
				},
				tabShown: function(event, ui) {
					//console.log('shown')
				},
				tabHidden: function(event, ui) {
					//console.log('hidden')
				}			
			});
	
	$("#divSop").multiAccordion("option", "active", [0]);
	
	main();
	quickLinks();
});

var sops = [];

function main() {
	try {
		$().SPServices({
			operation : "GetListItems", //Method name
			async : false,
			//webURL : webUrl,//pass webUrl dynamically
			listName : "Sops", // List Name
			//CAMLQueryOptions : "<QueryOptions><IncludeAttachmentUrls>TRUE</IncludeAttachmentUrls></QueryOptions>",
			CAMLViewFields : '<ViewFields><FieldRef Name="Title" /><FieldRef Name="Former_x0020_Sop" /><FieldRef Name="Corporate_x0020_QA_x0020_Link" /><FieldRef Name="SOP" /><FieldRef Name="Attachment1" /><FieldRef Name="Attachment2" /><FieldRef Name="Attachment3" /><FieldRef Name="Attachment4" /><FieldRef Name="Attachment5" /><FieldRef Name="Attachment6" /><FieldRef Name="Attachment7" /><FieldRef Name="Attachment8" /><FieldRef Name="grpName" /></ViewFields>',
			CAMLQuery : "",
			//CAMLRowLimit : 1,
			completefunc : function (xData, Status) {

				//alert(xData.responseText);
//				debugger
				if (xData.status == 200) {
					$(xData.responseXML).SPFilterNode("z:row").each(function () {

						if ($(this).attr("ows_SOP") != null)
							var sop = $(this).attr("ows_SOP");
						else
							var sop = '';

						if ($(this).attr("ows_ID") != null)
							var itmid = $(this).attr("ows_ID");
						else
							var itmid = '';

						if ($(this).attr("ows_Title") != null)
							var title = $(this).attr("ows_Title");
						else
							var title = '';

						if ($(this).attr("ows_Attachment1") != null)
							var att1 = $(this).attr("ows_Attachment1");
						else
							var att1 = '';
							
						if ($(this).attr("ows_Attachment2") != null)
							var att2 = $(this).attr("ows_Attachment2");
						else
							var att2 = '';

						if ($(this).attr("ows_Attachment3") != null)
							var att3 = $(this).attr("ows_Attachment3");
						else
							var att3 = '';

						if ($(this).attr("ows_Attachment4") != null)
							var att4 = $(this).attr("ows_Attachment4");
						else
							var att4 = '';			
							
							if ($(this).attr("ows_Attachment5") != null)
							var att5 = $(this).attr("ows_Attachment5");
						else
							var att5 = '';	
							
							if ($(this).attr("ows_Attachment6") != null)
							var att6 = $(this).attr("ows_Attachment6");
						else
							var att6 = '';	
							
							
							if ($(this).attr("ows_Attachment7") != null)
							var att7 = $(this).attr("ows_Attachment7");
						else
							var att7 = '';	
							
							
							if ($(this).attr("ows_Attachment8") != null)
							var att8 = $(this).attr("ows_Attachment8");
						else
							var att8 = '';	
							
						if ($(this).attr("ows_Former_x0020_Sop") != null)
							var formersop = $(this).attr("ows_Former_x0020_Sop");
						else
							var formersop = '';

						if ($(this).attr("ows_Corporate_x0020_QA_x0020_Link") != null)
							var corporateqa = $(this).attr("ows_Corporate_x0020_QA_x0020_Link");
						else
							var corporateqa = '';

						if ($(this).attr("ows_grpName") != null)
							var grpName = $(this).attr("ows_grpName");
						else
							var grpName = '';

						var new_obj = {
							"itmid" : itmid,
							"title" : title,
							"formersop" : formersop,
							"corporateqa" : corporateqa,
							"att1" : att1,
							"att2" : att2,
							"att3" : att3,
							"att4" : att4,
							"att5" : att5,
							"att6" : att6,
							"att7" : att7,
							"att8" : att8,
							"sop" : sop,
							"grpName" : grpName
						};

						sops.push(new_obj);

					});
				} else {
					alert(xData.status);
				}

			}
		});
	} catch (err) {
		alert(err.message);
	}
	buildContents();
}

function attachments(n)
{
var links="<ul style='list-style-type: none'>";
	if(sops[n].att1!='')
	links+="<li><a href='"+sops[n].att1.split(',')[0]+"'>"+sops[n].att1.split(',')[1]+"</a></li>";
	if(sops[n].att2!='')
	links+="<li><a href='"+sops[n].att2.split(',')[0]+"'>"+sops[n].att2.split(',')[1]+"</a></li>";
	if(sops[n].att3!='')
	links+="<li><a href='"+sops[n].att3.split(',')[0]+"'>"+sops[n].att3.split(',')[1]+"</a></li>";
	if(sops[n].att4!='')
	links+="<li><a href='"+sops[n].att4.split(',')[0]+"'>"+sops[n].att4.split(',')[1]+"</a></li>";
		
	if(sops[n].att5!='')
	links+="<li><a href='"+sops[n].att5.split(',')[0]+"'>"+sops[n].att5.split(',')[1]+"</a></li>";
	if(sops[n].att6!='')
	links+="<li><a href='"+sops[n].att6.split(',')[0]+"'>"+sops[n].att6.split(',')[1]+"</a></li>";
	if(sops[n].att7!='')
	links+="<li><a href='"+sops[n].att7.split(',')[0]+"'>"+sops[n].att7.split(',')[1]+"</a></li>";
	if(sops[n].att8!='')
	links+="<li><a href='"+sops[n].att8.split(',')[0]+"'>"+sops[n].att8.split(',')[1]+"</a></li>";
	links+="</ul>";
	
return links;
}


function buildContents() {
	var tblsop = "<table width='100%'>";
	tblsop += ' <tbody><thead> <tr class="subheader_bg"><th width="60" align="center" valign="middle">SOP #</th><th align="center" valign="middle">Title</th><th width="100" align="center" valign="middle">Attachments</th><th width="100" align="center" valign="middle">Former SOP #</th><th width="120" align="center" valign="middle">Corporate QA Link</th></tr> </thead> ';
	tblsop += "<tr><td colspan='5' id='tdNodata' class='grid_bg'>No data found.</td></tr>";
	tblsop += "</tbody></table>";

	var divsArr = ['div1', 'div2', 'div3', 'div4', 'div5', 'div6', 'div7', 'div8', 'div9'];

	$.each(divsArr, function (i) {
		$('#' + divsArr[i]).html(tblsop);
	});

	
	$.each(sops, function (i) {

		var trsop = "";
		trsop += '<tr>';
		if (sops[i].sop != "") {
			trsop += '<td width="60" align="left" class="grid_bg" valign="middle"><a href="' + sops[i].sop.split(',')[0] + '">' + sops[i].sop.split(',')[1] + '<a></td>';
		} else {
			trsop += '<td width="60" align="left" class="grid_bg" valign="middle"></td>';
		}
		trsop += '<td align="left" class="grid_bg" valign="middle">' + sops[i].title + '</td>';
		trsop += '<td width="100" align="left" class="grid_bg" valign="middle">' + attachments(i) + '</td>';
		trsop += '<td width="100" align="left" class="grid_bg" valign="middle">' + sops[i].formersop + '</td>';
		trsop += '<td width="120" align="left" class="grid_bg" valign="middle">' + sops[i].corporateqa + '</td>';
		trsop += '</tr>';
		
		switch (sops[i].grpName) {
		case 'QUALITY LEADERSHIP':
			$('#div1 table tr td[id="tdNodata"]').remove();
			$('#div1 table').append(trsop);
			break;

		case 'QUALITY SYSTEMS':
			$('#div2 table tr td[id="tdNodata"]').remove();
			$('#div2 table').append(trsop);
			break;

		case 'DESIGN & DEVELOPMENT':
			$('#div3 table tr td[id="tdNodata"]').remove();
			$('#div3 table').append(trsop);
			break;

		case 'FACILITIES & EQUIPMENT':
			$('#div4 table tr td[id="tdNodata"]').remove();
			$('#div4 table').append(trsop);
			break;

		case 'PRODUCTION SYSTEMS':
			$('#div5 table tr td[id="tdNodata"]').remove();
			$('#div5 table').append(trsop);
			break;

		case 'PACKAGING & LABELING SYSTEM':
			$('#div6 table tr td[id="tdNodata"]').remove();
			$('#div6 table').append(trsop);
			break;

		case 'MATERIAL SYSTEMS':
			$('#div7 table tr td[id="tdNodata"]').remove();
			$('#div7 table').append(trsop);
			break;

		case 'LABORATORY CONTROL':
			$('#div8 table tr td[id="tdNodata"]').remove();
			$('#div8 table').append(trsop);
			break;

		case 'REFERENCE FILES':
			$('#div9 table tr td[id="tdNodata"]').remove();
			$('#div9 table').append(trsop);
			break;
		}
	});
	}
function quickLinks()
{
var strTRs='<table width="100%" style="border: 1px solid rgb(222, 230, 232);" border="0" cellspacing="0" cellpadding="5"><tbody><tr><td align="left" class="soaps_header" valign="middle">OTHER SOPS</td></tr>';
	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		//webURL : webUrl,//pass webUrl dynamically
		listName : "Other SOP", // List Name
		CAMLViewFields : "<ViewFields><FieldRef Name='SOP_x0020_Link' /></ViewFields>",
		CAMLQuery : "",
		//CAMLRowLimit : 1,
		completefunc : function (xData, Status) {

			//alert(xData.responseText);

			if (xData.status == 200) {
				$(xData.responseXML).SPFilterNode("z:row").each(function () {

					if($(this).attr("ows_SOP_x0020_Link")!=null)
					var qLink = $(this).attr("ows_SOP_x0020_Link");
					else
					var qLink = '';
					
				strTRs+='<tr><td class="soaps_links"><a href="'+qLink.split(',')[0]+'">'+qLink.split(',')[1]+'</a></td></tr>';
				});
			} else {
				alert(xData.status);
			}
		}
	});
	strTRs+='<tr><td class="soaps_links">If you can\'t access the above links, contact the person in parenthesis for access.</td></tr></tbody></table>';
	$('#spnQlinks').html(strTRs);
}