"use client"

import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: string
  title: string
  completed: boolean
}

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:bg-muted/50 transition-colors">
      <Checkbox
        id={task.id}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="h-5 w-5"
      />
      <label
        htmlFor={task.id}
        className={`flex-1 cursor-pointer text-sm ${
          task.completed 
            ? "line-through text-muted-foreground" 
            : "text-foreground"
        }`}
      >
        {task.title}
      </label>
    </div>
  )
}
