import { useState } from 'react';

import classes from './Grid.module.css';
import Item from './Item';

const selectFirstPlayer = () => {
  return Math.ceil(Math.random() * 1000) % 2 === 1 ? 'X' : 'O';
};

const selectCurrentTurn = (current) => {
  return current === 'X' ? 'O' : 'X';
};

const isFilled = (gridPosition) => {
  return gridPosition === 'X' || gridPosition === 'O';
};

const checkWinner = (grid) => {
  for (let i = 0; i < 3; i++) {
    // COLUMN
    if (
      isFilled(grid[i]) &&
      grid[i] === grid[i + 3] &&
      grid[i] === grid[i + 6]
    ) {
      return true;
    }
  }

  for (let i = 0; i < 9; i = i + 3) {
    // ROW
    if (
      isFilled(grid[i]) &&
      grid[i] === grid[i + 1] &&
      grid[i] === grid[i + 2]
    ) {
      return true;
    }
  }

  // DIAGONAL
  if (
    isFilled(grid[4]) &&
    ((grid[0] === grid[4] && grid[0] === grid[8]) ||
      (grid[2] === grid[4] && grid[2] === grid[6]))
  ) {
    return true;
  }

  return false;
};

const Grid = () => {
  const [grid, setGrid] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState(selectFirstPlayer());
  const [message, setMessage] = useState('');
  const [boardLocked, setBoardLocked] = useState(false);

  const onClickItemHandler = (position) => {
    if (boardLocked) {
      return;
    }

    if (grid[position]) {
      setMessage('Please click a different position');
      return;
    }

    grid[position] = turn;

    if (checkWinner(grid)) {
      setMessage('Congratulations ' + turn + '!!');
      setBoardLocked(true);
      return;
    }

    setTurn(selectCurrentTurn(turn));
    setGrid(grid);
  };

  const resetGameHandler = () => {
    setGrid(Array(9).fill(''));
    setMessage('');
    setTurn(selectFirstPlayer());
    setBoardLocked(false);
  };

  return (
    <>
      <div className={classes.grid}>
        {grid.map((item, i) => (
          <Item
            key={i}
            onClickItem={() => onClickItemHandler(i)}
            value={item}
          />
        ))}
      </div>
      <h3>{message}</h3>
      <button className={classes.reset} onClick={resetGameHandler}>Reset Game</button>
    </>
  );
};

export default Grid;
