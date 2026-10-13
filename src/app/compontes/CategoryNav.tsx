
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IFoodType } from "./NavbarLink";

interface IProps {
  categories: IFoodType[];
}

const CategoryNav = ({ categories }: IProps) => {
  const pathname = usePathname();

  return (
    <div className="border-t border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto whitespace-nowrap p-3 sm:gap-3 sm:p-2 sm:pb-4">
        {categories.map((food) => {
          const isActive = pathname === `/category/${food.slug}`;

          return (
            <Link
              key={food.id}
              href={`/category/${food.slug}`}
              className="shrink-0"
            >
              <div
                className={`flex items-center gap-2 rounded-2xl border px-5 py-2.5 shadow-sm transition-all duration-300 ${
                  isActive
                    ? "border-[#127d42] bg-[#127d42] text-white"
                    : "border-gray-200 bg-[#f8faf9] text-gray-800"
                }`}
              >
                <span className="text-lg sm:text-xl">
                  {food.icon}
                </span>

                <span className="text-sm font-medium sm:text-base">
                  {food.nameBn}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryNav;
