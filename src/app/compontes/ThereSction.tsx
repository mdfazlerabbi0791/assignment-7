interface IUpProducts {
  id: string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: string;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

const ThereSction = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data: IUpProducts[] = await res.json();
  return (
    <section className="bg-[#f1f5f1] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h2 className="mb-2 flex items-center gap-2 text-xl font-bold text-[#202820] sm:text-2xl">
            <span className="text-red-600">▲</span>
            <span>সব পণ্য</span>
          </h2>
          <h1 className="text-gray-600">মোট ৩৩টি পণ্য দেখানো হচ্ছে</h1>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((product) => (
            <div
              key={product.id}
              className="rounded-[28px] border border-[#dfe7df] bg-[#fafcf9] p-5 transition-all duration-300 hover:border-green-300 hover:shadow-md sm:p-7"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-[86px] w-[86px] shrink-0 items-center justify-center rounded-[22px] bg-[#f0f4ef] text-4xl">
                  {product.categoryIcon}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#202820] sm:text-2xl">
                    {product.nameBn}
                  </h3>

                  <p className="mt-1 text-base text-gray-600 sm:text-lg">
                    প্রতি {product.unit}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between gap-3">
                <div>
                  <p className="mb-1 text-base text-gray-600">আজকের দাম</p>

                  <p className="text-xl font-bold text-[#202820] sm:text-2xl">
                    {product.today}{" "}
                    <span className="text-xl font-normal">টাকা</span>
                  </p>
                </div>
               
                <span
                  className={`mb-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f4ef] px-3 py-2 text-sm font-bold sm:text-base ${
                    product.change.dir === "up"
                      ? "text-red-600"
                      : product.change.dir === "down"
                        ? "text-green-600"
                        : "text-gray-500"
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
};

export default ThereSction;
