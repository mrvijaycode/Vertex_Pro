  (function (){
	  "use strict";
	  var $pickbutton=$("#pickButton");
	  
	  $("#reasonDropdown li a").on("click", function (){
		  var reason=$(this).text();
		  $pickbutton.text(reason);
		  });
  })();// JavaScript Document