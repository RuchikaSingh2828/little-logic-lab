import { ModeHubPage, buildModeHubMetadata } from "@/features/sudoku/components/ModeHubPage";

export const metadata = buildModeHubMetadata("picture");

export default function PictureHubPage() {
  return (
    <ModeHubPage
      mode="picture"
      ageLabel="Best for ages 3–4"
      blurb="Picture Sudoku uses friendly images instead of numbers. Kids learn rows and columns by matching pictures — a gentle first step into logic puzzles."
    />
  );
}
