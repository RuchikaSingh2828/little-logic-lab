export type FeedbackVariant = "success" | "error" | "hint";

export interface GameFeedback {
  title: string;
  subtitle?: string;
  variant: FeedbackVariant;
}

export const CORRECT_PLACEMENT_FEEDBACK: GameFeedback[] = [
  { title: "👍", variant: "success" },
];

export const INVALID_PLACEMENT_FEEDBACK: GameFeedback = {
  title: "Not quite!",
  subtitle: "Try a different spot.",
  variant: "error",
};

export const HINT_FEEDBACK: GameFeedback = {
  title: "Here's a clue!",
  subtitle: "Look at the row and column.",
  variant: "hint",
};

export function getRandomCorrectFeedback(): GameFeedback {
  return CORRECT_PLACEMENT_FEEDBACK[0];
}
