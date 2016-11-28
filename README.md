![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# JS | Simon Game

## Learning Goals

After this learning unit, you will be able to:

- Build your own Simon game, using HTML, CSS, and JavaScript

## Introduction

Simon is a game of memory skill launched for the first time in 1978 by [Studio 54](https://en.wikipedia.org/wiki/Studio_54) in New York City. The device creates a series of tones and lights and requires a user to repeat the series. Once the user fails, the game is over.

![](https://i.imgur.com/E9EjchU.png)

If you have never played before, you can try it in this [online version](http://www.freesimon.org/). It will be very helpful to understand how does it works.

## Planning the game

Let's analyze step by step what are we going to need. The device will have 4 different buttons, distributed in a circle. On the center, we will have the counter, that will increment while the player move forward in the rounds.

To start the game, we need an engine to generate random colors. We will start by generating one color, and each round we will increase the difficulty by adding a new color randomly.

Finally, if the player fails, we have to show him/her a message indicating that the game is over, and generate a new game to start over again.

:::info
We are going to work over a possible solution. Feel free to find a better solution by your own and share it with the rest of the class :)

**// Happy coding**
:::

## First iteration: HTML

### Buttons

First of all we have to create the game layout. We are going to need four different buttons, and we should identify them uniquely by color. This buttons will trigger a function that will check out if the sequence is correct or not.

```htmlmixed=11
<button id="green"></button>
<button id="red"></button>
<button id="yellow"></button>
<button id="blue"></button>
```

We use a CSS `id` to uniquely identify each button in the HTML.

### Counter

Under the buttons we will add the counter. It will also have a unique identifier:

```htmlmixed=15
<div id="counter">1</div>
```

And that's it. This is all the HTML we need to do the simon game. The result should be something like this:

![](https://i.imgur.com/LC8JHvk.png)

### Container

We put all the code inside a section to allocate the game in the middle of the screen:

```htmlmixed=10
<section id="buttons-container">
  <button id="green"></button>
  <button id="red"></button>
  <button id="yellow"></button>
  <button id="blue"></button>
  <div id="counter">1</div>
</section>
```

Let's add some CSS to distinguish each color and the counter.

## Second iteration: CSS

### Basic buttons

The first thing we will do is to stylize the buttons. Let's add some border and size to all the buttons of the website:

```css
button {
  border: 10px solid #000;
  cursor: pointer;
  height: 300px;
  margin: 0 -2px;
  outline: none;
  padding: 0;
  width: 300px;
}
```

As you can see, we have also added a pointer cursor, we have removed some margin to set them one just behind the other, and we have created buttons with the same height and width:

![](https://i.imgur.com/9q6ZRha.png)

### Adding colors to the buttons

Before to add colors, let's take a look at the device:

![](https://i.imgur.com/8gX1Qhb.png)

You can see the button disposal, so we will have to add a border radius depending on their positions. This border radius will be applied to:

- Green: top left position
- Red: top right position
- Yellow: bottom left position
- Blue: bottom right position

We use a background color with a 40% of opacity to create the feeling of a disabled button. It will help the user to distinguish between a disabled button and an active button.

```css
#green {
  border-top-left-radius: 100%;
  background: rgba(35, 200, 82, 0.4);
}

#red {
  border-top-right-radius: 100%;
  background: rgba(254, 35, 34, 0.4);
}

#yellow {
  border-bottom-left-radius: 100%;
  background: rgba(243, 194, 16, 0.4);
}

#blue {
  border-bottom-right-radius: 100%;
  background: rgba(0, 103, 208, 0.4);
}
```

![](https://i.imgur.com/V8Jt0XL.png)

As you can see, a border-radius with 100% value will transform the div into a circle when it has the same height and width.

### Reallocating the buttons

Okay, now let's move the buttons to put the yellow/blue buttons under the green/red buttons. To do this, we just will have to add an fixed width to the container, and the buttons will be allocated automatically:

```css
section {
  margin: 0 auto;
  position: relative;
  width: 620px;
}
```

We have also centered the container in the middle of the screen through the `margin` property. This is the result:

![](https://i.imgur.com/pja7Rng.png)

### Hover and active effects

Let's create a hover effect that will set the background color with a 100% opacity:

```css
#red:hover {
  background: rgba(254, 35, 34, 1);
}

#green:hover {
  background: rgba(35, 200, 82, 1);
}

#yellow:hover {
  background: rgba(243, 194, 16, 1);
}

#blue:hover {
  background: rgba(0, 103, 208, 1);
}
```

Here you can see the hover effect over the green button:

![](https://i.imgur.com/i2GihEV.png)

### Counter

To finish this iteration, we will stylize the counter and place it in the middle of the buttons. We do this with the following CSS:

```css
#counter {
  background: #000;
  border-radius: 50%;
  box-sizing: border-box;
  color: #fff;
  font-family: Arial;
  font-size: 100px;
  line-height: 200px;
  height: 200px;
  margin-top: -100px;
  margin-left: -108px;
  position: absolute;
  left: 50%;
  text-align: center;
  top: 50%;
  width: 200px;
}
```

Now, we have all the functionality of the layout ready to start coding with JavaScript and play with our game!!

![](https://i.imgur.com/VrDOu9J.png)

## Third iteration: JavaScript

### Declare SimonGame function

First of all we will create a function to have an scope with all the functionality on it:

```javascript=
function SimonGame () {
}
```

### Define variables

We create the needed variables to execute the game. We need the following ones:

- Colors. Array with the four colors.
- Sequence. Sequence the user will have to remember.
- User Click Counter. It allows us to know which element of sequence is indicating the user.
- Round. Round of the game.

We will also create the assignment `var self = this` to manipulate elements inside the scope from outside this scope:

```javascript=2
var colors          = ["red", "green", "blue", "yellow"];
this.sequence       = [];
this.userClickCount = 0;
this.round          = 1;
var self            = this;
```

### Initialize

Now, we have to create a function that will be called to initialize the game. For the moment, it will be empty:

```javascript=8
this.init = function () {
}
```

Let's think a little bit what are we going to need to initialize the game. We will need to:

- Generate the first sequence for the game
- Show the sequence to the user
- Assign the click event to the buttons

### Generate the sequence

First of all we are going to create the function to generate the sequence. We will need to select a random element from the colors array, and insert it into the sequence array:

```javascript=
generateSequence = function (elementNumber) {
  var randomColor = Math.floor(Math.random() * 4);
  self.sequence.push(colors[randomColor]);
};
```

Now we can call the `generateSequence` function from the initialize function:

```javascript=8
this.init = function () {
  generateSequence();
};
```

### Show sequence

Once we have generated the sequence, we have to show it to the player, so he/she can know which is the sequence that the game is waiting for:

```javascript
showSequence = function () {
  var current = 0;

  var interval = setInterval(function(){
    if (!self.sequence[current]) {
      clearInterval(interval);
      return;
    }

    $("#" + self.sequence[current]).addClass("active");

    setTimeout(function(){
      $("button").removeClass("active");
    }, 700);

    current++;
  }, 1000);
};
```

As you can see, we are using a `setInterval` to add the `active` class to the current sequence button. After 700 milliseconds, a `setTimeout` is triggered to remove the class from the button.

Doing this, we have 300 milliseconds between each color highlight. We are done with this function, so we can add it to the initialize method:

```javascript=8
this.init = function () {
  generateSequence(1);
  showSequence();
};
```

Let's create the function to handle the button click event.

### Check user input

Now, we have to create the code to check if the button pressed by the player is the correct one. To do that, we will create a callback function that will be triggered when the user click the button:

```javascript
function checkUserInput () {
  var colorInput   = $(this).attr("id");
  var currentColor = self.sequence[self.userClickCount];

  if (currentColor !== colorInput) {
    // game over
  }

  self.userClickCount++;
  if(self.userClickCount === self.sequence.length) {
    // finished round
  }
}
```

As you can see, we have two different options to consider. If the user selects an incorrect color, the game will finish. We will create a game over function to do all the necessary stuff to finish the game.

The other thing we have to consider is what happens if the player has inserted correctly all the colors. In this case, the current round will finish, and we will have to go forward to the next round.

Again, we will have to create a finished round function to do all the necessary stuff to continue playing.

We can attach the event to the button and create both functions to finish our game:

```javascript=8
this.init = function () {
  generateSequence(1);
  showSequence();
  $("button").on("click", checkUserInput)
};
```

:::warning
**Remember**: When we are attaching a function to an event, we don't have to add the parenthesis to the function. If we do that, we will trigger the function :)
:::

### Finished round

Let's create a function to call it once the user finishes a round without errors. What do you think we need to go forward to the next round?

- Add a new color to the sequence
- Show the new sequence to the user
- Set up the buttons pressed by the user to zero
- Increase the current round
- Show the new round to the user

As we have been doing functions to separate each feature of our game, this function will be very easy to create:

```javascript
function finishedRound () {
  generateSequence(1);
  showSequence();
  self.userClickCount = 0;
  self.round++;
  $("#counter").text(self.round);
}
```

Easy, right? Now we just have to add this call into the `checkUserInput` function to call it once the user has inserted all the colors:

```javascript
function checkUserInput () {
  if($("section").hasClass("blocked")) {
    return false;
  }

  var colorInput   = $(this).attr("id");
  var currentColor = self.sequence[self.userClickCount];

  if (currentColor !== colorInput) {
    // game over
  }

  self.userClickCount++;
  if(self.userClickCount === self.sequence.length) {
    finishedRound();
  }
}
```

### Game Over

We need one more function to finish the functionality of our Simon, the game over function. Again, we have to think what should we do to finish a game:

- Show a message to the user to indicate that the game is over
- Create a new game, with the following considerations:
	- Reset the sequence, the round, and the user click counter
	- Show in the screen the round 1
	- Unbind the buttons before to call the `init` function

If we call the init function to initiate a new game, we will bind (again) the buttons to the `checkUserInput` function. To avoid unusual behaviour on the buttons, we have to unbind all of them before call the `init` function.

```javascript
function gameOver () {
  alert("Game over!! Try it again!!");
  self.sequence = [];
  self.userClickCount = 0;
  self.round = 1;
  $("#counter").text("1");

  $("button").unbind("click");
  self.init();
}
```

Now we just have to call the function inside the `checkUserInput` function to finish the game if the player selects a wrong color:

```javascript
function checkUserInput () {
  if($("section").hasClass("blocked")) {
    return false;
  }

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
```

We have added a `return` statement to interrupt the execution once the game is over. Try the game and see how it works! We are almost done.

### CSS Details

As you can see, the game works quite good. There is something weird on it: when the game is showing you the sequence, if you are over a button, you can't distinguish if it's active or not. This is for the `:hover` property we have defined in the CSS.

To avoid that behaviour, we will add a `blocked` class to the container of the elements while showing the sequence. The class is defined like it follows in the CSS:

```css
#buttons-container.blocked button {
  pointer-events: none;
}
```

With the [`pointer-events`](https://developer.mozilla.org/en/docs/Web/CSS/pointer-events) property you can control under what circumstances an element can become the `target` of mouse events. In this case, we prevent this `target` to the buttons inside the container, when this last element has the `blocked` class.

Now we just have to add the `blocked` class to the container while we are showing the sequence:

```javascript
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
```

**This is it, our Simon Game is already done!**

## Summary

We learnt how to solve a big problem, like a game, splitting it up into small steps. First of all we have did the HTML, then the CSS, and finally the JavaScript.

## Extra Resources

- [Simon Game](https://en.wikipedia.org/wiki/Simon_(game))
- [Simon Game online](http://www.freesimon.org/)
