$(document).ready(function () {
    var score = 0,
        highestScore = 0;
    var timeInterval;
    var lastHighestScore = localStorage.getItem("highestScore") !== undefined ? localStorage.getItem("highestScore") : highestScore;
    $("#highest-score").text(lastHighestScore);

    // event to chnage the level of game
    $("#game-level").on("change", function () {
        var gameLevel = $("#game-level").val();
        $("#game-matrix tbody").empty();
        var tbody = '';
        for (var i = 0; i < gameLevel; i++) {
            tbody += '<tr>';
            for (var j = 0; j < gameLevel; j++) {
                tbody += '<td></td>'
            }
            tbody += '</tr>\n';
        }
        $("#game-matrix tbody").append(tbody)
    });

    // event handler to start a game
    $("#start-game").on("click", function (el) {
        (function () {
            $("#highest-score").text(lastHighestScore);
            // total time of game in seconds
            var totalTime = 120;
            var gameLevel = Number($("#game-level").val());
            var counter = function () {
                if (totalTime < 1) {
                    clearInterval(this);
                    //    setting the score in local storage
                    localStorage.setItem("highestScore", $("#highest-score").text());
                    $('#gameModal').modal('show');
                    $("#modal-score").text(score);
                }
                else {
                    // removing color from td after very 1 sec
                    $("#game-matrix tbody").find("td").removeClass("coloredTd");
                    $("#time-left").text((totalTime--) + " seconds");
                    var randomNum = Math.floor((Math.random() * ((gameLevel * gameLevel) - 1)) + 1);
                    console.log(randomNum, gameLevel)
                    // adding color to td randomly
                    var randomTd = $('td').eq(randomNum - 1).addClass("coloredTd");
                    // updating highest score evry second
                    if (score > lastHighestScore) {
                        $("#highest-score").text(score);
                    }
                }
            };
            timeInterval = setInterval(counter, 1000);
            counter();
        })();
    });

    $("#restart-game").on("click", function () {
        resetGame();
    });
    $("#restart-game-modal").on("click", function () {
        resetGame();
        $('#gameModal').modal('hide')
    });
    $("#game-matrix tbody td").on("click", function (el) {
        if ($(el.currentTarget).hasClass("coloredTd")) {
            score = score + 1;
        } else {
            score = score - 1;
        }
        $("#your-score").text(score);
    });

    // reseting the whole game to initail phase
    function resetGame() {
        clearInterval(timeInterval);
        score = 0;
        $("#game-matrix tbody").find("td").removeClass("coloredTd");
        $("#your-score").text("0");
        $("#time-left").text("120 seconds");
    }
})