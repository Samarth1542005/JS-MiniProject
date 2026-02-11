/* ══════════════════════════════════════════════
   JS Mini Projects — Landing Page Scripts
   ══════════════════════════════════════════════ */

// ─── Wait for DOM ────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initEntranceAnimations();
  initScrollReveal();
  initCardTilt();
  initCardRipple();
  initBlobParallax();
  initScrollToTop();
  initTypingEffect();
});

/* ─── 1. Entrance Animations ──────────────────
   Staggers the header elements on page load    */
function initEntranceAnimations() {
  const tag = document.querySelector(".tag");
  const h1 = document.querySelector("header h1");
  const subtitle = document.querySelector(".subtitle");
  const cards = document.querySelectorAll(".card");
  const footer = document.querySelector("footer");

  const elements = [tag, h1, subtitle, ...cards, footer].filter(Boolean);

  elements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 150 * i);
  });
}

/* ─── 2. Scroll Reveal ────────────────────────
   Cards fade in when they scroll into view     */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ─── 3. Card Tilt / Parallax on Hover ────────
   Cards subtly rotate towards the cursor       */
function initCardTilt() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8; // max ±8 deg
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
      card.style.transition = "transform 0.5s ease";
    });

    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.1s ease";
    });
  });
}

/* ─── 4. Card Ripple Click Effect ─────────────
   Creates a Material-style ripple on click     */
function initCardRipple() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.className = "ripple";

      card.appendChild(ripple);

      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
}

/* ─── 5. Blob Parallax (Mouse Move) ──────────
   Background blobs drift towards the cursor    */
function initBlobParallax() {
  const blobs = document.querySelectorAll(".blob");

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 to 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    blobs.forEach((blob, i) => {
      const speed = (i + 1) * 15; // different speed per blob
      blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

/* ─── 6. Scroll-to-Top Button ─────────────────
   Appears after scrolling, smoothly scrolls up */
function initScrollToTop() {
  // Create button
  const btn = document.createElement("button");
  btn.className = "scroll-top-btn";
  btn.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 16V4"/><path d="m4 10 6-6 6 6"/></svg>`;
  btn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(btn);

  // Show / hide on scroll
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 300);
  });

  // Scroll up
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ─── 7. Typing Effect on Subtitle ────────────
   Types out the subtitle text character by char */
function initTypingEffect() {
  const subtitle = document.querySelector(".subtitle");
  if (!subtitle) return;

  const fullText = subtitle.textContent;
  subtitle.textContent = "";
  subtitle.style.borderRight = "2px solid var(--accent-2)";
  let i = 0;

  function type() {
    if (i < fullText.length) {
      subtitle.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, 22);
    } else {
      // Remove cursor blink after typing is done
      setTimeout(() => {
        subtitle.style.borderRight = "none";
      }, 1000);
    }
  }

  // Start after entrance animation completes for the subtitle
  setTimeout(type, 600);
}
