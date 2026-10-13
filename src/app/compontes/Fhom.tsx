import Link from "next/link";

const FirstHomePage = () => {
  return (
    <section className="max-w-7xl mx-auto overflow-hidden bg-[#f8fbf8] my-10 rounded-3xl">
      <div className="mx-auto grid min-h-[350px] max-w-[1440px] grid-cols-1 items-center gap-8 rounded-3xl border border-[#e0e9e1] px-5 py-7 sm:px-5 md:px-7 lg:min-h-[420px] lg:grid-cols-[1.6fr_0.8fr] lg:gap-12 lg:px-10 lg:py-6">

        {/* Left Content */}
        <div className="flex flex-col items-start">
          <button className="rounded-full bg-[#e2f3e9] px-5 py-2 text-sm font-semibold text-[#078641] sm:text-base md:text-lg">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </button>

          <h1 className="mt-6 text-2xl font-extrabold leading-tight text-[#202a22] sm:text-3xl md:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#747b75] sm:text-lg md:text-xl lg:mt-7 lg:text-2xl lg:leading-[1.8]">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>
          
          

          <button className="mt-7 rounded-xl bg-[#07883f] px-7 py-4 text-base font-bold text-white shadow-[0_5px_0_#b7d9c2] transition-all duration-200 hover:-translate-y-1 hover:bg-[#067535] hover:shadow-lg sm:mt-9 sm:px-9 sm:text-lg">
            সব পণ্য দেখুন
          </button>
          
        </div>

        {/* Right Image */}
        <div className="flex items-center justify-center">
          <img
            src="/bazar-hero.png"
            alt="বাজারের তাজা পণ্য"
            className="h-auto w-full max-w-[300px] object-contain sm:max-w-[380px] md:max-w-[420px] lg:max-w-[480px]"
          />
        </div>

      </div>
    </section>
  );
};

export default FirstHomePage;
