"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-violet-500/40";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400";

const YEAR_OPTIONS = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "PG", label: "Postgraduate" },
];

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_say", label: "Prefer not to say" },
];

export function AuthModals({
  signInOpen,
  signUpOpen,
  onOpenSignIn,
  onOpenSignUp,
  closeAuth,
}) {
  const router = useRouter();
  const [signInError, setSignInError] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [suName, setSuName] = useState("");
  const [suRoll, setSuRoll] = useState("");
  const [suMobile, setSuMobile] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suGender, setSuGender] = useState("male");
  const [suYear, setSuYear] = useState("1");

  const resetSignUp = () => {
    setSuName("");
    setSuRoll("");
    setSuMobile("");
    setSuEmail("");
    setSuPassword("");
    setSuGender("male");
    setSuYear("1");
    setSignUpError("");
  };

  async function handleSignIn(e) {
    e.preventDefault();
    setSignInError("");
    setSignInLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSignInError(data.message || "Sign in failed");
        return;
      }
      setSignInEmail("");
      setSignInPassword("");
      closeAuth();
      router.refresh();
    } catch {
      setSignInError("Network error");
    } finally {
      setSignInLoading(false);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setSignUpError("");
    setSignUpLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: suName,
          rollNumber: suRoll,
          mobile: suMobile,
          email: suEmail,
          gender: suGender,
          year: suYear,
          password: suPassword,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSignUpError(data.message || data.error || "Sign up failed");
        return;
      }
      resetSignUp();
      closeAuth();
      router.refresh();
    } catch {
      setSignUpError("Network error");
    } finally {
      setSignUpLoading(false);
    }
  }

  return (
    <>
      <Dialog
        open={signInOpen}
        onOpenChange={(open) => {
          onOpenSignIn(open);
          if (!open) setSignInError("");
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto border-white/10 bg-[#14151c] p-0 text-white">
          <form onSubmit={handleSignIn} className="flex flex-col gap-0">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle>Sign in</DialogTitle>
              <DialogDescription className="text-slate-400">Use your GLA Events account email and password.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 px-6 py-2">
              <div>
                <label className={labelClass} htmlFor="auth-email">
                  Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  className={inputClass}
                  placeholder="you@student.gla.ac.in"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="auth-password">
                  Password
                </label>
                <input
                  id="auth-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>
              {signInError ? <p className="text-sm text-amber-300">{signInError}</p> : null}
            </div>
            <DialogFooter className="flex-col gap-3 border-t border-white/10 px-6 py-4 sm:flex-col">
              <Button
                type="submit"
                className="w-full bg-violet-400 text-[#24085e] hover:bg-violet-300"
                disabled={signInLoading}
              >
                {signInLoading ? "Signing in…" : "Sign in"}
              </Button>
              <p className="text-center text-sm text-slate-400">
                No account?{" "}
                <button
                  type="button"
                  className="font-semibold text-violet-300 hover:underline"
                  onClick={() => {
                    onOpenSignIn(false);
                    resetSignUp();
                    onOpenSignUp(true);
                  }}
                >
                  Sign up
                </button>
              </p>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={signUpOpen}
        onOpenChange={(open) => {
          onOpenSignUp(open);
          if (!open) {
            setSignUpError("");
            resetSignUp();
          }
        }}
      >
        <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto border-white/10 bg-[#14151c] p-0 text-white sm:max-w-xl">
          <form onSubmit={handleSignUp} className="flex flex-col gap-0">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle>Create account</DialogTitle>
              <DialogDescription className="text-slate-400">
                Join GLA Events with your details. All fields are required.
              </DialogDescription>
            </DialogHeader>
            <div className="grid max-h-[60vh] gap-4 overflow-y-auto px-6 py-2 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="su-name">
                  Full name
                </label>
                <input id="su-name" required value={suName} onChange={(e) => setSuName(e.target.value)} className={inputClass} placeholder="Your name" />
              </div>
              <div>
                <label className={labelClass} htmlFor="su-roll">
                  Roll number
                </label>
                <input id="su-roll" required value={suRoll} onChange={(e) => setSuRoll(e.target.value)} className={inputClass} placeholder="e.g. 22CS001" />
              </div>
              <div>
                <label className={labelClass} htmlFor="su-mobile">
                  Mobile number
                </label>
                <input
                  id="su-mobile"
                  type="tel"
                  required
                  value={suMobile}
                  onChange={(e) => setSuMobile(e.target.value)}
                  className={inputClass}
                  placeholder="10-digit mobile"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="su-email">
                  Email
                </label>
                <input
                  id="su-email"
                  type="email"
                  required
                  value={suEmail}
                  onChange={(e) => setSuEmail(e.target.value)}
                  className={inputClass}
                  placeholder="you@student.gla.ac.in"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="su-password">
                  Password
                </label>
                <input
                  id="su-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={suPassword}
                  onChange={(e) => setSuPassword(e.target.value)}
                  className={inputClass}
                  placeholder="At least 6 characters"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="su-gender">
                  Gender
                </label>
                <select
                  id="su-gender"
                  required
                  value={suGender}
                  onChange={(e) => setSuGender(e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  {GENDER_OPTIONS.map((g) => (
                    <option key={g.value} value={g.value} className="bg-[#14151c]">
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="su-year">
                  Year
                </label>
                <select id="su-year" required value={suYear} onChange={(e) => setSuYear(e.target.value)} className={`${inputClass} cursor-pointer`}>
                  {YEAR_OPTIONS.map((y) => (
                    <option key={y.value} value={y.value} className="bg-[#14151c]">
                      {y.label}
                    </option>
                  ))}
                </select>
              </div>
              {signUpError ? <p className="sm:col-span-2 text-sm text-amber-300">{signUpError}</p> : null}
            </div>
            <DialogFooter className="flex-col gap-3 border-t border-white/10 px-6 py-4 sm:flex-col">
              <Button type="submit" className="w-full bg-violet-400 text-[#24085e] hover:bg-violet-300" disabled={signUpLoading}>
                {signUpLoading ? "Creating account…" : "Sign up"}
              </Button>
              <p className="text-center text-sm text-slate-400">
                Already registered?{" "}
                <button
                  type="button"
                  className="font-semibold text-violet-300 hover:underline"
                  onClick={() => {
                    onOpenSignUp(false);
                    resetSignUp();
                    onOpenSignIn(true);
                  }}
                >
                  Sign in
                </button>
              </p>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
