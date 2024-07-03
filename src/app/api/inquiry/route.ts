import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const { name, email, message, subject , title } = await req.json();


    const contact = await prisma.inquiry.create({
        data: {
            name, 
            email,
            message, 
            subject , 
            title
        }
    })

    if(!contact) {
        return Response.json({
            message: "Error",
            status: 500
        })
    }
    return Response.json({ message : "OK" }, { status: 200 })
}

export async function GET(req:Request) {
    const contact = await prisma.inquiry.findMany()
    return Response.json(
        {
            message: "OK",
            data: contact
        },
        {
            status: 200
        }
    )
}

export async function PATCH(req:Request) {
    const { name, email, message, subject , title } = await req.json();
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    const existingUser = await prisma.inquiry.findUnique({
        where: { id },
    });
    if (!existingUser) {
        return Response.json({ message: "not found" });
    }

    const updateData = {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(message !== undefined && { message}),
        ...(subject !== undefined && { subject}),
        ...(title !== undefined && { title}),
    };

    const contact = await prisma.inquiry.update({
        where: {
            id
        },
        data: updateData,
    })

    return Response.json(
        { message: "OK" },
        { status: 202 }
    )
    
}

export const DELETE = async (req: Request) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

        const contact = await prisma.inquiry.delete({
        where: {
            id: id,
        },
        });
    
        if (!contact) {
        return Response.json(
            {
            message: "Error",
            },
            {
            status: 500,
            }
        );
        }
    
    return Response.json(
        { message: "Ok" },
        { status: 202 }
    );
};