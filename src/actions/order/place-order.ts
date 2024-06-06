'use server';

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";




interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async( productIds: ProductToOrder[], address: Address ) => {

  const session = await auth();
  const userId1 =  session?.user.id;

  // Verificar sesion de usuario
  if ( !userId1 ) {
    return {
      ok: false,
      message: 'No hay sesión de ususario'
    }
  }

  // Obtener la información de los productos
  // Nota: recuerden que podemos llevar 2+ productos con el mismo ID

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map( p => p.productId )
      }
    }
  });

  // Calcular montos // Encabezados
  const itemsInOrder = productIds.reduce( ( count, p ) => count + p.quantity, 0 );
  
  // Los totales de tax, subtotal, y total
  const { subTotal, tax, total } = productIds.reduce( (totals, item) => {

    const productQuantity = item.quantity;
    const product = products.find( product => product.id === item.productId );

    if ( !product ) throw new Error(`${ item.productId } No existe - 500`);

    const subTotal = product.price * productQuantity;
    totals.subTotal += subTotal;
    totals.tax += subTotal * 0.15;
    totals.total += subTotal * 1.15;


    return totals;
  }, { subTotal: 0, tax: 0, total: 0})

  console.log({subTotal, tax, total});


  // Crear la transacción

  const prismaTx = await prisma.$transaction( async(tx) => {

    // 1. Actualizar el stock de los productos
    const updatedProductsPromises = products.map( ( product) => {

      // Acumular los valores
      const productQuantity = productIds.filter(
        p => p.productId === product.id
      ).reduce( (acc, item ) => item.quantity + acc, 0 )

      if ( productQuantity === 0 ) {
        throw new Error(`${ product.id } no tiene cantidad definida`)
      }

      return tx.product.update({
        where: { id: product.id },
        data: {
          inStock: product.inStock - productQuantity
        }
      })
    })
    

    // 2. Crear la orden - Encabezado - Detalles
    const order = await tx.order.create({
      data: {
        userId: userId1,
        itemsInOrder: itemsInOrder,
        subTotal: subTotal,
        tax: tax,
        total: total,

        OrderItem: {
          createMany: {
            data: productIds.map( p => ({
              quantity: p.quantity,
              size: p.size,
              productId: p.productId,
              price: products.find( product => product.id === p.productId )?.price ?? 0
            }))
          }
        }

      }
    })

    // Validar, si el price es cero, entonces, lanzar un error

    // 3. Crear la dirección de la orden
    // Address
    const { country, ...restAddress } = address;
    const orderAddress = await tx.orderAddress.create({
      data: {
        ...restAddress,
        countryId: country,
        orderId: order.id,
      }
    })

    return {
      updateProducts: [],
      order: order,
      orderAddress: orderAddress,
    }
  });

}