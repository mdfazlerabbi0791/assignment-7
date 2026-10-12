import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";

interface IDetils{
    params: Promise<{
        detilsId: string
    }>
}

const DetilsPageOfProducts = ({params}: IDetils) => {
    return(
       <Suspense fallback={<div>লোড হচ্ছে...</div>}>
             <DetilsPage params={params} />
           </Suspense>
    )
};

async function DetilsPage ({params}: IDetils){

    const {detilsId} = await params

    const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signIn");
  }
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${detilsId}`)
    const product = await res.json()


return (
  <main className="min-h-screen bg-[#f1f5f0] px-4 py-6 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">

      
      <div className="mb-7 flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <Link href={'/'}><span>হোম</span></Link>
        <span>›</span>
        <span>{product.categoryNameBn}</span>
        <span>›</span>
        <span className="font-medium text-gray-900">
          {product.nameBn}
        </span>
      </div>

     
      <section className="mb-6 flex flex-col gap-5 rounded-2xl border border-[#dfe7df] bg-[#fafcf9] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5ef] text-4xl">
            {product.image}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#202921] sm:text-3xl">
              {product.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              প্রতি কেজি · {product.categoryNameBn}
            </p>

            <p className="mt-2 text-sm text-gray-700">
              গতকালের তুলনায় আজ দাম{" "}
              {product.change.dir === "up"
                ? "বেড়েছে"
                : product.change.dir === "down"
                  ? "কমেছে"
                  : "অপরিবর্তিত"}
              : {Math.abs(product.today - product.yesterday).toLocaleString("en-US")} টাকা
            </p>
          </div>
        </div>

       
        <div className="w-full rounded-2xl bg-[#f0f5ef] px-8 py-5 text-center sm:w-36">
          <p className="text-sm text-gray-500">আজকের দাম</p>

          <h2 className="my-1 text-3xl font-bold text-[#202921]">
            {product.today.toLocaleString("en-US")}
          </h2>

          <p className="text-sm text-gray-500">টাকা / কেজি</p>

          <p
            className={`mt-2 text-sm font-semibold ${
              product.change.dir === "up"
                ? "text-red-500"
                : product.change.dir === "down"
                  ? "text-green-600"
                  : "text-gray-500"
            }`}
          >
            {product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
                ? "▼"
                : "—"}{" "}
            {product.change.pct.toLocaleString("en-US") }%
          </p>
        </div>
      </section>

      
      <section className="rounded-2xl border border-[#dfe7df] bg-[#fafcf9] p-4 sm:p-6 lg:p-7">
        <h2 className="mb-4 text-lg font-bold text-[#202921] sm:text-xl">
          দামের সারসংক্ষেপ
        </h2>

       
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#dfe7df] p-5">
            <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>

            <p className="mt-1 text-2xl font-bold text-green-600">
              {Math.min(...product.markets.map((item: { min: number }) => item.min)).toLocaleString("en-US")}{" "}
              <span className="text-sm font-normal">টাকা</span>
            </p>

            <p className="mt-1 text-sm text-gray-500">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfe7df] p-5">
            <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>

            <p className="mt-1 text-2xl font-bold text-red-500">
              {Math.max(...product.markets.map((item: { max: number }) => item.max)).toLocaleString("en-US")}{" "}
              <span className="text-sm font-normal">টাকা</span>
            </p>

            <p className="mt-1 text-sm text-gray-500">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfe7df] p-5 sm:col-span-2 lg:col-span-1">
            <p className="text-sm text-gray-600">গড় দাম</p>

            <p className="mt-1 text-2xl font-bold text-green-600">
              {(
                product.markets.reduce(
                  (total: number, item: { min: number; max: number }) =>
                    total + (item.min + item.max) / 2,
                  0
                ) / product.markets.length
              ).toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}{" "}
              <span className="text-sm font-normal">টাকা</span>
            </p>

            <p className="mt-1 text-sm text-gray-500">
              প্রতি কেজির হিসাবে
            </p>
          </div>
        </div>

       
        <h2 className="mb-4 text-lg font-bold text-[#202921] sm:text-xl">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-[#dfe7df]">
          <table className="w-full min-w-[650px] border-collapse text-left text-sm">
            <thead className="bg-[#fafcf9] text-gray-500">
              <tr>
                <th className="px-4 py-4 font-semibold">বাজার</th>
                <th className="px-4 py-4 font-semibold">বিভাগ</th>
                <th className="px-4 py-4 text-right font-semibold">
                  সর্বনিম্ন
                </th>
                <th className="px-4 py-4 text-right font-semibold">
                  সর্বোচ্চ
                </th>
                <th className="px-4 py-4 text-right font-semibold">
                  গড়
                </th>
              </tr>
            </thead>

            <tbody>
              {product.markets.map(
                (
                  market: {
                    market: string;
                    division: string;
                    min: number;
                    max: number;
                  },
                  index: number
                ) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className={`border-t border-[#dfe7df] ${
                      index % 2 === 1
                        ? "bg-[#f0f5ef]"
                        : "bg-[#fafcf9]"
                    }`}
                  >
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-800">
                      {market.market}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                      {market.division}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-right text-gray-700">
                      {market.min.toLocaleString("en-US")} টাকা
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-right text-gray-700">
                      {market.max.toLocaleString("en-US")} টাকা
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-right font-bold text-gray-800">
                      {((market.min + market.max) / 2).toLocaleString(
                        "en-US",
                        { maximumFractionDigits: 2 }
                      )} টাকা
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
);
  
}

export default DetilsPageOfProducts;





