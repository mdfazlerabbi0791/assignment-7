

// import Link from "next/link";

import CategoryNav from "./CategoryNav";

// interface IFoodType {
//   id: string;
//   slug: string;
//   nameBn: string;
//   icon: string;
// }

// const NavbarLink = async () => {
//   const res = await fetch(
//     "https://openapi.programming-hero.com/api/bazardor/categories",
//   );
//   const categories: IFoodType[] = await res.json();

//   return (
//    <div className="sm:border-t border-t-gray-200">
//      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-2 sm:pb-4 overflow-x-auto whitespace-nowrap max-w-7xl mx-auto">
//       {categories.map((food) => (
//         <Link key={food.id} href={`/category/${food.slug}`} className="shrink-0">
//           <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-gray-200 bg-[#f8faf9] hover:bg-[#127d42] hover:text-white hover:border-[#127d42] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
//             <span className="text-lg sm:text-xl">{food.icon}</span>
//             <h1 className="font-medium text-sm sm:text-base">{food.nameBn}</h1>
//           </div>
//         </Link>
//       ))}
//     </div>
//    </div>
//   );
// };

// export default NavbarLink;



export interface IFoodType {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavbarLink = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  const categories: IFoodType[] = await res.json();

  return <CategoryNav categories={categories} />;
};

export default NavbarLink;

