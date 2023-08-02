import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const { name, image } = body

        if (!currentUser?.id) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }

        const updatedUser = await client.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name: name,
                image: image
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.log(error);
        return new NextResponse("Error", { status: 500 })
    }
}