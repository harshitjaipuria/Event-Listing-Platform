"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function SignupPage() {
  const { openSignUp } = useAuth();
  const router = useRouter();

  useEffect(() => {
    openSignUp();
    router.replace("/");
  }, [openSignUp, router]);

  return null;
}
