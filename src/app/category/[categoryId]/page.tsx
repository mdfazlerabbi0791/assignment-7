


import CategoryProducts from "@/app/CategoryProducts";
import { IUpProducts } from "@/app/compontes/OneSction";
import { notFound } from "next/navigation";
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

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
  );

  const data: IUpProducts[] = await res.json();

  if(!data){
    notFound()
  }

  return <div>
    
    <CategoryProducts products={data}/>
  </div>;
}




