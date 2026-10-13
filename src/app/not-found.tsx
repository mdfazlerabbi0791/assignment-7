

"use client";

import Link from "next/link";
import { Home, ArrowLeft, ShoppingBasket } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] bg-[#f5f8f5] px-4 py-12">
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        <div className="grid w-full items-center gap-10 rounded-3xl border border-green-100 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-2 lg:p-14">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700 lg:mx-0">
              <ShoppingBasket size={36} />
            </div>

            <h1 className="text-7xl font-extrabold tracking-tight text-green-700 sm:text-8xl">
              404
            </h1>

            <h2 className="mt-5 text-2xl font-bold text-gray-800 sm:text-3xl">
              পেজটি খুঁজে পাওয়া যায়নি!
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-500 sm:text-base lg:mx-0">
              দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
              পেজটি সরানো হয়েছে অথবা লিংকটি ভুল হতে পারে।
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                <Home size={19} />
                হোম পেজে ফিরে যান
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:border-green-300 hover:bg-green-50"
              >
                <ArrowLeft size={19} />
                আগের পেজে যান
              </button>
            </div>

            <p className="mt-8 text-sm text-gray-400">
              বাজারদর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* Right Illustration */}
          <div className="flex items-center justify-center">
            <div className="flex aspect-square w-full max-w-md items-center justify-center rounded-full bg-green-50">
              <div className="text-center">
                <ShoppingBasket
                  size={150}
                  strokeWidth={1.2}
                  className="mx-auto text-green-600"
                />
                <p className="mt-5 text-2xl font-bold text-green-800">
                  ওহ! পেজটি নেই!
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  চলুন, আবার বাজারে ফিরে যাই।
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}