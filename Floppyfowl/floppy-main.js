window.onload = () => {
  // init canvas API
  const canvas = document.getElementById("floppy-fowl");
  const ctx = canvas.getContext("2d");

  // fullscreen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // player starting position and speed
  let yAxis = 400;
  let yVelocity = 0;

  // variables for tracking game state
  let pts = 0;
  let ticks = 0;
  let gameOver = false;

  // where pipes are stored
  const pipes = [];

  class Pipe {
    constructor(xPos) {
      this.xPos = xPos;
      this.width = 120;
      this.minGap = 300;
      this.velocity = 6;
      this.gap = this.getGap();
      this.passed = false;
    }

    draw() {
      ctx.fillStyle = "green";
      ctx.fillRect(this.xPos, 0, this.width, this.gap.top);
      ctx.fillRect(
        this.xPos,
        this.gap.bottom,
        this.width,
        canvas.height - this.gap.bottom
      );
    }

    getGap() {
      let gap = Math.random() * canvas.height;
      if (gap + this.minGap > canvas.height) {
        gap -= this.minGap * 1.5;
      }
      return {
        top: gap,
        bottom: gap + this.minGap
      };
    }

    getPosition() {
      return this.xPos;
    }

    hasPassed() {
      return this.passed;
    }

    setPassed() {
      this.passed = true;
    }

    updatePosition() {
      this.xPos -= this.velocity;
    }

    hasCollided(playerPos) {
      if (
        (playerPos > this.gap.top || playerPos < this.gap.bottom) &&
        this.xPos >= 140 &&
        this.xPos <= 200
      ) {
        return true;
      }
    }
  }

  const animate = () => {
    // wipe screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw player
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(200, yAxis, 30, 0, Math.PI * 2);
    ctx.fill();

    // calculate gravity
    yVelocity += 0.4;
    yAxis += yVelocity;

    pipes.forEach(pipe => {
      pipe.draw();
      pipe.updatePosition();

      // has the player gotten past this pipe yet
      if (!pipe.hasPassed()) {
        if (pipe.getPosition() <= 170) {
          pts++;
          pipe.setPassed();
        }
        if (pipe.getPosition() < canvas.width) {
          delete pipe;
        }
      }

      if (pipe.hasCollided(yAxis)) {
        endGame();
      }
    });

    // hit detection on screen edges
    if (yAxis >= canvas.height || yAxis <= 0) {
      endGame();
    }

    ticks++;
    if (ticks % 110 == 0) {
      let pipe = new Pipe(canvas.width);
      pipes.push(pipe);
    }
    if (!gameOver) {
      requestAnimationFrame(animate);
    }
  };

  document.addEventListener("click", () => {
    yVelocity -= 12;
  });

  const endGame = () => {
    alert(`You got ${pts} points. Better luck next time!`);
    gameOver = true;
  };

  animate();
};
