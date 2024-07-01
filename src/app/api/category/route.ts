import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const { name, description } = await req.json();

    const category = await prisma.store_Category.create({
        data: {
            name, 
            description,
        }
    })

    if(!category) {
        return Response.json(
            { message: "Error"},
            { status: 404}
        )
    }
    return Response.json({ message : "OK"}, { status: 201 })
}

export async function GET(req:Request) {
    const category = await prisma.store_Category.findMany()
    return Response.json(
        {
            message: "OK",
            data: category
        },
        { status: 200 }
    )
}

export async function PATCH(req:Request) {
    const { name, description} = await req.json();
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    const existingUser = await prisma.store_Category.findUnique({
        where: { id },
    });
    if (!existingUser) {
        return Response.json({ message: "not found" }, { status: 404 });
    }

    const updateData = {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
    };

    const category = await prisma.store_Category.update({
        where: {
            id
        },
        data: updateData,
    })

    return Response.json(
        {
            message: "OK",
        },
        {
            status: 202
        }
    )
    
}

export const DELETE = async (req: Request) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

        const category = await prisma.store_Category.delete({
            where: {
                id: id,
            },
        });
    
        if (!category) {
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
        {
            message: "Ok",
        },
        {  status: 202 }
    );
};