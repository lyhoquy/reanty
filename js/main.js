/**
 * Reanty — Real Estate Landing Page
 * Frontend Test Implementation
 * Pure Vanilla JavaScript (No Frameworks)
 * Loads data from myJSONS Data Server with local fallback
 */

const DATA_URL = "https://www.myjsons.com/v/48e95347";
const LOCAL_DATA_URL = "./data/db.json";
const PROPERTY_IMAGE_PATH = "./assets/images/properties/";

/**
 * Fetch helper with standard error checking
 */
async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch data from myJSONS data server with automatic local fallback
 */
async function fetchData() {
  try {
    const data = await fetchJSON(DATA_URL);
    return data;
  } catch (error) {
    console.warn("Data server unavailable, using local data:", error);
    return fetchJSON(LOCAL_DATA_URL);
  }
}

/**
 * Render Header & Navigation
 */
function renderHeader(data) {
  const brand = data?.site?.brand;
  const nav = data?.site?.navigation;
  const contactInfo = data?.site?.contactInfo;

  // Brand Name
  if (brand?.name) {
    document.querySelectorAll(".logo span").forEach((el) => {
      const dotIndex = brand.name.indexOf(".");
      if (dotIndex !== -1) {
        el.innerHTML = `${brand.name.slice(0, dotIndex)}<b>.</b>`;
      } else {
        el.textContent = brand.name;
      }
    });
  }

  // Topbar Contact Info
  if (contactInfo) {
    const emailEl = document.querySelector(".top-email span");
    if (emailEl && contactInfo.email) {
      emailEl.textContent = contactInfo.email;
      const emailLink = document.querySelector(".top-email");
      if (emailLink) emailLink.setAttribute("href", `mailto:${contactInfo.email}`);
    }

    const phoneEl = document.querySelector(".top-phone span");
    if (phoneEl && contactInfo.phone) {
      phoneEl.textContent = contactInfo.phone;
      const phoneLink = document.querySelector(".top-phone");
      if (phoneLink) {
        phoneLink.setAttribute("href", `tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`);
      }
    }

    const addressEl = document.querySelector(".top-address");
    if (addressEl && contactInfo.address) {
      const img = addressEl.querySelector("img");
      addressEl.innerHTML = "";
      if (img) addressEl.appendChild(img);
      addressEl.appendChild(document.createTextNode(contactInfo.address));
    }
  }

  // Navigation Links
  if (Array.isArray(nav) && nav.length > 0) {
    const desktopNav = document.querySelector(".desktop-nav");
    const mobileNav = document.querySelector(".mobile-nav nav");

    const navHTML = nav
      .map(
        (item) =>
          `<a href="${item.href}" class="${item.active ? "active" : ""}">${item.label}</a>`
      )
      .join("");

    if (desktopNav) desktopNav.innerHTML = navHTML;
    if (mobileNav) mobileNav.innerHTML = navHTML;
  }
}

/**
 * Render Hero Section
 */
function renderHero(data) {
  const hero = data?.site?.hero;
  if (!hero) return;

  const headlineEl = document.querySelector(".hero-copy h1");
  if (headlineEl && hero.headline) {
    // Preserve decorative arrow styling if present
    headlineEl.innerHTML = `Find the best Real<br />Estate on <span class="anchor">your<img src="./assets/28714.svg" alt="" class="hero-arrow" /></span><br />country .`;
  }

  const descEl = document.querySelector(".hero-description");
  if (descEl && hero.description) {
    descEl.textContent = hero.description;
  }

  const ctaBtn = document.querySelector(".hero-copy .button");
  if (ctaBtn) {
    if (hero.ctaText) {
      ctaBtn.innerHTML = `${hero.ctaText} <img src="./assets/65b8b.svg" alt="" />`;
    }
    if (hero.ctaHref) {
      ctaBtn.setAttribute("href", hero.ctaHref);
    }
  }

  const revenueStrong = document.querySelector(".revenue strong");
  if (revenueStrong && hero.revenue) {
    revenueStrong.textContent = hero.revenue;
  }
}

/**
 * Render Guides Section (Commercial Real Estate And Office)
 */
function renderGuides(data) {
  const guides = data?.site?.guides;
  if (!guides) return;

  const headingEl = document.querySelector(".guides .section-heading h2");
  if (headingEl && guides.heading) {
    headingEl.innerHTML = guides.heading.replace(" And ", "<br />And ");
  }

  const headingDesc = document.querySelector(".guides .section-heading p");
  if (headingDesc && guides.description) {
    headingDesc.textContent = guides.description;
  }

  const guideCards = document.querySelectorAll(".guide-card");
  if (Array.isArray(guides.items)) {
    guides.items.forEach((item, index) => {
      const card = guideCards[index];
      if (!card) return;

      const titleEl = card.querySelector("h3");
      const descEl = card.querySelector("p");

      if (titleEl && item.title) titleEl.textContent = item.title;
      if (descEl && item.description) descEl.textContent = item.description;
      if (item.href) card.setAttribute("href", item.href);
    });
  }
}

/**
 * Render Featured Property (Unit 9A Metric Way)
 */
function renderFeatured(data) {
  const featured = data?.featured;
  if (!featured) return;

  const floating = document.querySelector(".floating-property");
  if (floating) {
    const priceEl = floating.querySelector("strong");
    const addressEl = floating.querySelector("p");

    if (priceEl && featured.price) priceEl.textContent = featured.price;
    if (addressEl && featured.address) addressEl.textContent = featured.address;

    const amenities = floating.querySelector(".amenities");
    if (amenities) {
      amenities.innerHTML = `
        <img src="./assets/ff5b9.svg" alt="" />${featured.bedrooms ?? 2}
        <img src="./assets/0caf6.svg" alt="" />${featured.bathrooms ?? 2}
        <img src="./assets/bb670.svg" alt="" />${featured.area ?? "500sqf"}
      `;
    }
  }

  const unitBadge = document.querySelector(".unit strong");
  if (unitBadge && featured.unit) {
    unitBadge.textContent = featured.unit;
  }
}

/**
 * Render Dream Living Section
 */
function renderDreamLiving(data) {
  const dream = data?.site?.dreamLiving;
  if (!dream) return;

  const titleEl = document.querySelector(".about-section h2");
  if (titleEl && dream.title) {
    titleEl.innerHTML = dream.title.replace(" Setting ", "<br />Setting ");
  }

  const descEl = document.querySelector(".about-section .description");
  if (descEl && dream.description) {
    descEl.textContent = dream.description;
  }

  const ratingEl = document.querySelector(".rating span");
  if (ratingEl && dream.rating) {
    ratingEl.textContent = dream.rating;
  }

  const featureArticles = document.querySelectorAll(".features article");
  if (Array.isArray(dream.features)) {
    dream.features.forEach((item, idx) => {
      const article = featureArticles[idx];
      if (!article) return;
      const h3 = article.querySelector("h3");
      const p = article.querySelector("p");
      if (h3 && item.title) h3.textContent = item.title;
      if (p && item.description) p.textContent = item.description;
    });
  }
}

/**
 * Render About Home Section (Today Sells Properties)
 */
function renderAbout(data) {
  const about = data?.site?.aboutHome;
  if (!about) return;

  const titleEl = document.querySelector(".selling-section h2");
  if (titleEl && about.title) {
    titleEl.textContent = about.title;
  }

  const descEl = document.querySelector(".selling-section .description");
  if (descEl && about.description) {
    descEl.textContent = about.description;
  }

  const listEl = document.querySelector(".selling-list");
  if (listEl && Array.isArray(about.checkpoints) && about.checkpoints.length > 0) {
    listEl.innerHTML = about.checkpoints.map((pt) => `<li>${pt}</li>`).join("");
  }
}

/**
 * Render Services Section
 */
function renderServices(data) {
  const services = data?.site?.services;
  if (!services) return;

  const titleEl = document.querySelector(".services .section-heading h2");
  if (titleEl && services.title) {
    titleEl.textContent = services.title;
  }

  const descEl = document.querySelector(".services .section-heading p");
  if (descEl && services.description) {
    descEl.textContent = services.description;
  }

  const serviceArticles = document.querySelectorAll(".service-card");
  if (Array.isArray(services.items)) {
    services.items.forEach((item, idx) => {
      const card = serviceArticles[idx];
      if (!card) return;
      const h3 = card.querySelector("h3");
      const p = card.querySelector("p");
      if (h3 && item.title) h3.textContent = item.title;
      if (p && item.description) p.textContent = item.description;
    });
  }
}

/**
 * Render Properties / Stays List
 */
function renderProperties(data, activeFilter = "all") {
  const stays = data?.stays;
  const propertyGrid = document.querySelector(".property-grid");
  if (!propertyGrid || !Array.isArray(stays) || stays.length === 0) return;

  const filterNormalized = activeFilter.toLowerCase();
  const filtered = stays.filter((stay) => {
    if (filterNormalized === "all") return true;
    const cat = (stay.category || "").toLowerCase();
    if (filterNormalized.includes("apart") || filterNormalized.includes("appart")) {
      return cat.includes("apart") || cat.includes("appart");
    }
    if (filterNormalized.includes("vil")) {
      return cat.includes("vil");
    }
    if (filterNormalized.includes("land")) {
      return cat.includes("land");
    }
    return true;
  });

  const displayList = filtered.length > 0 ? filtered : stays;

  propertyGrid.innerHTML = displayList
    .map((stay, index) => {
      // Relative path resolution as specified in section 7
      const rawImage = stay.image || "house-card.jpg";
      const cleanFileName = rawImage.replace(/^.*[\\/]/, "");
      const imageUrl = `${PROPERTY_IMAGE_PATH}${cleanFileName}`;

      return `
      <article class="property-card" data-category="${(stay.category || "").toLowerCase()}">
        <div class="property-info">
          <h3>${stay.title || "The Stokes Apartment"}</h3>
          <p>
            <img src="./assets/ad536.svg" alt="" />${stay.location || "Cleveland, United States"}
          </p>
          <div>
            <strong>${stay.price || "$232,120"}</strong>
            <a href="#contact" aria-label="Ask about ${stay.title || "property"}">
              <img src="./assets/${index === 0 ? "b3142.svg" : "6f8a5.svg"}" alt="" />
            </a>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

/**
 * Render Testimonials Section
 */
function renderTestimonials(data) {
  const t = data?.site?.testimonials;
  if (!t) return;

  const headingEl = document.querySelector(".testimonials .section-heading h2");
  if (headingEl && t.heading) headingEl.textContent = t.heading;

  const descEl = document.querySelector(".testimonials .section-heading p");
  if (descEl && t.description) descEl.textContent = t.description;

  const quoteEl = document.querySelector(".testimonials blockquote");
  if (quoteEl && t.quote) quoteEl.textContent = t.quote;

  const authorEl = document.querySelector(".testimonial-content h3");
  if (authorEl && t.author) authorEl.textContent = t.author;

  const roleEl = document.querySelector(".testimonial-content h3 + p");
  if (roleEl && t.role) roleEl.textContent = t.role;
}

/**
 * Render Projects / Cities Section
 */
function renderProjects(data) {
  const projects = data?.site?.projects;
  if (!projects) return;

  const headingEl = document.querySelector(".projects .section-heading h2");
  if (headingEl && projects.title) {
    headingEl.textContent = projects.title;
  }

  const cityArticles = document.querySelectorAll(".city-grid article");
  if (Array.isArray(projects.cities)) {
    projects.cities.forEach((city, idx) => {
      const art = cityArticles[idx];
      if (!art) return;
      const h3 = art.querySelector("h3");
      if (h3) h3.textContent = city;
    });
  }
}

/**
 * Render Blog Section
 */
function renderBlog(data) {
  const blogList = data?.site?.blog;
  if (!Array.isArray(blogList) || blogList.length === 0) return;

  const blogArticles = document.querySelectorAll(".blog-grid article");
  blogList.forEach((item, idx) => {
    const art = blogArticles[idx];
    if (!art) return;

    const titleEl = art.querySelector("h3");
    if (titleEl && item.title) titleEl.textContent = item.title;

    const catEl = art.querySelector(".blog-meta > span:first-child");
    if (catEl && item.category) {
      const img = catEl.querySelector("img");
      catEl.innerHTML = "";
      if (img) catEl.appendChild(img);
      catEl.appendChild(document.createTextNode(item.category));
    }

    const dateEl = art.querySelector(".blog-meta > span:last-child");
    if (dateEl && item.date) {
      const img = dateEl.querySelector("img");
      dateEl.innerHTML = "";
      if (img) dateEl.appendChild(img);
      dateEl.appendChild(document.createTextNode(item.date));
    }

    const authorEl = art.querySelector(".blog-author span");
    if (authorEl && item.author) {
      authorEl.textContent = item.author;
    }
  });
}

/**
 * Render Footer
 */
function renderFooter(data) {
  const contactInfo = data?.site?.contactInfo;
  const copyright = data?.site?.copyright;

  if (contactInfo) {
    const footerEmail = document.querySelector(".footer-bottom a[href^='mailto']");
    if (footerEmail && contactInfo.email) {
      footerEmail.innerHTML = `${contactInfo.email}<img src="./assets/b6e7f.svg" alt="" />`;
      footerEmail.setAttribute("href", `mailto:${contactInfo.email}`);
    }

    const footerPhone = document.querySelector(".footer-bottom a[href^='tel']");
    if (footerPhone && contactInfo.phone) {
      footerPhone.innerHTML = `${contactInfo.phone}<img src="./assets/b7221.svg" alt="" />`;
      footerPhone.setAttribute("href", `tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`);
    }
  }

  if (copyright) {
    const copyrightEl = document.querySelector(".footer-bottom small");
    if (copyrightEl) {
      copyrightEl.textContent = copyright;
    }
  }
}

/**
 * Setup User Interactions: Category Filter, Form Validation, Navigation & ScrollSpy
 */
function setupInteractions(data) {
  // 1. Property category tabs filtering
  const propertyTabs = document.querySelectorAll(".property-types a");
  propertyTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      propertyTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filterCategory = tab.textContent.trim();
      renderProperties(data, filterCategory);
    });
  });

  // 2. Contact form client-side validation
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("contact-name");
      const emailInput = document.getElementById("contact-email");
      const messageInput = document.getElementById("contact-message");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name) {
        alert("Please enter your name.");
        nameInput?.focus();
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        emailInput?.focus();
        return;
      }
      if (!message) {
        alert("Please enter your message.");
        messageInput?.focus();
        return;
      }

      alert("Thank you for contacting Reanty. Your inquiry has been received.");
      contactForm.reset();
    });
  }

  // 3. Newsletter form client-side validation
  const newsletterForm = document.querySelector("form.subscribe");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector("input[type='email']");
      const email = emailInput ? emailInput.value.trim() : "";

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        emailInput?.focus();
        return;
      }

      alert("Thank you for subscribing to Reanty newsletter. You will receive real estate market updates weekly.");
      newsletterForm.reset();
    });
  }

  // 4. Mobile navigation menu toggle and auto-close
  const mobileNavDetails = document.querySelector(".mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav nav a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileNavDetails && mobileNavDetails.hasAttribute("open")) {
        mobileNavDetails.removeAttribute("open");
      }
    });
  });

  // 5. ScrollSpy: Highlight active navigation tab based on scroll position
  const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav nav a");
  const sectionIds = ["home", "about", "services", "properties", "projects", "contact"];

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 140;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    if (window.scrollY + winHeight >= docHeight - 50) {
      setActiveTab("contact");
      return;
    }

    let currentSection = "home";
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= top) {
          currentSection = id;
        }
      }
    }

    setActiveTab(currentSection);
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

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        setActiveTab(href.substring(1));
      }
    });
  });

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

  updateActiveNav();
}

/**
 * Initialize application
 */
async function init() {
  try {
    const data = await fetchData();
    if (data) {
      renderHeader(data);
      renderHero(data);
      renderGuides(data);
      renderFeatured(data);
      renderDreamLiving(data);
      renderAbout(data);
      renderServices(data);
      renderProperties(data);
      renderTestimonials(data);
      renderProjects(data);
      renderBlog(data);
      renderFooter(data);
      setupInteractions(data);
    }
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

// Bootstrap on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
