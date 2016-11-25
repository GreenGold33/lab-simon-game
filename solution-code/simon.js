function SimonGame(){
  var colors = ["red", "green", "blue", "yellow"];
  var self = this;
  this.sequence;
  this.userClickCount = 0;

  this.init = function(){
    this.sequence = [];
    this.userClickCount = 0;
    this.round = 1;
    $(".counter").text("1");
    generateSequence(3);
    showSequence();

    console.log(this.sequence);

    $("button").unbind("click");
    $("button").on("click", checkUserInput);
  }

  generateSequence = function(elementNumber){
    for (var i = 0; i < elementNumber; i++) {
      self.sequence.push(colors[generateRandom()]);  
    };
  }

  showSequence = function(){
    var i = 0;
    $("section").addClass("blocked");
    var interval = setInterval(function(){
      $("button").removeClass("active");

      if(i < self.sequence.length) {
        $("." + self.sequence[i]).addClass("active");
      } else {
        clearInterval(interval);
        $("section").removeClass("blocked");
      }
      
      setTimeout(function(){
        $("button").removeClass("active");
      }, 700);

      i++;
    }, 1000);

  }

  function checkUserInput(){
    if($("section").hasClass("blocked")) {
      return false;
    }
    
    var colorInput = $(this).attr("class");
    if(self.sequence[self.userClickCount] === colorInput) {
      self.userClickCount++;
    } else {
      alert("Game over!! Try it again");
      self.init();
    }

    if(self.userClickCount === self.sequence.length) {
      finishedRound();
    }
  }

  function finishedRound(){
    generateSequence(1);
    showSequence();
    self.userClickCount = 0;
    self.round++;
    $(".counter").text(self.round);
  }

  function generateRandom(){
    return Math.floor(Math.random() * 4);
  }
}

var simon = new SimonGame();
simon.init();