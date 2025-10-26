import RegisterTab from "@/components/register-tab/RegisterTab";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-xs space-y-8">
      <Suspense fallback={<div>Carregando...</div>}>
        <RegisterTab />
      </Suspense>
    </div>
  );
}