import { EditorShell } from "@/components/editor/editor-shell";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo";
import { title } from "@/config";

export const metadata = pageMetadata(title, "/");

export default function Page() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <EditorShell />
    </>
  );
}
