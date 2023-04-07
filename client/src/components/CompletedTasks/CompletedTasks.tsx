import { FC } from 'react';
import styles from './CompletedTasks.module.css';
import { Task } from '../TodoList/TodoList';
import { Droppable, Draggable } from '@hello-pangea/dnd';

interface CompletedTasksProps {
  tasks: Task[];
  onTaskDoubleClick: (description: string) => void;
}

const CompletedTasks: FC<CompletedTasksProps> = ({ tasks, onTaskDoubleClick }) => {
  const handleTaskDoubleClick = (description: string) => {
    onTaskDoubleClick(description);
  };
  
  return (
    <Droppable droppableId="completed">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <h2>Completed Tasks</h2>
          {tasks.map((task, index) => {
            if (task.type) {
              return (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      className={styles.task}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onDoubleClick={() => handleTaskDoubleClick(task.description)}
                    >
                      {task.description}
                    </div>
                  )}
                </Draggable>
              );
            } else {
              return null;
            }
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default CompletedTasks;
