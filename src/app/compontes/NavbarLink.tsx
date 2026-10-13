
import CategoryNav from "./CategoryNav";


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

