import Image from "next/image";
import BtnUpAndIn from "./BtnUpAndIn";
import NavbarLink from "./NavbarLink";
import { Suspense } from "react";
import Marquee from "./Marquee";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between max-w-7xl mx-auto mt-2 mb-4">
        <div className="flex gap-2 pl-3 md:pl-0">
          <div className=" bg-[#05893e] flex justify-center py-3 px-3 rounded-2xl ">
            <Link href={'/'}><Image src={"/logo-icon.png"} alt="logo" width={30} height={30} /></Link>
          </div>
          <div>
            <h1 className="font-extrabold text-xl">বাজার দর</h1>
            <p>মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
          </div>
        </div>
        <div className="flex gap-3">
          <BtnUpAndIn />
        </div>
      </div>

      <div>
        <div>
          <Suspense fallback={<div>Loading categories...</div>}>
            <NavbarLink />
          </Suspense>
        </div>
      </div>
      <div>
        <Suspense fallback={<div>Loading prices...</div>}>
          <Marquee />
        </Suspense>
      </div>
    </div>
  );
};

export default Header;
