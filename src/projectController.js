import Project from "./project";

export default (() => {
    const addProjectButton = document.getElementById('add-project-button');
    addProjectButton.addEventListener('click', addProjectHandler);

    function addProjectHandler() {
        const projectList = document.getElementById('project-list');
        const projectDiv = document.createElement('div');
        const inputProjectName = document.createElement('input');
        const saveProjectButton = document.createElement('button');

        saveProjectButton.id = 'save-project-button';

        inputProjectName.setAttribute('type', 'text');
        inputProjectName.setAttribute('placeholder', 'Project Name');
        saveProjectButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-circle-outline</title><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" /></svg>`;

        projectDiv.appendChild(inputProjectName);
        projectDiv.appendChild(saveProjectButton);

        saveProjectButton.addEventListener('click', () => {
            const projectName = inputProjectName.value.trim();
            if (projectName !== '') {
                const project = new Project(projectName);
                projectDiv.textContent = project.name;
                return project;
            }
        });

        projectDiv.classList.add('project');

        projectList.appendChild(projectDiv);
    }

    return { addProjectHandler }
})();