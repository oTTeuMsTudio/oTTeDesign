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
          background: "#ffffff",
          padding: "64px 72px",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#09090b",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 650,
            letterSpacing: "-0.5px",
          }}
        >
          {siteName.slice(0, 24)}
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
              fontSize:
                pageTitle.length > 48 ? 56 : pageTitle.length > 28 ? 68 : 80,
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
                color: "#52525b",
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
            color: "#71717a",
            borderTop: "1px solid #e4e4e7",
            paddingTop: 24,
          }}
        >
          <span>3D editor · primitives · AI assistant</span>
          <span style={{ color: "#09090b" }}>{siteName}</span>
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
