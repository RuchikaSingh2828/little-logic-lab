import { cn } from "@/lib/utils";

type AvatarId = "lion" | "elephant" | "owl";

interface AgeAvatarArtProps {
  id: AvatarId;
  className?: string;
}

/** Friendly animal mascots for age-path cards — matches home wireframe. */
export function AgeAvatarArt({ id, className }: AgeAvatarArtProps) {
  switch (id) {
    case "lion":
      return <LionArt className={className} />;
    case "elephant":
      return <ElephantArt className={className} />;
    case "owl":
      return <OwlArt className={className} />;
  }
}

function LionArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      {/* Mane */}
      <circle cx="40" cy="42" r="28" fill="#F4A261" />
      <circle cx="18" cy="28" r="10" fill="#E8912D" />
      <circle cx="62" cy="28" r="10" fill="#E8912D" />
      <circle cx="14" cy="48" r="9" fill="#E8912D" />
      <circle cx="66" cy="48" r="9" fill="#E8912D" />
      <circle cx="24" cy="64" r="8" fill="#E8912D" />
      <circle cx="56" cy="64" r="8" fill="#E8912D" />
      <circle cx="40" cy="18" r="9" fill="#E8912D" />
      {/* Face */}
      <circle cx="40" cy="44" r="18" fill="#FFE08A" />
      {/* Ears */}
      <circle cx="26" cy="30" r="5" fill="#FFE08A" />
      <circle cx="54" cy="30" r="5" fill="#FFE08A" />
      <circle cx="26" cy="30" r="2.5" fill="#F4A261" />
      <circle cx="54" cy="30" r="2.5" fill="#F4A261" />
      {/* Eyes */}
      <circle cx="33" cy="42" r="2.8" fill="#2D3748" />
      <circle cx="47" cy="42" r="2.8" fill="#2D3748" />
      <circle cx="33.8" cy="41.2" r="0.9" fill="#FFF" />
      <circle cx="47.8" cy="41.2" r="0.9" fill="#FFF" />
      {/* Nose */}
      <ellipse cx="40" cy="48" rx="3.5" ry="2.8" fill="#2D3748" />
      {/* Smile */}
      <path
        d="M34 52c2.5 3 9.5 3 12 0"
        stroke="#2D3748"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Whisker dots */}
      <circle cx="30" cy="49" r="1" fill="#C46A2E" />
      <circle cx="50" cy="49" r="1" fill="#C46A2E" />
    </svg>
  );
}

function ElephantArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      {/* Ears */}
      <ellipse cx="13" cy="40" rx="13" ry="19" fill="#6B9AC4" />
      <ellipse cx="67" cy="40" rx="13" ry="19" fill="#6B9AC4" />
      <ellipse cx="15" cy="40" rx="7.5" ry="12" fill="#F2B8C6" />
      <ellipse cx="65" cy="40" rx="7.5" ry="12" fill="#F2B8C6" />
      {/* Head */}
      <circle cx="40" cy="40" r="18.5" fill="#8FB4D9" />
      {/* Forehead highlight */}
      <ellipse cx="40" cy="32" rx="10" ry="7" fill="#B8D4EB" opacity="0.7" />
      {/* Eyes — bigger, friendlier */}
      <circle cx="32" cy="36" r="3.4" fill="#2D3748" />
      <circle cx="48" cy="36" r="3.4" fill="#2D3748" />
      <circle cx="33" cy="35" r="1.1" fill="#FFF" />
      <circle cx="49" cy="35" r="1.1" fill="#FFF" />
      {/* Cheeks */}
      <circle cx="26" cy="44" r="3.5" fill="#F5C6C6" opacity="0.8" />
      <circle cx="54" cy="44" r="3.5" fill="#F5C6C6" opacity="0.8" />
      {/* Smile */}
      <path
        d="M34 45c2.5 2.8 9.5 2.8 12 0"
        stroke="#2D3748"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Trunk — short S-curl downward, clear silhouette */}
      <path
        d="M36 50
           C35 56 36 61 39 64
           C41.5 66.5 45.5 65.5 46 62
           C46.4 59 44.5 57 42.5 55.5
           C40.5 54 38 52.5 36 50Z"
        fill="#8FB4D9"
      />
      <path
        d="M39 52c0.6 4.5 1.2 8 3.2 10.5"
        stroke="#6B9AC4"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Small tusks */}
      <path
        d="M34 52c-0.5 2.5 0.2 4.5 1.5 5"
        stroke="#FFF8EC"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M46 52c0.5 2.5 -0.2 4.5 -1.5 5"
        stroke="#FFF8EC"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function OwlArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      {/* Body / head */}
      <ellipse cx="40" cy="46" rx="22" ry="24" fill="#7CB342" />
      {/* Ear tufts */}
      <path d="M22 28l6 12-10 2z" fill="#689F38" />
      <path d="M58 28l-6 12 10 2z" fill="#689F38" />
      {/* Face disc */}
      <ellipse cx="40" cy="44" rx="16" ry="15" fill="#C5E1A5" />
      {/* Glasses */}
      <circle
        cx="32"
        cy="42"
        r="7"
        fill="#FFF8EC"
        stroke="#2D3748"
        strokeWidth="2"
      />
      <circle
        cx="48"
        cy="42"
        r="7"
        fill="#FFF8EC"
        stroke="#2D3748"
        strokeWidth="2"
      />
      <path d="M39 42h2" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="32" cy="42" r="3" fill="#2D3748" />
      <circle cx="48" cy="42" r="3" fill="#2D3748" />
      <circle cx="33" cy="41" r="1" fill="#FFF" />
      <circle cx="49" cy="41" r="1" fill="#FFF" />
      {/* Beak */}
      <path d="M40 46l-3 5h6z" fill="#FFB84D" />
      {/* Belly dots */}
      <circle cx="36" cy="58" r="1.5" fill="#AED581" />
      <circle cx="44" cy="58" r="1.5" fill="#AED581" />
      <circle cx="40" cy="62" r="1.5" fill="#AED581" />
    </svg>
  );
}

export type { AvatarId };
