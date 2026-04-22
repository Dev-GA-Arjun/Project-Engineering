import React from 'react';

function TaskItem({ task, onToggle }) {
  return (
    <li onClick={onToggle} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      {task.text}
    </li>
  );
}

export default TaskItem;