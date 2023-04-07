import { FC, useEffect, useState } from 'react';
import styles from './TodoList.module.css';
import { DragDropContext } from '@hello-pangea/dnd';
import PendingTasks from '../PendingTasks/PendingTasks';
import CompletedTasks from '../CompletedTasks/CompletedTasks';
import { ApiService } from '../../services/api.service';
import { HttpStatusCode } from 'axios';

export enum Type {
  Pending,
  Completed
}

export interface Task {
  id: number;
  description: string;
  type: Type;
}

interface TodoListProps { }

const TodoList: FC<TodoListProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [input, setInput] = useState('');

  useEffect(() => {
    async function fetchUserTodoList() {
      const api = new ApiService();
      const todoList = await api.getUserTodoList(1);
      setTasks(todoList.data);
    }
    
    fetchUserTodoList();
  }, [tasks]);

  const handleTaskDoubleClick = (description: string) => {
    setInput(description);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() !== '') {
      const lastTask = tasks[tasks.length - 1];

      const newTask: Task = {
        id: lastTask ? ++lastTask.id : 1,
        description: input,
        type: Type.Pending,
      };

      const api = new ApiService();
      const result = await api.addTodo({
        userId: 1,
        description: newTask.description
      })

      if(result.status === HttpStatusCode.Created) {
        setTasks(prevTasks => [...prevTasks, newTask]);

        setInput('');
      }      
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const updatedTasks = [...tasks];
      const [removed] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, removed);
      setTasks(updatedTasks);
    }
    else {
      const sourceTasks = [...tasks];

      const [removed] = sourceTasks.splice(source.index, 1);

      const updatedTask = {
        ...removed,
        type: destination.droppableId === 'completed' ? Type.Completed : Type.Pending
      };

      sourceTasks.splice(destination.index, 0, updatedTask);

      const api = new ApiService();
      const result = await api.updateTodoType({
        userId: 1,
        todoId: updatedTask.id,
        type: updatedTask.type
      });

      if(result.status === HttpStatusCode.NoContent) {
        setTasks(sourceTasks);
      }
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter task description"
        />
        <button type="submit">Add Task</button>
      </form>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.container}>
          <PendingTasks tasks={tasks} onTaskDoubleClick={handleTaskDoubleClick} />
          <CompletedTasks tasks={tasks} onTaskDoubleClick={handleTaskDoubleClick} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default TodoList;
