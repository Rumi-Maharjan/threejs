import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"

export async function POST(req:Request) {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const users = await prisma.user.create({
        data: {
            name, 
            email,
            password: hashedPassword
        }
    })

    if(!users) {
        return Response.json({
            message: "Error",
            status: 500
        })
    }
    return Response.json({ message : "Created"}, { status: 201 })
}

export async function GET(req:Request) {
    const users = await prisma.user.findMany()
    return Response.json({
        message: "OK",
        status: 200,
        data: users
    })
}

export async function PATCH(req:Request) {
    const { name, email, password } = await req.json();
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    const existingUser = await prisma.user.findUnique({
        where: { id },
    });
    if (!existingUser) {
        return Response.json({ message: "Not found" }, { status: 500});
    }

    const updateData = {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(password !== undefined && { password }),
    };

    const users = await prisma.user.update({
        where: {
            id
        },
        data: updateData,
    })

    return Response.json(
        {
            message: "OK",
            data: users
        },
        {
            status: 202
        }
    )
}

export const DELETE = async (req: Request) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

        const users = await prisma.user.delete({
        where: {
            id: id,
        },
        });
    
        if (!users) {
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