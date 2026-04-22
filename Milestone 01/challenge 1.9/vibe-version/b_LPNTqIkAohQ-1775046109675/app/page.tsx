"use client"

import { useState } from "react"
import { TaskInput } from "@/components/task-input"
import { TaskList } from "@/components/task-list"
import { FilterButtons, type FilterStatus } from "@/components/filter-buttons"

interface Task {
  id: string
  title: string
  completed: boolean
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<FilterStatus>("all")

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Tasks
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Stay organized and get things done
          </p>
        </header>

        <div className="space-y-6">
          <TaskInput onAddTask={addTask} />
          
          <FilterButtons
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />

          <TaskList tasks={filteredTasks} onToggle={toggleTask} />
        </div>
      </div>
    </main>
  )
}
