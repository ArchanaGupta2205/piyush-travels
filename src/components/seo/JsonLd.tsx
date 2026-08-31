import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["AutoRental", "TravelAgency", "LocalBusiness"],
    "@id": "https://www.piyush-travels.com/#business",
    name: "Piyush Travels - Luxury Car & Bus Rental",
    alternateName: "Piyush Travels New Delhi",
    url: "https://www.piyush-travels.com",
    logo: "https://www.piyush-travels.com/logo.png",
    image: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200",
    ],
    description:
      "Premier luxury car, tempo traveller, and executive bus rental service in Connaught Place, New Delhi. Chauffeur-driven rentals for corporate travel, airport transfers, weddings, and outstation trips across India.",
    telephone: "+91-98765-43210",
    email: "bookings@piyush-travels.com",
    priceRange: "₹₹ - ₹₹₹₹",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking, Razorpay",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Luxury Avenue, Connaught Place",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6304,
      longitude: 77.2177,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: [
      { "@type": "City", name: "New Delhi" },
      { "@type": "City", name: "Noida" },
      { "@type": "City", name: "Gurgaon" },
      { "@type": "City", name: "Faridabad" },
      { "@type": "City", name: "Ghaziabad" },
      { "@type": "City", name: "Agra" },
      { "@type": "City", name: "Jaipur" },
      { "@type": "City", name: "Chandigarh" },
      { "@type": "Country", name: "India" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Luxury Vehicle Rental Fleet",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Executive Luxury Sedans (Mercedes, BMW, Audi)",
            description: "Chauffeur-driven luxury sedan rental for corporate and VIP events.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Premium SUVs & MUVs (Innova Hycross, Fortuner)",
            description: "Spacious premium SUVs for family outstation and business travel.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Luxury Tempo Travellers (9-26 Seater)",
            description: "Customized Maharaja 1x1 recliner tempo travellers with pushback seats and onboard entertainment.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Executive Volvo & Scania Tourist Buses (35-55 Seater)",
            description: "Multi-axle luxury coach rental for wedding convoys and corporate offsites.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1280",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.facebook.com/piyushtravels",
      "https://www.instagram.com/piyushtravels",
      "https://twitter.com/piyushtravels",
      "https://www.linkedin.com/company/piyushtravels",
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.piyush-travels.com/#organization",
    name: "Piyush Travels",
    url: "https://www.piyush-travels.com",
    logo: "https://www.piyush-travels.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98765-43210",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.piyush-travels.com/#website",
    url: "https://www.piyush-travels.com",
    name: "Piyush Travels",
    description: "Online Luxury Car, Tempo Traveller & Bus Rental Booking System",
    publisher: {
      "@id": "https://www.piyush-travels.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.piyush-travels.com/vehicles?query={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={businessSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
    </>
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={faqSchema} />;
}
