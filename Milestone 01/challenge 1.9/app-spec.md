Task Manager App Specification

This document defines the exact feature set that must be implemented in both the vibe version and the pair version of the application.

The purpose of this assignment is to ensure a fair and accurate comparison between the two development approaches. Therefore, both versions must strictly follow the same requirements.

Core Features
Add a Task
Users can enter a task title in an input field.
A task is added when:
The user clicks the "Add" button, or
Presses the Enter key.
The newly added task should appear immediately in the task list.

Mark Task as Complete
Users can click on a task to toggle its status:
Active → Completed
Completed → Active
Completed tasks must be visually distinct:
Example: strikethrough text or reduced opacity.

Filter Tasks
Provide three filter options:
All
Active
Completed
Selecting a filter should update the visible task list accordingly.

Task Counter
Display a dynamic counter below the task list:
Format: "X tasks remaining"
The count should update automatically when:
Tasks are added
Tasks are marked as completed or active

User Interface Requirements

The UI should be simple, clean, and functional. It must include:

A clear header/title for the app
An input section with:
Text input field
Add button
A task list displaying all tasks
Filter controls (above or below the list)
A task counter at the bottom

Out of Scope (Do NOT implement)

To maintain consistency across both versions, the following features must NOT be included:

Data persistence (tasks reset on refresh)
Authentication (no login/signup)
Backend or APIs
Routing or multiple pages
Objective of the Assignment

The goal is not to build the most advanced application.

Instead, the goal is to:

Build the same application twice
Use two different approaches:
Vibe coding (full generation)
AI pair programming (incremental development)
Compare differences in:
Speed
Control
Code quality
Explainability
Editability
