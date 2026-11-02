"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const { openSignIn } = useAuth();
  const router = useRouter();

  return null;
}
