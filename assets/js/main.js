// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header.html", "#header-container");
  loadComponent("footer.html", "#footer-container");
  setupThemeToggle();
  updateYear();
});

/**
 * Carrega um componente HTML externo e injeta no seletor desejado.
 */
function loadComponent(file, selector) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar ${file}`);
      }
      return response.text();
    })
    .then(html => {
      document.querySelector(selector).innerHTML = html;

      // Se o componente for o header, ativa o botão de tema após carregar
      if (selector === "#header-container") {
        setupThemeToggle(); // Garante que o botão funcione mesmo após carregamento dinâmico
      }
    })
    .catch(error => {
      console.error(`Erro ao carregar ${file}:`, error);
    });
}

/**
 * Configura o botão de alternância de tema e aplica a preferência salva.
 */
function setupThemeToggle() {
  const html = document.documentElement;
  const themeToggleBtn = document.querySelector("#theme-toggle");

  // Aplica tema salvo (se houver)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    html.setAttribute("data-theme", "light");
    if (themeToggleBtn) themeToggleBtn.textContent = "🌞";
  }

  // Evento de clique no botão
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isLight = html.getAttribute("data-theme") === "light";
      if (isLight) {
        html.removeAttribute("data-theme");
        themeToggleBtn.textContent = "🌙";
        localStorage.setItem("theme", "dark");
      } else {
        html.setAttribute("data-theme", "light");
        themeToggleBtn.textContent = "🌞";
        localStorage.setItem("theme", "light");
      }
    });
  }
}

/**
 * Atualiza o ano atual no rodapé.
 */
function updateYear() {
  const yearSpan = document.querySelector("#year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
