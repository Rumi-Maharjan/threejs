import prisma from "@/lib/prisma";

export const GET = async (
    req: Request,
    context: { params: { id: string } }
) => {
    const id = Number(context.params.id || 0);

    const item = await prisma.store_Item.findUnique({
        where: {
            id: id,
        },
        include: {
            images: {
                select: {
                    url: true,
                }
            }
        }
    });

    return Response.json({ data: item });
};