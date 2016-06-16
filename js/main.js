$(document).ready(function(){
    //hide result box
    $("#result-box").hide();
    
    //build region selection UI
    $("ul#region li").click(function(){
        $("ul#region li").removeClass("selected");
        $(this).addClass("selected");
    });
    
    $("#search").keyup(function(e){
        if(e.keyCode == 13){
            //find summoner id
           var region = $(".selected").attr("id");
            console.log(region);
           var name = $("#search").val(); $.getJSON("https://"+region+".api.pvp.net/api/lol/"+region+"/v1.4/summoner/by-name/"+name+"?api_key=6321fd6e-99b5-44e7-ab04-19918cf927f1", function(data){
               $.each(data, function(key, val){
                   if(name.toLowerCase() == key){
                       var id = data[key].id;
                       find_league(id, region)
                   }
               })
           });
            
        }
    })
});
function find_league(id, region){
    $.getJSON("https://"+region+".api.pvp.net/api/lol/"+region+"/v2.5/league/by-summoner/"+id+"?api_key=6321fd6e-99b5-44e7-ab04-19918cf927f1", function(data){
        console.log(data[id]);
        var entries = data[id][0].entries;
        $("#region").hide();
        
        //reduce logo padding
        $("#logo").animate({
            paddingTop: "-=80"
        }, 500);
        $("#search").animate({
            marginTop: "-=45"
        }, 500);
        
        $("#result-box").slideDown();
        
    })
}