import Project from "./project";
import todoController from "./todoController";
import todo from "./todo.js";

export default (() => {
    const projectArray = [];
    let currentProject = null;
    const addProjectButton = document.getElementById('add-project-button');
    const projectList = document.getElementById('project-list');

    // Event listener for adding a new project
    addProjectButton.addEventListener('click', addProjectHandler);

    // --- FUNCTIONS ---
    //Create new project and add to project list
    function addNewProject(name) {
        const project = new Project(name);
        projectArray.push(project);
        currentProject = project;
        
        return project;
    }

    //return current project based on viewed project
    function getCurrentProject() {
        return currentProject;
    }

    function addProjectHandler() {
        // Create project container
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        // Create input + save button
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Project Name';

        const saveBtn = document.createElement('button');
        saveBtn.classList.add('svg-button');
        saveBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>save</title>
                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"/>
            </svg>`;

        const delBtn = document.createElement('button');
        delBtn.classList.add('svg-button');
        delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-forever-outline</title><path d="M14.12,10.47L12,12.59L9.87,10.47L8.46,11.88L10.59,14L8.47,16.12L9.88,17.53L12,15.41L14.12,17.53L15.53,16.12L13.41,14L15.53,11.88L14.12,10.47M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9Z" /></svg>`;

        const btnDiv = document.createElement('div');
        btnDiv.classList.add('project-button-container');
        btnDiv.appendChild(saveBtn);
        btnDiv.appendChild(delBtn);

        projectDiv.appendChild(input);
        projectDiv.appendChild(btnDiv);
        projectList.appendChild(projectDiv);

        // Delete project button click
        delBtn.addEventListener('click', () => {
            projectList.removeChild(projectDiv);
        });

        // Save project button click
        saveBtn.addEventListener('click', () => {
            const name = input.value.trim();
            if (!name) return;

            const project = new Project(name);
            projectDiv.dataset.id = project.id;

            currentProject = project;

            projectDiv.classList.add('active-project');
            const projects = document.querySelectorAll('.project');
            projects.forEach(proj => {
                if (proj.dataset.id !== projectDiv.dataset.id) {
                    proj.classList.remove('active-project');
                }
            });

            projectArray.push(project);

            // Clear and render project label + edit button
            renderProject(projectDiv, project);
            console.log('Current Project:', currentProject);
            todoController.renderTodos(project);

        });
    }


    function renderProject(projectDiv, project) {
        //return current project based on viewed project
        projectDiv.innerHTML = '';

        const label = document.createElement('p');
        label.textContent = project.name;

        const btnDiv = document.createElement('div');
        btnDiv.classList.add('project-button-container');

        const editBtn = document.createElement('button');
        editBtn.classList.add('svg-button', 'edit-project-button');
        editBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>edit</title>
                <path d="M18.13 12L19.39 10.74C19.83 10.3 20.39 10.06 21 10V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H11V19.13L11.13 19H5V5H12V12H18.13M14 4.5L19.5 10H14V4.5M19.13 13.83L21.17 15.87L15.04 22H13V19.96L19.13 13.83M22.85 14.19L21.87 15.17L19.83 13.13L20.81 12.15C21 11.95 21.33 11.95 21.53 12.15L22.85 13.47C23.05 13.67 23.05 14 22.85 14.19Z"/>
            </svg>`;

        const viewBtn = document.createElement('button');
        viewBtn.classList.add('svg-button');
        viewBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>view-list</title><path d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z" /></svg>`;

        projectDiv.appendChild(label);
        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(viewBtn);
        projectDiv.appendChild(btnDiv);

        // Attach edit functionality
        editBtn.addEventListener('click', () => editProject(projectDiv, project));

        // Attach view functionality
        viewBtn.addEventListener('click', () => {
            currentProject = project;

            // Highlight active project

            viewBtn.parentElement.parentElement.classList.add('active-project');
            const projects = document.querySelectorAll('.project');
            projects.forEach(proj => {
                if (proj.dataset.id !== viewBtn.parentElement.parentElement.dataset.id) {
                    proj.classList.remove('active-project');
                }
            });

            todoController.renderTodos(project);
        });
        return projectDiv;
    }

    function editProject(projectDiv, project) {
        const currentName = project.name;
        projectDiv.innerHTML = '';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentName;

        const saveBtn = document.createElement('button');
        saveBtn.classList.add('svg-button');
        saveBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>save</title>
                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"/>
            </svg>`;

        projectDiv.appendChild(input);
        projectDiv.appendChild(saveBtn);

        const delBtn = document.createElement('button');
        delBtn.classList.add('svg-button');
        delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-forever-outline</title><path d="M14.12,10.47L12,12.59L9.87,10.47L8.46,11.88L10.59,14L8.47,16.12L9.88,17.53L12,15.41L14.12,17.53L15.53,16.12L13.41,14L15.53,11.88L14.12,10.47M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9Z" /></svg>`;

        const btnDiv = document.createElement('div');
        btnDiv.classList.add('project-button-container');
        btnDiv.appendChild(saveBtn);
        btnDiv.appendChild(delBtn);

        delBtn.addEventListener('click', () => {
            projectList.removeChild(projectDiv);
        });

        projectDiv.appendChild(input);
        projectDiv.appendChild(btnDiv);

        saveBtn.addEventListener('click', () => {
            const newName = input.value.trim();
            if (!newName) return;

            project.updateName(newName);
            renderProject(projectDiv, project);
        });
    }
    return { getCurrentProject, addNewProject, renderProject };
})();
