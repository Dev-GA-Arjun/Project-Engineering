"use client"

import { TaskItem } from "@/components/task-item"

interface Task {
  id: string
  title: string
  completed: boolean
}

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
}

export function TaskList({ tasks, onToggle }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No tasks to display</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </div>
  )
}
