// http://stackoverflow.com/questions/19491336/get-url-parameter-jquery
function getUrlParameter()
{
    var sPageURL = window.location.href;
    var sURLVariables = sPageURL.split('&');
    // window.location.href = "profile.html";
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        return sParameterName[1];
    }
} 

$(document).ready(function(){
    localStorage.removeItem("token");
    var access_token;
    var map = new Object();

    if(localStorage.getItem("token") == null)
    {   
        access_token = getUrlParameter();
        if(access_token == null)
            window.location.replace("index.html");
        localStorage.setItem("token", access_token);
    }
    else access_token = localStorage.getItem("token");

    var name; 
    $.ajax({
        url: "https://graph.facebook.com/me?"+
             "fields=first_name"+
             "&access_token="+access_token,
        //What about the failure?
        success: function(data){
                    name = data.first_name;
                    $("#greetings").html("Hello, "+name);
                },
        error: function(response) {
            console.log(response);
        }            
    });

    var msg = "test";
    $("#post").click(function(){
        $.post("https://graph.facebook.com/me/feed?"+
                "message="+msg+
                "&access_token="+access_token);
    });

    $("select").click(function(){
        var next = "https://graph.facebook.com/v2.3/me/"+
                 "taggable_friends"+
                 "?access_token="+access_token;
        // while (next != null)
        {
            $.ajax({
                url: next,
                success: function(data){
                            console.log(data);
                            $.each(data.data, function(i, v){
                                $("select").append($("<option></option")
                                                .attr("value", v.id)
                                                .text(v.name));
                            });
                            next = data.paging.next;
                         // buildTable($.parseJSON(data));

                        },
                error: function(response) {
                    console.log(response);
                }            
            });
        }
    });
}); 

function buildTable(json_data) {
    $.each(json_data.data, function(i, v){
        map[v.id] = v.name;
    })
}