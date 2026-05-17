import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = "https://www.hasibuzzaman.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Md. Hasibuzzaman — Full-Stack Software Engineer | Next.js, Node.js, AWS",
    template: "%s | Md. Hasibuzzaman",
  },
  description:
    "Portfolio of Md. Hasibuzzaman — Associate Software Engineer & Project Tech Lead at Era InfoTech Ltd, Bangladesh. Expert in Next.js, React, Node.js, PHP/Laravel, PostgreSQL and AWS with 3+ years building government and enterprise web applications.",
  keywords: [
    "Md. Hasibuzzaman",
    "Hasibuzzaman",
    "Software Engineer Bangladesh",
    "Full-Stack Developer Dhaka",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "PHP Laravel Developer",
    "AWS Solutions Architect",
    "AWS DevOps Engineer",
    "Era InfoTech",
    "RDCD Government Project",
    "Web Developer Bangladesh",
    "TypeScript Developer",
    "PostgreSQL Developer",
    "Portfolio Hasibuzzaman",
  ],
  authors: [{ name: "Md. Hasibuzzaman", url: baseUrl }],
  creator: "Md. Hasibuzzaman",
  publisher: "Md. Hasibuzzaman",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Md. Hasibuzzaman — Portfolio",
    title: "Md. Hasibuzzaman — Full-Stack Software Engineer | Next.js, Node.js, AWS",
    description:
      "3+ years building enterprise & government web applications. Expert in Next.js, React, Node.js, PHP/Laravel and AWS. AWS Certified Solutions Architect & DevOps Engineer.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Md. Hasibuzzaman — Full-Stack Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Hasibuzzaman — Full-Stack Software Engineer",
    description:
      "Associate Software Engineer & Project Tech Lead. Next.js, React, Node.js, PHP/Laravel, AWS. Based in Dhaka, Bangladesh.",
    images: ["/og-image.png"],
    creator: "@hasibuzzaman",
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "technology",
  applicationName: "Md. Hasibuzzaman Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#c0392b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Md. Hasibuzzaman",
        alternateName: "Hasibuzzaman",
        description:
          "Associate Software Engineer & Project Tech Lead with 3+ years experience in full-stack web development. Specializes in Next.js, React, Node.js, PHP/Laravel, and AWS cloud services.",
        url: baseUrl,
        email: "hasib.9437.hu@gmail.com",
        telephone: "+8801738-356180",
        image: `${baseUrl}/og-image.png`,
        sameAs: [
          "https://github.com/hasib2019",
          "https://www.linkedin.com/in/md-hasibuzzaman-82014b156/",
          "https://www.facebook.com/hasib.uzzaman.106/",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "217/1, 3rd Colony, Lalkuthi",
          addressLocality: "Mirpur-1",
          addressRegion: "Dhaka",
          postalCode: "1216",
          addressCountry: "BD",
        },
        jobTitle: "Associate Software Engineer",
        worksFor: {
          "@type": "Organization",
          name: "Era InfoTech Ltd",
          url: "https://erainfotech.com",
        },
        knowsAbout: [
          "Next.js",
          "React.js",
          "Node.js",
          "TypeScript",
          "PHP",
          "Laravel",
          "PostgreSQL",
          "MySQL",
          "AWS",
          "Docker",
          "REST API",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "AWS Certified Solutions Architect – Associate",
            credentialCategory: "certification",
            recognizedBy: { "@type": "Organization", name: "Amazon Web Services" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "AWS Certified DevOps Engineer – Professional",
            credentialCategory: "certification",
            recognizedBy: { "@type": "Organization", name: "Amazon Web Services" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Professional Masters in Information Technology",
            credentialCategory: "degree",
            recognizedBy: { "@type": "CollegeOrUniversity", name: "Jahangirnagar University" },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Md. Hasibuzzaman — Portfolio",
        description: "Portfolio of Md. Hasibuzzaman, Full-Stack Software Engineer based in Dhaka, Bangladesh.",
        author: { "@id": `${baseUrl}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        url: baseUrl,
        name: "Md. Hasibuzzaman — Full-Stack Software Engineer",
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#person` },
        description:
          "Portfolio website showcasing projects, skills, experience and certifications of Md. Hasibuzzaman.",
        inLanguage: "en-US",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: baseUrl,
            },
          ],
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="geo.region" content="BD-C" />
        <meta name="geo.placename" content="Dhaka, Bangladesh" />
        <meta name="geo.position" content="23.8041;90.3556" />
        <meta name="ICBM" content="23.8041, 90.3556" />
      </head>
      <body className="antialiased bg-[#0f0f0f] text-[#f5f5f5]">
        {children}
      </body>
    </html>
  );
}
