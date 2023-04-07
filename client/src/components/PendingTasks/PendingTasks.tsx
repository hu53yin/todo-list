import { FC } from 'react';
import styles from './PendingTasks.module.css';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Task } from '../TodoList/TodoList';

interface PendingTasksProps {
  tasks: Task[];
  onTaskDoubleClick: (description: string) => void;
}

const PendingTasks: FC<PendingTasksProps> = ({ tasks, onTaskDoubleClick }) => {
  const handleTaskDoubleClick = (description: string) => {
    onTaskDoubleClick(description);
  };

  return (
    <Droppable droppableId="pending">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <h2>Pending Tasks</h2>
          {tasks.map((task, index) => {
            if (!task.type) {
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

export default PendingTasks;
