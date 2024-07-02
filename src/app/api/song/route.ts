import prisma from "@/lib/prisma";
import { saveFile, imagePath } from "../../../lib/fileUtils";

export async function POST(req:Request) {
    const formData = await req.formData();
    const file: File | null = formData.get('images') as unknown as File;
    const title = formData.get('title') as unknown as string;
    const length = formData.get('length') as string;
    const albumId = parseInt(formData.get('albumId') as string, 10);
    const ratings = parseInt(formData.get('ratings') as string, 10);
    const genreId = parseInt(formData.get('genreId') as string, 10);

    const collaborators = formData.getAll('collaborators') as unknown as string;

    const collaboratorIds = [];

    const songs = await prisma.song.create({
        data: {
            title,
            length,
            ratings,
            genreId,
            albumId,
        }
    })

    for (const name of collaborators) {
        let collaborator = await prisma.collaborators.findUnique({
            where: { name },
        });
        if (!collaborator) {
            collaborator = await prisma.collaborators.create({
                data: 
                { 
                    name ,
                    songs: {
                        connect: { id: songs.id}
                    }
                },
            });
        }
        collaboratorIds.push(collaborator.id);
    }

    const imageRecords = [];
    
    try {
        const result = await saveFile(file, imagePath);
    
        const image = await prisma.image.create({
            data: {
                url: result,
                song: {
                    connect: { id: songs.id },
                },
            },
        });
        imageRecords.push(image);
    } catch (error) {
        console.error('Error saving image:', error);
        return Response.json({ message: 'Failed to upload image(s)' });
    }

    if(!songs) {
        return Response.json(
            { message: "Error" },
            { status: 404 }
        )
    }
    return Response.json({ message : "OK" }, { status: 201 })
}

export async function GET(req:Request) {
    const songs = await prisma.song.findMany({
        include: {
            images:{
                select: {
                    url: true,
                }
            },
            collaborators: {
                select: {
                    name: true,
                }
            }
            
        }
    })
    return Response.json(
        {
            message: "OK",
            data: songs
        },
        { status: 200 }
    )
}

export async function PATCH(req:Request) {
    const formData = await req.formData();
    const file: File | null = formData.get('images') as unknown as File;
    const title = formData.get('title') as unknown as string;
    const length = formData.get('length') as string;
    const albumIdStr = formData.get('albumId') as string;
    const ratingsStr = formData.get('ratings') as string;
    const genreIdStr = formData.get('genreId') as string;

    const collaborators = formData.getAll('collaborators') as unknown as string;
    console.log(collaborators)
    const collaboratorIds = [];

    const albumId = albumIdStr ? parseInt(albumIdStr) : undefined;
    const genreId = genreIdStr ? parseInt(genreIdStr) : undefined;
    const ratings = ratingsStr ? parseFloat(ratingsStr) : undefined;


    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    const existingUser = await prisma.song.findUnique({
        where: { id },
    });
    if (!existingUser) {
        return Response.json({ message: "not found" });
    }

    const updateData: any = {};
    if (title !== null) updateData.title = title;
    if (length !== null) updateData.length = length;
    if (ratings !== undefined) updateData.ratings = ratings;
    if (genreId !== undefined) updateData.genreId = genreId;
    if (albumId !== undefined) updateData.albumId = albumId;

    const songs = await prisma.song.update({
        where: {
            id
        },
        data: updateData,
    })

    if(file) {
        const imageRecords = [];
    
    try {
        const result = await saveFile(file, imagePath);

        await prisma.image.delete({
            where:{
                songId: id,
            }
        })
    
        const image = await prisma.image.create({
            data: {
                url: result,
                song: {
                    connect: { id: songs.id },
                },
            },
        });
        imageRecords.push(image);
    } catch (error) {
        console.error('Error saving image:', error);
        return Response.json({ message: 'Failed to upload image(s)' });
    }
    }

    if(collaborators) {
        await prisma.collaborators.deleteMany({
            where: {
                songId: id
            }
        });
        for (const name of collaborators) {
            const collaborator = await prisma.collaborators.create({
                data: 
                { 
                    name ,
                    songs: {
                        connect: { id: songs.id}
                    }
                },
            });
            collaboratorIds.push(collaborator.id);
        }
    }    

    return Response.json(
        { message: "OK" },
        { status: 202 }
    )
    
}

export const DELETE = async (req: Request) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    await prisma.collaborators.deleteMany({
        where:{
            songId: id,
        }
    })

    const songs = await prisma.song.delete({
        where: {
            id: id,
        },
    });
    
    if (!songs) {
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
        { message: "Ok" }, {status: 202 }
    );
};