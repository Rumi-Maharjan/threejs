import prisma from "@/lib/prisma";

export const GET = async (
    req: Request,
    context: { params: { id: string } }
) => {
    const id = Number(context.params.id || 0);

    const blogs = await prisma.blog.findUnique({
        where: {
            id: id,
        },
    });

    return Response.json({ data: blogs });
};