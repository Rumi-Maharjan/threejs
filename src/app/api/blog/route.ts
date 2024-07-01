import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const { title, content, author } = await req.json();


    const blogs = await prisma.blog.create({
        data: {
            title,
            content,
            author
        }
    })

    if(!blogs) {
        return Response.json({
            message: "Error",
            status: 500
        })
    }
    return Response.json({ message : "OK", status: 200, data: blogs })
}

export async function GET(req:Request) {
    const blogs = await prisma.blog.findMany()
    return Response.json({
        message: "OK",
        status: 200,
        data: blogs
    })
}

export async function PATCH(req:Request) {
    const { title, content, author } = await req.json();
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    const existingUser = await prisma.blog.findUnique({
        where: { id },
    });
    if (!existingUser) {
        return Response.json({ message: "not found" });
    }

    const updateData = {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(author !== undefined && { author }),
    };

    const blogs = await prisma.blog.update({
        where: {
            id
        },
        data: updateData,
    })

    return Response.json({
        message: "OK",
        status: 202,
        data: blogs
    })
    
}

export const DELETE = async (req: Request) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

        const blogs = await prisma.blog.delete({
        where: {
            id: id,
        },
        });
    
        if (!blogs) {
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