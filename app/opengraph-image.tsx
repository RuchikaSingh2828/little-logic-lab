import { ImageResponse } from "next/og";

export const alt = "Sudokid — kids Sudoku for ages 3–7";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(145deg, #FFF8EC 0%, #EAF6E3 55%, #E8F3FF 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "#FFF8EC",
              border: "4px solid #2D3748",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: "#65B741",
            }}
          >
            3×3
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: "#2D3748",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              Sudokid
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 28,
                fontWeight: 600,
                color: "#3F8A28",
              }}
            >
              Kids Sudoku that grows with them
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 30,
            color: "#6B7280",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Free picture, shape, and number puzzles for ages 3–7.
        </div>
      </div>
    ),
    { ...size }
  );
}
