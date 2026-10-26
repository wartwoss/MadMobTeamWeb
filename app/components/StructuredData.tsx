/* Renders JSON-LD in the document body. Next's docs recommend a native
   <script> tag (not next/script) because structured data is not executable
   code. The "<" escape prevents a value from closing the script tag early. */
export default function StructuredData({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
