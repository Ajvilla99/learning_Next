'use client';

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}


export const PaypalButton = ({ orderId, amount}: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const rountedAmount = amount.toFixed(2).toString();

  if ( isPending ) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-300 rounded" />
        <div className="h-12 bg-gray-300 rounded mt-3" />
      </div>
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: 'USD',
            value: rountedAmount,
          }
        }
      ]
    })
    
    const { ok } = await setTransactionId( orderId, transactionId );
    if ( !ok ) throw new Error('No se pudo actualizar la orden.')

    return transactionId;
  }

  const onApprove = async( data: OnApproveData, actions: OnApproveActions ) => {

    const details = await actions.order?.capture();
    if ( !details ) return;

    await paypalCheckPayment( details.id ?? '' );
  }

  return (
    <div className="relative z-0">
      <PayPalButtons 
        createOrder={ createOrder }
        onApprove={ onApprove }
      />
    </div>
  )
}
