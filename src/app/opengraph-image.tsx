import { ImageResponse } from "next/og";

export const alt = "HiQfluence: Influencer Marketing for Brands. Unify Creators × Brands.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "radial-gradient(900px 500px at 90% -10%, rgba(200,245,60,0.25), transparent 60%), #0a0f24",
          color: "#f5f2eb",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -2 }}>
          Hi<span style={{ color: "#c8f53c", fontStyle: "italic" }}>Q</span>fluence
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 0.98 }}>Influencer Marketing</div>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 0.98, color: "#c8f53c" }}>for Brands.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9aa0b8" }}>Unify Creators × Brands · YouTube & Social Media Creators</div>
      </div>
    ),
    size,
  );
}
