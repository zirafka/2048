'use strict';

const GRID_SIZE = 16;

let gameState = {
  grid: [],
};

function createEmptyGrid() {
  return new Array(GRID_SIZE).fill(0);
}

function spawnRandomTile(grid) {
  const empty = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    if (grid[i] === 0) empty.push(i);
  }
  if (empty.length === 0) return;

  const index = empty[Math.floor(Math.random() * empty.length)];
  grid[index] = Math.random() < 0.9 ? 2 : 4;
}

function fontClass(value) {
  const len = String(value).length;
  if (len <= 2) return 'font-lg';
  if (len === 3) return 'font-md';
  if (len === 4) return 'font-sm';
  return 'font-xs';
}

function renderGrid(grid) {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, i) => {
    cell.classList.remove('tile', 'font-lg', 'font-md', 'font-sm', 'font-xs');
    cell.textContent = '';

    if (grid[i] !== 0) {
      cell.classList.add('tile', fontClass(grid[i]));
      cell.textContent = grid[i];
    }
  });
}

function initGame() {
  gameState.grid = createEmptyGrid();
  spawnRandomTile(gameState.grid);
  spawnRandomTile(gameState.grid);
  renderGrid(gameState.grid);
}

initGame();
