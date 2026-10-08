/**
 * Reanty - Client-side Data Hydration & Interactions
 * Pure Vanilla JavaScript (No Framework)
 * Integrates My JSON Server REST API with automatic Local Fallback
 */

// Thay '<username>' bằng GitHub username của bạn khi deploy repo reanty-api
const GITHUB_USERNAME = "lyhoquy";
const API_BASE = `https://my-json-server.typicode.com/${GITHUB_USERNAME}/reanty-api`;

const ENDPOINTS = {
  site: `${API_BASE}/site`,
  featured: `${API_BASE}/featured`,
  stays: `${API_BASE}/stays`,
  contact: `${API_BASE}/contact`,
  newsletter: `${API_BASE}/newsletter`,
};

// Fallback khi API lỗi hoặc chạy offline
const LOCAL = {
  site: "./data/site.json",
  featured: "./data/stays.json", // lấy key "featured"
  stays: "./data/stays.json", // lấy key "properties"
  contact: "./data/contact.json",
  newsletter: "./data/newsletter.json",
};

async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}

async function loadData(key) {
  try {
    return await getJSON(ENDPOINTS[key]);
  } catch (err) {
    console.warn(
      `API lỗi hoặc chưa deploy repo, dùng file local cho "${key}":`,
      err.message || err
    );
    const local = await getJSON(LOCAL[key]);
    if (key === "featured") return local.featured;
    if (key === "stays") return local.properties || local.stays;
    return local;
  }
}

async function submitForm(type, payload) {
  // type: 'contact' hoặc 'newsletter'
  try {
    const res = await fetch(ENDPOINTS[type], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.warn(
      "POST API lỗi (My JSON Server nhận phản hồi giả), vẫn lấy thông báo thành công:",
      err.message || err
    );
  }
  const info = await getJSON(LOCAL[type]);
  return info.message || "Gửi thành công! Cảm ơn bạn.";
}

document.addEventListener("DOMContentLoaded", () => {
  const propertyGrid = document.querySelector(".property-grid");
  const propertyTabs = document.querySelectorAll(".property-types a");
  let allProperties = [];

  // 1. Render & hydrate Featured Property banner (căn 9A Metric Way)
  function renderFeatured(item) {
    if (!item) return;
    const floatingProperty = document.querySelector(".floating-property");
    const unitBadge = document.querySelector(".unit strong");

    if (floatingProperty) {
      const priceEl = floatingProperty.querySelector("strong");
      const addressEl = floatingProperty.querySelector("p");
      if (priceEl && item.price) priceEl.textContent = item.price;
      if (addressEl && item.address) addressEl.textContent = item.address;
    }

    if (unitBadge && item.unit) {
      unitBadge.textContent = item.unit;
    }
  }

  // 2. Render properties / stays grid
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

  // Load and hydrate dynamic data
  async function initData() {
    try {
      const [staysData, featuredData] = await Promise.all([
        loadData("stays"),
        loadData("featured"),
      ]);

      if (Array.isArray(staysData) && staysData.length > 0) {
        allProperties = staysData;
        renderProperties(allProperties);
      }
      if (featuredData) {
        renderFeatured(featuredData);
      }
    } catch (err) {
      console.info("Using default markup for properties:", err);
    }
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

  // 3. Handle Contact & Newsletter forms submission
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const action = form.getAttribute("action") || "";
      const isNewsletter =
        form.classList.contains("subscribe") || action.includes("newsletter");
      const formType = isNewsletter ? "newsletter" : "contact";

      let payload = {};
      if (formType === "contact") {
        const name = form.querySelector("#contact-name")?.value?.trim() || "";
        const email =
          form.querySelector("#contact-email")?.value?.trim() || "";
        const message =
          form.querySelector("#contact-message")?.value?.trim() || "";

        if (!name || !email || !message) {
          alert("Vui lòng điền đầy đủ họ tên, email và lời nhắn.");
          return;
        }
        payload = { name, email, message };
      } else {
        const emailInput = form.querySelector("input[type='email']");
        const email = emailInput?.value?.trim() || "";
        if (!email) {
          alert("Vui lòng nhập địa chỉ email hợp lệ.");
          return;
        }
        payload = {
          email,
          subscribedAt: new Date().toISOString().split("T")[0],
        };
      }

      try {
        const submitBtn = form.querySelector("button[type='submit']");
        const originalText = submitBtn ? submitBtn.textContent : "";
        if (submitBtn) submitBtn.textContent = "Sending...";

        const successMessage = await submitForm(formType, payload);
        alert(successMessage);
        form.reset();

        if (submitBtn) submitBtn.textContent = originalText;
      } catch (err) {
        console.error("Lỗi khi gửi form:", err);
        alert("Có lỗi xảy ra khi gửi. Vui lòng thử lại sau.");
      }
    });
  });

  // 4. Dynamic ScrollSpy: Update active navigation tab according to scroll position
  const navLinks = document.querySelectorAll(
    ".desktop-nav a, .mobile-nav nav a"
  );
  const sectionIds = [
    "home",
    "about",
    "services",
    "properties",
    "projects",
    "contact",
  ];

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

  initData();
  updateActiveNav();
});
