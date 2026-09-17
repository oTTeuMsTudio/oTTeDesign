import { ImageResponse } from "next/og";
import { siteName, title as defaultTitle } from "@/config";

export async function GET(request: Request) {
  const search = new URL(request.url).searchParams;
  const pageTitle = search.get("title")?.trim().slice(0, 100) || defaultTitle;
  const subtitle = search.get("subtitle")?.trim().slice(0, 80) || "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0b0d12",
          padding: "64px 72px",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#f4f4f5",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            color: "#9aa0ad",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              paddingLeft: 14,
              paddingRight: 14,
              borderRadius: 8,
              background: "#5eead4",
              color: "#042f2e",
              fontSize: 18,
              fontWeight: 650,
            }}
          >
            {siteName.slice(0, 24)}
          </div>
          <span>Game marketplace</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 1040,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: pageTitle.length > 48 ? 56 : pageTitle.length > 28 ? 68 : 80,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            {pageTitle}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#9aa0ad",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#9aa0ad",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
          }}
        >
          <span>Browse · Buy · Play</span>
          <span style={{ color: "#5eead4" }}>{siteName}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    },
  );
}
