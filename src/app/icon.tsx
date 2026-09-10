import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#D26056",
          borderRadius: 14,
        }}
      >
        <span
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: "Georgia, serif",
          }}
        >
          T
        </span>
      </div>
    ),
    { ...size }
  );
}
