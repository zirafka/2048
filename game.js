'use strict';

const GRID_SIZE = 16;

let gameState = {
  grid: [],
  score: 0,
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

function renderScore(score) {
  document.getElementById('score').textContent = score;
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
  let score = 0;
  let i = 0;
  while (i < tiles.length) {
    if (i + 1 < tiles.length && tiles[i] === tiles[i + 1]) {
      const merged = tiles[i] * 2;
      result.push(merged);
      score += merged;
      i += 2;
    } else {
      result.push(tiles[i]);
      i++;
    }
  }
  while (result.length < 4) result.push(0);
  return [result, score];
}

function getLanes(direction) {
  if (direction === 'left' || direction === 'right') {
    return [[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]];
  }
  if (direction === 'up' || direction === 'down') {
    return [[0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15]];
  }
  throw new Error(`Unknown direction: ${direction}`);
}

function move(grid, direction) {
  const before = grid.slice();
  const reversed = direction === 'right' || direction === 'down';
  const lanes = getLanes(direction);
  let gained = 0;

  for (const indices of lanes) {
    let values = indices.map(i => grid[i]);
    if (reversed) values.reverse();
    let [newValues, rowScore] = mergeRow(values);
    if (reversed) newValues.reverse();
    indices.forEach((idx, j) => { grid[idx] = newValues[j]; });
    gained += rowScore;
  }

  const changed = grid.some((v, i) => v !== before[i]);
  if (changed) gameState.score += gained;
  return changed;
}

function initGame() {
  gameState.grid = createEmptyGrid();
  gameState.score = 0;
  spawnRandomTile(gameState.grid);
  spawnRandomTile(gameState.grid);
  renderGrid(gameState.grid);
  renderScore(gameState.score);
}

const KEY_MAP = {
  ArrowLeft: 'left',  ArrowRight: 'right',
  ArrowUp:   'up',    ArrowDown:  'down',
  a: 'left', A: 'left',
  d: 'right', D: 'right',
  w: 'up',   W: 'up',
  s: 'down', S: 'down',
};

document.addEventListener('keydown', (e) => {
  const direction = KEY_MAP[e.key];
  if (!direction) return;
  e.preventDefault();
  const changed = move(gameState.grid, direction);
  if (changed) {
    spawnRandomTile(gameState.grid);
    renderGrid(gameState.grid);
    renderScore(gameState.score);
  }
});

initGame();
