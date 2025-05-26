"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import ProfileAvatar from "../profile-avatar/ProfileAvatar";
import Spinner from "../spinner/Spinner";
import { useAuth } from "@/context/AuthContext";

export default function AuthStatusSwitcher() {
  const { userQuery } = useAuth();

  if (userQuery.isLoading || userQuery.isFetching) {
    return (
      <Spinner />
    )
  }

  if (!userQuery.data || userQuery.isError) {
    return (
      <Link href="/register?tab=login" className={buttonVariants()}>
        Entrar
      </Link>
    );
  }

  return <ProfileAvatar />
}