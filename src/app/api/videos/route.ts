import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const { name, link } = await req.json();


    const videos = await prisma.video.create({
        data: {
            name, 
            link
        }
    })

    if(!videos) {
        return Response.json({
            message: "Error",
            status: 500
        })
    }
    return Response.json({ message : "OK", status: 200, data: videos })
}

export async function GET(req:Request) {
    const videos = await prisma.video.findMany()
    return Response.json({
        message: "OK",
        status: 200,
        data: videos
    })
}

export async function PATCH(req:Request) {
    const { name, link } = await req.json();
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    const existingUser = await prisma.video.findUnique({
        where: { id },
    });
    if (!existingUser) {
        return Response.json({ message: "not found" });
    }

    const updateData = {
        ...(name !== undefined && { name }),
        ...(link !== undefined && { link }),
    };

    const videos = await prisma.video.update({
        where: {
            id
        },
        data: updateData,
    })

    return Response.json({
        message: "OK",
        status: 202,
        data: videos
    })
    
}

export const DELETE = async (req: Request) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

        const videos = await prisma.video.delete({
        where: {
            id: id,
        },
        });
    
        if (!videos) {
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