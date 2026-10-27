import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#000000",
          color: "#ffffff",
          fontSize: 112,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: -6,
          border: "8px solid #ffffff",
          boxSizing: "border-box",
        }}
      >
        M
        <div
          style={{
            position: "absolute",
            top: 22,
            right: 22,
            width: 22,
            height: 22,
            background: "#dc2626",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
