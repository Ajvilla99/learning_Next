import { notFound } from "next/navigation";

import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { Category } from "@/interfaces";

interface Props {
  params: {
    id: Category;
  }
}

const seedProducts = initialData.products;



export default function({ params }: Props) {

  const { id } = params;
  const products = seedProducts.filter( product => product.gender === id );

  // if ( id === 'kids' ) {
  //   notFound();
  // }


  // const labels: {[key: ValidCategories]: string} = {}
  const labels: Record<Category, string> = {
    men: 'para Hombre',
    women: 'para Mujer',
    kid: 'para Niño',
    unisex: 'para todos',
  }

  return (
    <>
      <Title 
        title={`Articulos ${ labels[id] }`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

    </>
  );
}