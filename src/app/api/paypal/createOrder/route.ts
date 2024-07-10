import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk"

export async function POST(req:Request, res:NextApiResponse) {
    const PaypalClient = client()
    const request = new paypal.orders.OrdersCreateRequest();
    const { purchase_units } = await req.json()
    console.log(purchase_units)
    if (!purchase_units || !purchase_units[0]?.amount?.value) {
        return Response.json({ error: 'Invalid request body' }, { status: 404 });
    }
    request.headers['Prefer'] = 'return=representation'
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: purchase_units[0].amount.value
                }
            }
        ]
    })
    const response = await PaypalClient.execute(request)
    console.log(response)
    if(response.statusCode !== 201) {
        return Response.json({status: 500})
    }

    await prisma.payment.create({
        data: {
            orderID: response.result.id,
            status : 'PENDING'
        }
    })
    return Response.json({ orderID: response.result.id }, {status: 201 }) 
}