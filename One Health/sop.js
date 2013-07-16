
//***************************************************************
//* Project Name     : One Health
//* Application name :
//* Dependencies     :
//* Limitations      :
//* Created Date     :15 July 2013
//* Author           :Vijay Bhaskar C
//****************************************************************

$(document).ready(function () {
	alert('working fine sop');
	$("#divSop").accordion({
		header : "div"
	}, {
		heightStyle : "content"
	});
	main();
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
			CAMLViewFields : '<ViewFields><FieldRef Name="Title" /><FieldRef Name="Former_x0020_Sop" /><FieldRef Name="Corporate_x0020_QA_x0020_Link" /><FieldRef Name="SOP" /><FieldRef Name="Attachment1" /><FieldRef Name="Attachment4" /><FieldRef Name="Attachment3" /><FieldRef Name="Attachment2" /><FieldRef Name="grpName" /></ViewFields>',
			CAMLQuery : "",
			//CAMLRowLimit : 1,
			completefunc : function (xData, Status) {

				//alert(xData.responseText);
				debugger
				if (xData.status == 200) {
					$(xData.responseXML).SPFilterNode("z:row").each(function () {

						//var keyMeasure = $(this).attr("ows_Key_x0020_Measure");

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
var links="<ul>";
	if(sops[n].att1!='')
	links+="<li><a href='"+sops[n].att1.split(',')[0]+"'>"+sops[n].att1.split(',')[1]+"</a></li>";
	if(sops[n].att2!='')
	links+="<li><a href='"+sops[n].att2.split(',')[0]+"'>"+sops[n].att2.split(',')[1]+"</a></li>";
	if(sops[n].att3!='')
	links+="<li><a href='"+sops[n].att3.split(',')[0]+"'>"+sops[n].att3.split(',')[1]+"</a></li>";
	if(sops[n].att4!='')
	links+="<li><a href='"+sops[n].att4.split(',')[0]+"'>"+sops[n].att4.split(',')[1]+"</a></li>";
	links+="</ul>";
return links;
}


function buildContents() {
	var tblsop = "<div><table width='100%'>";
	tblsop += ' <tbody><thead> <tr class="subheader_bg"><th width="60" align="left" valign="middle">SOP #</th><th align="left" valign="middle">Title</th><th width="100" align="left" valign="middle">Attachments</th><th width="100" align="left" valign="middle">Former SOP #</th><th width="120" align="left" valign="middle">Corporate QA Link</th></tr> </thead> ';
	tblsop += "</tbody></table></div>";

	var divsArr = ['div1', 'div2', 'div3', 'div4', 'div5', 'div6', 'div7', 'div8', 'div9'];

	$.each(divsArr, function (i) {
		$('#' + divsArr[i]).html(tblsop);
	});

	
	$.each(sops, function (i) {
		var trsop = "";
		trsop += '<tr>';
		trsop += '<td width="60" align="left" class="grid_bg" valign="middle"><a href="' + sops[1].sop.split(',')[0] + '">'+sops[1].sop.split(',')[1]+'<a></td>';
		trsop += '<td align="left" class="grid_bg" valign="middle">' + sops[i].title + '</td>';
		trsop += '<td width="100" align="left" class="grid_bg" valign="middle">'+attachments(i)+'</td>';
		trsop += '<td width="100" align="left" class="grid_bg" valign="middle">' + sops[i].formersop + '</td>';
		trsop += '<td width="120" align="left" class="grid_bg" valign="middle">' + sops[i].corporateqa + '</td>';
		trsop += '</tr>';

		switch (sops[i].grpName) {
		case 'QUALITY LEADERSHIP':
			$('#div1 table').append(trsop);
			break;

		case 'QUALITY SYSTEMS':
			$('#div2 table').append(trsop);
			break;

		case 'DESIGN & DEVELOPMENT':
			$('#div3 table').append(trsop);
			break;

		case 'FACILITIES & EQUIPMENT':
			$('#div4 table').append(trsop);
			break;

		case 'PRODUCTION SYSTEMS':
			$('#div5 table').append(trsop);
			break;

		case 'PACKAGING & LABELING SYSTEM':
			$('#div6 table').append(trsop);
			break;

		case 'MATERIAL SYSTEMS':
			$('#div7 table').append(trsop);
			break;

		case 'LABORATORY CONTROL':
			$('#div8 table').append(trsop);
			break;

		case 'REFERENCE FILES':
			$('#div9 table').append(trsop);
			break;
		}

	});

}