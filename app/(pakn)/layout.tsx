import { Navbar } from "@/components/navbar";
import { AppBottomNav } from "@/components/app-bottom-nav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-4 px-6 flex-grow">
        {children}
      </main>
      <AppBottomNav />
    </div>
  );
}