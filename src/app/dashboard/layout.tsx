import NavBar from "@/components/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "The latest poke teams",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed left-0 right-0 top-0">
        <NavBar />
      </div>
      <section className="mt-16">{children}</section>
    </>
  );
}
