

import { IUpProducts } from "@/app/compontes/OneSction";
import { Suspense } from "react";

interface IParams {
  params: Promise<{
    categoryId: string;
  }>;
}

export default function CategoryPage({ params }: IParams) {
  return (
    <Suspense fallback={<div>লোড হচ্ছে...</div>}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: IParams) {
  const { categoryId } = await params;
  console.log(categoryId);
  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`)
  const data = await res.json()
  console.log(data);

 
    return (
 <section className="min-h-screen bg-[#f1f5f1] px-4 py-8 sm:py-10">
  <div className="mx-auto max-w-7xl">
    <div className="mb-8 flex items-center gap-4 rounded-[24px] border border-[#dfe7df] bg-[#fafcf9] p-5 sm:p-7">
      <div className="text-4xl">
        {data[0]?.categoryIcon || "🛒"}
      </div>

      <div>
        <h1 className="text-2xl font-bold text-[#202820] sm:text-3xl">
          {data[0]?.categoryNameBn || "পণ্যের তালিকা"}
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          {data.length}টি পণ্যের আজকের দাম ও পরিবর্তন
        </p>
      </div>
    </div>
    

    <div className="mb-6 flex items-center justify-between gap-3 rounded-[22px] border border-[#dfe7df] bg-[#fafcf9] px-5 py-4">
      <p className="text-sm text-gray-500 sm:text-base">
        মোট {data.length}টি পণ্য দেখানো হচ্ছে
      </p>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((product: IUpProducts) => (
        <div
          key={product.id}
          className="rounded-[26px] border border-[#dfe7df] bg-[#fafcf9] p-5 transition-all duration-300 hover:border-green-300 hover:shadow-md sm:p-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[18px] bg-[#f0f4ef] text-3xl sm:h-[76px] sm:w-[76px] sm:text-4xl">
              {product.categoryIcon}
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold text-[#202820] sm:text-xl">
                {product.nameBn}
              </h2>

              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                প্রতি {product.unit}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-sm text-gray-500">
                আজকের দাম
              </p>

              <p className="text-2xl font-bold text-[#202820]">
                {product.today}{" "}
                <span className="text-lg font-normal">টাকা</span>
              </p>
            </div>

            <span
              className={`mb-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f4ef] px-3 py-2 text-sm font-bold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-600"
              }`}
            >
              <span>
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}
              </span>

              <span>{product.change.pct}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
);

}