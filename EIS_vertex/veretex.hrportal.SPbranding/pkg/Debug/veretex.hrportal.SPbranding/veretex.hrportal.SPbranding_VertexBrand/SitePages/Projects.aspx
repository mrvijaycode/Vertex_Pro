<%@ Page Language="C#" masterpagefile="~masterurl/default.master" title="Projects" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<asp:Content id="Content1" runat="Server" contentplaceholderid="PlaceHolderMain">
<div id="content_bg">
<div  id="content_bg_shadow">
<div id="main-container">
	<div id="inner-caption"><img src="../Style Library/Images/employee_information_system.png" width="967" height="23" /></div>
    <div id="status_container">
    <div id="inner-header-bg">ADMINISTRATION <img src="../Style Library/Images/bread_crump.png" width="16" height="16" align="absmiddle" /> 
		Project</div>
     <div id="inner_table_list">&nbsp;
        <table width="100%" border="0" cellspacing="0" cellpadding="5">
          <tr>
            <td width="200" align="right">Project Name*</td>
            <td width="20" align="center"> </td>
            <td align="left"><label for="textfield"></label>
              <input name="projectname" type="text" class="inner_textbox" id="projectname" autocomplete="off"/></td>
          </tr>
          <tr>
            <td align="right">Project Type*</td>
            <td align="center"></td>
            <td><label for="textfield2"></label><select class="inner_dropdown" id="projecttype"><option>
			Select</option></select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">Descritpion</td>
            <td align="center" valign="top"> </td>
            <td align="left" valign="top"><label for="textarea"></label>
              <textarea name="description" cols="45" rows="5" class="inner_description" id="description"></textarea></td>
          </tr>
          <tr>
            <td align="right" valign="middle" style="height: 23px">Estimated 
			Start Date</td>
            <td align="center" valign="middle" style="height: 23px"></td>
            <td align="left" valign="top" style="height: 23px"><table width="0" border="0" cellspacing="0" cellpadding="2">
              <tr>
                <td>&nbsp;</td>
                <td  style="width: 72px" nowrap="nowrap" >
                 <input type="text"  id="eststartdate" class="date" name="eststartdate"/>			
                
				</td>
                <td width="20px">&nbsp;</td>
                <td>Estimated End Date </td>
                <td><label for="textfield3"></label> 
                  </td>
                <td >
                <input type="text"  id="estenddate" class="date" name="estenddate"/>
               </td>               
                </tr>
            </table></td>
          </tr>
          <tr>
            <td align="right" valign="middle" style="height: 23px">Actual Start 
			Date</td>
            <td align="center" valign="middle" style="height: 23px"></td>
            <td align="left" valign="top" style="height: 23px"><table width="0" border="0" cellspacing="0" cellpadding="2">
              <tr>
                <td>&nbsp;</td>
                <td  style="width: 72px" nowrap="nowrap" >
                 <input type="text"  id="actstartdate" class="date" name="actstartdate"/>			
                
				</td>
                <td width="20">&nbsp;</td>
                <td align="center" valign="middle" style="width:25px"></td>

                <td >Actual End Date </td>
                <td><label for="textfield3"></label> 
                  </td>
                <td >
                <input type="text"  id="actenddate" class="date" name="actenddate"/>
               </td>               
                </tr>
            </table></td>
          </tr>
          <tr>
            <td width="200" align="right">Status</td>
            <td width="20" align="center"> </td>
            <td align="left"><label for="textfield"></label>
             <input name="status" type="radio" id="statusO"  value="Open">Open</input> <input name="status" type="radio" value="Closed" id="statusC">Closed</input></td>
          </tr>
          <tr>
            <td width="200px" align="right">Employye Names</td>
            <td width="20px" align="center"></td>
            <td align="left" style="height: 18px"><label for="textfield"></label>
             <SharePoint:PeopleEditor ID="projectMembers" runat="server"   MultiSelect="true"/> </td>
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
            <input name="button" type="button" class="button" id="savebutton" value="Submit" />
            <input name="button" type="button" class="button" id="updatebutton" value="Update" />

              <input name="button2" type="button" class="button" id="resetbutton" value="Reset" onclick="Resetform()" /></td>
          </tr>
          </table>

            <div id="inner_table_list1" style="background-color:#D1D0CE;margin:5px;padding:4px"> </div>

      </div>
       

        <table width="100%" border="0" cellspacing="0" cellpadding="5" class="inner_table_flop" style="display:none">
         <tr>
         <td align="right" valign="top">&nbsp;</td>
         <td  align="right" valign="top" align="right">
         <input type="button" id="btnBack" value="Back"  name="Back" class="button"/>
         </td>
         <td   align="middle" style="width:5%"><div id="pageInfo"></div></td>
         <td align="left" valign="top" style="width:60%"><input type="button" id="btnNext" value="Next" name="Next" class="button"/></td>
         </tr>
         </table> </div>
   
</div>
</div>
</div>

</asp:Content>
<asp:Content id="Content2" runat="server" contentplaceholderid="PlaceHolderAdditionalPageHead">

<link rel="stylesheet" href="../Style Library/css/menu.css" />
<link rel="stylesheet" href="../Style Library/css/style.css" />
<link rel="stylesheet" href="../Style Library/css/jquery.Datepicker.UI.css" />

<script type="text/javascript" src="../SiteAssets/jquery.SPServices-0.7.1a.min.js"></script>
<script type="text/javascript" src="../SiteAssets/datepick.js"></script>
<script type="text/javascript" src="../SiteAssets/Projects.js"></script>

<style  type="text/css">    
    .ms-inputuserfield{ font-size:8pt; font-family:Verdana,sans-serif; border:1px solid #a5a5a5;}  
    div.ms-inputuserfield a{color:#000000;text-decoration: none;font-weight:normal;font-style:normal;}    
    div.ms-inputuserfield{padding-left:1px;padding-top:2px;}    
</style> 


</asp:Content>
