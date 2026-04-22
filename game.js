'use strict';

// 1D array of 16 values; index = row * 4 + col; 0 = empty
const GRID_SIZE = 16;

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

// debug
const debugGrid = [
  2,     4,   0,   0,
  0,   128,   0,   0,
  0,     0,   0,2048,
  0,     0,   0,65536,
];
renderGrid(debugGrid);
