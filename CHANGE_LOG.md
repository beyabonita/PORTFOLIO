# Change Log

All non-trivial changes, feature implementations, and bug fixes for the BEYA_PORTFOLIO project are permanently recorded here.

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
