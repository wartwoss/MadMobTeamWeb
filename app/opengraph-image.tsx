import { ImageResponse } from "next/og";

export const alt =
  "MadMobTeam — web, mobile and software development studio in Sulaymaniyah, Iraq";
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
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#041419",
          color: "#ecfeff",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "rgba(34, 211, 238, 0.16)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(45, 212, 191, 0.1)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#22d3ee",
              color: "#041419",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            M
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#a5f3fc",
            }}
          >
            MadMobTeam
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            We build digital solutions.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 30,
              color: "#67e8f9",
              fontWeight: 600,
            }}
          >
            Web · Mobile · Custom software
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 26,
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex" }}>Sulaymaniyah, Iraq</div>
          <div style={{ display: "flex", color: "#67e8f9" }}>madmobteam.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
