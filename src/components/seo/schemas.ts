import { services } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const organizationId = `${siteConfig.url}/#organization`;

const areaServed = siteConfig.markets.map((name) => ({ "@type": "Place", name }));

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    slogan: siteConfig.tagline,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png"), width: 512, height: 512 },
    image: absoluteUrl("/logo.png"),
    description: siteConfig.description,
    areaServed,
    knowsAbout: [
      "Influencer marketing",
      "YouTube influencer marketing",
      "Social media influencer marketing",
      "Brand and creator partnerships",
      "Creator discovery and vetting",
      "Influencer campaign management",
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

/** One Service with an OfferCatalog of the five service categories. */
export function servicesSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Influencer marketing for brands with YouTube and social media creators",
    serviceType: "Influencer Marketing Agency",
    url: absoluteUrl(path),
    provider: { "@id": organizationId },
    areaServed,
    audience: { "@type": "BusinessAudience", audienceType: "Brands partnering with YouTube and social media creators" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Influencer marketing services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: `${service.summary} ${service.why}`,
          url: absoluteUrl(`${path}#${service.slug}`),
        },
      })),
    },
  };
}
