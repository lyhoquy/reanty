/**
 * Reanty - Client-side Data Hydration & Interactions
 * Pure Vanilla JavaScript (No Framework)
 * Loads data dynamically from decoupled data/*.json files
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Load properties / stays dynamically from data/stays.json
  const propertyGrid = document.querySelector(".property-grid");
  const propertyTabs = document.querySelectorAll(".property-types a");
  let allProperties = [];

  async function loadStays() {
    try {
      const response = await fetch("./data/stays.json");
      if (!response.ok) return;
      const data = await response.json();
      if (Array.isArray(data.properties) && data.properties.length > 0) {
        allProperties = data.properties;
        renderProperties(allProperties);
      }
    } catch (err) {
      console.info("Using default markup for properties:", err);
    }
  }

  function renderProperties(items) {
    if (!propertyGrid) return;
    propertyGrid.innerHTML = items
      .map(
        (item, index) => `
      <article class="property-card" data-category="${(item.category || "").toLowerCase()}">
        <div class="property-info">
          <h3>${item.title || item.name || "The Stokes Apartment"}</h3>
          <p>
            <img src="./assets/ad536.svg" alt="" />${item.location || "Cleveland, United States"}
          </p>
          <div>
            <strong>${item.price || item.displayPrice || "$232,120"}</strong>
            <a href="#contact" aria-label="Ask about ${item.title || "property"}">
              <img src="./assets/${index === 0 ? "b3142.svg" : "6f8a5.svg"}" alt="" />
            </a>
          </div>
        </div>
      </article>
    `
      )
      .join("");
  }

  // Filter properties by category tabs
  propertyTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      propertyTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const tabText = tab.textContent.trim().toLowerCase();
      if (allProperties.length === 0) return;

      const filtered = allProperties.filter((item) => {
        const cat = (item.category || "").toLowerCase();
        if (tabText.includes("appartment") || tabText.includes("apartment")) {
          return cat.includes("apart") || cat.includes("appart");
        }
        if (tabText.includes("vila") || tabText.includes("villa")) {
          return cat.includes("vil");
        }
        if (tabText.includes("land")) {
          return cat.includes("land");
        }
        return true;
      });

      renderProperties(filtered.length > 0 ? filtered : allProperties);
    });
  });

  // 2. Enhance Contact & Newsletter forms with asynchronous submission
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      const action = form.getAttribute("action");
      if (!action || !action.includes("./data/")) return;

      e.preventDefault();
      try {
        const res = await fetch(action);
        const data = await res.json();
        alert(data.message || "Gửi thành công! Cảm ơn bạn.");
        form.reset();
      } catch {
        // Fallback to normal submission if fetch fails
        form.submit();
      }
    });
  });

  // 3. Dynamic ScrollSpy: Update active navigation tab according to scroll position
  const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav nav a");
  const sectionIds = ["home", "about", "services", "properties", "projects", "contact"];

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 140; // account for floating header height
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    // If scrolled to the bottom of the page, activate the last tab (contact)
    if (window.scrollY + winHeight >= docHeight - 50) {
      setActiveTab("contact");
      return;
    }

    let activeId = "home";

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= top) {
          activeId = id;
        }
      }
    }

    setActiveTab(activeId);
  }

  function setActiveTab(id) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${id}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Smooth click interaction: immediately update tab active state on click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        setActiveTab(href.substring(1));
      }
    });
  });

  // Real-time scroll listener throttled with requestAnimationFrame
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveNav();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  loadStays();
  updateActiveNav();
});
