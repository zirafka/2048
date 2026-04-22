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

function mergeRow(row) {
  const tiles = row.filter(v => v !== 0);
  const result = [];
  let i = 0;
  while (i < tiles.length) {
    if (i + 1 < tiles.length && tiles[i] === tiles[i + 1]) {
      result.push(tiles[i] * 2);
      i += 2;
    } else {
      result.push(tiles[i]);
      i++;
    }
  }
  while (result.length < 4) result.push(0);
  return result;
}

function moveLeft(grid) {
  const before = grid.slice();
  for (let r = 0; r < 4; r++) {
    const start = r * 4;
    const newRow = mergeRow(grid.slice(start, start + 4));
    for (let c = 0; c < 4; c++) {
      grid[start + c] = newRow[c];
    }
  }
  const changed = grid.some((v, i) => v !== before[i]);
  console.log('moveLeft', { before, after: grid.slice(), changed });
  return changed;
}

function initGame() {
  gameState.grid = createEmptyGrid();
  spawnRandomTile(gameState.grid);
  spawnRandomTile(gameState.grid);
  renderGrid(gameState.grid);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    moveLeft(gameState.grid);
    renderGrid(gameState.grid);
  }
});

initGame();
