// js/projects.js

document.addEventListener("DOMContentLoaded", () => {
  carregarProjetos();
});

function carregarProjetos() {
  fetch("./assets/data/projects.json")
  .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar projetos.");
      }
      return response.json();
    })
    .then(projetos => {
      const container = document.getElementById("projects-container");

      projetos.forEach(proj => {
        const card = document.createElement("div");
        card.classList.add("project-card");

        card.innerHTML = `
          <h4>${proj.titulo}</h4>
          <p>${proj.descricao}</p>
          <div class="project-links">
            <a href="${proj.link}" target="_blank">🔗 Ver online</a>
            <a href="${proj.codigo}" target="_blank">💻 Código-fonte</a>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => console.error("Erro ao renderizar projetos:", error));
}
