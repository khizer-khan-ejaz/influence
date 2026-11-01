import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice",
  description: "How HiQfluence collects and uses the information you submit through our website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero label="Legal" title="Privacy notice" breadcrumbs={[{ name: "Privacy", href: "/privacy" }]} />
      <div className="container-x py-20 lg:py-28">
        <div className="prose-article max-w-[44rem]">
          <h2>Information we collect</h2>
          <p>
            When you submit our contact form, we collect the details you provide: your name, email address, company and the
            description of what you are working on. To protect the form from abuse, we also record
            the IP address and browser user agent associated with the submission.
          </p>
          <h2>How we use it</h2>
          <p>
            We use this information only to respond to your inquiry, assess whether we can help and discuss a potential campaign with you. We do
            not sell your information, and we do not add you to marketing lists without your consent.
          </p>
          <h2>Storage and retention</h2>
          <p>
            Inquiries are stored securely in our systems and accessed only by the people who handle new business. We keep inquiry records for as
            long as needed to respond and to maintain a record of our business conversations, after which they are deleted.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct or delete the information you submitted. To make a request, send a message through our{" "}
            <a href="/contact">contact form</a> and mention that it concerns your personal data.
          </p>
          <h2>Cookies</h2>
          <p>This website does not use advertising or analytics cookies.</p>
        </div>
      </div>
    </>
  );
}
