<%@ Page Language="C#" masterpagefile="~masterurl/default.master" title="Configuration" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 

<asp:Content id="Content1" runat="Server" contentplaceholderid="PlaceHolderMain">
<div id="content_bg">
<div  id="content_bg_shadow">
<div id="main-container">
	<div id="inner-caption"><img src="../Style Library/Images/employee_information_system.png" width="967" height="23" /></div>
    <div id="status_container">
    <div id="inner-header-bg">ADMINISTRATION <img src="../Style Library/Images/bread_crump.png" width="16" height="16" align="absmiddle" /> Configuration</div>
      <div id="inner_table_list">&nbsp;
        <table width="100%" border="0" cellspacing="0" cellpadding="5">
          <tr>
            <td width="200" align="right">EmployeeName*</td>
            <td width="20" align="center">: </td>
            <td align="left"><label for="textfield"></label>
              <select id="empname" class="inner_textbox"><option>Select</option></select></td>
          </tr>  
          <tr>
            <td width="200" align="right">HR Primary*</td>
            <td width="20" align="center">: </td>
            <td align="left"><label for="textfield"></label>
             <SharePoint:PeopleEditor ID="HRPrimary" runat="server" Width="350px" SelectionSet="User" __designer:Preview="&lt;span id=&quot;HRPrimary&quot; style=&quot;display:inline-block;width:350px;&quot;&gt;&lt;/span&gt;" __designer:Values="&lt;P N='ID' ID='1' T='HRPrimary' /&gt;&lt;P N='PickerDialogType' AssemblyQualifiedName='Microsoft.SharePoint.WebControls.PeoplePickerDialog, Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c' /&gt;&lt;P N='CustomProperty' T='User;;15;;;False' /&gt;&lt;P N='Width' T='350px' /&gt;&lt;P N='Page' ID='2' /&gt;&lt;P N='TemplateControl' R='2' /&gt;&lt;P N='AppRelativeTemplateSourceDirectory' R='-1' /&gt;"/> </td>
          </tr>
          <tr>
            <td width="200" align="right">HR Secondary*</td>
            <td width="20" align="center">: </td>
            <td align="left">
             <SharePoint:PeopleEditor ID="HRSecondary" runat="server" Width="350px" SelectionSet="User" style="color:gray;" __designer:Preview="&lt;span id=&quot;HRSecondary&quot; style=&quot;display:inline-block;width:350px;color:gray;&quot;&gt;&lt;/span&gt;" __designer:Values="&lt;P N='ID' ID='1' T='HRSecondary' /&gt;&lt;P N='PickerDialogType' AssemblyQualifiedName='Microsoft.SharePoint.WebControls.PeoplePickerDialog, Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c' /&gt;&lt;P N='CustomProperty' T='User;;15;;;False' /&gt;&lt;P N='HasAttributes' T='True' /&gt;&lt;P N='Width' T='350px' /&gt;&lt;P N='Page' ID='2' /&gt;&lt;P N='TemplateControl' R='2' /&gt;&lt;P N='AppRelativeTemplateSourceDirectory' R='-1' /&gt;"/>
              </td>
          </tr>  
          <tr>
            <td width="200" align="right">Number Of Records PerPage*</td>
            <td width="20" align="center">: </td>
            <td align="left"><label for="textfield"></label>
              <input name="textfield" type="text" class="inner_textbox" id="nofrec" autocomplete="off"/></td>
          </tr>
          <tr>
            <td width="200" align="right">Forward Days*</td>
            <td width="20" align="center">: </td>
            <td align="left"><label for="textfield"></label>
              <input name="textfield" type="text" class="inner_textbox" id="fwddays" autocomplete="off"/></td>
          </tr><tr>
            <td width="200" align="right">Backward Days*</td>
            <td width="20" align="center">: </td>
            <td align="left"><label for="textfield"></label>
              <input name="textfield" type="text" class="inner_textbox" id="bacdays" autocomplete="off"/></td>
          </tr>         
       
                    <tr>
            <td align="right" valign="top">&nbsp;</td>
            <td align="left" valign="top">&nbsp;</td>
            <td align="left" valign="top">&nbsp;</td>
          </tr>
          <tr>
            <td align="right" valign="top">&nbsp;</td>
            <td align="left" valign="top">&nbsp;</td>
            <td align="left" valign="top"><input name="button" type="submit" class="button" id="savebutton" value="Submit" onclick="Save()"  />
            <input name="button" type="submit" class="button" id="updatebutton" value="Update"   />

            <input name="button2" type="submit" class="button" id="resetbutton" value="Reset" /></td>
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

	<style  type="text/css">    
    .ms-inputuserfield{ font-size:8pt; font-family:Verdana,sans-serif; border:1px solid #a5a5a5;}  
    div.ms-inputuserfield a{color:#000000;text-decoration: none;font-weight:normal;font-style:normal;}    
    div.ms-inputuserfield{padding-left:1px;padding-top:2px;}    
</style> 

<link rel="stylesheet" href="../Style Library/css/menu.css"/>
	<link rel="stylesheet" href="../Style Library/css/style.css"/>
	<script type="text/javascript" src="../SiteAssets/jquery.SPServices-0.7.1a.min.js"></script>
	<script type="text/javascript" src="../SiteAssets/Configuration.js"></script>

</asp:Content>
