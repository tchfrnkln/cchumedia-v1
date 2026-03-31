// app/(dashboard)/layout.tsx
import Breadcrumbs from "@/components/Dashboard/Breadcrumbs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs />
      {children}
    </>
  );
}