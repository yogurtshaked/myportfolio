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

      // Sliding pill indicator
      const nav = document.querySelector(".nav-links");
      const highlight = document.querySelector(".nav-highlight");

      if (nav && highlight) {
        const links = nav.querySelectorAll("li > a");

        function movePill(link) {
          const linkRect = link.getBoundingClientRect();
          const navRect = nav.getBoundingClientRect();

          highlight.style.width = `${linkRect.width}px`;
          highlight.style.transform =
            `translate(${linkRect.left - navRect.left}px, -50%)`;

          highlight.style.opacity = "1";
        }

        // Hover
        links.forEach(link => {
          link.addEventListener("mouseenter", () => {
            movePill(link);
          });
        });


        // Active section on scroll
        const sections = document.querySelectorAll("section[id]");

        function updateActiveOnScroll() {
        let currentId = "";

        sections.forEach(section => {
          const rect = section.getBoundingClientRect();

          if (rect.top <= 100 && rect.bottom >= 100) {
            currentId = section.id;
          }
        });

        // Hide pill on landing section
        if (currentId === "about" || currentId === "") {
          highlight.style.opacity = "0";
          return;
        }

        const matchingLink = [...links].find(
          link => link.getAttribute("href") === `#${currentId}`
        );

        if (matchingLink) {
          movePill(matchingLink);
        }
      }

        window.addEventListener("scroll", updateActiveOnScroll);


        nav.addEventListener("mouseleave", () => {
          highlight.style.opacity = "0";
        });
      }
    });
});

window.addEventListener("load", () => {
  lucide.createIcons();
});
