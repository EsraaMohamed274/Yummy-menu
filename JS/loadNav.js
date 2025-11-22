async function loadNav() {
  try {
    // Determine nav path based on current folder
    let navPath = "./components/nav.html";
    const pathname = window.location.pathname;

    if (pathname.includes("/Pages/categories/") ||
        pathname.includes("/Pages/meal") ||
        pathname.includes("/Pages/area") ||
        pathname.includes("/Pages/Ingredients")) {
      navPath = "../../components/nav.html";
    }

    // Fetch nav HTML
    const response = await fetch(navPath);
    if (!response.ok) throw new Error("Failed to fetch " + navPath);
    const navHTML = await response.text();

    // Insert nav
    const navContainer = document.getElementById("navContainer");
    if (!navContainer) {
      console.error("navContainer not found");
      return;
    }
    navContainer.innerHTML = navHTML;

    // Toggle menu
    const toggleNavBtn = document.getElementById("toggleNav");
    const menuList = document.getElementById("menuList");
    if (!toggleNavBtn || !menuList) {
      console.error("toggleNav button or menuList not found");
      return;
    }

    const toggleNavMenu = toggleNavBtn.querySelector("i");
    console.log(toggleNavMenu.classList.contains("fa-list"))
    toggleNavBtn.addEventListener("click", () => {
      if (toggleNavMenu.classList.contains("fa-list")) {
        toggleNavMenu.classList.remove("fa-list")
        toggleNavMenu.classList.add("fa-x")
        console.log(toggleNavMenu.classList)

      } else {
        toggleNavMenu.classList.remove("fa-list")
        toggleNavMenu.classList.add("fa-x")
        console.log(toggleNavMenu.classList)
      }
      menuList.classList.toggle("open");
      
    });

    // Handle menu link clicks
    menuList.addEventListener("click", (e) => {
      const link = e.target.closest(".menu-link");
      if (!link) return;
      const action = link.dataset.action;
      if (action && typeof openSection === "function") {
        openSection(action);
      } else {
        const href = link.getAttribute("href");
        if (href && href !== "#") window.location.href = href;
      }
    });

    // Fix relative links AFTER nav is loaded
    const navLinks = menuList.querySelectorAll(".menu-link");
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("http") && !href.startsWith("/")) {
        link.setAttribute("href", "/Yummy-menu/" + href.replace(/^\.\/+/, ""));
      }
    });

  } catch (err) {
    console.error("loadNav error:", err);
  }
}

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", loadNav);
