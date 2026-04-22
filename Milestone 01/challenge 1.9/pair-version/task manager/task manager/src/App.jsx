import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskInput onAddTask={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} />
    </div>
  );
}

export default App;