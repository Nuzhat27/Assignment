/* =========================================================
   KILANGI JEWELLERY – MASTER JS
   Clean | Performant | Production Ready
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     UTILITIES
  ========================================================= */

  const qs  = (s, p = document) => p.querySelector(s);
  const qsa = (s, p = document) => [...p.querySelectorAll(s)];

  const smooth = (el, t = "all 0.4s ease") => {
    if (el) el.style.transition = t;
  };

  /* =========================================================
     HEADER / NAVIGATION
  ========================================================= */

  // Search
  const searchInput = qs(".search-box input");
  if (searchInput) {
    searchInput.addEventListener("keydown", e => {
      if (e.key === "Enter" && searchInput.value.trim()) {
        window.location.href =
          `/search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }

  // Header icons
  const icons = qsa(".icons-wrap svg");
  const routes = ["wishlist.html", "account.html", "cart.html"];

  icons.forEach((icon, i) => {
    smooth(icon);
    icon.style.cursor = "pointer";

    icon.addEventListener("mouseenter", () => {
      icon.style.transform = "scale(1.15)";
      icon.style.stroke = "#234f46";
    });

    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "scale(1)";
      icon.style.stroke = "";
    });

    icon.addEventListener("click", () => {
      if (routes[i]) window.location.href = routes[i];
    });
  });

  // Menu navigation
  qsa(".menu-bar .nav-link").forEach(link => {
    smooth(link);

    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateY(-2px)";
      link.style.color = "#234f46";
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateY(0)";
      link.style.color = "";
    });
  });

  /* =========================================================
     HERO SECTION
  ========================================================= */

  const heroContent = qs(".hero-content");
  const heroImg = qs(".hero-right img");
  const heroBtn = qs(".hero-btn");

  if (heroContent && heroImg) {
    heroContent.style.opacity = 0;
    heroContent.style.transform = "translateY(40px)";
    heroImg.style.opacity = 0;
    heroImg.style.transform = "translateX(40px)";

    setTimeout(() => {
      smooth(heroContent, "all 0.9s ease");
      smooth(heroImg, "all 0.9s ease");

      heroContent.style.opacity = 1;
      heroContent.style.transform = "translateY(0)";
      heroImg.style.opacity = 1;
      heroImg.style.transform = "translateX(0)";
    }, 200);
  }

  if (heroBtn) {
    smooth(heroBtn);
    heroBtn.addEventListener("mouseenter", () => {
      heroBtn.style.background = "#234f46";
      heroBtn.style.color = "#fff";
      heroBtn.style.transform = "translateX(6px)";
    });
    heroBtn.addEventListener("mouseleave", () => {
      heroBtn.style.background = "#fff";
      heroBtn.style.color = "#1a1a1a";
      heroBtn.style.transform = "translateX(0)";
    });
  }

  /* =========================================================
     BESTSELLER TABS (REAL FUNCTIONALITY)
  ========================================================= */

  const tabs = qsa(".bestseller-tabs .tab");

  tabs.forEach(tab => {
    smooth(tab);
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Hook for future API filtering
      console.log("Category:", tab.innerText);
    });
  });

  /* =========================================================
     PRODUCT CARDS (Bestseller + Recently Viewed)
  ========================================================= */

  qsa(".product, .recent-product").forEach(card => {
    smooth(card);

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 30px 60px rgba(0,0,0,0.12)";
      card.style.cursor = "pointer";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });

    // Save recently viewed
    card.addEventListener("click", () => {
      const img = card.querySelector("img")?.src;
      const name = card.querySelector(".product-name, .recent-product-name")?.innerText;
      const price = card.querySelector(".product-price, .recent-product-price")?.innerHTML;

      if (!img || !name) return;

      let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      viewed = viewed.filter(p => p.name !== name);
      viewed.unshift({ img, name, price });
      localStorage.setItem("recentlyViewed", JSON.stringify(viewed.slice(0, 4)));
    });
  });

  /* =========================================================
     LOAD RECENTLY VIEWED
  ========================================================= */

  const recentCards = qsa(".recent-product");
  const stored = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  stored.forEach((p, i) => {
    if (!recentCards[i]) return;
    recentCards[i].querySelector("img").src = p.img;
    recentCards[i].querySelector(".recent-product-name").innerText = p.name;
    recentCards[i].querySelector(".recent-product-price").innerHTML = p.price;
  });

  /* =========================================================
     GIFT NOTES
  ========================================================= */

  qsa(".gift-card").forEach(card => {
    const img = card.querySelector("img");
    const btn = card.querySelector(".gift-btn");

    smooth(img, "transform 0.6s ease");
    smooth(btn);

    card.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.08)";
      btn.style.transform = "translateY(-4px)";
      btn.style.background = "#234f46";
      btn.style.color = "#fff";
    });

    card.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)";
      btn.style.transform = "translateY(0)";
      btn.style.background = "transparent";
      btn.style.color = "#1a3f3a";
    });

    btn.addEventListener("click", e => {
      e.preventDefault();
      const txt = btn.innerText;
      if (txt.includes("10000")) location.href = "/shop?price=0-10000";
      if (txt.includes("20000")) location.href = "/shop?price=10000-20000";
      if (txt.includes("30000")) location.href = "/shop?price=20000-30000";
      if (txt.includes("E-Gift")) location.href = "/gift-cards";
    });
  });

  /* =========================================================
     FEATURE + COLLECTION SCROLL REVEAL
  ========================================================= */

  const revealEls = qsa(
    ".feature-banner, .collection-card, .celebrate-gift-card, .review-card"
  );

  revealEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(60px)";
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      smooth(entry.target, "all 0.9s ease");
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* =========================================================
     FEATURE BANNER PARALLAX (DESKTOP ONLY)
  ========================================================= */

  qsa(".feature-banner").forEach(banner => {
    smooth(banner, "transform 0.3s ease");

    banner.addEventListener("mousemove", e => {
      if (window.innerWidth < 768) return;
      const r = banner.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / 30;
      const y = (e.clientY - r.top - r.height / 2) / 30;
      banner.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    });

    banner.addEventListener("mouseleave", () => {
      banner.style.transform = "translate(0,0) scale(1)";
    });
  });

  /* =========================================================
     FOOTER LINKS
  ========================================================= */

  qsa(".footer-col a").forEach(link => {
    smooth(link);
    link.addEventListener("mouseenter", () => {
      link.style.paddingLeft = "6px";
      link.style.color = "#f1e2d6";
    });
    link.addEventListener("mouseleave", () => {
      link.style.paddingLeft = "0";
      link.style.color = "#fff";
    });
  });

  console.log("✅ Kilangi JS Loaded Cleanly");

});
