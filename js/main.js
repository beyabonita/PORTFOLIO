/**
 * BEA.DEV — JAVASCRIPT CONTROLLER
 * Author: Bea Matias Nicor (Information Systems Student)
 * Features:
 *  - Animated Pink Glitter Particle Canvas
 *  - Web Audio API Sound Synthesizer (Chime & Click)
 *  - Header Controls (Accent Picker, Sound Toggle, Theme Toggle, Print, Resume)
 *  - Navigation ScrollSpy & Smooth Scrolling
 *  - Interactive Security Lab Terminal Simulator
 *  - Project Details Modal & Instant Screenshot Replacer
 *  - Certificate Preview Modal & Resume Modal
 *  - Copy Email with Toast Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initGlitterCanvas();
  initSoundEngine();
  initHeaderControls();
  initNavigation();
  initProjectModals();
  initCertificateModals();
  initSecurityTerminal();
  initContactForm();
  initHeroActions();
});

/* ==========================================================================
   1. ANIMATED PINK GLITTER CANVAS
   ========================================================================== */
function initGlitterCanvas() {
  const canvas = document.getElementById('glitter-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 40 : 85;

  const colors = [
    'rgba(244, 114, 182, ', // Pink
    'rgba(255, 255, 255, ', // White
    'rgba(192, 132, 252, ', // Lavender
    'rgba(251, 113, 133, ', // Rose gold
    'rgba(252, 231, 243, '  // Blush
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.8;
      this.baseAlpha = Math.random() * 0.7 + 0.2;
      this.alpha = this.baseAlpha;
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = - (Math.random() * 0.4 + 0.15); // float upward slowly
      this.twinkleSpeed = Math.random() * 0.03 + 0.01;
      this.twinkleFactor = Math.random() * Math.PI * 2;
      this.isSparkle = Math.random() > 0.65; // Some render as 4-pointed stars
    }

    update() {
      if (prefersReducedMotion) return;

      this.x += this.speedX;
      this.y += this.speedY;
      this.twinkleFactor += this.twinkleSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.twinkleFactor) * 0.3;
      if (this.alpha < 0.05) this.alpha = 0.05;

      // Wrap around edges
      if (this.y < -10) this.y = height + 10;
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
    }

    draw() {
      ctx.save();
      ctx.fillStyle = this.colorBase + this.alpha + ')';

      if (this.isSparkle) {
        // Draw 4-point star sparkle
        const r = this.size * 2.2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - r);
        ctx.quadraticCurveTo(this.x, this.y, this.x + r, this.y);
        ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + r);
        ctx.quadraticCurveTo(this.x, this.y, this.x - r, this.y);
        ctx.quadraticCurveTo(this.x, this.y, this.x, this.y - r);
        ctx.fill();
      } else {
        // Draw soft glowing circular particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // Initialize particles
  particles = Array.from({ length: particleCount }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. WEB AUDIO API SOUND ENGINE
   ========================================================================== */
let audioCtx = null;
let isSoundEnabled = false;

function initSoundEngine() {
  const soundBtn = document.getElementById('btn-sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  
  if (!soundBtn) return;

  function ensureAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  soundBtn.addEventListener('click', () => {
    ensureAudioContext();
    isSoundEnabled = !isSoundEnabled;
    soundBtn.classList.toggle('active', isSoundEnabled);

    if (isSoundEnabled) {
      soundBtn.setAttribute('title', 'Sound Effects: ON (Click to Mute)');
      playChime(587.33); // D5 note pleasant confirmation
      showToast('Sound Effects Enabled ♫', 'info');
      if (soundIcon) {
        soundIcon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`;
      }
    } else {
      soundBtn.setAttribute('title', 'Sound Effects: OFF (Click to Enable)');
      showToast('Sound Effects Muted', 'info');
      if (soundIcon) {
        soundIcon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;
      }
    }
  });

  // Attach subtle audio feedback to interactive buttons
  document.querySelectorAll('button, .nav-link, .btn, .ctrl-btn').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      if (isSoundEnabled) playSoftTick();
    });
    elem.addEventListener('click', () => {
      if (isSoundEnabled) playChime();
    });
  });
}

function playSoftTick() {
  if (!audioCtx || !isSoundEnabled) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {
    // Audio context not allowed yet
  }
}

function playChime(customFreq = null) {
  if (!audioCtx || !isSoundEnabled) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const freq = customFreq || (Math.random() > 0.5 ? 880 : 1046.5); // A5 or C6 crystal chime
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.25);
  } catch (e) {}
}

/* ==========================================================================
   3. HEADER CONTROLS (ACCENT PICKER, THEME, PRINT, RESUME)
   ========================================================================== */
function initHeaderControls() {
  // 1. Accent Color Picker Cycle Button
  const accentBtn = document.getElementById('btn-accent-toggle');
  const accentIndicator = document.getElementById('accent-indicator');
  const accents = ['accent-pink', 'accent-lavender', 'accent-rosegold'];
  let currentAccentIdx = 0;

  if (accentBtn) {
    accentBtn.addEventListener('click', () => {
      document.body.classList.remove('accent-lavender', 'accent-rosegold');
      currentAccentIdx = (currentAccentIdx + 1) % accents.length;
      
      if (accents[currentAccentIdx] === 'accent-lavender') {
        document.body.classList.add('accent-lavender');
        if (accentIndicator) accentIndicator.style.background = '#c084fc';
        showToast('Accent switched to Lavender Dream 💜', 'info');
      } else if (accents[currentAccentIdx] === 'accent-rosegold') {
        document.body.classList.add('accent-rosegold');
        if (accentIndicator) accentIndicator.style.background = '#fb7185';
        showToast('Accent switched to Rose Gold 🌸', 'info');
      } else {
        if (accentIndicator) accentIndicator.style.background = '#f472b6';
        showToast('Accent switched to Sweet Pink 💖', 'info');
      }
    });
  }

  // 2. Theme Toggle (Dark Midnight Navy <-> Soft Rose Light Mode)
  const themeBtn = document.getElementById('btn-theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      showToast(isLight ? 'Light Rose Mode Activated ☀️' : 'Midnight Navy Mode Activated 🌙', 'info');
    });
  }

  // 3. Print Button
  const printBtn = document.getElementById('btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      showToast('Preparing clean print layout...', 'info');
      setTimeout(() => {
        window.print();
      }, 300);
    });
  }

  // 4. Resume Button in Header
  const headerResumeBtn = document.getElementById('btn-header-resume');
  if (headerResumeBtn) {
    headerResumeBtn.addEventListener('click', () => {
      openResumeModal();
    });
  }
}

/* ==========================================================================
   4. NAVIGATION & MOBILE HAMBURGER
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const headerNav = document.getElementById('header-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect on header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && headerNav) {
    mobileToggle.addEventListener('click', () => {
      headerNav.classList.toggle('open');
      const isOpen = headerNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        headerNav.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   5. HERO ACTIONS & COPY EMAIL
   ========================================================================== */
function initHeroActions() {
  const copyEmailBtn = document.getElementById('btn-copy-email');
  const heroResumeBtn = document.getElementById('btn-hero-resume');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'bmnicor.chmsu@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied to clipboard: ${email}`, 'success');
        }).catch(() => {
          showToast(`Email address: ${email}`, 'info');
        });
      } else {
        showToast(`Email address: ${email}`, 'info');
      }
    });
  }

  if (heroResumeBtn) {
    heroResumeBtn.addEventListener('click', () => {
      openResumeModal();
    });
  }
}

/* ==========================================================================
   6. PROJECT MODALS & SCREENSHOT REPLACER
   ========================================================================== */
const projectData = {
  project1: {
    title: "WEB BASED SECURITY AGENCY MANAGEMENT SYSTEM WITH MOBILE APPLICATION FOR REALTIME MONITORING",
    image: "IMAGES/PROJ1.png",
    overview: "A comprehensive enterprise information system designed to automate security guard deployments, schedule dispatching, incident reporting, and real-time mobile checkpoint verification for security agency operations.",
    problem: "Manual attendance tracking, delayed incident escalation, paper-based guard scheduling, and lack of live verification during patrol rounds in distributed client sites.",
    objectives: [
      "Develop a centralized web administrative dashboard for agency coordinators.",
      "Integrate GPS-enabled mobile checkpoint logging for on-duty security officers.",
      "Automate shift schedules, client billing records, and guard attendance reporting.",
      "Ensure robust role-based access control (RBAC) to protect sensitive operational logs."
    ],
    features: [
      "Real-time guard patrol & checkpoint status tracking.",
      "Digital incident ticket dispatching with multimedia upload support.",
      "Automated shift scheduling, attendance ledger, and overtime calculation.",
      "Client portal for reviewing assigned personnel and daily security status."
    ],
    role: "Lead Systems Analyst & Full-Stack Developer: Responsible for database modeling (ERD), system architecture design, administrative dashboard implementation, and RESTful API endpoints for the mobile monitoring client.",
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "REST API", "Leaflet/GPS", "HTML5/CSS3"],
    teamImage: "IMAGES/WEB1.png",
    teamMembers: [
      { name: "BEA NICOR", role: "PROJECT MANAGER / SYSTEM ANALYST" },
      { name: "ANGEL ANN SAMANION", role: "DEVELOPER" }
    ]
  },
  project2: {
    title: "ONLINE RESERVATION MANAGEMENT SYSTEM FOR MCC SEAFOOD RESTAURANT",
    image: "IMAGES/PROJ2.png",
    overview: "An automated web reservation and table allocation management system created specifically for MCC Seafood Restaurant to replace manual reservation books and optimize dining capacity.",
    problem: "Double-booking issues during peak dining hours, phone-only reservations causing miscommunication, and inability for customers to view real-time table availability and menu specialties.",
    objectives: [
      "Provide an intuitive online dining reservation interface with instant confirmation.",
      "Implement real-time dining room floor plan and table availability allocation.",
      "Streamline customer inquiries, special dietary requests, and event pre-orders.",
      "Generate daily reservation analytics and peak-hour occupancy reports for managers."
    ],
    features: [
      "Interactive table selector based on party size and preferred dining section.",
      "Automated reservation status workflow (Pending, Confirmed, Seated, Cancelled).",
      "Customer notification logs and special occasion preference tracking.",
      "Kitchen and floor staff scheduling coordination dashboard."
    ],
    role: "System Designer & Front-End Developer: Conducted user requirements elicitation with restaurant staff, developed normalized database schemas, and built the customer booking portal with responsive UI.",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "AJAX", "Responsive Design"],
    teamImage: "IMAGES/team2.png",
    teamMembers: [
      { name: "Bea Matias Nicor", role: "System Designer & Frontend" },
      { name: "Team Member 2", role: "Backend Developer" },
      { name: "Team Member 3", role: "Testing & QA Specialist" }
    ]
  },
  project3: {
    title: "KARE: RESTAURANT RESERVATION AND ORDERING SYSTEM",
    image: "IMAGES/PROJ3.png",
    overview: "A unified restaurant information system that bridges digital table bookings with contactless digital table ordering, kitchen order routing, and bill calculation.",
    problem: "Disconnect between prior table reservations and dining room order placement, resulting in long customer wait times and clerical errors in billing.",
    objectives: [
      "Harmonize advance table bookings with an integrated pre-ordering dining cart.",
      "Implement a digital kitchen display queue (KDS) for incoming order tracking.",
      "Reduce order turnaround time and improve dining guest satisfaction.",
      "Maintain strict transaction integrity and accurate bill auditing."
    ],
    features: [
      "Combined reservation and digital item pre-ordering capability.",
      "Real-time kitchen order state queue with timer indicators.",
      "Dynamic menu category filtering and real-time inventory availability.",
      "Administrative audit logs and daily sales summary generation."
    ],
    role: "Co-Developer & Database Administrator: Structured relational database tables, implemented business logic constraints, and designed the interactive customer order interface.",
    technologies: ["JavaScript (ES6+)", "PHP", "MySQL", "CSS Glassmorphism", "Bootstrap", "JSON API"],
    teamImage: "IMAGES/team3.png",
    teamMembers: [
      { name: "Bea Matias Nicor", role: "Co-Developer & Database Admin" },
      { name: "Team Member 2", role: "Lead Full-Stack Developer" },
      { name: "Team Member 3", role: "UI/UX & Documentation" }
    ]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalClose = document.getElementById('project-modal-close');
  const viewBtns = document.querySelectorAll('.btn-view-project');

  if (!modalOverlay) return;

  function openProject(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modal-project-title').textContent = data.title;
    
    // Check if user has uploaded a custom image in session
    const storedImg = sessionStorage.getItem(`custom_img_${projectId}`);
    const modalImg = document.getElementById('modal-project-img');
    modalImg.src = storedImg || data.image;
    modalImg.alt = data.title;

    document.getElementById('modal-project-overview').textContent = data.overview;
    document.getElementById('modal-project-problem').textContent = data.problem;
    
    // Objectives
    const objList = document.getElementById('modal-project-objectives');
    objList.innerHTML = '';
    data.objectives.forEach(obj => {
      const li = document.createElement('li');
      li.textContent = obj;
      objList.appendChild(li);
    });

    // Features
    const featList = document.getElementById('modal-project-features');
    featList.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      featList.appendChild(li);
    });

    document.getElementById('modal-project-role').textContent = data.role;

    // Tech tags
    const techWrap = document.getElementById('modal-project-tech');
    techWrap.innerHTML = '';
    data.technologies.forEach(tech => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = tech;
      techWrap.appendChild(tag);
    });

    // Render Project Team Section (Photo + 3 Members)
    const teamSection = document.getElementById('modal-project-team-section');
    const teamImg = document.getElementById('modal-team-img');
    const teamList = document.getElementById('modal-team-members-list');
    if (teamSection && teamList) {
      if (data.teamMembers && data.teamMembers.length > 0) {
        teamSection.style.display = 'block';
        if (teamImg) {
          teamImg.src = data.teamImage || 'IMAGES/team.png';
          teamImg.alt = `${data.title} Team Photo`;
          teamImg.onerror = function() {
            // Fallback placeholder if team image is not yet uploaded
            this.src = 'assets/images/certificate-placeholder.svg';
          };
        }
        teamList.innerHTML = '';
        data.teamMembers.forEach(member => {
          const card = document.createElement('div');
          card.className = 'team-member-card';
          card.innerHTML = `
            <div class="team-member-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span class="team-member-name">${member.name}</span>
            <span class="team-member-role">${member.role}</span>
          `;
          teamList.appendChild(card);
        });
      } else {
        teamSection.style.display = 'none';
      }
    }

    // Setup the image replacer button
    const fileInput = document.getElementById('project-image-input');
    const replaceBtn = document.getElementById('btn-replace-screenshot');
    if (replaceBtn && fileInput) {
      replaceBtn.onclick = () => fileInput.click();
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const dataUrl = event.target.result;
            modalImg.src = dataUrl;
            sessionStorage.setItem(`custom_img_${projectId}`, dataUrl);
            
            // Also update the card thumbnail on the page
            const cardImg = document.querySelector(`[data-project-img="${projectId}"]`);
            if (cardImg) cardImg.src = dataUrl;

            showToast('Project screenshot updated in preview! ✨', 'success');
          };
          reader.readAsDataURL(file);
        }
      };
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openProject(projectId);
    });
  });

  // Clicking screenshot wrapper on card also opens project details
  document.querySelectorAll('.project-media-wrapper').forEach(wrap => {
    wrap.addEventListener('click', () => {
      const projectId = wrap.getAttribute('data-project');
      openProject(projectId);
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. RESUME MODAL
   ========================================================================== */
function openResumeModal() {
  const resumeModal = document.getElementById('resume-modal-overlay');
  if (!resumeModal) return;

  resumeModal.classList.add('open');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('resume-modal-close');
  if (closeBtn) {
    closeBtn.onclick = () => {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    };
  }

  const printBtn = document.getElementById('btn-print-resume');
  if (printBtn) {
    printBtn.onclick = () => {
      document.body.classList.add('printing-resume');
      window.print();
      setTimeout(() => {
        document.body.classList.remove('printing-resume');
      }, 1200);
    };
  }

  resumeModal.onclick = (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  const handleEsc = (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

/* ==========================================================================
   8. CERTIFICATE MODAL
   ========================================================================== */
function initCertificateModals() {
  const certModal = document.getElementById('cert-modal-overlay');
  const certClose = document.getElementById('cert-modal-close');
  const previewBtns = document.querySelectorAll('.btn-cert-preview, .cert-thumb-wrap');

  if (!certModal) return;

  previewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.cert-card');
      if (!card) return;
      const title = card.querySelector('.cert-title').textContent;
      const org = card.querySelector('.cert-org').textContent;
      const date = card.querySelector('.cert-date').textContent;
      
      document.getElementById('modal-cert-title').textContent = title;
      document.getElementById('modal-cert-org').textContent = org;
      document.getElementById('modal-cert-date').textContent = date;

      certModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeCertModal() {
    certModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (certClose) certClose.addEventListener('click', closeCertModal);
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeCertModal();
  });
}

/* ==========================================================================
   9. SECURITY LAB INTERACTIVE TERMINAL
   ========================================================================== */
function initSecurityTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  if (!terminalInput || !terminalBody) return;

  const commands = {
    help: "Available commands:\n  • status   - View current security audit status\n  • rbac     - Inspect Role-Based Access Control logic\n  • sqli     - Demo parameterized query defense\n  • hash     - Demonstrate secure password hashing simulation\n  • audit    - List student security lab activity logs\n  • clear    - Clear terminal screen",
    status: "[INFO] System Integrity: NORMAL (100%)\n[INFO] SSL/TLS: Simulated Enforced\n[INFO] Access Control: Role-Based (Admin, Coordinator, Officer, Guest)\n[INFO] Database Engine: MySQL / Prepared Statements",
    rbac: "[RBAC DEMO]\n- Role: 'Admin'       => Full CRUD + Audit Trail View\n- Role: 'Coordinator' => Roster Dispatch + Guard Monitoring\n- Role: 'Guard'       => Checkpoint Check-in + Incident File\n- Role: 'Guest'       => Read-Only Profile\n[STATUS] Unauthorized role escalation prevented by session token checks.",
    sqli: "[SQL INJECTION DEFENSE]\nVulnerable Query: SELECT * FROM users WHERE user = '$input'\nSecure Prepared:  $stmt = $pdo->prepare('SELECT * FROM users WHERE user = ?');\n                  $stmt->execute([$input]);\nResult: User input safely bound as data literal. Injection vectors neutralized.",
    hash: "[HASHING SIMULATION]\nInput: 'StudentSecurePass2026!'\nAlgorithm: bcrypt (cost factor 12)\nOutput: $2y$12$e8wE0.qJ3K1GfH.5Yf7NquX9s0pQ8rT2uVwXyZaBcDeFgHiJkLmNo\nSalt: Cryptographically randomized per password.",
    audit: "[LAB LOGS]\n- Lab 1: Session Hijacking Prevention & Secure Cookie Flags (HttpOnly, SameSite)\n- Lab 2: Input Sanitization on Web Reservation Form\n- Lab 3: Security Agency Mobile API Bearer Token Authentication",
    clear: "CLEAR"
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputVal = terminalInput.value.trim().toLowerCase();
      if (!inputVal) return;

      // Create history entry
      const cmdRow = document.createElement('div');
      cmdRow.className = 'terminal-line';
      cmdRow.innerHTML = `<span class="terminal-prompt">bea@security-lab:~$</span> <span>${escapeHtml(inputVal)}</span>`;
      
      if (inputVal === 'clear') {
        terminalBody.querySelectorAll('.terminal-line, .terminal-output').forEach(el => el.remove());
      } else {
        terminalBody.insertBefore(cmdRow, terminalInput.parentElement);

        const outRow = document.createElement('div');
        outRow.className = 'terminal-output font-code';
        if (commands[inputVal]) {
          outRow.innerText = commands[inputVal];
        } else {
          outRow.innerText = `Command not found: '${inputVal}'. Type 'help' for available commands.`;
        }
        terminalBody.insertBefore(outRow, terminalInput.parentElement);
      }

      terminalInput.value = '';
      terminalBody.scrollTop = terminalBody.scrollHeight;
      if (isSoundEnabled) playSoftTick();
    }
  });

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }
}

/* ==========================================================================
   10. CONTACT FORM CLIENT-SIDE HANDLER
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Demo notification
    showToast(`Thank you, ${name}! Message received (Demo Mode). Ready for email service hook!`, 'success');
    contactForm.reset();
  });
}

/* ==========================================================================
   11. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';

  let icon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  `;

  if (type === 'success') {
    icon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;
  }

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
