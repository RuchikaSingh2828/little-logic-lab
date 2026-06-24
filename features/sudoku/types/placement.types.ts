export type PlacementResult =
  | { type: "correct"; row: number; col: number; solved: boolean }
  | { type: "wrong"; row: number; col: number }
  | { type: "noop" };
