import { Button } from "@/components/ui/button";

interface GameActionsProps {
  onHint: () => void;
  onReset: () => void;
  onNewPuzzle: () => void;
}

export function GameActions({ onHint, onReset, onNewPuzzle }: GameActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        variant="outline"
        onClick={onHint}
        className="min-h-11 min-w-[5rem] rounded-xl border-sage/50 bg-white text-foreground hover:bg-sage/20"
      >
        Hint
      </Button>
      <Button
        variant="outline"
        onClick={onReset}
        className="min-h-11 min-w-[5rem] rounded-xl border-sage/50 bg-white text-foreground hover:bg-sage/20"
      >
        Reset
      </Button>
      <Button
        variant="outline"
        onClick={onNewPuzzle}
        className="min-h-11 min-w-[5rem] rounded-xl border-sage/50 bg-white text-foreground hover:bg-sage/20"
      >
        New Puzzle
      </Button>
    </div>
  );
}
