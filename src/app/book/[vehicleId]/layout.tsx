import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Request | Piyush Travels",
  description: "Complete your luxury vehicle booking request with Piyush Travels. Fast, safe, and transparent pricing.",
};

export default function BookVehicleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
