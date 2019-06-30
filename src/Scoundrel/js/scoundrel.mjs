import World from "./world.mjs";
import Styles from "./cell-styles.mjs";

const canvas = document.getElementById("scoundrel");
const ctx = canvas.getContext("2d");

const BlockSize = 30;
canvas.width = World.getWorldWidth(BlockSize);
canvas.height = World.getWorldHeight(BlockSize);

// represent game state as a multidimensional array
const gameworld = [];

let width = canvas.width / BlockSize;
let height = canvas.height / BlockSize;

// initialize game world
for (let i = 0; i < height; i++) {
  let row = [];
  for (let j = 0; j < width; j++) {
    row.push(0);
  }
  gameworld.push(row);
}

const drawInnerSquare = (style, x, y) => {
  ctx.fillStyle = style;
  ctx.fillRect(
    x * BlockSize + 1,
    y * BlockSize + 1,
    BlockSize - 2,
    BlockSize - 2
  );
};

const drawSprite = (image, x, y) => {
  const img = new Image(28, 28);
  img.onload = () => {
    ctx.drawImage(img, x * BlockSize + 1, y * BlockSize + 1);
  };
  img.src = `./assets/${image}.png`;
};

// test draw mechanism - move into world class as drawWorld method
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    ctx.fillStyle = Styles.border;
    ctx.fillRect(j * BlockSize, i * BlockSize, BlockSize, BlockSize);
    if (i == 0 && j == 0) {
      drawSprite("hero", j, i);
      continue;
    }
    // create grid
    if (i % 3 !== 0) {
      drawInnerSquare(Styles.empty, j, i);
    } else {
      drawInnerSquare(Styles.wall, j, i);
    }
  }
}

document.getElementById("status").innerText += "\nScoundrel loaded!\n";

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
// TODO: make status bar bigger + user interactive, ask "what's in my inventory" (move it to the right side for space?)
