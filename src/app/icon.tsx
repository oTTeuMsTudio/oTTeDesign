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
          background: "#ffffff",
          color: "#09090b",
          border: "1px solid #e4e4e7",
          borderRadius: 14,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-1px",
        }}
      >
        oT
      </div>
    ),
    size,
  );
}
