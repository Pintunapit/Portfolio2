/**
 * Personal Portfolio — script.js
 *
 * Sections:
 * 1.  Loading Screen
 * 2.  Navbar: Scroll Highlight, Sticky Shadow, Active Link
 * 3.  Mobile Hamburger Menu
 * 4.  Dark / Light Mode Toggle
 * 5.  Typing Text Animation (Hero)
 * 6.  Scroll Reveal Animations
 * 7.  Animated Counters (About Stats)
 * 8.  Skill Progress Bars Animation
 * 9.  Project Filter Tabs
 * 10. Contact Form Validation & Submission
 * 11. Back-to-Top Button
 * 12. Footer Year
 * 13. Smooth Scroll for Anchor Links
 * 14. Resume Modal Viewer
 */

/* ============================================================
   1. LOADING SCREEN
   ============================================================ */
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  // Hide loading screen after a short delay for visual appeal
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    // Remove from DOM after transition ends
    loadingScreen.addEventListener('transitionend', () => {
      loadingScreen.remove();
    }, { once: true });
  }, 800);
});

/* ============================================================
   2. NAVBAR: SCROLL HIGHLIGHT, STICKY SHADOW, ACTIVE LINK
   ============================================================ */
const header      = document.getElementById('header');
const navLinks    = document.querySelectorAll('.nav-link');
const sections    = document.querySelectorAll('section[id]');

// Add scrolled class (background blur + shadow) when page scrolled
function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Highlight the nav link matching the current viewport section
function highlightActiveNavLink() {
  const scrollPosition = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      });

      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
      }
    }
  });
}

window.addEventListener('scroll', () => {
  handleHeaderScroll();
  highlightActiveNavLink();
}, { passive: true });

// Run once on load
handleHeaderScroll();
highlightActiveNavLink();

/* ============================================================
   3. MOBILE HAMBURGER MENU
   ============================================================ */
const hamburger  = document.getElementById('hamburger');
const navMenu    = document.getElementById('nav-links');

function toggleMobileMenu() {
  const isOpen = hamburger.classList.toggle('open');
  navMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
}

function closeMobileMenu() {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close menu when a nav link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!header.contains(e.target) && navMenu.classList.contains('open')) {
    closeMobileMenu();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    closeMobileMenu();
    hamburger.focus();
  }
});

/* ============================================================
   4. DARK / LIGHT MODE TOGGLE
   ============================================================ */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const body        = document.body;

// Load saved theme preference from localStorage
const savedTheme = localStorage.getItem('portfolio-theme') || 'light-mode';
body.classList.add(savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode', !isDark);

  const newTheme = isDark ? 'dark-mode' : 'light-mode';
  localStorage.setItem('portfolio-theme', newTheme);
  updateThemeIcon(newTheme);

  // Update ARIA label
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
});

function updateThemeIcon(theme) {
  if (theme === 'dark-mode') {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }
}

/* ============================================================
   5. TYPING TEXT ANIMATION (HERO)
   ============================================================ */
const roles = [
  'CSE Student',
  'Aspiring Full Stack Developer',
  'Frontend Developer',
  'Java Programmer',
  'Python Enthusiast',
  'Problem Solver'
];

const typingEl  = document.getElementById('typing-text');
let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer;

function typeText() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    // Remove one character
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add one character
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  // Update ARIA label for screen readers
  typingEl.setAttribute('aria-label', `Role: ${typingEl.textContent}`);

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === currentRole.length) {
    // Pause at full word before deleting
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Move to next role
    isDeleting = false;
    roleIndex  = (roleIndex + 1) % roles.length;
    delay      = 400;
  }

  typingTimer = setTimeout(typeText, delay);
}

// Start typing after loading screen
setTimeout(typeText, 1200);

/* ============================================================
   6. SCROLL REVEAL ANIMATIONS
   ============================================================ */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve once revealed for performance
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));
}

// Initialize reveal after DOM is interactive
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}

/* ============================================================
   7. ANIMATED COUNTERS (ABOUT STATS)
   ============================================================ */
function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800; // ms
  const stepTime = 30;   // ms per frame
  const steps    = duration / stepTime;
  const increment = target / steps;
  let current    = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, stepTime);
}

function initCounters() {
  const counterEls = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterEls.forEach(el => counterObserver.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCounters);
} else {
  initCounters();
}

/* ============================================================
   8. SKILL PROGRESS BARS ANIMATION
   ============================================================ */
function initProgressBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.getAttribute('data-width');
          // Small delay so the user sees the animation start
          setTimeout(() => {
            entry.target.style.width = targetWidth + '%';
          }, 150);
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(bar => barObserver.observe(bar));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProgressBars);
} else {
  initProgressBars();
}

/* ============================================================
   9. PROJECT FILTER TABS
   ============================================================ */
function initProjectFilters() {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Show / hide cards with a quick fade
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const matches  = filter === 'all' || category === filter;

        if (matches) {
          card.classList.remove('hidden');
          // Re-trigger reveal animation
          card.classList.remove('visible');
          requestAnimationFrame(() => {
            setTimeout(() => card.classList.add('visible'), 50);
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectFilters);
} else {
  initProjectFilters();
}

/* ============================================================
   10. CONTACT FORM VALIDATION & SUBMISSION
   ============================================================ */
function initContactForm() {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const feedback   = document.getElementById('form-feedback');
  const btnText    = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  if (!form) return;

  // Real-time validation on blur
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const fields  = form.querySelectorAll('.form-input');
    let isValid   = true;

    fields.forEach(field => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) return;

    // Show loading state
    submitBtn.disabled    = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    feedback.className    = 'form-feedback';
    feedback.textContent  = '';

    // Simulate async form submission (replace with real fetch/API call)
    await simulateFormSubmission();

    // Restore button
    submitBtn.disabled       = false;
    btnText.style.display    = 'inline-flex';
    btnLoading.style.display = 'none';

    // Show success feedback
    feedback.textContent  = '✓ Message sent successfully! I\'ll get back to you soon.';
    feedback.className    = 'form-feedback success';
    form.reset();

    // Auto-hide feedback after 6 seconds
    setTimeout(() => {
      feedback.className   = 'form-feedback';
      feedback.textContent = '';
    }, 6000);
  });
}

/**
 * Validate a single form field.
 * Returns true if valid, false otherwise.
 */
function validateField(field) {
  const value    = field.value.trim();
  const id       = field.id;
  const errorEl  = document.getElementById(`${id}-error`);

  let errorMsg = '';

  switch (id) {
    case 'name':
      if (!value) {
        errorMsg = 'Please enter your full name.';
      } else if (value.length < 2) {
        errorMsg = 'Name must be at least 2 characters.';
      }
      break;

    case 'email':
      if (!value) {
        errorMsg = 'Please enter your email address.';
      } else if (!isValidEmail(value)) {
        errorMsg = 'Please enter a valid email address.';
      }
      break;

    case 'subject':
      if (!value) {
        errorMsg = 'Please enter a subject.';
      } else if (value.length < 3) {
        errorMsg = 'Subject must be at least 3 characters.';
      }
      break;

    case 'message':
      if (!value) {
        errorMsg = 'Please enter your message.';
      } else if (value.length < 10) {
        errorMsg = 'Message must be at least 10 characters.';
      }
      break;

    default:
      break;
  }

  if (errorMsg) {
    field.classList.add('error');
    field.classList.remove('success');
    if (errorEl) errorEl.textContent = errorMsg;
    return false;
  } else {
    field.classList.remove('error');
    field.classList.add('success');
    if (errorEl) errorEl.textContent = '';
    return true;
  }
}

/** Clear error state while user is typing */
function clearFieldError(field) {
  if (field.classList.contains('error')) {
    field.classList.remove('error');
    const errorEl = document.getElementById(`${field.id}-error`);
    if (errorEl) errorEl.textContent = '';
  }
}

/** Email regex validation */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Simulates a 1.5s network request */
function simulateFormSubmission() {
  return new Promise(resolve => setTimeout(resolve, 1500));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}

/* ============================================================
   11. BACK-TO-TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  // Show button after scrolling down 400px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBackToTop);
} else {
  initBackToTop();
}

/* ============================================================
   12. FOOTER YEAR
   ============================================================ */
const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

/* ============================================================
   13. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return; // plain "#" links (like resume download)

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();

    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
      10
    ) || 70;

    const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

/* ============================================================
   14. RESUME MODAL VIEWER
   Opens when user clicks "View Resume" button.
   Shows the resume as an image (photo.jpg) with Download option.
   ============================================================ */

function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (!modal) return;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // prevent background scroll

  // Focus the close button for keyboard accessibility
  setTimeout(() => {
    const closeBtn = document.getElementById('resume-modal-close');
    if (closeBtn) closeBtn.focus();
  }, 100);
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  // Return focus to the button that opened it
  const btn = document.getElementById('btn-view-resume');
  if (btn) btn.focus();
}

// Wire up close button
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('resume-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeResumeModal);

  // Click on dark overlay (outside modal box) to close
  const overlay = document.getElementById('resume-modal');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeResumeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('resume-modal');
      if (modal && modal.classList.contains('open')) closeResumeModal();
    }
  });

  // Handle iframe load error — show placeholder if PDF fails
  const resumeFrame = document.getElementById('resume-frame');
  const placeholder = document.getElementById('resume-placeholder');
  if (resumeFrame && placeholder) {
    resumeFrame.addEventListener('error', () => {
      resumeFrame.style.display = 'none';
      placeholder.style.display = 'flex';
    });
    // Also check if the iframe loaded empty (PDF not found)
    resumeFrame.addEventListener('load', () => {
      try {
        // If src is empty or about:blank, show placeholder
        if (!resumeFrame.src || resumeFrame.src === 'about:blank') {
          resumeFrame.style.display = 'none';
          placeholder.style.display = 'flex';
        }
      } catch(e) { /* cross-origin, ignore */ }
    });
  }
});
