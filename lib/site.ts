/** Canonical production origin for metadata, sitemap, and structured data. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://sudokid.in";

export const SITE_NAME = "Sudokid";

export const SITE_TAGLINE =
  "Calm Sudoku learning for children aged 3–7 — picture, shape, and number puzzles.";

export const SITE_DESCRIPTION =
  "Sudokid is a free kids Sudoku web app for ages 3–7. Start with picture puzzles, grow into shapes, then classic number Sudoku — playful logic practice for young minds.";
