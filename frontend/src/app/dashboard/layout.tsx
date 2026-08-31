import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";

export const metadata = {
  title: "Dashboard | Piyush Travels",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
