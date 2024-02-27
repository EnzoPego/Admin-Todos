import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 
    
    await prisma.todo.deleteMany() //delete * from todo

    const datos =  await prisma.todo.createMany({
        data:[
            {description:'Piedra del alma',complete:true},
            {description:'Piedra delpoder'},
            {description:'Piedra del tiempo'},
            {description:'Piedra del espacio'},
            {description:'Piedra de la realidad'}
        ]
    })
    
   console.log(datos)

    return NextResponse.json({msg:'Seed Executed'})

}