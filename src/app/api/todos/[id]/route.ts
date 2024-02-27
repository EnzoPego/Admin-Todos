
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from 'yup'

interface Segments{
    params:{
        id : string
    }
}


export async function GET(request: Request, {params}:Segments) {

    const {id} = params
    
    const todo = await prisma.todo.findFirst({where: {id: id} })
    console.log(todo)

    if(!todo){
        return NextResponse.json({msg:`El todo con id: ${id} no existe`},{status: 404})
    }

    return NextResponse.json(todo)
}




const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional()
})

export async function PUT(request: Request, {params}:Segments) {

    const { id } = params
    
    const todo = await prisma.todo.findFirst({where: {id} })
    console.log(todo)

    if(!todo){
        return NextResponse.json({msg:`El todo con id: ${id} no existe`},{status: 404})
    }
    try {
        const {complete, description} = await putSchema.validate(await request.json()) 
    
        const updatedTodo = await prisma.todo.update({
            where: {id},
            data:{complete , description}
        })
    
        return NextResponse.json(updatedTodo)
        
    } catch (error) {
        return NextResponse.json(error,{status:404})
    }

}


