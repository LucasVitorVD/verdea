"use client";

import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "../ui/button";
import ProfileAvatar from "../profile-avatar/ProfileAvatar";

export default async function AuthStatusSwitcher() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    axiosInstance
      .get(process.env.NEXT_PUBLIC_API_URL + "/user/me")
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <>
      {isAuthenticated === null ? (
        <div className="flex items-center gap-2">
          <div className="animate-pulse" />
        </div>
      ) : isAuthenticated ? (
        <ProfileAvatar />
      ) : (
        <Link href="/register?tab=login" className={buttonVariants()}>
          Entrar
        </Link>
      )}
    </>
  );
}