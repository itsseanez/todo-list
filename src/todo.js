import Project from './project.js';

export default class Todo extends Project {
  constructor(title, description, dueDate, priority, isCompleted = false, id = crypto.randomUUID()) {
    super();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.id = id;
    this.projectId = super.id;
  }
  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
  }
}