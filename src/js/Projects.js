export default class Projects {
  constructor(data) {
    this.container = document.getElementById('projects');
    this.data = data;
  }

  init() {
    this.drawProjects(this.data);
  }

  drawProjects(data) {
    data.forEach((el) => {
      const project = document.createElement('tr');
      project.className = 'project-item';
      project.dataset.id = el.id;
      project.innerHTML = `
          <td class="project-name">${el.name}</td>
          <td class="project-open-counter">0</td>
        `;
      this.container.appendChild(project);
    });
  }
}
