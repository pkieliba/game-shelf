var inputFile = document.getElementById('customFileInput');
var gameLibrary;
var filteredLibrary;
var finalLibrary;
var chosenGame;
var complexValues = ['very simple', 'simple', 'medium', 'complex', 'very complex'];
var numPlayers = parseInt(document.querySelector('input[name="players"]:checked').value);
var maxTime = 120;
var minTime = 60;
var langs = {eng: true, pl: false};
var gameType = {compete: true, coop: false};
var minComplex = 1;
var maxComplex = 5;
var solo = {solo: true, team: false};

/* INIT */

$(document).ready(function () {
    bsCustomFileInput.init()
 });

/* SLIDERS' BEHAVIOUR */

$(".time-slider").ionRangeSlider({
    skin: "round",
    type: "double",
    min: 0,
    max: 180,
    step: 20,
    from: 60,
    to: 120,
    grid: true, 
    decorate_both: false,
    values_sepataror: " - ",
    max_postfix: '+ ',
    onFinish: function(e) {
        minTime = $(".time-slider").data('ionRangeSlider').result.from;
        maxTime = $(".time-slider").data('ionRangeSlider').result.to;
        if (gameLibrary != undefined){
            filterData(gameLibrary)}
    }
});

$(".complex-slider").ionRangeSlider({
    skin: "round",
    type: "double",
    values: complexValues,
    grid: false,
    decorate_both: false,
    values_sepataror: " - ",
    onFinish: function(e) {
        minComplex = $(".complex-slider").data('ionRangeSlider').result.from+1;
        maxComplex = $(".complex-slider").data('ionRangeSlider').result.to+1;
        if (gameLibrary != undefined){ 
            filterData(gameLibrary)}
    }
});

/* GET INPUT FILE */

inputFile.onchange = function(e) {
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case 'csv':
        ParseInput(this.files[0])
        break;
    default:
      alert('File type not allowed. Please choose a .csv .xls or .xlsx file.');
      this.value = '';
  }
};

 /* GET NUMBER OF PLAYERS */

 $('.numPlay').click(function () { 
    numPlayers = parseInt(document.querySelector('input[name="players"]:checked').value);
    if (gameLibrary != undefined){
        filterData(gameLibrary)}
})

/* GET LANGUAGES */

$('#English').click(function () {
    langs.eng = $('#English').is(':checked')
    if (gameLibrary != undefined){
        filterData(gameLibrary)}
})
$('#Polish').click(function () {
    langs.pl = $('#Polish').is(':checked')
    if (gameLibrary != undefined){
        filterData(gameLibrary)}
})

/* GET GAME TYPE */

$('#compete').click(function () {
    gameType.compete = $('#compete').is(':checked')
    if (gameLibrary != undefined){
        filterData(gameLibrary)}
})
$('#coop').click(function () {
    gameType.coop = $('#coop').is(':checked')
    if (gameType.coop == true) {
        solo.team = true
        $('#team').prop('checked', true)}
    if (gameLibrary != undefined){
    filterData(gameLibrary)}
})

/* SOLO VS TEAM */

$('#solo').click(function () {
    solo.solo = $('#solo').is(':checked')
    if (gameLibrary != undefined){
        filterData(gameLibrary)}
})
$('#team').click(function () {
    solo.team = $('#team').is(':checked')
    if (gameLibrary != undefined){
        filterData(gameLibrary)}
})

/* REROLL BUTTON */

$('#reroll-button').click(function () {
    chooseRandom(finalLibrary)
})

/* PARSE GAME LIBRARY FROM THE INPUT FILE */

function ParseInput(file) {
    Papa.parse(file, {header: true, complete: function(results, file){console.log('Input parsed correctly'); gameLibrary = results.data; filterData(gameLibrary)}})
}

function filterData(library) {
    document.querySelector(".library").style.visibility = "visible"
    if (gameType.coop == false && gameType.compete == false) {
        $('span.filteredGames').text("Choose at least one game type (cooperative and/or competitive)")
        document.querySelector(".filtered-pics").innerHTML = "" 
    }
    else if (solo.solo == false && solo.team == false) {
        $('span.filteredGames').text("Choose solo and/or team games") 
        document.querySelector(".filtered-pics").innerHTML = "" 
    }
    else {
        filteredLibrary = jQuery.grep(library, function(obj){ return (
            /* number of players */
            parseInt(obj.MIN_PLAYERS) <= numPlayers &&
            parseInt(obj.MAX_PLAYERS) >= numPlayers &&
            /* min-max time range needs to overlap with the time range from the read library;
            the min time is treated inclusively, the max time exclusively */
            (minTime <= parseInt(obj.MAX_TIME) && parseInt(obj.MIN_TIME) < maxTime) &&
            /* language check */
            ((langs.eng == true && langs.pl == true) ? (obj.LANGUAGE == 'ENG' || obj.LANGUAGE == "PL" || obj.LANGUAGE == "NA") : (
                langs.eng == true ? (obj.LANGUAGE == "ENG" || obj.LANGUAGE == "NA") : (
                    langs.pl == true ? (obj.LANGUAGE == "PL" || obj.LANGUAGE == "NA") : obj.LANGUAGE == "NA"))) &&
            /* game type */
            ((gameType.compete == true && gameType.coop == true) ? (obj.TYPE == "competitive" || obj.TYPE == "cooperative") : (
                gameType.compete == true ? (obj.TYPE == "competitive") : (
                    gameType.coop == true ? obj.TYPE == "cooperative" : (obj.TYPE != "competitive" && obj.TYPE != "cooperative" )))) &&
            /* complexity */
            parseInt(obj.COMPLEXITY) >= minComplex && 
            parseInt(obj.COMPLEXITY) <= maxComplex &&
            /* solo vs team */
            ((solo.solo == true && solo.team == true) ? (obj.TEAM == "no" || obj.TEAM == "yes") : (
                solo.solo == true ? (obj.TEAM == "no") : (
                    solo.team == true ? obj.TEAM == "yes" : (obj.TEAM != "yes" && obj.TEAM != "no" )))) 
        )}).map(function(obj){return obj.GAME})

        $('span.filteredGames').text("")
        document.querySelector(".filtered-pics").style.visibility = "visible"
        finalLibrary = filteredLibrary
        document.querySelector(".filtered-pics").innerHTML = "" 
        filteredLibrary.forEach(printGame)
        chooseRandom(finalLibrary)
        filteredLibrary.forEach(addListener)
    }
}

function printGame(item){
    var itemName = item.replace(/ /g, '');
    document.querySelector(".filtered-pics").innerHTML += 
    '<div class="col games-box"><div class="filtered-container" data-toggle="tooltip" data-container="body" data-placement="right" data-html="true"' +
    'title="<p><b>Players: </b>' + gameLibrary.find(x => x.GAME == item).MIN_PLAYERS + '-' + gameLibrary.find(x => x.GAME == item).MAX_PLAYERS +
    '</p><b>Time: </b>' + (parseInt(gameLibrary.find(x => x.GAME == item).MIN_TIME) +  parseInt(gameLibrary.find(x => x.GAME == item).MAX_TIME))/2 +
    '</p><p><b>Complexity: </b>' + complexValues[gameLibrary.find(x => x.GAME == item).COMPLEXITY-1] +
    '</p><p><b>Language: </b>' + gameLibrary.find(x => x.GAME == item).LANGUAGE +
    '</p>"><input class="game-check" type="checkbox" id=' + 
    itemName + ' checked /><label class="game-lab" for=' + itemName + '></label> ' + item + '</div><p class="game-name">' + item + '</p></div>'
    $('[data-toggle="tooltip"]').tooltip({delay: {"show": 1000}})
}

function addListener(item) {
    var itemName = item.replace(/ /g, '');
    toAttach = document.getElementById(itemName)
    toAttach.addEventListener("click", function(){
        let gameIndex = finalLibrary.indexOf(item)
        if (gameIndex < 0){
            finalLibrary.push(item)
        }
        else {
            finalLibrary.splice(gameIndex, 1)
            if (chosenGame == item) {
                chooseRandom(finalLibrary)
            }
        }
    });
}

function chooseRandom(games){
    chosenGame = games[Math.floor(Math.random() * games.length)]
    document.querySelector("#chosen-game").innerHTML = '<div class="col games-box"><div class="chosen-container">' + chosenGame + '</div></div>'
    document.querySelector("#reroll-button").style.visibility = "visible"
}

