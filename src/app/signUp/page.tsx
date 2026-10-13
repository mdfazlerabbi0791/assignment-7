"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  Button,
} from "@heroui/react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function SignUpPage() {
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    if (user.password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না");
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setError("");
    toast.success("সাইন আপের তথ্য যাচাই সফল হয়েছে!");

    console.log({
      name: user.name,
      email: user.email,
    });

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
    }
  };

   const handleGoogleSignIn = async () =>{
    const { error} = await authClient.signIn.social({
      provider: 'google',
      callbackURL: "/",
    })
    if(error){
      toast.error("Google দিয়ে Sign Up করা যায়নি");
    }

    toast.success("Google Sign Up সফল হয়েছে!");
  }

  const handleGitHubSingIn = async () => {
    const {error} = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
    })
    if(error){
      toast.error("GitHub দিয়ে Sign Up করা যায়নি");
    }

    toast.success("GitHub Sign Up সফল হয়েছে!");
  }


  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-6 text-[#202a22] sm:px-5 sm:py-8">
      <div className="mx-auto w-full max-w-lg">
        <header className="mb-6 text-center sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[#626c64] sm:text-base">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </header>

        <section className="rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-4 shadow-sm sm:p-6">
          <Form className="w-full" onSubmit={onSubmit}>
            <div className="w-full space-y-3.5">
              <TextField isRequired name="name" className="w-full">
                <Label className="mb-1 block text-sm font-medium">নাম</Label>

                <Input
                  placeholder="যেমন: রহিম উদ্দিন"
                  className="h-10 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-sm outline-none focus-within:border-green-600"
                />

                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="email"
                type="email"
                className="w-full"
              >
                <Label className="mb-1 block text-sm font-medium">ইমেইল</Label>

                <Input
                  placeholder="you@example.com"
                  className="h-10 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-sm outline-none focus-within:border-green-600"
                />

                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="password"
                type="password"
                className="w-full"
              >
                <Label className="mb-1 block text-sm font-medium">
                  পাসওয়ার্ড
                </Label>

                <Input
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="h-10 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-sm outline-none focus-within:border-green-600"
                />

                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="confirmPassword"
                type="password"
                className="w-full"
              >
                <Label className="mb-1 block text-sm font-medium">
                  পাসওয়ার্ড নিশ্চিত করুন
                </Label>

                <Input
                  placeholder="আবার লিখুন"
                  className="h-10 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-sm outline-none focus-within:border-green-600"
                />

                <FieldError />
              </TextField>
            </div>

            {error && (
              <p className="mt-3 w-full text-center text-sm text-red-600">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="mt-4 h-10 w-full rounded-lg bg-[#008b3e] text-sm font-bold text-white transition hover:bg-[#007532]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Button>

            <div className="my-4 flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-[#e0e6e0]" />
              <span className="text-xs text-[#626c64]">অথবা</span>
              <div className="h-px flex-1 bg-[#e0e6e0]" />
            </div>

            <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handleGoogleSignIn}
                className="h-10 rounded-lg border border-[#e0e8e0] bg-transparent px-2 text-sm font-semibold text-[#202a22]"
              >
                <span className="text-lg font-bold text-[#4285f4]">G</span>
                Google দিয়ে চালিয়ে যান
              </Button>

              <Button
                type="button"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#dce5dc] bg-white text-sm font-semibold text-[#202a22] hover:bg-gray-50"
                onClick={handleGitHubSingIn}
              >
                <FaGithub size={18} />
                Continue with GitHub
              </Button>
            </div>

            <p className="mt-4 w-full text-center text-sm text-[#626c64]">
              অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/signIn"
                className="font-semibold text-[#008b3e] hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </Form>
        </section>
      </div>
    </main>
  );
}
