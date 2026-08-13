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
      const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Sliding pill indicator
const nav = document.querySelector(".nav-links");
const highlight = document.querySelector(".nav-highlight");

if (nav && highlight) {
  const links = nav.querySelectorAll("li > a");
  const sections = document.querySelectorAll("section[id]");

  // "activeLink" = the real source of truth (set by click or scroll)
  // Hover is just a visual preview on top of it, never overwrites it
  let activeLink = null;
  let isHovering = false;
  let isClickLocked = false;
  let clickTimeout;

  function movePill(link) {
    const linkRect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    highlight.style.width = `${linkRect.width}px`;
    highlight.style.transform =
      `translate(${linkRect.left - navRect.left}px, -50%)`;
    highlight.style.opacity = "1";

    links.forEach(item => item.classList.remove("pill-active"));
    link.classList.add("pill-active");
  }

  function setActiveLink(link) {
    if (!link) return;
    activeLink = link;
    links.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    movePill(link);
  }

  // 1. HOVER — always wins visually while the cursor is on a link
  links.forEach(link => {
    link.addEventListener("mouseenter", () => {
      isHovering = true;
      movePill(link); // preview only, doesn't touch activeLink
    });
  });

  // When the cursor leaves the whole nav, snap back to the real active link
  nav.addEventListener("mouseleave", () => {
    isHovering = false;
    if (activeLink) movePill(activeLink);
  });

  // 3. CLICK — sets the real active link immediately, takes priority over scroll
  links.forEach(link => {
    link.addEventListener("click", () => {
      setActiveLink(link);

      // Lock out scroll-driven updates until the smooth scroll settles
      isClickLocked = true;
      clearTimeout(clickTimeout);
      clickTimeout = setTimeout(() => {
        isClickLocked = false;
      }, 1000); // match/slightly exceed your Lenis scroll duration
    });
  });

  // 2. SCROLL — updates the active link, but never fights hover or a recent click
  function updateActiveOnScroll() {
    if (isHovering || isClickLocked) return;

    let currentId = "";
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentId = section.id;
      }
    });

    if (!currentId) {
      highlight.style.opacity = "0";
      return;
    }

    const matchingLink = [...links].find(
      link => link.getAttribute("href") === `#${currentId}`
    );

    if (matchingLink && matchingLink !== activeLink) {
      setActiveLink(matchingLink);
    }
  }

  // Run once on load so the pill starts in the right place
  updateActiveOnScroll();
  window.addEventListener("scroll", updateActiveOnScroll);
}
    });
});

window.addEventListener("load", () => {
  lucide.createIcons();
});


window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  loader.classList.add("hidden");

  setTimeout(() => {
    loader.remove();
  }, 600);
});

// ==========================================
// KINETIC GRID
// Originkit-inspired vanilla JS version
// ==========================================

const kineticCanvas = document.getElementById("kinetic-grid");

if (kineticCanvas) {

  const ctx = kineticCanvas.getContext("2d");
  const host = kineticCanvas.parentElement;

  // ------------------------------------------
  // SETTINGS
  // ------------------------------------------

  const background = "#4D3843";

  const dotColor = "#E1D7DD";
  const lineColor = "#C4B3BE";
  const trailColor = "#9B7280";

  const spacing = 15;

  const radius = 400;

  const strength = 2;

  const showTrail = true;


  // ------------------------------------------
  // Canvas variables
  // ------------------------------------------

  let width = 1;
  let height = 1;

  let devicePixelRatio =
    Math.min(window.devicePixelRatio || 1, 2);

  let dots = [];
  let columns = [];


  // ------------------------------------------
  // Mouse
  // ------------------------------------------

  const mouse = {
    x: -9999,
    y: -9999,
    active: false
  };


  // ------------------------------------------
  // Cursor trail
  // ------------------------------------------

  const trail = [];


  // ------------------------------------------
  // Resize
  // ------------------------------------------

  function resizeGrid() {

    const rect = host.getBoundingClientRect();

    width = Math.max(
      1,
      Math.floor(rect.width)
    );

    height = Math.max(
      1,
      Math.floor(rect.height)
    );

    devicePixelRatio =
      Math.min(window.devicePixelRatio || 1, 2);

    kineticCanvas.width =
      Math.floor(width * devicePixelRatio);

    kineticCanvas.height =
      Math.floor(height * devicePixelRatio);

    kineticCanvas.style.width =
      width + "px";

    kineticCanvas.style.height =
      height + "px";

    ctx.setTransform(
      devicePixelRatio,
      0,
      0,
      devicePixelRatio,
      0,
      0
    );

    createGrid();
  }


  // ------------------------------------------
  // Create grid
  // ------------------------------------------

  function createGrid() {

    dots = [];
    columns = [];

    const gap = Math.max(
      8,
      spacing
    );

    const numberOfColumns =
      Math.floor(width / gap) + 2;

    const numberOfRows =
      Math.floor(height / gap) + 2;


    for (
      let columnIndex = 0;
      columnIndex < numberOfColumns;
      columnIndex++
    ) {

      const column = [];

      for (
        let rowIndex = 0;
        rowIndex < numberOfRows;
        rowIndex++
      ) {

        const homeX =
          columnIndex * gap;

        const homeY =
          rowIndex * gap;


        const dot = {

          // Original position
          homeX,
          homeY,

          // Current position
          x: homeX,
          y: homeY,

          // Velocity
          vx: 0,
          vy: 0
        };


        column.push(dot);
        dots.push(dot);
      }

      columns.push(column);
    }
  }


  // ------------------------------------------
  // Mouse movement
  // ------------------------------------------

  function updateMouse(clientX, clientY) {

    const rect =
      kineticCanvas.getBoundingClientRect();

    mouse.x =
      clientX - rect.left;

    mouse.y =
      clientY - rect.top;

    mouse.active = true;


    // Cursor trail
    const now =
      performance.now();

    trail.push({
      x: mouse.x,
      y: mouse.y,
      time: now
    });


    // Prevent trail from becoming huge
    if (trail.length > 80) {
      trail.shift();
    }
  }


  function mouseMove(event) {

    updateMouse(
      event.clientX,
      event.clientY
    );
  }


  function mouseLeave() {

    mouse.active = false;

    mouse.x = -9999;
    mouse.y = -9999;
  }


  // ------------------------------------------
  // Touch support
  // ------------------------------------------

  function touchMove(event) {

    const touch =
      event.touches[0];

    if (!touch) return;

    updateMouse(
      touch.clientX,
      touch.clientY
    );
  }


  // ------------------------------------------
  // Draw
  // ------------------------------------------

  function draw(time) {

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    const pullStrength =
      (Math.max(
        1,
        Math.min(10, strength)
      ) / 10) * 4;


    // ========================================
    // UPDATE DOT PHYSICS
    // ========================================

    for (const dot of dots) {

      // Spring back to original position
      let ax =
        (dot.homeX - dot.x) * 0.08;

      let ay =
        (dot.homeY - dot.y) * 0.08;


      // Mouse attraction
      if (mouse.active) {

        const dx =
          mouse.x - dot.x;

        const dy =
          mouse.y - dot.y;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );


        if (
          distance < radius &&
          distance > 0.001
        ) {

          const force =
            (1 - distance / radius) *
            pullStrength;


          ax +=
            (dx / distance) *
            force;

          ay +=
            (dy / distance) *
            force;
        }
      }


      // Friction
      dot.vx =
        (dot.vx + ax) * 0.82;

      dot.vy =
        (dot.vy + ay) * 0.82;


      // Move
      dot.x += dot.vx;
      dot.y += dot.vy;
    }


    // ========================================
    // GRID LINES
    // ========================================

    for (
      let columnIndex = 0;
      columnIndex < columns.length;
      columnIndex++
    ) {

      for (
        let rowIndex = 0;
        rowIndex < columns[columnIndex].length;
        rowIndex++
      ) {

        const dot =
          columns[columnIndex][rowIndex];

        const right =
          columns[columnIndex + 1]?.[rowIndex];

        const down =
          columns[columnIndex]?.[rowIndex + 1];


        // Distance from mouse
        let proximity = 0;


        if (mouse.active) {

          const dx =
            mouse.x - dot.x;

          const dy =
            mouse.y - dot.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );


          proximity =
            Math.max(
              0,
              1 - distance / radius
            );
        }


        // -------------------------------
        // Horizontal line
        // -------------------------------

        if (right) {

          ctx.globalAlpha =
            0.06 +
            proximity * 0.7;

          ctx.strokeStyle =
            lineColor;

          ctx.lineWidth =
            0.5 +
            proximity * 0.8;

          ctx.beginPath();

          ctx.moveTo(
            dot.x,
            dot.y
          );

          ctx.lineTo(
            right.x,
            right.y
          );

          ctx.stroke();
        }


        // -------------------------------
        // Vertical line
        // -------------------------------

        if (down) {

          ctx.globalAlpha =
            0.06 +
            proximity * 0.7;

          ctx.strokeStyle =
            lineColor;

          ctx.lineWidth =
            0.5 +
            proximity * 0.8;

          ctx.beginPath();

          ctx.moveTo(
            dot.x,
            dot.y
          );

          ctx.lineTo(
            down.x,
            down.y
          );

          ctx.stroke();
        }
      }
    }


    // ========================================
    // DOTS
    // ========================================

    for (const dot of dots) {

      let proximity = 0;


      if (mouse.active) {

        const dx =
          mouse.x - dot.x;

        const dy =
          mouse.y - dot.y;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );


        proximity =
          Math.max(
            0,
            1 - distance / radius
          );
      }


      ctx.globalAlpha =
        0.22 +
        proximity * 0.78;

      ctx.fillStyle =
        dotColor;


      ctx.beginPath();

      ctx.arc(
        dot.x,
        dot.y,
        0.8 + proximity * 1.6,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }


    // ========================================
    // CURSOR TRAIL
    // ========================================

    if (showTrail) {

      const now =
        performance.now();


      ctx.lineCap =
        "round";

      ctx.lineJoin =
        "round";


      for (
        let i = 1;
        i < trail.length;
        i++
      ) {

        const previous =
          trail[i - 1];

        const current =
          trail[i];


        const age =
          now - current.time;


        // Ignore old trail
        if (age > 260) {
          continue;
        }


        ctx.globalAlpha =
          Math.max(
            0,
            1 - age / 260
          ) * 0.85;


        ctx.strokeStyle =
          trailColor;

        ctx.lineWidth = 2;


        ctx.beginPath();

        ctx.moveTo(
          previous.x,
          previous.y
        );

        ctx.lineTo(
          current.x,
          current.y
        );

        ctx.stroke();
      }
    }


    ctx.globalAlpha = 1;


    requestAnimationFrame(draw);
  }


  // ------------------------------------------
  // Events
  // ------------------------------------------

  host.addEventListener(
    "mousemove",
    mouseMove
  );

  host.addEventListener(
    "mouseleave",
    mouseLeave
  );

  host.addEventListener(
    "touchmove",
    touchMove,
    { passive: true }
  );

  host.addEventListener(
    "touchend",
    mouseLeave
  );


  // ------------------------------------------
  // Start
  // ------------------------------------------

  resizeGrid();

  window.addEventListener(
    "resize",
    resizeGrid
  );

  requestAnimationFrame(draw);
}