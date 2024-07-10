import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk"

export async function POST(req:Request, res:NextApiResponse) {
    const { orderID } = await req.json()
    const PaypalClient = client()
    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    request.requestBody({})
    const response = await PaypalClient.execute(request)
    console.log(response)
    if(!response) {
        return Response.json({ error: "eroor"}, { status: 404 })
    }
    await prisma.payment.updateMany({
        where: {
            orderID,
        },
        data: {
            status : 'PAID'
        }
    })
    return Response.json({ ...response.result })
}