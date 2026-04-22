import TaskItem from './TaskItem';  


function TaskList({ tasks, onToggle }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={() => onToggle(task.id)} />
      ))}
    </ul>
  );
}

export default TaskList;