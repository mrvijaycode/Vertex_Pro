<%@ Page Language="C#" masterpagefile="~masterurl/default.master" title="JobDescription" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<asp:Content id="Content1" runat="Server" contentplaceholderid="PlaceHolderMain">
<div id="content_bg">
<div  id="content_bg_shadow">
<div id="main-container">
	<div id="inner-caption"><img src="../Style Library/Images/employee_information_system.png" width="967" height="23" /></div>
    <div id="status_container">
    <div id="inner-header-bg">ADMINISTRATION <img src="../Style Library/Images/bread_crump.png" width="16" height="16" align="absmiddle" /> 
		Job Description</div>
      <div id="inner_table_list">&nbsp;
        <table width="100%" border="0" cellspacing="0" cellpadding="5">
          <tr>
            <td width="200" align="right">Title*</td>
            <td width="20" align="center"> </td>
            <td align="left" style="font-family:Verdana, Helvetica, sans-serif"><label for="textfield" style="font-family:Verdana, Helvetica, sans-serif"></label>
              <input name="textfield" type="text" class="inner_textbox" id="title" autocomplete="off"/></td>
          </tr>          
           <tr>
            <td align="right">EffectiveDate*</td>
            <td align="center"></td>
            <td style="font-family:Verdana, Helvetica, sans-serif"><label for="textfield2"></label>
              <input name="textfield" type="text" class="date" id="EffectiveDate" autocomplete="off"/></td>
          </tr>
          <tr>
            <td align="right">Level</td>
            <td align="center"></td>
            <td><label for="textfield2"></label>
              <select id="level"  class="inner_dropdown" ><option>select</option><option>1</option></select></td>
          </tr>
          <tr>
            <td align="right" valign="top" >
			Roles &amp; Responsibilities</td>
            <td align="center" valign="top"></td>   
            <td align="left" valign="top"><label for="textarea"></label>
              <textarea name="textarea" cols="45" rows="5" class="inner_description" id="rolesresp"></textarea></td>
          </tr>
          <tr>
            <td align="right" valign="top" >
			Notes</td>
            <td align="center" valign="top"></td>   
            <td align="left" valign="top"><label for="textarea"></label>
              <textarea name="textarea" cols="45" rows="5" class="inner_description" id="Notes"></textarea></td>
          </tr>
          <tr>
            <td align="right">Status</td>
            <td align="center"></td>
            <td><label for="textfield2"></label>
              <select id="status"  class="inner_dropdown" ><option>Active</option><option>
				InActive</option></select></td>
          </tr>          
          <tr>
            <td align="right" valign="top">&nbsp;</td>
            <td align="left" valign="top">&nbsp;</td>
            <td align="left" valign="top">&nbsp;</td>
          </tr>
          <tr>
            <td align="right" valign="top">&nbsp;</td>
            <td align="left" valign="top">&nbsp;</td>
            <td align="left" valign="top">
            <input name="button" type="button" class="button" id="savebutton" value="Submit" onclick="AddlistItems()"  />
            <input name="button" type="button" class="button" id="updatebutton" value="Update"   />
            <input name="button2" type="button" class="button" id="resetbutton" value="Reset"  />
            </td>
          </tr>
          </table>
      </div> 
           <div id="inner_table_list1" style="background-color: gray"> </div>
        <table width="100%" border="0" cellspacing="0" cellpadding="5" class="inner_table_flop">
         <tr>
         <td align="right" valign="top">&nbsp;</td>
         <td  align="right" valign="top" align="right">
         <input type="button" id="btnBack" value="Back"  name="Back" class="button"/>
         </td>
         <td   align="middle" style="width:5%"><div id="pageInfo"></div></td>
         <td align="left" valign="top" style="width:60%"><input type="button" id="btnNext" value="Next" name="Next" class="button"/></td>
         </tr>
         </table>        
      </div>      
   
</div>
</div>
</div>

</asp:Content>
<asp:Content id="Content2" runat="server" contentplaceholderid="PlaceHolderAdditionalPageHead">

	<link rel="stylesheet" href="../Style Library/css/menu.css"/>
	<link rel="stylesheet" href="../Style Library/css/style.css"/>
	<link rel="stylesheet" href="../Style Library/css/jquery.Datepicker.UI.css" />
	
	<script type="text/javascript" src="../SiteAssets/datepick.js"></script>	
	<script type="text/javascript" src="../SiteAssets/JobDescription.js"></script>
</asp:Content>
