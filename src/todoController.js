import Todo from './todo.js';
import projectController from './projectController.js';

export default (() => {
    let dialog = document.querySelector('dialog');

    function createTodoDialog() {
        const dialog = document.createElement('dialog');

        // FORM
        const form = document.createElement('form');
        form.id = 'todo-form';
        form.method = 'dialog';

        // --- Title ---
        const titleDiv = document.createElement('div');
        const titleLabel = document.createElement('label');
        titleLabel.setAttribute('for', 'title');
        titleLabel.textContent = 'Title:';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'title';
        titleInput.name = 'title';
        titleInput.required = true;
        titleDiv.appendChild(titleLabel);
        titleDiv.appendChild(titleInput);

        // --- Description ---
        const descDiv = document.createElement('div');
        const descLabel = document.createElement('label');
        descLabel.setAttribute('for', 'description');
        descLabel.textContent = 'Description:';
        const descTextarea = document.createElement('textarea');
        descTextarea.id = 'description';
        descTextarea.name = 'description';
        descTextarea.required = true;
        descDiv.appendChild(descLabel);
        descDiv.appendChild(descTextarea);

        // --- Due Date ---
        const dateDiv = document.createElement('div');
        const dateLabel = document.createElement('label');
        dateLabel.setAttribute('for', 'due-date');
        dateLabel.textContent = 'Due Date:';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.id = 'due-date';
        dateInput.name = 'due-date';
        dateInput.required = true;
        dateDiv.appendChild(dateLabel);
        dateDiv.appendChild(dateInput);

        // --- Priority ---
        const priorityDiv = document.createElement('div');
        const priorityLabel = document.createElement('label');
        priorityLabel.setAttribute('for', 'priority');
        priorityLabel.textContent = 'Priority:';

        const prioritySelect = document.createElement('select');
        prioritySelect.id = 'priority';
        prioritySelect.name = 'priority';
        prioritySelect.required = true;

        const low = new Option('Low', 'Low');
        const medium = new Option('Medium', 'Medium');
        const high = new Option('High', 'High');
        prioritySelect.append(low, medium, high);

        priorityDiv.append(priorityLabel, prioritySelect);

        // --- Buttons ---
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('form-buttons');

        const submitBtn = document.createElement('button');
        submitBtn.id = 'submit-todo';
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Add Todo';

        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.classList.add('svg-button');
        cancelBtn.id = 'cancel-btn';
        cancelBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>delete-forever-outline</title>
            <path d="M14.12,10.47L12,12.59L9.87,10.47L8.46,11.88L10.59,14L8.47,16.12L9.88,17.53L12,15.41L14.12,17.53L15.53,16.12L13.41,14L15.53,11.88L14.12,10.47M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9Z"/>
        </svg>
    `;

        buttonDiv.append(submitBtn, cancelBtn);

        // Assemble form
        form.append(
            titleDiv,
            descDiv,
            dateDiv,
            priorityDiv,
            buttonDiv
        );

        // Add form to dialog
        dialog.appendChild(form);

        // Finally, return the dialog element so you can append it anywhere
        return dialog;
    }


    const mainContent = document.getElementById('main-content');
    const addTodoButton = document.getElementById('add-todo-button');

    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.addEventListener('click', () => {
        const dialog = document.querySelector('dialog');
        dialog.close();
    });

    function openTodoForm() {
        //dialog = document.querySelector('dialog');
        dialog.showModal();
    }

    addTodoButton.addEventListener('click', openTodoForm);

    const submitTodoButton = document.getElementById('submit-todo');
    submitTodoButton.addEventListener('click', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;
        const newTodo = new Todo(title, description, dueDate, priority);

        const project = projectController.getCurrentProject();
        project.addTodo(newTodo);

        renderTodos(project);

    });

    function renderTodos(project) {

        mainContent.innerHTML = '';
        const newTodoButton = document.createElement('button');
        newTodoButton.textContent = '+New Todo';
        newTodoButton.id = 'add-todo-button';
        mainContent.appendChild(newTodoButton);
        project.viewTodos().forEach(todo => {

            let dialog = createTodoDialog();
            mainContent.appendChild(dialog);

            const submitTodoButton = document.getElementById('submit-todo');
            submitTodoButton.addEventListener('click', (e) => {
                e.preventDefault();

                const title = document.getElementById('title').value;
                const description = document.getElementById('description').value;
                const dueDate = document.getElementById('due-date').value;
                const priority = document.getElementById('priority').value;
                const newTodo = new Todo(title, description, dueDate, priority);

                const project = projectController.getCurrentProject();
                project.addTodo(newTodo);

                renderTodos(project);

            });

            newTodoButton.addEventListener('click', () => {
                dialog.showModal();
            });

            const todoElement = document.createElement('div');
            const todoTitle = document.createElement('h3');
            todoTitle.textContent = todo.title;
            todoElement.appendChild(todoTitle);

            const todoDescription = document.createElement('p');
            todoDescription.textContent = `Description: ${todo.description}`;
            todoElement.appendChild(todoDescription);

            const todoDueDate = document.createElement('p');
            todoDueDate.textContent = `Due Date: ${todo.dueDate}`;
            todoElement.appendChild(todoDueDate);

            const todoPriority = document.createElement('p');
            todoPriority.textContent = `Priority: ${todo.priority}`;
            todoElement.appendChild(todoPriority);

            const todoCompletion = document.createElement('button');
            todoCompletion.textContent = todo.isCompleted ? 'Completed' : 'Not Completed';
            if (todo.isCompleted) {
                todoCompletion.classList.add('clicked');
            }
            todoCompletion.addEventListener('click', () => {
                todo.toggleCompletion();
                todoCompletion.textContent = todo.isCompleted ? 'Completed' : 'Not Completed';
                todoCompletion.classList.toggle('clicked');
            });

            const delBtn = document.createElement('button');
            delBtn.classList.add('svg-button');
            delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-forever-outline</title><path d="M14.12,10.47L12,12.59L9.87,10.47L8.46,11.88L10.59,14L8.47,16.12L9.88,17.53L12,15.41L14.12,17.53L15.53,16.12L13.41,14L15.53,11.88L14.12,10.47M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9Z" /></svg>`;
            delBtn.addEventListener('click', () => {
                project.removeTodo(project.todos.indexOf(todo));
                mainContent.removeChild(todoElement);
            });
            todoElement.appendChild(delBtn);

            todoElement.appendChild(todoCompletion);
            todoElement.classList.add('todo-item');

            const btnDiv = document.createElement('div');
            btnDiv.classList.add('project-button-container');
            todoElement.appendChild(delBtn);
            todoElement.appendChild(todoCompletion);
            todoElement.appendChild(btnDiv);
            mainContent.appendChild(todoElement);
        });
    }

})();