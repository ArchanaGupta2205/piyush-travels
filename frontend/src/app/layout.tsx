import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.piyush-travels.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Piyush Travels | Luxury Car, Tempo Traveller & Bus Rental Delhi NCR",
    template: "%s | Piyush Travels",
  },
  description:
    "Piyush Travels is India's leading luxury car, tempo traveller, and executive bus rental service in Delhi NCR. Chauffeur-driven Mercedes, BMW, Innova Hycross, Fortuner, and luxury coaches for corporate transit, outstation tours, airport transfers, and weddings.",
  applicationName: "Piyush Travels",
  authors: [{ name: "Piyush Travels Team", url: baseUrl }],
  generator: "Next.js",
  keywords: [
    "luxury car rental delhi",
    "car rental connaught place",
    "bus rental delhi ncr",
    "tempo traveller 12 seater rental delhi",
    "luxury wedding car rental",
    "delhi to agra cab service",
    "delhi to jaipur luxury tempo traveller",
    "airport taxi pickup delhi igi",
    "innova hycross rental delhi",
    "mercedes chauffeur hire india",
    "volvo bus hire delhi",
    "outstation car rental delhi ncr",
    "piyush travels",
  ],
  creator: "Piyush Travels",
  publisher: "Piyush Travels",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "Piyush Travels",
    title: "Piyush Travels | Luxury Car & Bus Rental in Delhi NCR",
    description:
      "Experience unmatched luxury and comfort with Piyush Travels. Premium Sedans, SUVs, Tempo Travellers, and Luxury Buses with verified professional chauffeurs across India.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Piyush Travels Luxury Fleet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Piyush Travels | Luxury Car & Bus Rental Delhi NCR",
    description:
      "Premium chauffeur-driven car and bus rentals in New Delhi. Luxury Sedans, SUVs, Tempo Travellers, and Coaches for airport transfers, weddings & outstation.",
    images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop"],
    creator: "@piyushtravels",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi, Connaught Place",
    "geo.position": "28.6304;77.2177",
    "ICBM": "28.6304, 77.2177",
    "DC.title": "Piyush Travels - Luxury Car & Bus Rental Delhi",
    "target-audience": "Travelers, Corporate, Tourists, Wedding Planners",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
