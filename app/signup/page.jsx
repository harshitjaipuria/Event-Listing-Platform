"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

  useEffect(() => {
    openSignUp();
    router.replace("/");
  }, [openSignUp, router]);

  return null;
}
