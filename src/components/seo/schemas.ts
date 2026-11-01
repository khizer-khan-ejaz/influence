import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const organizationId = `${siteConfig.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    slogan: siteConfig.tagline,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    description: siteConfig.description,
    areaServed: siteConfig.markets.map((name) => ({ "@type": "Country", name })),
    knowsAbout: [
      "Influencer marketing",
      "Technology influencer marketing",
      "YouTube creator partnerships",
      "SaaS influencer marketing",
      "Influencer discovery and vetting",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": organizationId },
  };
}

export function serviceSchema({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: { "@id": organizationId },
    areaServed: siteConfig.markets.map((name) => ({ "@type": "Country", name })),
  };
}
