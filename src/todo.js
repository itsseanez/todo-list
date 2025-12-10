import Project from './project.js';

export default class Todo {
  constructor(title, description, dueDate, priority, isCompleted = false, id = crypto.randomUUID(), projectId = null) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.id = id;
    this.projectId = Project.id;
  }
  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
  }
}