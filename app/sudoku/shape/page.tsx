import { ModeHubPage, buildModeHubMetadata } from "@/features/sudoku/components/ModeHubPage";

export const metadata = buildModeHubMetadata("shape");

export default function ShapeHubPage() {
  return (
    <ModeHubPage
      mode="shape"
      ageLabel="Best for ages 5–6"
      blurb="Shape Sudoku mixes colors and shapes so growing thinkers practice focus without jumping straight to adult-style number grids."
    />
  );
}
