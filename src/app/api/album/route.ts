import prisma from "@/lib/prisma";
import { saveFile, imagePath } from "../../../lib/fileUtils";

export async function POST(req:Request, res:Response) {
    const formData = await req.formData();
    const files: File[] | null = formData.getAll('images') as unknown as File[];
    const name = formData.get('name') as unknown as string;
    const url = formData.get('url') as unknown as string;
    const price = parseFloat(formData.get('price') as string);
    const track_no = parseInt(formData.get('track_no') as string, 10);
    const ratings = parseInt(formData.get('ratings') as string, 10);
    const genreId = parseInt(formData.get('genreId') as string, 10);
    
    const albums = await prisma.album.create({
        data: {
            name, 
            price,
            track_no,
            ratings, 
            genreId,
            url
        }
    })

    if (!files) {
        return Response.json({ success: false, error: "No image uploaded" });
    }

    const imageRecords = [];
    for (const file of files) {
        try{
            const result = await saveFile(file, imagePath);
    
            const image = await prisma.image.create({
                data: {
                    url: result,
                    album: {
                        connect: { id: albums.id },
                    },
                },
            });
            imageRecords.push(image);
        } catch (error) {
            console.error('Error saving image:', error);
            return Response.json({ message: 'Failed to upload image(s)' });
        }
    }

    if(!albums) {
        return Response.json(
            {
                message: "Error",
            },
            { status: 404 }
        )
    }
    return Response.json({ message : "OK" }, { status: 201 })
}

export async function GET(req:Request) {
    const albums = await prisma.album.findMany({
        include: {
            images: {
                select: {
                    url: true
                }
            }
        }
    })
    return Response.json(
        {
            message: "OK",
            data: albums
        },
        { status: 200 }
    )
}

export async function PATCH(req:Request) {
    const formData = await req.formData();
    const files: File[] | null = formData.getAll('images') as unknown as File[];
    const name = formData.get('name') as unknown as string;
    const priceStr = formData.get('price') as string;
    const trackStr = formData.get('track_no') as string;
    const ratingsStr = formData.get('ratings') as string;
    const genreIdStr = formData.get('genreId') as string;
    const url = formData.get('url') as unknown as string;

    const track_no = trackStr ? parseInt(trackStr) : undefined;
    const price = priceStr ? parseFloat(priceStr) : undefined;
    const genreId = genreIdStr ? parseInt(genreIdStr) : undefined;
    const ratings = ratingsStr ? parseFloat(ratingsStr) : undefined;

    const url1 = new URL(req.url).searchParams;
    const id = Number(url1.get("id")) || 0;

    const existingUser = await prisma.album.findUnique({
        where: { id },
    });
    if (!existingUser) {
        return Response.json({ message: "not found" });
    }

    const updateData: any = {};
    if (name !== null) updateData.name = name;
    if (track_no !== null) updateData.track_no = track_no;
    if (ratings !== undefined) updateData.ratings = ratings;
    if (genreId !== undefined) updateData.genreId = genreId;
    if (price !== undefined) updateData.price = price;
    if (url !== undefined) updateData.url = url;

    const albums = await prisma.album.update({
        where: {
            id
        },
        data: updateData,
    })
    if(files) {
        const imageRecords = [];
        for(const file of files) {
            try {
                const result = await saveFile(file, imagePath);
        
                await prisma.image.deleteMany({
                    where:{
                        albumId: id,
                    }
                })
            
                const image = await prisma.image.create({
                    data: {
                        url: result,
                        album: {
                            connect: { id: albums.id },
                        },
                    },
                });
                imageRecords.push(image);
            } catch (error) {
                console.error('Error saving image:', error);
                return Response.json({ message: 'Failed to upload image(s)' });
            }
        }
    }

    return Response.json(
        {
            message: "OK",
        },
        { status: 202 }
    )
    
}

export const DELETE = async (req: Request) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

        const albums = await prisma.album.delete({
        where: {
            id: id,
        },
        });
    
        if (!albums) {
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
        { status: 202 }
    );
};