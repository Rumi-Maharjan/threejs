import prisma from "@/lib/prisma";

export const GET = async (
    req: Request,
    context: { params: { id: string } }
) => {
    const id = Number(context.params.id || 0);

    const category = await prisma.store_Category.findUnique({
        where: {
            id: id,
        },
    });

    return Response.json({ data: category });
};