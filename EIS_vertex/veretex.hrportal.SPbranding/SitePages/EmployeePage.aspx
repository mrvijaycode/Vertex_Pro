<%@ Page Language="C#" masterpagefile="~masterurl/default.master" title="CertificationMaster" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>

<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 

<asp:Content id="Content1" runat="server" contentplaceholderid="PlaceHolderMain">
	<div  id="content_bg_shadow">
      <div id="inner-caption"><img alt="" src="../Style Library/images/employee_information_system.png" width="967" height="23" /></div>
      <div id="status_container">
         <div id="inner-header-bg">ADMINISTRATION <img src="../Style Library/images/bread_crump.png" width="16" height="16" align="absmiddle" /> 
			Project</div>
         <div id="inner_table_list">
            <div class="tabs_ctnr">
               <ul>
                  <li ><a href="javascript:void(0)" id='aProfile' onclick="activate('divProfile',this.id)">
					Profile</a></li>
                  <li><a href="javascript:void(0)" id='aContactDetails'  onclick="activate('divContactDetails',this.id)">
					Contact Details</a></li>
                  <li><a href="javascript:void(0)" id='aEducation'  onclick="activate('divEducation',this.id)">
					Education History</a></li>
                  <li><a href="javascript:void(0)" id='aSkills'  onclick="activate('divSkills',this.id)">
					Skills</a></li>
                  <li ><a href="javascript:void(0)" id='aCertification'  onclick="activate('divCertifications',this.id)">
					Certifications</a></li>
                  <li><a href="javascript:void(0)" id='aPassport'  onclick="activate('divPassport',this.id)">
					Passport Information</a></li>
                  <li><a href="javascript:void(0)" id='aProjects'  onclick="activate('divProjects',this.id)">
					Projects</a></li>
                  <li><a href="javascript:void(0)" id='aInformation'  onclick="activate('divAdditional',this.id)">
					Information</a></li>
               </ul>
            </div>
            <div class="tab_status" id="divProfile">
               <div id="inner_table_list">
                  &nbsp;
                  <table width="100%" border="0" cellspacing="0" cellpadding="5" id="EmployeeProfile">
                     <tr>
                        <td width="200px" align="right">Employee Name</td>
                        <td width="20px" align="center"></td>
                        <td align="left" style="height: 18px">
                           <SharePoint:PeopleEditor ID="ename" runat="server"   MultiSelect="False" width="250px"/>
                        </td>
                        <td><input type="hidden" id="useridval" value="Useridval" name="Useridval"/></td>
                     </tr>
                     <tr>
                        <td align="right">Employee Id</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="empid" type="text" class="inner_textbox" id="empid" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">First Name</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="fname" type="text" class="inner_textbox" id="fname" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Middle Name</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="mname" type="text" class="inner_textbox" id="mname" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Last Name</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="lname" type="text" class="inner_textbox" id="lname" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">User Name</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="username" type="text" class="inner_textbox" id="username" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Marital Status</td>
                        <td align="center"></td>
                        <td>
                           <label for="textfield2"></label>
                           <select class="inner_dropdown" id="mstatus">
                              <option>
                                 Select
                              </option>
                           </select>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Gender</td>
                        <td align="center"></td>
                        <td>
                           <label for="textfield2"></label>
                           <select class="inner_dropdown" id="gender">
                              <option>
                                 Select
                              </option>
                           </select>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Date Of Birth</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="username" type="text"  id="dbirth" class="date" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Employee Type</td>
                        <td align="center"></td>
                        <td>
                           <label for="textfield2"></label>
                           <select class="inner_dropdown" id="etype">
                              <option>select</option>
                           </select>
                        </td>
                     </tr>
                     <tr>
                        <td width="200" align="right">Employee Status</td>
                        <td width="20" align="center"> </td>
                        <td align="left"><label for="textfield"></label>
                           <input name="status" type="radio" id="statusA"  value="Active" >Active</input> <input name="status" value="InActive" type="radio"  id="statusI" >In 
						Active</input>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Department</td>
                        <td align="center"></td>
                        <td>
                           <label for="textfield2"></label>
                           <select class="inner_dropdown" id="dept">
                              <option>
                                 Select
                              </option>
                           </select>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Use Calendar</td>
                        <td align="center"></td>
                        <td>
                           <label for="textfield2"></label>
                           <select class="inner_dropdown" id="ucal">
                              <option>
                                 Select
                              </option>
                           </select>
                        </td>
                     </tr>
                     <tr>
                        <td width="200" align="right">Supervisor</td>
                        <td width="20" align="center"></td>
                        <td align="left">
                           <label for="textfield"></label>
                           <SharePoint:PeopleEditor ID="supervisor" runat="server"   MultiSelect="False" width="250px"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Designation</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="title" type="text" class="inner_textbox" id="designation" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Date Ofjoining</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="djoin" type="text"  id="djoin" class="date" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Email ID</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="eid" type="text"  id="emailid" class="inner_textbox" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="top">Notes</td>
                        <td align="center" valign="top"> </td>
                        <td align="left" valign="top"><label for="textarea"></label>
                           <textarea name="notes" cols="45" rows="5" class="inner_description" id="notes"></textarea>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="top">&nbsp;</td>
                        <td align="left" valign="top">&nbsp;</td>
                        <td align="left" valign="top">&nbsp;</td>
                     </tr>
                     <tr>
                        <td align="right" valign="top">&nbsp;</td>
                        <td align="left" valign="top">&nbsp;</td>
                        <td align="left" valign="top"><input name="button" type="button" class="button" id="savebutton" value="Submit" onclick="AddEmpProfileListItems()"  />
                           <input name="button" type="button" class="button" id="Empprofupdatebutton" value="Update"  onclick="empProfileUpdate()" />
                           <input name="button2" type="button" class="button" id="resetbutton" value="Reset" onclick="ProfresetForm()" />
                        </td>
                     </tr>
                  </table>
               </div>
            </div>
            <div class="tab_status" id="divContactDetails">
               <div id="inner_table_list">
                  &nbsp;
                  <table width="100%" border="0" cellspacing="0" cellpadding="5" id="contactdetails">
                     <tr>
                        <td width="200px" align="right">Mobile No</td>
                        <td width="20px" align="center"></td>
                        <td align="left" style="height: 18px"><label for="textfield"></label>
                           <input name="empid" type="text" class="inner_textbox" id="mobile" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Residence</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="empid" type="text" class="inner_textbox" id="residence" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Personal Mail Id</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="fname" type="text" class="inner_textbox" id="pmailid" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right"><b>Present Address</b></td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           &nbsp;
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Address</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="fname" type="text" class="inner_textbox" id="locaddress" autocomplete="off" style="width:400px"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px">
						Country
                        </td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td  style="width: 72px" nowrap="nowrap" >
                                    <input name="fname" type="text" class="inner_textbox" id="loccountry" autocomplete="off"/>
                                 </td>
                                 <td width="20px">&nbsp;</td>
                                 <td style="width:75px" align="right"> State</td>
                                 <td style="width:09px"><label for="textfield3"></label> 
                                 </td>
                                 <td ><input name="fname" type="text" class="inner_textbox" id="locstate" autocomplete="off"/>
                                    &nbsp;
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px">
						City
                        </td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td  style="width: 72px" nowrap="nowrap" >
                                    <input name="fname" type="text" class="inner_textbox" id="loccity" autocomplete="off"/>
                                    &nbsp;
                                 </td>
                                 <td width="20px">&nbsp;</td>
                                 <td>Postal Code</td>
                                 <td><label for="textfield3"></label> 
                                 </td>
                                 <td >
                                    <input name="fname" type="text" class="inner_textbox" id="locpcode" autocomplete="off"/>
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td align="right"></td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="Checkbox1" type="checkbox" id="Checkbox1"/>Same 
						As Present
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Permanent Address</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           &nbsp;
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Address</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="fname" type="text" class="inner_textbox" id="peraddress" autocomplete="off" style="width:400px"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px">
						Country
                        </td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td  style="width: 72px" nowrap="nowrap" >
                                    <input name="fname" type="text" class="inner_textbox" id="percountry" autocomplete="off"/>
                                    &nbsp;
                                 </td>
                                 <td width="20px">&nbsp;</td>
                                 <td style="width:75px" align="right"> State</td>
                                 <td><label for="textfield3"></label> 
                                 </td>
                                 <td ><input name="fname" type="text" class="inner_textbox" id="perstate" autocomplete="off"/>
                                    &nbsp;
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px">
						City
                        </td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td  style="width: 72px" nowrap="nowrap" >
                                    <input name="fname" type="text" class="inner_textbox" id="percity" autocomplete="off"/>
                                    &nbsp;
                                 </td>
                                 <td width="20px">&nbsp;</td>
                                 <td>Postal Code</td>
                                 <td><label for="textfield3"></label> 
                                 </td>
                                 <td ><input name="fname" type="text" class="inner_textbox" id="perpcode" autocomplete="off"/>
                                    &nbsp;
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px">
						Emergency Contact
                        </td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td  style="width: 72px" nowrap="nowrap" >
                                    <input name="fname" type="text" class="inner_textbox" id="emercontact" autocomplete="off"/>
                                 </td>
                                 <td width="20px">&nbsp;</td>
                                 <td>Contact Name</td>
                                 <td><label for="textfield3"></label> 
                                    <input name="fname" type="text" class="inner_textbox" id="contactname" autocomplete="off"/>
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                    
                     <tr>
                        <td align="right" valign="top">&nbsp;</td>
                        <td align="left" valign="top">&nbsp;</td>
                        <td align="left" valign="top">&nbsp;</td>
                     </tr>
                     <tr>
                        <td align="right" valign="top">&nbsp;</td>
                        <td align="left" valign="top">&nbsp;</td>
                        <td align="left" valign="top"><input name="button" type="button" class="button" id="updatebutton" value="Update"  onclick="contactDetailsUpdate()" />
                           <input name="button2" type="button" class="button" id="resetbutton" value="Reset" onclick="CntDetresetForm()" />
                        </td>
                     </tr>
                  </table>
               </div>
            </div>
            <div class="tab_status" id="divEducation">
               <div id="inner_table_list">
                  &nbsp;
                  <table width="100%" border="0" cellspacing="0" cellpadding="5" id="educationdet">
                     <tr>
                        <td width="200px" align="right">Education Type</td>
                        <td width="20px" align="center"></td>
                        <td align="left" style="height: 18px">
                           <label for="textfield"></label>
                           <select class="inner_dropdown" id="edutype">
                              <option>select</option>
                           </select>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Course</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="empid" type="text" class="inner_textbox" id="educourse" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Institute Name</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="fname" type="text" class="inner_textbox" id="insname" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">From Year</td>
                        <td align="center"></td>
                        <td>
                           <label for="textfield2"></label>
                           <select class="inner_dropdown" id="edufromyear">
                              <option>select</option>
                           </select>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">To Year</td>
                        <td align="center"></td>
                        <td>
                           <label for="textfield2"></label>
                           <select class="inner_dropdown" id="edutoyear">
                              <option>select</option>
                           </select>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">University</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="username" type="text" class="inner_textbox" id="university" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Score(%)</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="username" type="text" class="inner_textbox" id="eduscore" autocomplete="off" step="1"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Country</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="username" type="text" class="inner_textbox" id="educountry" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">State</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="username" type="text" class="inner_textbox" id="edustate" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">City</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="username" type="text" class="inner_textbox" id="educity" autocomplete="off"/>
                        </td>
                     </tr>
                    
                     <tr>
                        <td align="right" valign="top">&nbsp;</td>
                        <td align="left" valign="top">&nbsp;</td>
                        <td align="left" valign="top">&nbsp;</td>
                     </tr>
                     <tr>
                        <td align="right" valign="top">&nbsp;</td>
                        <td align="left" valign="top">&nbsp;</td>
                        <td align="left" valign="top">  <input name="button" type="button" class="button" id="updatebutton" value="Update"  onclick="EducationDetupdate()" />
                           <input name="button2" type="button" class="button" id="resetbutton" value="Reset" onclick="EduresetForm()" />
                        </td>
                     </tr>
                  </table>
               </div>
            </div>
            <div class="tab_status" id="divSkills">
               Skills
            </div>
            <div class="tab_status" id="divAdditional">
               <div id="inner_table_list">
                  &nbsp;
                  <table width="100%" border="0" cellspacing="0" cellpadding="5" id="addinfotab">
                     <tr>
                        <td width="200px" align="right"><b>Experience 
						Information</b></td>
                        <td width="20px" align="center"></td>
                        <td align="left" style="height: 18px"><label for="textfield"></label>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px"> 
                        </td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td>&nbsp;</td>
                                 <td  style="width: 72px" nowrap="nowrap" ><b>
									Years</b>
                                 </td>
                                 <td width="20px">&nbsp;</td>
                                 <td width="120px"> </td>
                                 <td><label for="textfield3"></label> 
                                 </td>
                                 <td style="width: 170px">
                                    <b>Months</b>
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px">
						Total Years Of Experience
                        </td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td>&nbsp;</td>
                                 <td  style="width: 72px" nowrap="nowrap" >
                                    <input type="text"  id="totExpyrs" class="inner_textbox" name="totExpyrs"/>			
                                 </td>
                                 <td width="20px">&nbsp;</td>
                                 <td></td>
                                 <td><label for="textfield3"></label> 
                                 </td>
                                 <td >
                                    <input type="text"  id="totEexpmnths" class="inner_textbox" name="totEexpmnths"/>
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px">
						Experience in Vertex
                        </td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td>&nbsp;</td>
                                 <td  style="width: 72px" nowrap="nowrap" >
                                    <input type="text"  id="expyrsvrtx" class="inner_textbox" name="expyrsvrtx"/>			
                                 </td>
                                 <td width="20px">&nbsp;</td>
                                 <td></td>
                                 <td><label for="textfield3"></label> 
                                 </td>
                                 <td >
                                    <input type="text"  id="expinmonthsvrtx" class="inner_textbox" name="expinmonthsvrtx"/>
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td width="200px" align="right"><b>Relevant Experience </b></td>
                        <td width="20px" align="center"></td>
                        <td align="left" style="height: 18px"><label for="textfield"></label>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px"> 
                        </td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td>&nbsp;</td>
                                 <td  style="width: 172px" nowrap="nowrap" ><b>
									Domain</b>
                                 </td>
                                 <td width="20px"></td>
                                 <td> </td>
                                 <td><label for="textfield3"></label> 
                                 </td>
                                 <td  width="160px">
                                    <b>Years</b>
                                 </td>
                                 <td><label for="textfield3"></label> 
                                 </td>
                                 <td width="150px">
                                    <b>Months</b>
                                 </td>
                                 <td >
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px">
						Total Years Of Experience
                        </td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2" id="AddTable">
                              <tr id="relexp0">
                                 <td>&nbsp;</td>
                                 <td  style="width: 72px" nowrap="nowrap" >
                                    <input type="text"  id="relexpdomain1" class="inner_textbox" name="relexpdomain"/>			
                                 </td>
                                 <td></td>
                                 <td width="20px"><input type="text"  id="relexpyrs1" class="inner_textbox" name="relexpyrs"/></td>
                                 <td></td>
                                 <td >
                                    <input type="text"   id="relexpinmnths1" class="inner_textbox" name="relexpinmnths"/>                
                                 </td>
                                 <td></td>
                                 <td><input name="button" type="button" class="button" id="savebutton" value="Add" onclick="AddTable()"  /></td>
                                

                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px"><b>
						Other Information</b>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px">
						Confirmation Date
                        </td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td>&nbsp;</td>
                                 <td  style="width: 72px" nowrap="nowrap" >
                                    <input type="text"  id="confirmDate" class="date" name="confirmDate"/>			
                                 </td>
                                 <td width="20px">&nbsp;</td>
                                 <td>Appraisal Date </td>
                                 <td><label for="textfield3"></label> 
                                 </td>
                                 <td >
                                    <input type="text"  id="AppraisalDate" class="date" name="AppraisalDate"/>
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px">
						Blood Group</td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td>&nbsp;</td>
                                 <td  style="width: 72px" nowrap="nowrap" >
                                    <input type="text"  id="bloodgroup" class="inner_textbox" name="bloodgroup"/>			
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px">
						Text1</td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td>&nbsp;</td>
                                 <td  style="width: 72px" nowrap="nowrap" >
                                    <input type="text"  id="text1" class="inner_textbox" name="text1"/>			
                                 </td>
                                 <td width="20px">&nbsp;</td>
                                 <td>Text2 </td>
                                 <td><label for="textfield3"></label> 
                                 </td>
                                 <td >
                                    <input type="text"  id="text2" class="inner_textbox" name="text2"/>
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="middle" style="height: 23px">
						Text3</td>
                        <td align="center" valign="middle" style="height: 23px"></td>
                        <td align="left" valign="top" style="height: 23px">
                           <table width="0" border="0" cellspacing="0" cellpadding="2">
                              <tr>
                                 <td>&nbsp;</td>
                                 <td  style="width: 72px" nowrap="nowrap" >
                                    <input type="text"  id="text3" class="inner_textbox"  name="text3"/>			
                                 </td>
                                 <td width="20px">&nbsp;</td>
                                 <td>Date1 </td>
                                 <td><label for="textfield3"></label> 
                                 </td>
                                 <td >
                                    <input type="text"  id="date1" class="date" name="date1"/>
                                 </td>
                              </tr>
                           </table>
                        </td>
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
                           <input name="button" type="button" class="button" id="updatebutton" value="Update"  onclick="EmployeeExpInfoUpdate()" />
                           <input name="button2" type="button" class="button" id="resetbutton" value="Reset" onclick="EmpExpinforesetForm()" />
                        </td>
                     </tr>
                  </table>
               </div>
            </div>
            <div class="tab_status" id="divPassport">
               <div id="inner_table_list">
                  &nbsp;
                  <table width="100%" border="0" cellspacing="0" cellpadding="5" id="passinfotab">
                     <tr>
                        <td width="200px" align="right">Passport Number</td>
                        <td width="20px" align="center"></td>
                        <td align="left" style="height: 18px"><label for="textfield"></label>
                           <input name="fname" type="text" class="inner_textbox" id="passportnumber" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Date Of Issue</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="fname" type="text" class="date" id="passportdateofissue" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Date Of Expiry</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="fname" type="text" class="date" id="passportdatexp" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="top">Passport Notes</td>
                        <td align="center" valign="top"> </td>
                        <td align="left" valign="top"><label for="textarea"></label>
                           <textarea name="notes" cols="45" rows="5" class="inner_description" id="passnotes"></textarea>
                        </td>
                     </tr>
                     <tr>
                        <td align="right"><b>Visa Information</b></td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Type of Visa</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="fname" type="text" class="inner_textbox" id="typeofvisa" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Date Of Issue</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="username" type="text" class="date" id="visadateofissue" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="top">Date Of Expiry</td>
                        <td align="center" valign="top"> </td>
                        <td align="left" valign="top"><label for="textarea"></label>
                           <input name="username" type="text" class="date" id="visaexpirydate" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="top">Visa Notes</td>
                        <td align="center" valign="top"> </td>
                        <td align="left" valign="top"><label for="textarea"></label>
                           <textarea name="notes" cols="45" rows="5" class="inner_description" id="visanotes"></textarea>
                        </td>
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
                           <input name="button" type="button" class="button" id="updatebutton" value="Update"  onclick="EmployeePassportDetailsUpdate()" />
                           <input name="button2" type="button" class="button" id="resetbutton" value="Reset" onclick="PassportresetForm()" />
                        </td>
                     </tr>
                  </table>
               </div>
            </div>
            <div class="tab_status" id="divProjects">
             <div id="inner_table_list">&nbsp;
        <table width="100%" border="0" cellspacing="0" cellpadding="5" id="projtable">
           <tr>
            <td width="200px" align="right">Project Name</td>
            <td width="20px" align="center"></td>
            <td align="left" style="height: 18px"><label for="textfield"></label>
            <select class="inner_dropdown" id="projname" disabled="disabled">
			<option>select</option></select>            
            </td>
          </tr>
           <tr>
           <td></td><td></td>
           <td><input name="button" type="button" class="button" id="NewProjbutton" value="New" onclick="AssignProj()"  />
         </td>
           </tr>
         
          <tr>
            <td align="right" valign="top">&nbsp;</td>
            <td align="left" valign="top">&nbsp;</td>
            <td align="left" valign="top">&nbsp;</td>
          </tr>
          <tr>
            <td align="right" valign="top">&nbsp;</td>
            <td align="left" valign="top">&nbsp;</td>
            <td align="left" valign="top"> <input name="button" type="button" class="button" id="AssignProjbutton" value="Assign" onclick="AssignProjectToMem()"/>
              <input name="button2" type="button" class="button" id="resetbutton" value="Reset" onclick="ProjectresetForm()" /></td>
          </tr>
          </table>
      </div> 
      <div id="inner_table_list1" style="background-color: gray"></div>
         </div>
 
            </div>
            <div class="tab_status" id="divCertifications">
               <div id="inner_table_list">
                  &nbsp;
                  <table width="100%" border="0" cellspacing="0" cellpadding="5" id="EmpCerttab">
                     <tr>
                        <td width="200px" align="right">Issuing Authority</td>
                        <td width="20px" align="center"></td>
                        <td align="left" style="height: 18px">
                           <label for="textfield"></label>
                           <select class="inner_dropdown" id="issueAuth">
                              <option>select</option>
                           </select>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Certification Name</td>
                        <td align="center"></td>
                        <td>
                           <label for="textfield2"></label>
                           <select class="inner_dropdown" id="certname">
                              <option>select</option>
                           </select>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Certification Id</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="fname" type="text" class="inner_textbox" id="certid" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Date Of Certification</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="fname" type="text" class="date" id="dateofcert" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Valid Till</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="fname" type="text" class="date" id="validtill" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right">Score/Grade</td>
                        <td align="center"></td>
                        <td><label for="textfield2"></label>
                           <input name="username" type="text" class="inner_textbox" id="scoregrade" autocomplete="off"/>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="top">Notes</td>
                        <td align="center" valign="top"> </td>
                        <td align="left" valign="top"><label for="textarea"></label>
                           <textarea name="notes" cols="45" rows="5" class="inner_description" id="certnotes"></textarea>
                        </td>
                     </tr>
                     <tr>
                        <td align="right" valign="top">&nbsp;</td>
                        <td align="left" valign="top">&nbsp;</td>
                        <td align="left" valign="top">&nbsp;</td>
                     </tr>
                     <tr>
                        <td align="right" valign="top">&nbsp;</td>
                        <td align="left" valign="top">&nbsp;</td>
                        <td align="left" valign="top"><input name="button" type="button" class="button" id="updatebutton" value="Update"  onclick="EmployeeCertificationUpdate()" />
                           <input name="button2" type="button" class="button" id="resetbutton" value="Reset" onclick="CertresetForm()" />
                        </td>
                     </tr>
                  </table>
               </div>
            </div>
         </div>
      </div>
</asp:Content>


<asp:Content id="Content2" runat="server" contentplaceholderid="PlaceHolderAdditionalPageHead">
    <link rel="stylesheet" href="../Style Library/css/menu.css" />
   <link rel="stylesheet" href="../Style Library/css/style.css" />
   <link rel="stylesheet" href="../Style Library/css/jquery.Datepicker.UI.css" />
   
   <script type="text/javascript" src="../SiteAssets/jquery.SPServices-0.7.1a.min.js"></script>
   <script type="text/javascript" src="../SiteAssets/EmployeePage.js"></script>
   <script type="text/javascript" src="../SiteAssets/datepick.js"></script>
   <script type="text/javascript" src="../SiteAssets/EmployeeProfile.js"></script>
   
	<style  type="text/css">    
    .ms-inputuserfield{ font-size:8pt; font-family:Verdana,sans-serif; border:1px solid #a5a5a5;}  
    div.ms-inputuserfield a{color:#000000;text-decoration: none;font-weight:normal;font-style:normal;}    
    div.ms-inputuserfield{padding-left:1px;padding-top:2px;}    
</style>
      
</asp:Content>