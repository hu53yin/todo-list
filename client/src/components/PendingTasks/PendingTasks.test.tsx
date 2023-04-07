import { render, screen } from '@testing-library/react';
import PendingTasks from './PendingTasks';
import { DragDropContext } from '@hello-pangea/dnd';
import { Type } from '../TodoList/TodoList';

describe('PendingTasks component', () => {
  const tasks = [
    { id: 1, description: 'Task 1', type: Type.Pending },
    { id: 2, description: 'Task 2', type: Type.Pending },
    { id: 3, description: 'Task 3', type: Type.Completed },
  ];

  const onTaskDoubleClick = jest.fn();

  it('renders the pending tasks header', () => {
    render(
      <DragDropContext onDragEnd={console.log}>
        <PendingTasks tasks={tasks} onTaskDoubleClick={onTaskDoubleClick} />
      </DragDropContext>
    );
    expect(screen.getByText('Pending Tasks')).toBeInTheDocument();
  });

  it('renders the pending tasks list', () => {
    render(
      <DragDropContext onDragEnd={console.log}>
        <PendingTasks tasks={tasks} onTaskDoubleClick={onTaskDoubleClick} />
      </DragDropContext>      
    );
    const pendingTasks = tasks.filter((task) => !task.type);
    pendingTasks.forEach((task) => {
      expect(screen.getByText(task.description)).toBeInTheDocument();
    });
  });

  it('does not render completed tasks', () => {
    render(
      <DragDropContext onDragEnd={console.log}>
        <PendingTasks tasks={tasks} onTaskDoubleClick={onTaskDoubleClick} />
      </DragDropContext>      
    );
    const completedTasks = tasks.filter((task) => task.type === Type.Completed);
    completedTasks.forEach((task) => {
      expect(screen.queryByText(task.description)).not.toBeInTheDocument();
    });
  });

  it('calls the onTaskDoubleClick function with the correct description when a task is double-clicked', () => {
    render(
      <DragDropContext onDragEnd={console.log}>
        <PendingTasks tasks={tasks} onTaskDoubleClick={onTaskDoubleClick} />
      </DragDropContext>      
    );
    const taskElement = screen.getByText(tasks[0].description);
    taskElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    expect(onTaskDoubleClick).toHaveBeenCalledWith(tasks[0].description);
  });
});
