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

const scrollContainer = document.querySelector('.skills-scroll');

scrollContainer.parentElement.addEventListener('mouseenter', () => {
  // pause by reducing animation speed gradually
  scrollContainer.style.animationPlayState = 'paused';
});

scrollContainer.parentElement.addEventListener('mouseleave', () => {
  // resume smoothly
  scrollContainer.style.animationPlayState = 'running';
});
