"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { 
  ShieldCheck, FileText, Lock, RefreshCw, Cookie, 
  ChevronRight, Phone, Mail, MapPin, CheckCircle2, AlertCircle 
} from "lucide-react";
import Link from "next/link";

type TabKey = "safety" | "terms" | "privacy" | "refund" | "cookies";

const tabs: { id: TabKey; title: string; subtitle: string; icon: any }[] = [
  { id: "safety", title: "Safety Guidelines", subtitle: "Chauffeur & Fleet Standards", icon: ShieldCheck },
  { id: "terms", title: "Terms of Service", subtitle: "Booking & Rental Conditions", icon: FileText },
  { id: "privacy", title: "Privacy Policy", subtitle: "Data Protection & Security", icon: Lock },
  { id: "refund", title: "Refund Policy", subtitle: "Cancellations & Adjustments", icon: RefreshCw },
  { id: "cookies", title: "Cookie Policy", subtitle: "Web Tracking & Preferences", icon: Cookie },
];

function LegalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = (searchParams.get("tab") as TabKey) || "safety";
  const [activeTab, setActiveTab] = useState<TabKey>(
    tabs.some((t) => t.id === initialTab) ? initialTab : "safety"
  );

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab") as TabKey;
    if (tabFromUrl && tabs.some((t) => t.id === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (tabId: TabKey) => {
    setActiveTab(tabId);
    router.replace(`/legal?tab=${tabId}`, { scroll: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
          Compliance & Governance
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Support & Legal Center
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg mt-3">
          Review Piyush Travels official passenger safety protocols, terms of service, privacy safeguards, and refund guarantees.
        </p>
        <p className="text-xs text-zinc-500 mt-2 font-medium">Last Updated: September 2026</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Tabs Sidebar */}
        <div className="lg:col-span-4 sticky top-28 space-y-2 bg-white dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-md">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-3 py-2">
            Table of Policies
          </p>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-sm leading-tight">{tab.title}</div>
                    <div
                      className={`text-xs mt-0.5 ${
                        isActive ? "text-indigo-100" : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {tab.subtitle}
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className={`transition-transform ${isActive ? "translate-x-0.5 text-white" : "text-zinc-400"}`}
                />
              </button>
            );
          })}

          {/* Direct Assistance Box */}
          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 px-2 pb-1">
            <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-2">Need Immediate Help?</p>
            <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <a href="tel:9163450745" className="flex items-center gap-2 hover:text-indigo-500 transition-colors py-1">
                <Phone size={13} className="text-indigo-500" />
                <span>+91 9163450745 (24/7)</span>
              </a>
              <a href="mailto:piyushtravels79@gmail.com" className="flex items-center gap-2 hover:text-indigo-500 transition-colors py-1">
                <Mail size={13} className="text-indigo-500" />
                <span className="truncate">piyushtravels79@gmail.com</span>
              </a>
              <div className="flex items-start gap-2 text-zinc-500 py-1">
                <MapPin size={13} className="text-indigo-500 shrink-0 mt-0.5" />
                <span>Howrah - 711101, West Bengal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Display Panel */}
        <div className="lg:col-span-8 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-sm backdrop-blur-sm space-y-8 text-zinc-800 dark:text-zinc-200">
          
          {/* TAB 1: SAFETY */}
          {activeTab === "safety" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck size={16} /> Passenger First Standard
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                  Fleet & Passenger Safety Standards
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Our comprehensive safety measures covering verified chauffeurs, vehicle health, and GPS telemetry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-1">
                    <CheckCircle2 size={16} /> 100% Background Verified
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    All chauffeurs undergo extensive police verification, commercial licensing scrutiny, and hospitality training before taking the wheel.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-1">
                    <CheckCircle2 size={16} /> 24/7 Live Telemetry & GPS
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Every luxury car, tempo traveller, and coach features real-time GPS tracking and dedicated SOS panic buttons linked to our operations desk.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">1. Vehicle Maintenance & Pre-Trip Checks</h3>
                <p>
                  Every vehicle undergoes a rigorous 40-point safety check prior to dispatch, including tire tread depth, brake fluid and pad inspection, climate control diagnostics, steering alignment, and seatbelt integrity.
                </p>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">2. Female Passenger & Night Travel Safeguards</h3>
                <p>
                  For intercity routes and late-night pickups, our control room monitors route deviation triggers. Night trips carry speed-governed limits (maximum 80 km/h on expressways) to prevent driver fatigue.
                </p>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">3. Commercial Passenger Insurance</h3>
                <p>
                  All our vehicles operate with comprehensive commercial passenger transit insurance compliant with Motor Vehicle Act norms, ensuring absolute peace of mind during business, wedding, or vacation trips.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS OF SERVICE */}
          {activeTab === "terms" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <FileText size={16} /> Agreement & Usage
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                  Terms of Service
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Please read the binding agreement governing vehicle reservations with Piyush Travels.
                </p>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">1. Reservation & Confirmation</h3>
                <p>
                  A booking request is verified and confirmed upon payment of the quoted total amount or reservation deposit via our secure Razorpay payment gateway. Vehicle quotes are valid for 48 hours from issuance.
                </p>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">2. Tolls, Parking & State Border Taxes</h3>
                <p>
                  Unless explicitly specified in a customized corporate package, interstate border permits, expressway tolls, and destination parking fees are excluded from the base quote and are payable directly by the passenger during the itinerary.
                </p>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">3. Kilometre & Time Calculation</h3>
                <p>
                  For round trips and outstation rentals, kilometre computation begins and ends at the garage depot or specified pickup location. Extra kilometres and excess duty hours beyond the booked package will be billed at the standard rate specified in your booking confirmation.
                </p>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">4. Prohibited Activities</h3>
                <p>
                  Smoking, consumption of contraband, carrying flammable hazardous substances, and sub-leasing our fleet to third parties is strictly prohibited. The chauffeur reserves the right to terminate the ride if passenger conduct threatens road safety.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY POLICY */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Lock size={16} /> Data Security
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                  Privacy Policy
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  How we protect, store, and process your personal and booking information.
                </p>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">1. Information We Collect</h3>
                <p>
                  When making an inquiry or booking a vehicle, we collect your name, phone number, email address, travel itinerary coordinates (pickup and destination addresses), and special accessibility requests.
                </p>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">2. Payment Security</h3>
                <p>
                  We <strong>never store or record credit/debit card details, CVV numbers, or net banking passwords</strong> on our servers. All financial transactions are securely processed using PCI-DSS certified encryption via Razorpay.
                </p>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">3. Third-Party Sharing</h3>
                <p>
                  Your information is shared only with the assigned chauffeur (name, contact, and pickup location) strictly for ride fulfillment. We do not sell, license, or barter user data to marketing aggregators.
                </p>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">4. Account Rights & Data Deletion</h3>
                <p>
                  You have the right to request a complete copy of your personal records or petition the deletion of your account and trip logs by writing to our Data Privacy Officer at <a href="mailto:piyushtravels79@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">piyushtravels79@gmail.com</a>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: REFUND POLICY */}
          {activeTab === "refund" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <RefreshCw size={16} /> Fair Cancellation
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                  Cancellation & Refund Policy
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Clear, honest, and transparent guidelines for booking cancellations and payment reversals.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                  <thead className="bg-zinc-100 dark:bg-zinc-800/60 font-semibold text-zinc-900 dark:text-white">
                    <tr>
                      <th className="p-3.5 border-b border-zinc-200 dark:border-zinc-700">Cancellation Window</th>
                      <th className="p-3.5 border-b border-zinc-200 dark:border-zinc-700">Refund Eligibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <tr>
                      <td className="p-3.5">&gt; 24 hours prior to scheduled pickup</td>
                      <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">100% Full Refund (Zero penalty)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5">12 to 24 hours prior to scheduled pickup</td>
                      <td className="p-3.5 font-medium text-amber-600 dark:text-amber-400">80% Refund (20% dispatch processing fee)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5">&lt; 12 hours or vehicle already dispatched</td>
                      <td className="p-3.5 font-medium text-red-500">50% Refund or 1-Day base charge</td>
                    </tr>
                    <tr>
                      <td className="p-3.5">Vehicle breakdown / Operator default</td>
                      <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">Immediate Replacement Vehicle or 100% Refund</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Processing Time</h3>
                <p>
                  Approved refunds are processed through our Razorpay banking gateway and credited directly to the original source account (UPI / NetBanking / Debit or Credit Card) within <strong>5 to 7 business banking days</strong>.
                </p>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Force Majeure</h3>
                <p>
                  In the unforeseen event of natural calamities, state-mandated curfews, or road blockages, Piyush Travels will issue full credit vouchers or rescheduling without fee penalties.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: COOKIE POLICY */}
          {activeTab === "cookies" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Cookie size={16} /> Browser Storage
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                  Cookie & Tracking Policy
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Transparent disclosure of how local storage and session tokens function on Piyush Travels.
                </p>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">1. What Cookies We Use</h3>
                <p>
                  Our web application utilizes minimal and essential cookies and local storage tokens designed to provide a fast, secure experience:
                </p>
                <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                  <li><strong>Authentication Tokens (JWT):</strong> Keep you securely logged in to your customer dashboard.</li>
                  <li><strong>Theme Preference:</strong> Remembers your chosen Dark Mode or Light Mode setting.</li>
                  <li><strong>Recent Booking State:</strong> Preserves draft booking details during multi-step reservation.</li>
                </ul>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">2. Managing Cookies</h3>
                <p>
                  You can modify your browser settings at any time to refuse cookies or alert you when a cookie is placed. Note that disabling essential session tokens will require you to log in repeatedly.
                </p>
              </div>
            </div>
          )}

          {/* Bottom Help Banner */}
          <div className="mt-10 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">Questions about our policies?</p>
                <p className="text-xs text-zinc-500">Our concierge desk is available 24 hours a day.</p>
              </div>
            </div>
            <Link
              href="/about#contact"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
            >
              Contact Support
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-indigo-500/30 text-zinc-900 dark:text-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <Suspense fallback={<div className="py-32 text-center text-zinc-400 text-sm">Loading legal policies...</div>}>
          <LegalContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
