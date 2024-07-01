import prisma from "@/lib/prisma";

export async function GET(req:Request) {
    const collaborator = await prisma.collaborators.findMany()
    return Response.json(
        {
            message: "OK",
            data: collaborator
        },
        { status: 200 }
    )
}

export async function PATCH(req:Request) {
    const { name } = await req.json();
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    const existingUser = await prisma.collaborators.findUnique({
        where: { id },
    });
    if (!existingUser) {
        return Response.json({ message: "not found" }, { status: 404 });
    }

    const updateData = {
        ...(name !== undefined && { name }),
    };

    const collaborator = await prisma.collaborators.update({
        where: {
            id
        },
        data: updateData,
    })

    return Response.json(
        { message: "OK" }, { status: 202 })
    
}

export const DELETE = async (req: Request) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

        const collaborator = await prisma.collaborators.delete({
        where: {
            id: id,
        },
        });
    
        if (!collaborator) {
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
        { message: "Ok" }, {  status: 202 }
    );
};