const canvas = document.getElementById("scoundrel");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// represent game state as a multidimensional array
const gameworld = [];

// assume 16:9 aspect ratio, with a 20x20 pixel "block"- probably should be finetuned later
let width = canvas.width / 20;
let height = canvas.height / 20;

// initialize game world
for (let i = 0; i < height; i++) {
  let row = [];
  for (let j = 0; j < width; j++) {
    row.push(0);
  }
  gameworld.push(row);
}

// test draw mechanism
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    ctx.fillStyle = "black";
    ctx.fillRect(j * 20, i * 20, 20, 20);
    if ((i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)) {
      ctx.fillStyle = "white";
      ctx.fillRect(j * 20, i * 20, 5, 5);
    }
  }
}

console.log(gameworld);

// generate random set of rooms and passages
/*
    Room walls are represented by an integer 1.
    Room floors are represented by 2.
    Passages are represented by 3.
    Exit is represented as 'E'.
    Player is represented as 'P'.
    Giant Rat is represented as 'R'.
    Gold is represented as 'G'.
    A weapon is represented as 'W'.
    A health potion is represented as 'H'.
    
    All these will have corresponding colors / sprites to draw, but it knows what to draw based on the value in the gameworld array
*/

// populate world with goodies
// create player object
// make initial draw call
// wait for player input and then draw
