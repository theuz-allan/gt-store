// ========================================
// GT STORE ACHADINHOS — JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  // Atualiza o ano automaticamente no rodapé
  document.querySelectorAll(".year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Menu mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Fecha o menu após clicar em um link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Pesquisa e filtros do catálogo
  const productGrid = document.querySelector("#product-grid");
  const searchInput = document.querySelector("#product-search");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const resultsCount = document.querySelector("#results-count");
  const noResults = document.querySelector("#no-results");
  const clearButton = document.querySelector("#clear-filters");

  if (productGrid && searchInput) {
    const products = Array.from(productGrid.querySelectorAll(".product-card"));

    let activeCategory = "todos";

    function filterProducts() {
      const searchTerm = searchInput.value.trim().toLocaleLowerCase("pt-BR");

      let visibleCount = 0;

      products.forEach((product) => {
        const name = (
          product.dataset.name ||
          product.querySelector("h3")?.textContent ||
          ""
        ).toLocaleLowerCase("pt-BR");

        const categories = (product.dataset.category || "").split(/\s+/);

        const matchesCategory =
          activeCategory === "todos" || categories.includes(activeCategory);

        const matchesSearch = name.includes(searchTerm);

        const isVisible = matchesCategory && matchesSearch;

        product.hidden = !isVisible;

        if (isVisible) {
          visibleCount++;
        }
      });

      if (resultsCount) {
        resultsCount.textContent =
          visibleCount === 1
            ? "1 produto encontrado"
            : `${visibleCount} produtos encontrados`;
      }

      if (noResults) {
        noResults.hidden = visibleCount !== 0;
      }
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.filter || "todos";

        filterButtons.forEach((item) => {
          item.classList.remove("active");
        });

        button.classList.add("active");
        filterProducts();
      });
    });

    searchInput.addEventListener("input", filterProducts);

    if (clearButton) {
      clearButton.addEventListener("click", () => {
        searchInput.value = "";
        activeCategory = "todos";

        filterButtons.forEach((button) => {
          button.classList.toggle("active", button.dataset.filter === "todos");
        });

        filterProducts();
      });
    }

    // Permite abrir uma categoria diretamente pela URL.
    // Exemplo: produtos.html?categoria=audio
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("categoria");

    const validCategories = [
      "informatica",
      "setup",
      "celular",
      "audio",
      "perifericos",
      "gadgets",
      "outros"
    ];

    if (validCategories.includes(requestedCategory)) {
      const matchingButton = Array.from(filterButtons).find(
        (button) => button.dataset.filter === requestedCategory
      );

      if (matchingButton) {
        matchingButton.click();
      }
    } else {
      filterProducts();
    }
  }

  // Formulário demonstrativo de contato
  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      if (!contactForm.checkValidity()) {
        event.preventDefault();
        contactForm.reportValidity();
      }
    });
  }
});