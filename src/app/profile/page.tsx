
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, refetch } = authClient.useSession();
  const user = session?.user;

 
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট হয়েছে!");
            router.push("/signIn");
            router.refresh();
          },
          onError: () => {
            toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
            setSigningOut(false);
          },
        },
      });
    } catch {
      toast.error("সাইন আউটের সময় সমস্যা হয়েছে।");
      setSigningOut(false);
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("আগে সাইন ইন করুন।");
      return;
    }

    const updatedName = (name ?? user.name ?? "").trim();

    if (!updatedName) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    if (updatedName === user.name) {
      toast("নামে কোনো পরিবর্তন করা হয়নি।", {
        icon: "ℹ️",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: updatedName,
      });

      if (result.error) {
        toast.error(
          result.error.message || "নাম আপডেট করা যায়নি।"
        );
        return;
      }

      setName(updatedName);
      await refetch();

      toast.success("নাম সফলভাবে আপডেট হয়েছে!");
    } catch {
      toast.error("নাম আপডেট করার সময় সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            padding: "14px 18px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#00883d",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto w-full max-w-4xl">
          <header className="mb-8 sm:mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-[#202a23] sm:text-4xl">
              আমার প্রোফাইল
            </h1>
            <p className="mt-2 text-base text-[#667168] sm:text-xl">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </header>

          {/* Profile Card */}
          <section className="flex min-h-[200px] flex-col items-start gap-6 rounded-[28px] border border-[#dfe7df] bg-[#fbfdfb] p-6 shadow-sm sm:min-h-[225px] sm:flex-row sm:items-center sm:p-8">
            <div className="flex min-w-0 items-center gap-5 sm:gap-7">
              {user?.image ? (
                <img
                  src={user.image}
                  alt="প্রোফাইল ছবি"
                  className="h-20 w-20 shrink-0 rounded-[24px] object-cover sm:h-28 sm:w-28"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-[#e8eee8] text-3xl font-bold text-[#35483a] sm:h-28 sm:w-28">
                  {(user?.name || "U").charAt(0).toUpperCase()}
                </div>
              )}

              <div className="min-w-0">
                <h2 className="break-words text-xl font-semibold text-[#202a23] sm:text-3xl">
                  {user?.name || "ব্যবহারকারী"}
                </h2>
                <p className="mt-2 break-all text-sm text-[#667168] sm:text-xl">
                  {user?.email || ""}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-2xl border border-red-500 px-5 py-3 text-base font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:ml-auto sm:w-auto sm:text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 14 4 9l5-5" />
                <path d="M4 9h11a5 5 0 0 1 0 10h-1" />
              </svg>
              {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </section>

          {/* Information Card */}
          <section className="mt-7 min-h-[360px] rounded-[28px] border border-[#dfe7df] bg-[#fbfdfb] px-5 py-8 shadow-sm sm:mt-8 sm:min-h-[420px] sm:px-9 sm:py-10">
            <h2 className="text-2xl font-bold text-[#202a23] sm:text-3xl">
              তথ্য
            </h2>

            <form
              onSubmit={handleUpdate}
              className="mt-8 space-y-6 sm:mt-12 sm:px-5"
            >
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-3 block text-lg font-medium text-[#202a23] sm:text-2xl"
                >
                  নাম
                </label>

                <input
                  id="profile-name"
                  type="text"
                  value={name ?? user?.name ?? ""}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  required
                  maxLength={100}
                  disabled={loading || !user}
                  className="h-[60px] w-full rounded-2xl border-2 border-[#dfe7df] bg-transparent px-4 text-base text-[#202a23] outline-none transition placeholder:text-[#9aa39b] focus:border-green-600 disabled:opacity-60 sm:h-[74px] sm:text-xl"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !user}
                className="flex h-[60px] w-full items-center justify-center rounded-2xl bg-[#00883d] px-4 text-lg font-bold text-white shadow-[0_5px_0_#a9cbb3] transition hover:bg-[#007535] disabled:cursor-not-allowed disabled:opacity-60 sm:h-[76px] sm:text-2xl"
              >
                {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}