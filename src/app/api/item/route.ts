import prisma from "@/lib/prisma";
import { Sizes, Color } from "@prisma/client";
import { saveFile, imagePath } from "@/lib/fileUtils";
import { stringArrayToEnum } from "@/lib/helper";


export async function POST(req:Request) {
    const formData = await req.formData();
    const files: File[] | null = formData.getAll('images') as unknown as File[];
    const name = formData.get('name') as unknown as string;
    const price = parseFloat(formData.get('price') as string);
    const quantity = parseInt(formData.get('quantity') as string, 10);
    const category_id = parseInt(formData.get('category_id') as string, 10);
    const description = formData.get('description') as string;
    const sizesString = formData.getAll('size') as unknown as string[] ;
    const colorsString = formData.getAll('color') as unknown as string[];
    
    const size = stringArrayToEnum(Sizes, sizesString);
    const color = stringArrayToEnum(Color, colorsString);
    
    const item = await prisma.store_Item.create({
        data: {
            name, 
            description,
            price,
            size,
            color,
            quantity,
            category_id
        }
    })

    const imageRecords = [];
    for (const file of files) {
        try {
            const result = await saveFile(file, imagePath);
    
            const image = await prisma.image.create({
                data: {
                    url: result,
                    item: {
                        connect: { id: item.id },
                    },
                },
            });
            imageRecords.push(image);
            } catch (error) {
                console.error('Error saving image:', error);
                return Response.json(
                    { message: 'Failed to upload image(s)' },
                    { status: 500 }
                );
            }
        }

    if(!item) {
        return Response.json({
            message: "Error",
        },
        {
            status: 500
        }
    )
    }
    return Response.json(
        { message : "OK" },
        { status: 201 }
    )
}

export async function GET(req:Request) {
    const item = await prisma.store_Item.findMany({
        include: {
            images: {
                select:{
                    url: true
                }
            }
        }
    })
    return Response.json(
        {
            message: "OK",
            data: item
        },
        { status: 200 }
    )
}

export async function PATCH(req:Request) {
    const formData = await req.formData();
    const files: File[] | null = formData.getAll('images') as unknown as File[];
    const name = formData.get('name') as unknown as string;
    const price = parseFloat(formData.get('price') as string);
    const quantity = parseInt(formData.get('quantity') as string, 10);
    const category_id = parseInt(formData.get('category_id') as string, 10);
    const description = formData.get('description') as string;
    const sizesString = formData.getAll('size') as unknown as string[] ;
    const colorsString = formData.getAll('color') as unknown as string[];
    
    const size = stringArrayToEnum(Sizes, sizesString);
    const color = stringArrayToEnum(Color, colorsString);

    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    const existingUser = await prisma.store_Item.findUnique({
        where: { id },
    });
    if (!existingUser) {
        return Response.json(
            { message: "Not found" },
            { status: 500 }
        );
    }
    console.log(existingUser)

    const updateData: any = {};
    if (name !== null) updateData.name = name;
    if (description !== null) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (size !== undefined) updateData.size = size;
    if (color !== undefined) updateData.color = color;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (category_id !== undefined) updateData.category_id = category_id;
    console.log(updateData)

    const item = await prisma.store_Item.update({
        where: {
            id
        },
        data: updateData,
    })

    if(files) {
        const item_image = await prisma.image.findMany({
            where: {
                itemId: id,
            }
        })
        if(item_image) {
            await prisma.image.deleteMany({
                where: {
                    itemId: id,
                },
            })
        }
        const imageRecords = [];
        for (const file of files) {
        try {
            const result = await saveFile(file, imagePath); 
            const image = await prisma.image.create({
                data: {
                    url: result,
                    item: {
                        connect: { id: item.id },
                    },
                },
            });
            imageRecords.push(image);
            } catch (error) {
                console.error('Error saving image:', error);
                return Response.json(
                    { message: 'Failed to upload image(s)' },
                    { status: 500 }
                );
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

        const item = await prisma.store_Item.delete({
        where: {
            id: id,
        },
        });
    
        if (!item) {
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