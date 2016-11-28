function SimonGame () {
  var colors          = ["red", "green", "blue", "yellow"];
  this.sequence       = [];
  this.userClickCount = 0;
  this.round          = 1;
  var self            = this;

  this.init = function(){
    generateSequence(1);
    showSequence();
    $("button").on("click", checkUserInput);
  };

  generateSequence = function (elementNumber) {
    var randomColor = Math.floor(Math.random() * 4);
    self.sequence.push(colors[randomColor]);
  };

  showSequence = function () {
    var current = 0;
    $("#buttons-container").addClass("blocked");

    var interval = setInterval(function(){
      if (!self.sequence[current]) {
        clearInterval(interval);
        $("#buttons-container").removeClass("blocked");
        return;
      }

      $("#" + self.sequence[current]).addClass("active");

      setTimeout(function(){
        $("button").removeClass("active");
      }, 700);

      current++;
    }, 1000);
  };

  function checkUserInput () {
    var colorInput   = $(this).attr("id");
    var currentColor = self.sequence[self.userClickCount];

    if (currentColor !== colorInput) {
      gameOver();
      return;
    }

    self.userClickCount++;
    if(self.userClickCount === self.sequence.length) {
      finishedRound();
    }
  }

  function finishedRound () {
    generateSequence(1);
    showSequence();
    self.userClickCount = 0;
    self.round++;
    $("#counter").text(self.round);
  }

  function gameOver () {
    alert("Game over!! Try it again");
    self.sequence = [];
    self.userClickCount = 0;
    self.round = 1;
    $("#counter").text("1");

    $("button").unbind("click");
    self.init();
  }
}

var simon = new SimonGame();
simon.init();
