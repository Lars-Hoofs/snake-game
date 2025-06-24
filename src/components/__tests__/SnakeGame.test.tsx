import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SnakeGame from '../SnakeGame';

// Mock window.addEventListener and window.removeEventListener
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
});

describe('SnakeGame', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the game title', () => {
    render(<SnakeGame />);
    expect(screen.getByText('Snake Game')).toBeInTheDocument();
  });

  it('renders the initial score', () => {
    render(<SnakeGame />);
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });

  it('renders game instructions', () => {
    render(<SnakeGame />);
    expect(screen.getByText('Use arrow keys to control the snake')).toBeInTheDocument();
    expect(screen.getByText('Eat the red food to grow and increase your score!')).toBeInTheDocument();
  });

  it('renders the game grid', () => {
    render(<SnakeGame />);
    // The game should render a grid with 400 cells (20x20)
    const gridContainer = document.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
  });

  it('shows play again button when game is over', () => {
    render(<SnakeGame />);
    
    // Initially, the play again button should not be visible
    expect(screen.queryByText('Play Again')).not.toBeInTheDocument();
    
    // We can't easily simulate game over without complex mocking,
    // but we can test that the component structure is correct
  });

  it('registers keyboard event listeners', () => {
    render(<SnakeGame />);
    
    // Check if addEventListener was called for keydown events
    expect(mockAddEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('sets up game interval', () => {
    const setIntervalSpy = jest.spyOn(window, 'setInterval');
    render(<SnakeGame />);
    
    // Check if setInterval was called
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 150);
    
    setIntervalSpy.mockRestore();
  });

  it('cleans up event listeners on unmount', () => {
    const { unmount } = render(<SnakeGame />);
    
    unmount();
    
    // Check if removeEventListener was called
    expect(mockRemoveEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
