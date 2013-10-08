<%@ Page Language="C#" masterpagefile="~masterurl/default.master" title="Untitled 1" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<asp:Content id="Content1" runat="server" contentplaceholderid="PlaceHolderMain">
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
            <td width="200" align="right">Department:</td>
            <td width="20" align="center"> </td>
            <td align="left"><label for="textfield"></label>
              <select class="inner_dropdown" id="idDept">
              </select>
			</td>
          </tr>
          <!--
          <tr>
            <td align="right">Title:</td>
            <td align="center"></td>
            <td><label for="textfield2"></label><select class="inner_dropdown" id="idTitle">
            
            </select>
            </td>
          </tr>
          -->
          <tr>
            <td align="right" valign="top">Employee ID:</td>
            <td align="center" valign="top"> </td>
            <td align="left" valign="top"><label for="textarea"></label>
              <input class="inner_textbox" type="text" id="txtEID" /></td>
          </tr>
          
          <tr>
            <td align="right" valign="top">Employee Name:</td>
            <td align="center" valign="top"> </td>
            <td align="left" valign="top"><label for="textarea"></label>
              <input class="inner_textbox" type="text" id="txtEName" /></td>
          </tr>
          
          <tr>
            <td align="right" valign="middle" style="height: 23px">Date of joining</td>
            <td align="center" valign="middle" style="height: 23px"></td>
            <td align="left" valign="top" style="height: 23px"><table width="0" border="0" cellspacing="0" cellpadding="2">
              <tr>
                <td  style="width: 72px" nowrap="nowrap" >
                 <input type="text"  id="txtStdate" class="date" name="eststartdate"/>			
                
				</td>
                <td width="20px">&nbsp;</td>
                <td>to </td>
                <td><label for="textfield3"></label> 
                  </td>
                <td >
                <input type="text"  id="txtEndate" class="date" name="estenddate"/>
               </td>               
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
            <input type="button" id="btnSearch" value="Search" onclick="onSuccess();" class="button" />

              <input name="button2" type="button" class="button" id="resetbutton" value="Reset" onclick="Resetform()" />
              <input name="button2" type="button" class="button" id="rptButton" value="Generate Report" />
              </td>
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
    <script type="text/javascript" src="../SiteAssets/SeachDb.js"></script>

</asp:Content>