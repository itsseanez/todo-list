export default class Todo {
  constructor(title, description, dueDate, priority, isCompleted = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
  }
  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
  }
}