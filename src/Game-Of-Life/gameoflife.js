const boardsize = 900;
const cellwidth = 30;

// 25% chance of living
const getRandomBoolean = () => {
    const rand = Math.random()
    if (rand > 0.75) {
        return true;
    } else {
        return false;
    }
}

const colorField = (cells, ctx) => {
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            if (cells[i][j]) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(j * cellwidth, i * cellwidth, cellwidth, cellwidth);
            }
        }
    }
}

const calculateAdjacent = (posX, posY, cells) => {
    let adj = 0;

    if (posX != 0 && posY != 0 && cells[posY - 1][posX - 1]) {
        adj++;
    }

    if (posY != 0 && cells[posY - 1][posX]) {
        adj++;
    }

    if (posY != 0 && posX != 29 && cells[posY - 1][posX + 1]) {
        adj++;
    }

    if (posX != 0 && cells[posY][posX - 1]) {
        adj++
    }

    if (posX != 29 && cells[posY][posX + 1]) {
        adj++;
    }

    if (posX != 0 && posY != 29 && cells[posY + 1][posX - 1]) {
        adj++;
    }

    if (posY != 29 && cells[posY + 1][posX]) {
        adj++;
    }

    if (posY != 29 && posX != 29 && cells[posY + 1][posX + 1]) {
        adj++;
    }

    return adj;
}

const computeLiving = (cells) => {
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            const adj = calculateAdjacent(j, i, cells);
            if (adj < 2 || adj > 3) {
                cells[i][j] = false; // cell is dead
            } else {
                cells[i][j] = true; // cell is alive
            }
        }
    }
}

window.onload = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const cells = [];

    for (let i = 0; i < 30; i++) {
        const cellRow = [];
        for (let j = 0; j < 30; j++) {
            cellRow.push(getRandomBoolean());
        }
        cells.push(cellRow);
    }

    console.log(cells);

    canvas.width = boardsize;
    canvas.height = boardsize;

    const animate = () => {
        ctx.fillStyle = "#606060";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        computeLiving(cells);
        colorField(cells, ctx);

        // half second long ticks
        setTimeout(() => {
            requestAnimationFrame(() => {
                console.log("yeeeet")
                animate();
            });
        }, 5000);
    }

    animate();
};
