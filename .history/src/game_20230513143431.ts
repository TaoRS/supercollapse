import * as PIXI from "pixi.js";

export function renderGame(app: PIXI.Application) {
  // Set up game variables
  const gridWidth = 10;
  const gridHeight = 10;
  const cellSize = 50;
  const colors = [0xff0000, 0x00ff00, 0x0000ff];
  let grid = [];

  // Initialize grid with random colors
  for (let y = 0; y < gridHeight; y++) {
    let row = [];
    for (let x = 0; x < gridWidth; x++) {
      let colorIndex = Math.floor(Math.random() * colors.length);
      row.push(colors[colorIndex]);
    }
    grid.push(row);
  }

  // Draw grid on canvas
  function drawGrid() {
    // Clear the stage
    app.stage.removeChildren();

    // Draw each cell
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        let cell = new PIXI.Graphics();
        cell.beginFill(grid[y][x]);
        cell.drawRect(0, 0, cellSize, cellSize);
        cell.endFill();
        cell.x = x * cellSize;
        cell.y = y * cellSize;
        app.stage.addChild(cell);
      }
    }
  }

  // Handle clicks on the canvas
  app.view.addEventListener("click", (event) => {
    // Get the clicked cell
    let x = Math.floor(event.offsetX / cellSize);
    let y = Math.floor(event.offsetY / cellSize);

    // Collapse the clicked column
    collapseColumn(x);

    // Redraw the grid
    drawGrid();
  });

  // Collapse a column by removing all cells of the same color as the bottom cell
  function collapseColumn(x) {
    let bottomColor = grid[gridHeight - 1][x];
    for (let y = gridHeight - 1; y >= 0; y--) {
      if (grid[y][x] === bottomColor) {
        grid[y][x] = null;
      } else {
        break;
      }
    }
  }

  // Start the game by drawing the initial grid
  drawGrid();
}
