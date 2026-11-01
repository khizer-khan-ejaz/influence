import type { Metadata } from "next";

import { siteConfig } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  /** Use the title as-is instead of appending the brand. */
  absoluteTitle?: boolean;
};

// Pages that set their own openGraph object replace the file-based image, so reference it explicitly.
const defaultImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name}: Make Influence Work Harder.` };

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex,
  absoluteTitle,
}: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      locale: "en_US",
      images: [defaultImage],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [defaultImage.url] },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
