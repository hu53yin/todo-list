import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList component', () => {
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSpy = jest.spyOn(window, 'fetch');
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it('renders the todo list header', () => {
    render(<TodoList />);

    expect(screen.getByRole('heading', { name: /todo list/i })).toBeInTheDocument();
  });

  it('renders the input form to add new tasks', () => {
    render(<TodoList />);

    expect(screen.getByPlaceholderText(/enter task description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });
});
