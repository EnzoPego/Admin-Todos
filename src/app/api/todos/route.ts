
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from 'yup'


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = searchParams.get("take") ?? "10";
  const skip = searchParams.get("skip") ?? "0";

  if(isNaN(+take)){
    return NextResponse.json({msg:'Take tiene que ser un numero'},{status: 404})
  }

  if(isNaN(+skip)){
    return NextResponse.json({msg:'Skip tiene que ser un numero'},{status: 404})
  }

  const todos = await prisma.todo.findMany({
    take: +take,
    skip: +skip
  });

  return NextResponse.json( todos );
}



// Define un esquema de validación con Yup
const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.bool().optional().default(false)

})

export async function POST(request: Request) { 

  try {
    // Parsea el cuerpo de la solicitud como JSON y valida que cumpla con el esquema definido
    const { complete, description } = await postSchema.validate (await request.json())

    const todo = await prisma.todo.create({ data: {complete, description} })    
        
    return NextResponse.json(todo)
    
  } catch (error) {
    return NextResponse.json(error, {status: 400} )
        
  }    

}



export async function DELETE(request: Request) { 

  try {

   await prisma.todo.deleteMany({ where: {complete: true} })    
        
    return NextResponse.json('Borrados')
    
  } catch (error) {
    return NextResponse.json(error, {status: 400} )
        
  }    

}

