"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const { openSignIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    openSignIn();
    router.replace("/");
  }, [openSignIn, router]);

  return null;
}
