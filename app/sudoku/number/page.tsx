import { ModeHubPage, buildModeHubMetadata } from "@/features/sudoku/components/ModeHubPage";

export const metadata = buildModeHubMetadata("number");

export default function NumberHubPage() {
  return (
    <ModeHubPage
      mode="number"
      ageLabel="Best for ages 7+"
      blurb="Number Sudoku introduces classic digits on kid-friendly grid sizes (7×7 through 9×9) so older children can build toward adult Sudoku at their own pace."
    />
  );
}
