
const xhr = new XMLHttpRequest();
//load data from json file
xhr.open("GET", "../app/data/player-stats.json");
xhr.responseType = "json";
xhr.send();

xhr.onload = function (e) {
  if (this.status == 200) {
    var json = this.response;
    var players = [];
    var playerId;
    var playerIdOnLoad = 4916;
    var position = "";
    var selectBox = document.getElementById("player-select");
    var json = this.response;
    var players;
    var playerName;
    var position;

      json.players.forEach(function(info, i) {
      players = json.players[i];
      playerName =
        players.player.name.first + " " + players.player.name.last;
      document.getElementById("playerName").innerHTML = playerName;
      playerId = players.player.id;
      //using split function to get player position
      position = players.player.info.positionInfo.split(" ");
      document.getElementById("player-position").innerHTML =
        position[position.length - 1];
      selectBox.options.add(new Option(playerName, playerId));
    });
    GetPlayerStats(playerIdOnLoad);
  }

  document
    .getElementById("player-select")
    .addEventListener("change", function () {
      //using event listener to get selected player id from the dropdown 
      var playerId = document.getElementById("player-select").options[
        document.getElementById("player-select").selectedIndex
      ].value;
      GetPlayerStats(playerId);
    });
};

function GetPlayerStats(playerId) {
  var json = xhr.response;
  var players;
  var playerName;
  var position;
  var goals = 0;
  var fwd_pass = 0;
  var goal_assist = 0;
  var appearances = 0;
  var mins_played = 0;
  var backward_pass = 0;
  var playerNumberImg;

  //looping through the players array
    json.players.forEach(function(info, i) {
    players = json.players[i];
    //looping through the players stats
    players.stats.forEach(function (item) {
      //find stats for selected player
      if (playerId == players.player.id) {
        //get value for goals key
        if (item.name == "goals") {
          goals = item.value;
        }
        //get value for fwd_pass key
        if (item.name == "fwd_pass") {
          fwd_pass = item.value;
        }
        //get value for goal_assist key
        if (item.name == "goal_assist") {
          goal_assist = item.value;
        }
        //get appearances for goal_assist key
        if (item.name == "appearances") {
          appearances = item.value;
        }
        //get appearances for mins_played key
        if (item.name == "mins_played") {
          mins_played = item.value;
        }
        //get appearances for backward_pass key
        if (item.name == "backward_pass") {
          backward_pass = item.value;
        }

        //update player information for selected player
        playerName =
          players.player.name.first + " " + players.player.name.last;
        document.getElementById("playerName").innerHTML = playerName;
        document.getElementById("apps").innerHTML = appearances;
        document.getElementById("goals").innerHTML = goals;
        document.getElementById("assists").innerHTML = goal_assist;
        //calculate goals per minute
        document.getElementById("gpm").innerHTML = (
          goals / appearances
        ).toFixed(2);
        //calculate passes per minute
        document.getElementById("ppm").innerHTML = (
          (backward_pass + fwd_pass) /
          mins_played
        ).toFixed(2);
        position = players.player.info.positionInfo.split(" ");
        document.getElementById("player-position").innerHTML =
          position[position.length - 1];
        // change player image depending on player id 
        playerNumberImg =
          "/app/assets/" + "p" + players.player.id + ".png";
        document.getElementById("main-player-img").src = playerNumberImg;
      }
    });
  });
}