import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const data = await req.json();

    if (!Array.isArray(data)) {
        return new Response(JSON.stringify({
            message: "Invalid data format. Expected an array of objects.",
            status: 400
        }), { status: 400 });
    }

    try {
        const names: string[] = [];
        const values: string[] = [];

        data.forEach((item) => {
            const { name, value } = item;
            if (name && value) {
                names.push(name);
                values.push(value);
            }
        });

        const listen = await prisma.listen.create({
            data: {
                name: names,
                value: values
            }
        });

        return Response.json({ message: "OK" }, { status:201 })

    } catch (error) {
        console.error(error);
        return Response.json({ message: "Error" }, { status:500 })
    }
}

export async function GET(req:Request) {
    const contacts = await prisma.listen.findMany()
    return Response.json({
        message: "OK",
        status: 200,
        data: contacts
    })
}

export async function PATCH(req:Request) {

    const data = await req.json();
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;
    console.log(data)

    const existingContact = await prisma.listen.findUnique({
        where: { id },
    });
    if (!existingContact) {
        return Response.json({ message: "Not found" }, { status: 404 });
    }
    try {
        const names: string[] = [];
        const values: string[] = [];
    
        data.forEach((item: any) => {
            const { name, value } = item;
            if (name && value) {
                names.push(name);
                values.push(value);
            }
        });
        const updatedName = names !== undefined ? names : existingContact.name;
        const updatedValue = values !== undefined ? values : existingContact.value;
        console.log(updatedName, updatedValue)

        const listen = await prisma.listen.update({
            where: { id: id },
            data: {
                name: updatedName,
                value: updatedValue,
            },
        });
        return Response.json({ message: "OK" }, { status:202 })

    } catch (error) {
        console.error(error);
        return Response.json({ message: "Error" }, { status:500 })
    }
}

export const DELETE = async (req: Request) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

        const contacts = await prisma.listen.delete({
        where: {
            id: id,
        },
        });
    
        if (!contacts) {
        return Response.json(
            {
                message: "Error",
            },
            {
                status: 404,
            }
        );
        }
    
    return Response.json(
        {
            message: "Ok",
        },
        {
            status: 202,
        }
    );
};