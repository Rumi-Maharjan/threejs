import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const { title, description } = await req.json();


    const about = await prisma.about.create({
        data: {
            title,
            description
        }
    })

    if(!about) {
        return Response.json({
            message: "Error",
            status: 500
        })
    }
    return Response.json({ message : "OK", status: 200, data: about })
}

export async function GET(req:Request) {
    const about = await prisma.about.findMany()
    return Response.json({
        message: "OK",
        status: 200,
        data: about
    })
}

export async function PATCH(req:Request) {
    const { title, description } = await req.json();
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    const existingUser = await prisma.about.findUnique({
        where: { id },
    });
    if (!existingUser) {
        return Response.json({ message: "not found" });
    }

    const updateData = {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
    };

    const about = await prisma.about.update({
        where: {
            id
        },
        data: updateData,
    })

    return Response.json({
        message: "OK",
        status: 202,
        data: about
    })
    
}

export const DELETE = async (req: Request) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

        const about = await prisma.about.delete({
        where: {
            id: id,
        },
        });
    
        if (!about) {
        return Response.json(
            {
            message: "Error",
            },
            {
            status: 500,
            }
        );
        }
    
    return Response.json({
        message: "Ok",
        status: 202
    });
};