import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async(request : any ) => {
    const {email, password} = await request.json();

    await connect();

    const hashedPassword = await bcrypt.hash(password,5);
    const newUser =  new User ({
        email,
        password:hashedPassword,
    })

    try{

    }catch(err: any){
        return new NextResponse (error ,{
            status: 500,
        })

    }
}