'use client';

import { SizeSelector, QuantitySelector } from '@/components'
import { Product, Size, CartProduct } from '@/interfaces'
import { useCartStore } from '@/store';
import { useState } from 'react';

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore( state => state.addProductToCart );

  const [ size, setSize ] = useState<Size|undefined>();
  const [ quantity, setQuantity ] = useState<number>(1);
  const [ posted, setPosted ] = useState(false);


  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    // console.log({ size, quantity, product })
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }

    addProductToCart(cartProduct)
    setPosted(false);
    setQuantity(1);
    setSize(undefined);

  };

  return (
    <>
      {
        posted && !size && (
          <span className='mt-2 p-1.5 px-2 rounded-md bg-red-200 text-red-800'>
            Debe de seleccionar una talla*
          </span>
        )
      }

        {/* Selector de Tallas */}
        <SizeSelector
          selectedSize={ size }
          availableSize={ product.sizes} 
          onSizeChanged={ setSize }
        />

        {/* Selector de Cantidad */}
        <QuantitySelector
          quantity={quantity}
          onQuantityChanged={ setQuantity }
        />

        {/* Boton */}
        <button
          onClick={ addToCart }
          className="btn-primary my-5">
          Agregar al carrito
        </button>

    </>
  )
}
