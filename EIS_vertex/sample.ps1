$WebAppURL = "http://SP2010:7777"
$HostHeader = ""
$ContentDatabase = "Content_Intranet_7777"
$WebAppName = "Intranet Web Application"
$AppPoolName = "SharePoint - 7777"
$AppPoolUserName = "SPDOM\Administrator"
 
Write-Host "Creating the intranet web application"
$AppPoolCred = Get-Credential $AppPoolUserName
$AppPoolAccount = New-SPManagedAccount -Credential $AppPoolCred
$AuthProvider = New-SPAuthenticationProvider
$WebApp = New-SPWebApplication -ApplicationPool $AppPoolName -ApplicationPoolAccount $AppPoolAccount -Name $WebAppName -URL $WebAppURL -HostHeader $HostHeader -Port 7777 -AuthenticationProvider $AuthProvider -DatabaseName $ContentDatabase
