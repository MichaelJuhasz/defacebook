var c_id = 1599677050309394;
var r_uri = "http://localhost/pavlov/profile.html";

$(document).ready(function(){
	$("#login").attr("href", "https://www.facebook.com/dialog/oauth?"+
						 "client_id="+c_id+
						 "&response_type=token"+
						 "&display=popup"+
						 "&scope=publish_actions,user_friends"+
						 "&redirect_uri="+r_uri)
});


var orange = "F'Gbxy8";