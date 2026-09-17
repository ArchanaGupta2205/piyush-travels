import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal, Safety & Policies | Piyush Travels",
  description:
    "Review Piyush Travels passenger safety protocols, terms of service, privacy policy, refund policy, and cookie policy for luxury car and bus rentals.",
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
