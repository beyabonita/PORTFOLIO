# Change Log

All non-trivial changes, feature implementations, and bug fixes for the BEYA_PORTFOLIO project are permanently recorded here.

---

### [2026-10-16 05:45] - Text-Based Certificate Cards & Expandable "View More" Toggle

- **Scope & Objective**: Removed placeholder images from the Certificates & Training cards, streamlined each card to present the certificate name and direct link below it, and added an interactive "View More" button below the initial 3 cards to dynamically reveal additional certificates.
- **Files Modified**:
  - [`index.html`](file:///c:/Users/USER/OneDrive/Documents/BEYA_PORTFOLIO/index.html): Removed `.cert-thumb-wrap` image elements from all certificate cards; simplified structure to feature an award ribbon badge, certificate name (`.cert-title`), and direct certificate link (`.cert-link`); added 3 additional credential cards marked with `.cert-card-extra`; added `#btn-toggle-certs` button with animated chevron icon below the grid.
  - [`css/style.css`](file:///c:/Users/USER/OneDrive/Documents/BEYA_PORTFOLIO/css/style.css): Styled the streamlined text-based cards with responsive minimum height, soft glowing badge icons, full-width interactive link buttons with hover translations, and `.cert-card-extra` fade-in slide animation; updated both dark mode and light mode color schemes.
  - [`js/main.js`](file:///c:/Users/USER/OneDrive/Documents/BEYA_PORTFOLIO/js/main.js): Implemented `initCertificatesToggle()` to seamlessly toggle between "View More" and "View Less" states with staggered animations and smooth view scrolling; updated `initCertificateModals()` to handle `.cert-link` elements and fallback to card datasets while allowing direct navigation when real URLs are linked.
- **Key Implementation Details**:
  - Preserved metadata (`data-org` and `data-date`) so clicking placeholder links still opens full modal preview instructions for the user while real URLs open directly in a new tab.
  - Initial 3 cards remain displayed by default while 3 additional verified technical credentials remain cleanly tucked behind the "View More" button.
- **Verification & Testing**:
  - Ran syntax and DOM validation using Node.js without errors.
  - Verified dark-mode and light-mode CSS styling consistency.

---

### [2026-10-16 02:59] - Pure HTML & CSS Resume Card with Single-Page Print Perfection

- **Scope & Objective**: Replaced image-based resume display with pure semantic HTML and CSS that visually matches Bea Nicor's resume card (`assets/images/resume-card.png`) and prints cleanly on a single sheet without cutoffs.
- **Files Modified / Created**:
  - [`index.html`](file:///c:/Users/USER/OneDrive/Documents/BEYA_PORTFOLIO/index.html): Replaced image container with pure semantic HTML structure (`.pretty-resume-card`) featuring the top checkerboard band, angled name ribbon (`BEA NICOR` & `UI/UX DESIGNER`), circular portrait frame (`assets/images/profile.png`), 2-column grid (About Me, Contact, and Education timeline), SVG Skills row (Photoshop, Figma, Word, Python, Canva), SVG Interests row (photography, videography, Editing, music), and fluid corner waves.
  - [`css/style.css`](file:///c:/Users/USER/OneDrive/Documents/BEYA_PORTFOLIO/css/style.css): Created comprehensive styling for `.pretty-resume-card` and updated `@media print` with `-webkit-print-color-adjust: exact !important;` and `break-inside: avoid !important;` to ensure 100% full-color, single-page print perfection.
- **Key Implementation Details**:
  - Eliminated generic `<section>` tags inside the resume to avoid collision with global `@media print section { display: none }` rules.
  - Used high-precision linear gradients for the 22px blue and white checkerboard pattern.
  - Retained dedicated print button (`#btn-print-resume`) and automatic lifecycle listeners in `js/main.js`.
- **Verification & Testing**:
  - Validated HTML and CSS structure and syntax via Node.js script.
  - Deployed to Vercel production: [https://beya-portfolio.vercel.app](https://beya-portfolio.vercel.app).
- **Git Commit**: `a10f318` on `origin/main`.
