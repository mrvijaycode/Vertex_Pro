<%@ Page Language="C#" masterpagefile="~masterurl/default.master" title="Projects" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<asp:Content id="Content1" runat="server" contentplaceholderid="PlaceHolderMain">

<div id="content_bg">
<div  id="content_bg_shadow">
<div id="main-container">
	<div id="inner-caption"><img src="../Style Library/images/employee_information_system.png" width="967" height="23" /></div>
    <div id="status_container">
    <div id="inner-header-bg">ADMINISTRATION <img alt="" src="../Style Library/images/bread_crump.png" width="16" height="16" align="absmiddle" /> Project</div>
      <div id="inner_table_list">&nbsp;
        <table width="100%" border="0" cellspacing="0" cellpadding="5">
          <tr>
            <td width="200" align="right">Project Name*</td>
            <td width="20" align="center">: </td>
            <td align="left"><label for="textfield"></label>
              <input name="textfield" type="text" class="inner_textbox" id="projName" /></td>
          </tr>
          <tr>
            <td align="right">Project Type*</td>
            <td align="center">:</td>
            <td><label for="textfield2"></label>
              <select  class="inner_textbox" id="projType" >

              </select></td>
          </tr>
          <tr>
            <td align="right" valign="top">Descritpion</td>
            <td align="center" valign="top"> : </td>
            <td align="left" valign="top"><label for="textarea"></label>
              <textarea name="textarea" cols="45" rows="5" class="inner_description" id="projDesc"></textarea></td>
          </tr>
          <tr>
            <td align="right" valign="middle">Estimated Start Date</td>
            <td align="center" valign="middle">:</td>
            <td align="left" valign="top"><table width="0" border="0" cellspacing="0" cellpadding="2">
              <tr>
                <td><label for="textfield3"></label>
                  <input name="textfield3" type="text" class="inner_textbox" id="textfield3" /></td>
                <td><img src="../Style Library/images/calender_icon.png" width="22" height="24" /></td>
                <td width="20">&nbsp;</td>
                <td>Estimated End Date :</td>
                <td><label for="textfield3"></label>
                  <input name="textfield3" type="text" class="inner_textbox" id="textfield3" /></td>
                <td><img src="../Style Library/images/calender_icon.png" width="22" height="24" /></td>
                </tr>
            </table></td>
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
            <input name="button" type="button" class="button" id="btnUpdate" style="display:none"  onclick="updateItem()" value="Update" />
            
            <input name="button" type="button" class="button" id="btnCreate" onclick="createItem()" value="Submit" />
            
              <input name="button2" type="button" class="button" id="button2" onclick="resetForm()" value="Reset" /></td>
          </tr>
          </table>
      </div>
      <div id="inner_table_list">
      <div id="divReport"> 
        <table style="border:#d2d7da solid 1px;" width="100%" border="0" cellspacing="0" cellpadding="10">
          <tr >
            <td class="inner_table_header" align="left" valign="middle">Project Name</td>
            <td class="inner_table_header" align="left" valign="middle">Project Type</td>
            <td width="120" align="left" valign="middle" class="inner_table_header">Actual Start Date</td>
            <td width="120" align="left" valign="middle" class="inner_table_header">Actual End Date</td>
            <td width="40" align="left" valign="middle" class="inner_table_header">Status</td>
            <td width="30" align="left" valign="middle" class="inner_table_header">Edit</td>
            <td width="30" align="left" valign="middle" class="inner_table_header">Delete</td>
            </tr>
          <tr >
            <td class="inner_table_flip" align="left" valign="middle">Sample Content </td>
            <td class="inner_table_flip" align="left" valign="middle">Development</td>
            <td class="inner_table_flip" align="left" valign="middle">08/27/2013 </td>
            <td class="inner_table_flip" align="left" valign="middle">08/27/2013</td>
            <td class="inner_table_flip" align="left" valign="middle">Open</td>
            <td class="inner_table_flip" align="left" valign="middle"><img src="../Style Library/images/edit.png" width="14" height="16" /></td>
            <td class="inner_table_flip" align="left" valign="middle"><img src="../Style Library/images/delete_icon.png"  width="16" height="16" /></td>
          </tr>
          <tr >
            <td class="inner_table_flop" align="left" valign="middle">Sample Content </td>
            <td class="inner_table_flop" align="left" valign="middle">Development</td>
            <td class="inner_table_flop" align="left" valign="middle">08/27/2013 </td>
            <td class="inner_table_flop" align="left" valign="middle">08/27/2013</td>
            <td class="inner_table_flop" align="left" valign="middle">Open</td>
            <td class="inner_table_flop" align="left" valign="middle"><img src="../Style Library/images/edit.png" width="14" height="16" /></td>
            <td class="inner_table_flop" align="left" valign="middle"><img src="../Style Library/images/delete_icon.png" width="16" height="16" /></td>
          </tr>
          <tr >
            <td class="inner_table_flip" align="left" valign="middle">Sample Content </td>
            <td class="inner_table_flip" align="left" valign="middle">Development</td>
            <td class="inner_table_flip" align="left" valign="middle">08/27/2013 </td>
            <td class="inner_table_flip" align="left" valign="middle">08/27/2013</td>
            <td class="inner_table_flip" align="left" valign="middle">Open</td>
            <td class="inner_table_flip" align="left" valign="middle"><img src="../Style Library/images/edit.png" width="14" height="16" /></td>
            <td class="inner_table_flip" align="left" valign="middle"><img src="../Style Library/images/delete_icon.png" width="16" height="16" /></td>
          </tr>
          <tr >
            <td class="inner_table_flop" align="left" valign="middle">Sample Content </td>
            <td class="inner_table_flop" align="left" valign="middle">Development</td>
            <td class="inner_table_flop" align="left" valign="middle">08/27/2013 </td>
            <td class="inner_table_flop" align="left" valign="middle">08/27/2013</td>
            <td class="inner_table_flop" align="left" valign="middle">Open</td>
            <td class="inner_table_flop" align="left" valign="middle"><img src="../Style Library/images/edit.png" width="14" height="16" /></td>
            <td class="inner_table_flop" align="left" valign="middle"><img src="../Style Library/images/delete_icon.png" width="16" height="16" /></td>
          </tr>
          <tr >
            <td class="inner_table_flip" align="left" valign="middle">Sample Content </td>
            <td class="inner_table_flip" align="left" valign="middle">Development</td>
            <td class="inner_table_flip" align="left" valign="middle">08/27/2013 </td>
            <td class="inner_table_flip" align="left" valign="middle">08/27/2013</td>
            <td class="inner_table_flip" align="left" valign="middle">Open</td>
            <td class="inner_table_flip" align="left" valign="middle"><img src="../Style Library/images/edit.png" width="14" height="16" /></td>
            <td class="inner_table_flip" align="left" valign="middle"><img src="../Style Library/images/delete_icon.png" width="16" height="16" /></td>
          </tr>
          <tr >
            <td class="inner_table_flop" align="left" valign="middle">Sample Content </td>
            <td class="inner_table_flop" align="left" valign="middle">Development</td>
            <td class="inner_table_flop" align="left" valign="middle">08/27/2013 </td>
            <td class="inner_table_flop" align="left" valign="middle">08/27/2013</td>
            <td class="inner_table_flop" align="left" valign="middle">Open</td>
            <td class="inner_table_flop" align="left" valign="middle"><img src="../Style Library/images/edit.png" width="14" height="16" /></td>
            <td class="inner_table_flop" align="left" valign="middle"><img src="../Style Library/images/delete_icon.png" width="16" height="16" /></td>
          </tr>
          </table>
          </div>
      </div>
    
    
    </div>
   
</div>
</div>
</div>
</asp:Content>

<asp:Content id="Content2" runat="server" contentplaceholderid="PlaceHolderAdditionalPageHead">

<link href="../Style Library/css/style.css" rel="stylesheet" type="text/css" />
<link href="../Style Library/css/menu.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../SiteAssets/jquery-1.8.1.js"></script>
<script type="text/javascript" src="../SiteAssets/Administration/Projects.js" ></script>

</asp:Content>
