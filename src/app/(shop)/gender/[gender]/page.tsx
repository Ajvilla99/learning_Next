export const revalidate = 60; // 60 Seg

import { redirect } from "next/navigation";

import { initialData } from "@/seed/seed";

import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string
  }
}

const seedProducts = initialData.products;



export default async function GenderByPage({ params, searchParams }: Props) {

  const { gender } = params;

  const page = searchParams.page ? parseInt( searchParams.page ) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ 
    page, 
    gender: gender as Gender });
  console.log({currentPage, totalPages});

  if ( products.length === 0 ) {
    redirect(`/gender/${gender}`)
  }

  // const labels: {[key: ValidCategories]: string} = {}
  const labels: Record<string, string> = {
    men: 'para Hombre',
    women: 'para Mujer',
    kid: 'para Niño',
    unisex: 'para todos',
  }

  return (
    <>
      <Title 
        title={`Articulos ${ labels[gender] }`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages}/>

    </>
  );
}