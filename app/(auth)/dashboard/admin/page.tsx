import AdminPageContent from "@/components/admin/admin-page-content/AdminPageContent";
import { Suspense } from "react";

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AdminPageContent />
    </Suspense>
  );
}
