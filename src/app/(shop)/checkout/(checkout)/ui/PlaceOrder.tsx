'use client';

import { useEffect, useState } from "react";
import clsx from "clsx";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currentcyFormat, sleep } from "@/utils";

export const PlaceOrder = () => {

  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

  const { itemsInCart, subTotal, tax, total } = useCartStore( state => state.getSubmmaryInformation() );
  const cart = useCartStore( state => state.cart );

  useEffect(() => {
    setLoaded(true);
  }, [])

  const onPLaceOrder = async() => {
    setIsPlacingOrder(true);
    // await sleep(2);

    const productsToOrder = cart.map( product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }))

    const resp = await placeOrder( productsToOrder, address );
    console.log(resp)

    setIsPlacingOrder(false);
  }
  

  if ( !loaded ) {
    return <p>Cargando...</p>
  }

  return (
    <div className="bg-white rounded-md shadow-xl p-7">

              <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
              <div className="mb-10">
                <p className="text-xl">Gernando Herrera</p>
                <p>{ address.firstName }</p>
                <p>{ address.address }</p>
                <p>{ address.address2 }</p>
                <p>{ address.postalCode }</p>
                <p>{ address.city }, {address.country}</p>
                <p>{ address.phone }</p>
              </div>

              {/* Divider */}
              <div
                className="w-full h-0.5 rounded bg-gray-200 mb-10"
              />

              <h2 className="text-2xl mb-2">Resumen de orden</h2>

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

              <div className="mt-5 mb-2 w-full">

                <p className="mb-5">
                  {/* Disclaimer */}
                  <span className="text-xs">
                    Al hacer clic en &ldquo;Realizar orden&ldquo;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
                  </span>

                </p>


                {/* <span 
                  className="bg-red-200 text-red-700 w-full flex mb-2 py-1 items-center justify-center rounded">
                  Error de creación
                </span> */}
                <button
                  onClick={ onPLaceOrder }
                  // href='/orders/123'
                  className={
                    clsx({
                      'btn-disabled': isPlacingOrder,
                      'btn-primary' : !isPlacingOrder
                    },
                  )
                  }>
                  Realizar orden
                </button>
              </div>

            </div>

  )
}
