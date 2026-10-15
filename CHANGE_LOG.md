# Change Log

All non-trivial changes, feature implementations, and bug fixes for the BEYA_PORTFOLIO project are permanently recorded here.

---

### [2026-10-16 06:14] - Cleaned Certificate Modal Display

- **Scope & Objective**: Removed redundant description text ("Official Certificate of Completion (Code: 9443168)...") and the "Open High-Resolution Scan" button from the certificate modal as requested, so the modal focuses entirely and cleanly on the authentic certificate scan.
- **Files Modified**:
  - [`index.html`](file:///c:/Users/USER/OneDrive/Documents/BEYA_PORTFOLIO/index.html): Removed `#modal-cert-desc` and `#modal-cert-download` from the modal body; removed `data-desc` attribute from Card 1.
  - [`js/main.js`](file:///c:/Users/USER/OneDrive/Documents/BEYA_PORTFOLIO/js/main.js): Cleaned `initCertificateModals()` to display the certificate image cleanly without extra text clutter.
- **Verification & Testing**:
  - Validated syntax and deployed directly to Vercel production.

---

### [2026-10-16 06:11] - Official Certificate Scan Attached to Basics of Data Structures & Algorithms

- **Scope & Objective**: Attached Bea M. Nicor's official Simplilearn certificate scan (Certificate Code: 9443168, dated 21st November 2025) to the "Basics of Data Structure and Algorithms" card and credential modal.
- **Files Modified / Added**:
  - `assets/images/cert-dsa-simplilearn.png`: Saved user's high-resolution Simplilearn certificate scan.
  - [`index.html`](file:///c:/Users/USER/OneDrive/Documents/BEYA_PORTFOLIO/index.html): Configured Card 1 with `data-img` and direct link to the image; updated modal body with `#modal-cert-img`, `#modal-cert-desc`, and an "Open High-Resolution Scan" download/view button.
  - [`js/main.js`](file:///c:/Users/USER/OneDrive/Documents/BEYA_PORTFOLIO/js/main.js): Enhanced `initCertificateModals()` to dynamically populate the certificate image scan and download action when clicking "Show credential".
- **Key Implementation Details**:
  - Clicking "Show credential" on Card 1 immediately launches the modal featuring the real high-res certificate image issued to Bea M. Nicor.

---

### [2026-10-16 06:07] - Cisco & Coursera Verified Credentials Integration

- **Scope & Objective**: Added 4 additional verified certificates from Cisco and Coursera to the expandable "View More" grid:
  5. *Using Computer and Mobile Devices* (Cisco • Issued Nov 2025)
  6. *Introduction to Cybersecurity* (Cisco • Issued Nov 2025)
  7. *Introduction to Data Science* (Cisco • Issued Nov 2025)
  8. *Certified Information Systems Auditor (CISA)* (Coursera • Issued Oct 2025)
- **Files Modified**:
  - [`index.html`](file:///c:/Users/USER/OneDrive/Documents/BEYA_PORTFOLIO/index.html): Added 4 new credential cards under `.cert-card-extra` with custom Cisco and Coursera badge icons, metadata, and "Show credential ↗" interactive links.
- **Key Implementation Details**:
  - Brings total certificates to 8 (top 3 visible, 5 revealed dynamically upon clicking "View More").
  - Seamlessly animated with staggered fade-in slide transitions.

---

### [2026-10-16 06:02] - Real Simplilearn Credentials Integration

- **Scope & Objective**: Replaced placeholder certificate entries with Bea's actual Simplilearn verified credentials:
  1. *Basics of Data Structure and Algorithms* (Simplilearn • Issued Nov 2025)
  2. *Introduction to Cloud Security* (Simplilearn • Issued Nov 2025)
  3. *Introduction to Google Cloud* (Simplilearn • Issued Nov 2025)
  4. *Innovating with Google AI* (Simplilearn • Issued Nov 2025, revealed under "View More")
- **Files Modified**:
  - [`index.html`](file:///c:/Users/USER/OneDrive/Documents/BEYA_PORTFOLIO/index.html): Added exact titles, Simplilearn badge marks, metadata rows (`.cert-meta`), and `Show credential ↗` buttons matching the user's reference image.
  - [`css/style.css`](file:///c:/Users/USER/OneDrive/Documents/BEYA_PORTFOLIO/css/style.css): Added `.cert-meta`, `.cert-org`, and `.cert-date` styling for light and dark modes.
- **Key Implementation Details**:
  - Maintained image-less layout with interactive "Show credential" links ready for image or URL attachments.
  - Verified toggle animation and modal integration.

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
