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
          background: "#5eead4",
          color: "#042f2e",
          borderRadius: 14,
          fontSize: 26,
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
