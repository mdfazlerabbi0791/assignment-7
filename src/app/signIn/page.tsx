"use client";

import { authClient } from "@/lib/auth-client";
import {
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  Button,
} from "@heroui/react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { toast } from "sonner";

export default function SignInPage() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    if (!user.email || !user.password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন");
      return;
    }

    toast.success("সাইন ইন ফর্ম যাচাই সফল হয়েছে!");

    console.log({
      email: user.email,
    });

    const {data, error} = await authClient.signIn.email({
        email: user.email,
        password: user.password,
        callbackURL: '/'
    })
    if (error) {
  toast.error(error.message);
  return;
}

if (data) {
  toast.success("সাইন ইন সফল হয়েছে!");
}
  };

  const handleGoogleSignIn = async () =>{
    const { error} = await authClient.signIn.social({
      provider: 'google',
      callbackURL: "/",
    })
    if(error){
      toast.error("Google দিয়ে Sign In করা যায়নি");
    }

    toast.success("Google Sign In সফল হয়েছে!");
  }

  const handleGitHubSingIn = async () => {
    const {error} = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
    })
    if(error){
      toast.error("GitHub দিয়ে Sign In করা যায়নি");
    }

    toast.success("GitHub Sign In সফল হয়েছে!");
  }


  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-6 text-[#202a22] sm:px-5 sm:py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Heading */}
        <header className="mb-6 text-center sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[#626c64] sm:text-base">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </header>

       
        <section className="rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-4 shadow-sm sm:p-6">
          <Form className="w-full" onSubmit={onSubmit}>
            <div className="w-full space-y-3.5">
              
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
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  className="h-10 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-sm outline-none focus-within:border-green-600"
                />

                <FieldError />
              </TextField>
            </div>

            
            <Button
              type="submit"
              className="mt-4 h-10 w-full rounded-lg bg-[#008b3e] text-sm font-bold text-white transition hover:bg-[#007532]"
            >
              সাইন ইন
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
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/signUp"
                className="font-semibold text-[#008b3e] hover:underline"
              >
                সাইন আপ করুন
              </Link>
            </p>
          </Form>
        </section>
      </div>
    </main>
  );
}
