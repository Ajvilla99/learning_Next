'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/interfaces'
import { useState } from 'react';


interface Props {
    product: Product
}

export const ProductGridItem = ({ product }: Props) => {

    const [ displayImage, setDisplayImage ] = useState( product.images[0] );

  return (
    <div className='rounded-md overflow-hidden fade-in group'>
        <Link href={`/product/${ product.slug }`} >
            <Image 
                src={`/products/${ displayImage }`}
                alt={ product.title }
                width={ 500 }
                height={ 500 }
                className='w-full object-cover rounded'
                onMouseEnter={ () => setDisplayImage( product.images[1] )}
                onMouseLeave={ () => setDisplayImage( product.images[0] ) }
            />
        </Link>

        <div className='p-4 flex flex-col'>
            <Link
                href={`/product/${ product.slug }`}
                className='group-hover:text-blue-500'
            >
                { product.title }
            </Link>
            <span className='font-bold'>{ product.price }</span>
        </div>


    </div>
  )
}
