import prisma from "@/lib/prisma";

export const GET = async (
    req: Request,
    context: { params: { id: string } }
) => {
    const id = Number(context.params.id || 0);

    const songs = await prisma.song.findUnique({
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

    return Response.json({ data: songs });
};