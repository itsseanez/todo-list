import todo from './todo.js';
import project from './project.js';

let todo1 = new todo('Sample Todo', 'This is a sample todo item', '2024-12-31', 'High', false);
let project1 = new project('Sample Project');

project1.addTodo(todo1);
console.log(todo1);
console.log(project1);