export type FeedbackVariant = "success" | "error" | "hint";

export interface GameFeedback {
  title: string;
  subtitle?: string;
  variant: FeedbackVariant;
}

export const CORRECT_PLACEMENT_FEEDBACK: GameFeedback[] = [
  { title: "Nice thinking!", subtitle: "You're doing great!", variant: "success" },
  { title: "Great match!", subtitle: "Keep it up!", variant: "success" },
  { title: "Well done!", subtitle: "You're on a roll!", variant: "success" },
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
  const index = Math.floor(Math.random() * CORRECT_PLACEMENT_FEEDBACK.length);
  return CORRECT_PLACEMENT_FEEDBACK[index];
}
