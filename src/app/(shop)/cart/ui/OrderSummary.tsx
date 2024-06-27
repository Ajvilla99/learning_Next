'use client';

import { useEffect, useState } from "react";

import { useCartStore } from "@/store";
import { currentcyFormat } from "@/utils";
import { useRouter } from "next/navigation";



export const OrderSummary = () => {

  const router = useRouter();

  const [ loaded, setLoaded ] = useState(false);

  const { itemsInCart, subTotal, tax, total } = useCartStore( state => state.getSubmmaryInformation() );

  useEffect(() => {
    setLoaded(true);
  },[])

  useEffect(() => {

    if ( itemsInCart === 0 && loaded === true )   {
      router.replace('/empty')
    }


  },[ itemsInCart, loaded, router ])


  if ( !loaded ) return <p>Cargando...</p>

  return (
    <div className="grid grid-cols-2">
      <span className="">N. Productos</span>
      <span className="text-right">{ itemsInCart === 1 ? '1 artículo' : `${ itemsInCart } artículos` }</span>

      <span>Subtotal</span>
      <span className="text-right">{currentcyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currentcyFormat(tax)}</span>

      <span className="text-2xl mt-5">Total:</span>
      <span className="mt-5 text-2xl text-right">{currentcyFormat(total)}</span>
    </div>
  );
};
