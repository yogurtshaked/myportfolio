document.addEventListener("DOMContentLoaded", () => {
  // Load navbar dynamically
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => document.getElementById("navbar").innerHTML = data)
    .then(() => {
      // Now the navbar is loaded, attach hamburger functionality
      const hamburger = document.querySelector(".hamburger");
      const mobileMenu = document.querySelector(".mobile-menu");

      if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
          mobileMenu.style.display =
            mobileMenu.style.display === "flex" ? "none" : "flex";
        });
      }
    });
});
