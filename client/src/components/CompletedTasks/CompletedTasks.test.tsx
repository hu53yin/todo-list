import { render, screen } from '@testing-library/react';
import CompletedTasks from './CompletedTasks';
import { Type } from '../TodoList/TodoList';
import { DragDropContext } from '@hello-pangea/dnd';

describe('CompletedTasks component', () => {
  const tasks = [
    { id: 1, description: 'Task 1', type: Type.Completed },
    { id: 2, description: 'Task 2', type: Type.Completed },
  ];

  const onTaskDoubleClick = jest.fn();

  it('renders the completed tasks header', () => {
    render(
      <DragDropContext onDragEnd={console.log}>
        <CompletedTasks tasks={tasks} onTaskDoubleClick={onTaskDoubleClick} />
      </DragDropContext>      
    );
    expect(screen.getByText('Completed Tasks')).toBeInTheDocument();
  });

  it('renders the completed tasks list', () => {
    render(
      <DragDropContext onDragEnd={console.log}>
        <CompletedTasks tasks={tasks} onTaskDoubleClick={onTaskDoubleClick} />
      </DragDropContext>      
    );
    tasks.forEach((task) => {
      expect(screen.getByText(task.description)).toBeInTheDocument();
    });
  });

  it('calls the onTaskDoubleClick function with the correct description when a task is double-clicked', () => {
    render(
      <DragDropContext onDragEnd={console.log}>
        <CompletedTasks tasks={tasks} onTaskDoubleClick={onTaskDoubleClick} />
      </DragDropContext>
    );
    const taskElement = screen.getByText(tasks[0].description);
    taskElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    expect(onTaskDoubleClick).toHaveBeenCalledWith(tasks[0].description);
  });
});