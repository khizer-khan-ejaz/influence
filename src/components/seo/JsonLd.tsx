type JsonValue = string | number | boolean | null | undefined | JsonValue[] | { [key: string]: JsonValue };

export function JsonLd({ data }: { data: { [key: string]: JsonValue } }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
