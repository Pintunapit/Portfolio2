/**
 * Personal Portfolio Website Core Engine
 * 
 * Manages dynamic rendering, themes, animations,
 * layout adjustments, and contact form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Initialize Dynamic Content
  renderPortfolioContent();

  // 2. Typing Animation
  initTypingEffect();

  // 3. Theme Manager (Light/Dark & Accent Colors)
  initThemeManager();

  // 4. Responsive Navigation Drawer
  initNavigationDrawer();

  // 5. Scroll Interaction (Header, Scroll Reveal, Scroll Spy, Back to Top)
  initScrollInteractions();

  // 6. Dynamic Projects Category Filter
  initProjectsFilter();

  // 7. Interactive Stats Counters & Progress Bars
  initIntersectionAnimations();

  // 8. Contact Form Validator
  initContactForm();

});

/* ==========================================================================
   1. DYNAMIC RENDERING FROM CONFIG
   ========================================================================== */

function renderPortfolioContent() {
  if (typeof portfolioConfig === 'undefined') {
    console.error('portfolioConfig is not loaded. Please verify js/config.js path.');
    return;
  }

  const data = portfolioConfig;

  // --- Hero Section ---
  document.title = `${data.profile.name} | ${data.profile.designation}`;
  document.getElementById('hero-name').textContent = data.profile.name;
  document.getElementById('hero-intro').textContent = data.profile.shortIntro;
  document.getElementById('hero-cta-projects').setAttribute('href', data.profile.cta.viewProjects);
  document.getElementById('hero-cta-contact').setAttribute('href', data.profile.cta.contactMe);
  document.getElementById('hero-avatar').setAttribute('src', data.profile.avatar);

  // Render Hero Socials
  const heroSocials = document.getElementById('hero-socials');
  heroSocials.innerHTML = '';
  Object.entries(data.profile.socials).forEach(([name, url]) => {
    let iconClass = `fa-brands fa-${name}`;
    if (name === 'linkedin') iconClass = 'fa-brands fa-linkedin-in';
    
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.className = 'icon-btn';
    a.setAttribute('aria-label', `Visit my ${name} profile`);
    a.innerHTML = `<i class="${iconClass}"></i>`;
    heroSocials.appendChild(a);
  });

  // --- About Section ---
  document.getElementById('about-heading').textContent = data.about.heading;
  document.getElementById('about-subheading').textContent = data.about.subHeading;
  document.getElementById('about-bio').textContent = data.about.bio;
  document.getElementById('about-objective').textContent = data.about.careerObjective;
  
  // Update resume download buttons
  document.querySelectorAll('.resume-dl-btn').forEach(btn => {
    btn.setAttribute('href', data.resume.downloadUrl);
  });

  // Render Stats
  const statsContainer = document.getElementById('stats-container');
  statsContainer.innerHTML = '';
  data.stats.forEach(stat => {
    const card = document.createElement('div');
    card.className = 'stat-card glass-card';
    card.innerHTML = `
      <div class="stat-value" data-target="${stat.value}">0</div>
      <div class="stat-label">${stat.label}${stat.suffix}</div>
    `;
    statsContainer.appendChild(card);
  });

  // Render Education Timeline
  const eduTimeline = document.getElementById('education-timeline');
  eduTimeline.innerHTML = '';
  data.about.education.forEach(edu => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <span class="timeline-dot"></span>
      <span class="timeline-date">${edu.duration}</span>
      <h4 class="timeline-title">${edu.degree}</h4>
      <div class="timeline-subtitle">${edu.institution}</div>
      <p class="timeline-desc">${edu.details}</p>
    `;
    eduTimeline.appendChild(item);
  });

  // Render Experience Timeline
  const expTimeline = document.getElementById('experience-timeline');
  expTimeline.innerHTML = '';
  data.about.experience.forEach(exp => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <span class="timeline-dot"></span>
      <span class="timeline-date">${exp.duration}</span>
      <h4 class="timeline-title">${exp.role}</h4>
      <div class="timeline-subtitle">${exp.company}</div>
      <p class="timeline-desc">${exp.details}</p>
    `;
    expTimeline.appendChild(item);
  });

  // --- Skills Section ---
  document.getElementById('skills-heading').textContent = data.skills.heading;
  document.getElementById('skills-subheading').textContent = data.skills.subHeading;

  // Render Technical Skills
  const techList = document.getElementById('technical-skills-list');
  techList.innerHTML = '';
  data.skills.technical.forEach(skill => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-progress-item';
    skillItem.innerHTML = `
      <div class="skill-info">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-percent">${skill.level}%</span>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar-fill" data-level="${skill.level}"></div>
      </div>
    `;
    techList.appendChild(skillItem);
  });

  // Render Soft Skills
  const softList = document.getElementById('soft-skills-list');
  softList.innerHTML = '';
  data.skills.soft.forEach(skill => {
    const skillCard = document.createElement('div');
    skillCard.className = 'soft-skill-card glass-card';
    skillCard.innerHTML = `
      <div class="soft-skill-icon-box">
        <i class="fa-solid ${skill.icon}"></i>
      </div>
      <h4 class="soft-skill-title">${skill.title}</h4>
      <p class="soft-skill-desc">${skill.desc}</p>
    `;
    softList.appendChild(skillCard);
  });

  // --- Projects Section Heading ---
  document.getElementById('projects-heading').textContent = data.projects.heading;
  document.getElementById('projects-subheading').textContent = data.projects.subHeading;

  // Render Projects Grid and Filter Buttons
  const filterBar = document.getElementById('projects-filter-bar');
  filterBar.innerHTML = '';
  data.projects.categories.forEach((cat, index) => {
    const btn = document.createElement('button');
    btn.className = `filter-btn ${index === 0 ? 'active' : ''}`;
    btn.setAttribute('data-filter', cat.toLowerCase());
    btn.textContent = cat;
    filterBar.appendChild(btn);
  });

  renderProjectsList(data.projects.items);

  // --- Achievements Section ---
  document.getElementById('achievements-heading').textContent = data.achievements.heading;
  document.getElementById('achievements-subheading').textContent = data.achievements.subHeading;
  document.getElementById('certificate-mockup-img').setAttribute('src', data.achievements.certificateMockup);

  const achievementsList = document.getElementById('achievements-list');
  achievementsList.innerHTML = '';
  data.achievements.items.forEach(item => {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-item glass-card';
    achievement.innerHTML = `
      <div class="achievement-icon-wrapper">
        <i class="fa-solid ${item.icon}"></i>
      </div>
      <div class="achievement-content">
        <h4>${item.title}</h4>
        <div class="achievement-issuer-date">${item.issuer} • ${item.date}</div>
        <p class="achievement-text">${item.description}</p>
      </div>
    `;
    achievementsList.appendChild(achievement);
  });

  // --- Resume Section ---
  document.getElementById('resume-heading').textContent = data.resume.heading;
  document.getElementById('resume-subheading').textContent = data.resume.subHeading;
  document.getElementById('resume-preview-name').textContent = data.profile.name;
  document.getElementById('resume-preview-title').textContent = data.resume.previewSubtitle;
  
  const highlightsList = document.getElementById('resume-highlights');
  highlightsList.innerHTML = '';
  data.resume.highlights.forEach(hl => {
    const li = document.createElement('li');
    li.textContent = hl;
    highlightsList.appendChild(li);
  });

  // --- Contact Section ---
  document.getElementById('contact-heading').textContent = data.contact.heading;
  document.getElementById('contact-subheading').textContent = data.contact.subHeading;
  
  const emailElem = document.getElementById('contact-email');
  emailElem.textContent = data.contact.email;
  emailElem.setAttribute('href', `mailto:${data.contact.email}`);

  const phoneElem = document.getElementById('contact-phone');
  phoneElem.textContent = data.contact.phone;
  phoneElem.setAttribute('href', `tel:${data.contact.phone.replace(/[^0-9+]/g, '')}`);

  document.getElementById('contact-location').textContent = data.contact.location;

  // Render Social Handles in Contact Info & Footer
  const contactSocials = document.getElementById('contact-socials');
  const footerSocials = document.getElementById('footer-socials');
  contactSocials.innerHTML = '';
  footerSocials.innerHTML = '';

  data.contact.socialLinks.forEach(link => {
    const aContact = document.createElement('a');
    aContact.href = link.url;
    aContact.target = '_blank';
    aContact.className = 'icon-btn';
    aContact.setAttribute('aria-label', `Visit my ${link.name}`);
    aContact.innerHTML = `<i class="fa-brands ${link.icon}"></i>`;
    contactSocials.appendChild(aContact);

    const aFooter = document.createElement('a');
    aFooter.href = link.url;
    aFooter.target = '_blank';
    aFooter.className = 'icon-btn';
    aFooter.setAttribute('aria-label', `Follow my ${link.name}`);
    aFooter.innerHTML = `<i class="fa-brands ${link.icon}"></i>`;
    footerSocials.appendChild(aFooter);
  });

  // Footer current year
  document.getElementById('current-year').textContent = new Date().getFullYear();
}

function renderProjectsList(projects) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';
  
  projects.forEach((proj, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card glass-card';
    card.setAttribute('data-category', proj.category.toLowerCase());
    
    // Tech badges HTML
    const badgesHtml = proj.technologies.map(t => `<span class="project-tech-badge">${t}</span>`).join('');

    card.innerHTML = `
      <div class="project-image-box">
        <span class="project-category-tag">${proj.category}</span>
        <img src="${proj.image}" alt="${proj.title}" loading="lazy">
      </div>
      <div class="project-details-box">
        <h4 class="project-title">${proj.title}</h4>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tech-list">
          ${badgesHtml}
        </div>
        <div class="project-links">
          <a href="${proj.githubUrl}" target="_blank" class="project-link-btn"><i class="fa-brands fa-github"></i> Repository</a>
          <a href="${proj.liveUrl}" target="_blank" class="project-link-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ==========================================================================
   2. TYPING EFFECT
   ========================================================================== */

function initTypingEffect() {
  const typingSpan = document.getElementById('typing-text');
  if (!typingSpan) return;

  const roles = portfolioConfig.profile.typingRoles || ["Developer", "Designer"];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeAction() {
    const current = roles[roleIdx];
    if (isDeleting) {
      typingSpan.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingSpan.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      typeSpeed = 1800; // Delay when word fully typed
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400; // Brief delay before starting next word
    }

    setTimeout(typeAction, typeSpeed);
  }

  // Start typing loop
  setTimeout(typeAction, 800);
}

/* ==========================================================================
   3. THEME MANAGER (DARK/LIGHT & ACCENTS)
   ========================================================================== */

function initThemeManager() {
  const body = document.body;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const themePanel = document.getElementById('theme-panel');
  const themePanelToggle = document.getElementById('theme-panel-toggle');
  const accentDots = document.querySelectorAll('.accent-dot');

  // --- Light/Dark Mode Toggle ---
  const savedMode = localStorage.getItem('portfolio-mode') || 'dark';
  applyMode(savedMode);

  themeToggleBtn.addEventListener('click', () => {
    const currentMode = body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    applyMode(newMode);
  });

  function applyMode(mode) {
    if (mode === 'dark') {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      themeIcon.className = 'fa-solid fa-sun';
      localStorage.setItem('portfolio-mode', 'dark');
    } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      themeIcon.className = 'fa-solid fa-moon';
      localStorage.setItem('portfolio-mode', 'light');
    }
  }

  // --- Theme Customization Panel ---
  themePanelToggle.addEventListener('click', () => {
    themePanel.classList.toggle('open');
  });

  // Close panel on clicking outside
  document.addEventListener('click', (e) => {
    if (!themePanel.contains(e.target)) {
      themePanel.classList.remove('open');
    }
  });

  // --- Accent Colors ---
  const savedAccent = localStorage.getItem('portfolio-accent') || 'indigo';
  applyAccent(savedAccent);

  accentDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const selectedAccent = dot.getAttribute('data-accent');
      applyAccent(selectedAccent);
    });
  });

  function applyAccent(accentName) {
    // Clear all accent classes from body
    const accentClasses = ['accent-indigo', 'accent-emerald', 'accent-amber', 'accent-rose', 'accent-cyan'];
    accentClasses.forEach(cls => body.classList.remove(cls));

    // Add selected accent class
    body.classList.add(`accent-${accentName}`);
    localStorage.setItem('portfolio-accent', accentName);

    // Update active dot in panel
    accentDots.forEach(dot => {
      if (dot.getAttribute('data-accent') === accentName) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Dynamic color updates for particles / glows
    document.documentElement.style.setProperty('--primary-glow', `rgba(var(--primary-rgb), 0.2)`);
  }
}

/* ==========================================================================
   4. NAVIGATION DRAWER (MOBILE HAMBURGER)
   ========================================================================== */

function initNavigationDrawer() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu drawer on clicking navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu drawer on clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target)) {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

/* ==========================================================================
   5. SCROLL INTERACTIONS
   ========================================================================== */

function initScrollInteractions() {
  const header = document.querySelector('.glass-nav');
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Sticky header class
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header styling on scroll
    if (scrollPos > 50) {
      header.classList.add('nav-scrolled');
    } else {
      header.classList.remove('nav-scrolled');
    }

    // Back to top appearance
    if (scrollPos > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }

    // Scrollspy active class on nav links
    let activeSectionId = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120; // Margin threshold
      const sectionHeight = sec.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        activeSectionId = sec.getAttribute('id');
      }
    });

    if (activeSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Back to top click behavior
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-out-cubic',
      anchorPlacement: 'top-bottom'
    });
  }
}

/* ==========================================================================
   6. PROJECTS FILTER LOGIC
   ========================================================================== */

function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // Transitions match style.css
        }
      });
    });
  });
}

/* ==========================================================================
   7. INTERSECTION ANIMATIONS (COUNTERS & PROGRESS BARS)
   ========================================================================== */

function initIntersectionAnimations() {
  
  // --- Stat Counter Anim ---
  const statsSection = document.getElementById('stats-container');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1500; // 1.5 seconds
      const stepTime = Math.max(Math.floor(duration / target), 30);
      let current = 0;

      const timer = setInterval(() => {
        current += Math.ceil(target / (duration / stepTime));
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, stepTime);
    });
  }

  // --- Skills Progress Fill Anim ---
  const skillsList = document.getElementById('technical-skills-list');
  if (skillsList) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateProgressBars();
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, { threshold: 0.1 });

    observer.observe(skillsList);
  }

  function animateProgressBars() {
    const fills = document.querySelectorAll('.progress-bar-fill');
    fills.forEach(fill => {
      const targetWidth = fill.getAttribute('data-level');
      fill.style.width = `${targetWidth}%`;
    });
  }
}

/* ==========================================================================
   8. CONTACT FORM VALIDATOR
   ========================================================================== */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('form-submit-btn');
  const statusDiv = document.getElementById('form-status');

  const fields = {
    name: { input: document.getElementById('form-name'), error: document.getElementById('name-error') },
    email: { input: document.getElementById('form-email'), error: document.getElementById('email-error') },
    subject: { input: document.getElementById('form-subject'), error: document.getElementById('subject-error') },
    message: { input: document.getElementById('form-message'), error: document.getElementById('message-error') }
  };

  // Add blur listener to inputs for dynamic feedback
  Object.values(fields).forEach(field => {
    field.input.addEventListener('blur', () => {
      validateField(field);
    });
    // Clear error on typing
    field.input.addEventListener('input', () => {
      field.input.closest('.form-group').classList.remove('invalid');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    
    // Validate all fields
    Object.values(fields).forEach(field => {
      const isValid = validateField(field);
      if (!isValid) isFormValid = false;
    });

    if (isFormValid) {
      handleFormSubmission();
    }
  });

  function validateField(field) {
    const input = field.input;
    const parent = input.closest('.form-group');
    const val = input.value.trim();
    
    let isValid = true;

    if (val === '') {
      isValid = false;
    } else if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        isValid = false;
      }
    }

    if (!isValid) {
      parent.classList.add('invalid');
    } else {
      parent.classList.remove('invalid');
    }

    return isValid;
  }

  function handleFormSubmission() {
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    
    // Clear status div
    statusDiv.className = 'form-status';
    statusDiv.style.display = 'none';

    // Mock network request delay (1.5 seconds)
    setTimeout(() => {
      // Simulate success
      statusDiv.className = 'form-status success';
      statusDiv.textContent = 'Thank you! Your message was sent successfully. We will get back to you shortly.';
      statusDiv.style.display = 'block';

      // Reset form fields
      form.reset();
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      
      // Auto-hide status banner after 6 seconds
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 6000);

    }, 1500);
  }
}
