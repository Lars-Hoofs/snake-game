'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface GameState {
  snake: Position[];
  food: Position;
  direction: string;
  gameOver: boolean;
  score: number;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };

const SnakeGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: 'RIGHT',
    gameOver: false,
    score: 0,
  });

  const generateFood = useCallback((snake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameOver) return prevState;

      const { snake, food, direction, score } = prevState;
      const head = { ...snake[0] };

      // Move head based on direction
      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return { ...prevState, gameOver: true };
      }

      // Check self collision
      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return { ...prevState, gameOver: true };
      }

      const newSnake = [head, ...snake];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        return {
          ...prevState,
          snake: newSnake,
          food: generateFood(newSnake),
          score: score + 1,
        };
      }

      // Remove tail if no food eaten
      newSnake.pop();

      return {
        ...prevState,
        snake: newSnake,
      };
    });
  }, [generateFood]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    setGameState(prevState => {
      if (prevState.gameOver) return prevState;

      const { direction } = prevState;
      let newDirection = direction;

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') newDirection = 'UP';
          break;
        case 'ArrowDown':
          if (direction !== 'UP') newDirection = 'DOWN';
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') newDirection = 'LEFT';
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') newDirection = 'RIGHT';
          break;
      }

      return { ...prevState, direction: newDirection };
    });
  }, []);

  const resetGame = () => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: INITIAL_FOOD,
      direction: 'RIGHT',
      gameOver: false,
      score: 0,
    });
  };

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const renderCell = (x: number, y: number) => {
    const isSnake = gameState.snake.some(segment => segment.x === x && segment.y === y);
    const isFood = gameState.food.x === x && gameState.food.y === y;
    const isHead = gameState.snake[0]?.x === x && gameState.snake[0]?.y === y;

    let cellClass = 'w-4 h-4 border border-gray-200';
    
    if (isSnake) {
      cellClass += isHead ? ' bg-green-600' : ' bg-green-400';
    } else if (isFood) {
      cellClass += ' bg-red-500';
    } else {
      cellClass += ' bg-gray-100';
    }

    return <div key={`${x}-${y}`} className={cellClass} />;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Snake Game</h1>
          <p className="text-lg text-gray-600">Score: {gameState.score}</p>
          {gameState.gameOver && (
            <div className="mt-4">
              <p className="text-xl text-red-600 font-bold">Game Over!</p>
              <button
                onClick={resetGame}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-20 gap-0 border-2 border-gray-300 mb-4">
          {Array.from({ length: GRID_SIZE }, (_, y) =>
            Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y))
          )}
        </div>
        
        <div className="text-center text-sm text-gray-600">
          <p>Use arrow keys to control the snake</p>
          <p>Eat the red food to grow and increase your score!</p>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
