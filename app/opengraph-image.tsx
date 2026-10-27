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
          background: "#000000",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            background: "#dc2626",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -120,
            width: 280,
            height: 280,
            border: "4px solid rgba(255, 255, 255, 0.15)",
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
              border: "4px solid #ffffff",
              color: "#ffffff",
              fontSize: 38,
              fontWeight: 800,
              position: "relative",
            }}
          >
            M
            <div
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                width: 9,
                height: 9,
                background: "#dc2626",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#ffffff",
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
              color: "#dc2626",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
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
            borderTop: "2px solid rgba(255,255,255,0.2)",
            paddingTop: 26,
            fontSize: 22,
            color: "#a3a3a3",
          }}
        >
          <div style={{ display: "flex" }}>Sulaymaniyah, Iraq</div>
          <div style={{ display: "flex", color: "#ffffff" }}>madmobteam.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
