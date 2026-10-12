


"use client";

import { useState } from "react";
import { IUpProducts } from "@/app/compontes/OneSction";

interface IProps {
  products: IUpProducts[];
}

 function CategoryProducts({ products }: IProps) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.today - b.today;
    if (sort === "high") return b.today - a.today;
    return 0;
  });

  return (
    <section className="min-h-screen bg-[#f1f5f1] px-4 py-8">
      <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-4 rounded-[24px] border border-[#dfe7df] bg-[#fafcf9] p-5 sm:p-7">
      <div className="text-4xl">
        {products[0]?.categoryIcon || "🛒"}
      </div>

      <div>
        <h1 className="text-2xl font-bold text-[#202820] sm:text-3xl">
          {products[0]?.categoryNameBn || "পণ্যের তালিকা"}
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
        </p>
      </div>
    </div>
        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-[#dfe7df] bg-[#fafcf9] p-5">
          <p>মোট {products.length}টি পণ্য</p>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম কম থেকে বেশি</option>
            <option value="high">দাম বেশি থেকে কম</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-[26px] border border-[#dfe7df] bg-[#fafcf9] p-6 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{product.categoryIcon}</div>

                <div>
                  <h2 className="text-xl font-bold text-[#202820]">
                    {product.nameBn}
                  </h2>
                  <p className="text-sm text-gray-500">
                    প্রতি {product.unit}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <p className="text-2xl font-bold">
                  {product.today} টাকা
                </p>

                <span
                  className={
                    product.change.dir === "up"
                      ? "text-red-600"
                      : product.change.dir === "down"
                        ? "text-green-600"
                        : "text-gray-600"
                  }
                >
                  {product.change.dir === "up"
                    ? "▲"
                    : product.change.dir === "down"
                      ? "▼"
                      : "—"}{" "}
                  {product.change.pct}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryProducts;