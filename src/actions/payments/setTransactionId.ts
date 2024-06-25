'use server';

import prisma from "@/lib/prisma";

export const setTransactionId = async( orderId: string,transactionId: string ) => {

  try {
    
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        transactionId: transactionId
      }
    })

    if ( !order ) {
      return {
        ok: false,
        message: `No se encontro una orden con el ${ orderId }`
      }
    }

    return { ok: true }

  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo acatualizar el id de la transacción',
    }
  }

}