import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const { name } = await req.json();


    const genres = await prisma.genre.create({
        data: {
            name, 
        }
    })

    if(!genres) {
        return Response.json({message: "Error"}, { status: 404 })
    }
    return Response.json({ message : "OK" }, { status: 200 })
}

export async function GET(req:Request) {
    const genres = await prisma.genre.findMany()
    return Response.json({ message: "OK", data: genres }, { status: 200 })
}

export async function PATCH(req:Request) {
    const { name} = await req.json();
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    const existingUser = await prisma.genre.findUnique({
        where: { id },
    });
    if (!existingUser) {
        return Response.json({ message: "not found" }, { status: 404 });
    }

    const updateData = {
        ...(name !== undefined && { name }),
    };

    const genres = await prisma.genre.update({
        where: {
            id
        },
        data: updateData,
    })

    return Response.json({ message: "OK" }, { status: 202 })
    
}

export const DELETE = async (req: Request) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

        const genres = await prisma.genre.delete({
        where: {
            id: id,
        },
        });
    
        if (!genres) {
        return Response.json(
            {
            message: "Error",
            },
            {
            status: 500,
            }
        );
        }
    
    return Response.json({ message: "Ok" }, { status: 202 });
};