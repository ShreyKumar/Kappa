
$(document).ready(function(){
    $("input#search").click(function(){
        var display_name = $("input#name").val();
        var name = $("input#name").val().toLowerCase().replace(/ /g,'');
        var api_key = "49efddbc-8f13-4f0e-aae7-e310d8fb3895";

        if(name.length == 0){
            $("#info").html("Enter your summoner name!");
        } else {
            //get summoner id
            var getID = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + String(name) + "?api_key=" + api_key;
            var summonerID;

            $.getJSON(getID, function(data){
                //summonerID = String(data[name.toLowerCase].id);
                summonerID = data[name].id;
                get_data(summonerID);
            }).fail(function(error){
                handle_status(error.status);
            });

            function get_data(summonerID){

                var getMatchList = "https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/" + summonerID + "?api_key=" + api_key;
                $.getJSON(getMatchList, function(data){

                    //total matches object
                    var matches = data.matches;

                    //total games
                    var total = data.totalGames;

                    //role counters
                    var top = 0;
                    var mid = 0;
                    var adc = 0;
                    var jung = 0;
                    var sup = 0;


                    for(var i = 0; i < matches.length; i++){
                        var this_match = matches[i];
                        if(this_match.role == "NONE" && this_match.lane == "JUNGLE"){
                            jung += 1;
                        } else if(this_match.lane == "MID" || this_match.lane == "MIDDLE"){
                            mid += 1;
                        } else if(this_match.lane == "TOP"){
                            top += 1;
                        } else if(this_match.lane == "BOTTOM"){
                            if(this_match.role == "DUO" || this_match.role == "DUO_CARRY"){
                                adc += 1;
                            } else if(this_match.role == "DUO_SUPPORT"){
                                sup += 1;
                            }
                        }
                    }

                    $("#info").html();
                    //output message
                    $("#info").html("You played " + String(total) + " ranked games in total.<br />" +
                            " Here are your top played roles:<br />" +
                            "Top: " + String(top) + " <br />" +
                            "Jungle: " + String(jung) + " <br />" +
                            "Mid: " + String(mid) + " <br />" +
                            "AD Carry: " + String(adc) + " <br />" +
                            "Support: " + String(sup) + " <br />");
                    var all_roles = [];
                    all_roles.push(top);
                    all_roles.push(mid);
                    all_roles.push(jung);
                    all_roles.push(adc);
                    all_roles.push(sup);
                    var best = "";

                    if(is_max(top, all_roles)){
                        best = "Top";
                    } else if(is_max(mid, all_roles)){
                        best = "Mid";
                    } else if(is_max(jung, all_roles)){
                        best = "Jungle";
                    } else if(is_max(adc, all_roles)){
                        best = "AD Carry";
                    } else {
                        best = "Support";
                    }
                    $("#info").append("You are a " + best + "main");

                }).fail(function(error){
                    handle_status(error.status);
                });
            };

            function handle_status(status){
                if(status != 200){
                    $("#info").html();
                    $("#info").html("Data not found! :( The Riot API might be buggy or down.");
                }
            }

            function is_max(item, items){
                return Math.max.apply(Math, items) == item;
            }
        }

        //hide the form
        $("form#search").hide();

    });
});
