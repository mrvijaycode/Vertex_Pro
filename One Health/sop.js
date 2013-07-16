
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
	$("#divSop").accordion({ header: "span" });
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

						var sop = $(this).attr("ows_SOP");
						var itmid = $(this).attr("ows_ID");
						var title = $(this).attr("ows_Title");
						var attachments = $(this).attr("ows_Attachment1");
						var formersop = $(this).attr("ows_Former_x0020_Sop");
						var corporateqa = $(this).attr("ows_Corporate_x0020_QA_x0020_Link");
						var grpName = $(this).attr("ows_grpName");

						var new_obj = {
							"itmid" : itmid,
							"title" : title,
							"formersop" : formersop,
							"corporateqa" : corporateqa,
							"attachments" : attachments,
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

function buildContents() {
	var tblsop = "<div><table>";
	tblsop += ' <tbody><thead> <tr class="subheader_bg"><th width="60" align="left" valign="middle">SOP #</th><th align="left" valign="middle">Title</th><th width="100" align="left" valign="middle">Attachments</th><th width="100" align="left" valign="middle">Former SOP #</th><th width="120" align="left" valign="middle">Corporate QA Link</th></tr> </thead> ';

	$.each(sops, function (i) {
		tblsop += '<tr>';
		tblsop += '<td width="60" align="left" class="grid_bg" valign="middle">OH – 201</td>';
		tblsop += '<td align="left" class="grid_bg" valign="middle">&nbsp;</td>';
		tblsop += '<td width="100" align="left" class="grid_bg" valign="middle">&nbsp;</td>';
		tblsop += '<td width="100" align="left" class="grid_bg" valign="middle">&nbsp;</td>';
		tblsop += '<td width="120" align="left" class="grid_bg" valign="middle">&nbsp;</td>';
		tblsop += '</tr>';
	});
	tblsop += "</tbody></table></div>";
	$('#div1').html(tblsop);
}