import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 
    
    await prisma.todo.deleteMany() //delete * from todo
    await prisma.user.deleteMany() //delete * from todo

    const user = await prisma.user.create({
        data:{
            email: 'test1@google.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin','clien'],
            todos:{
                create:[
                    {description:'Piedra del alma',complete:true},
                    {description:'Piedra del poder'},
                    {description:'Piedra del tiempo'},
                    {description:'Piedra del espacio'},
                    {description:'Piedra de la realidad'}
                ]
            }
        }
    })
    return NextResponse.json({msg:'Seed Executed'})

    // const datos =  await prisma.todo.createMany({
    //     data:[
    //         {description:'Piedra del alma',complete:true},
    //         {description:'Piedra delpoder'},
    //         {description:'Piedra del tiempo'},
    //         {description:'Piedra del espacio'},
    //         {description:'Piedra de la realidad'}
    //     ]
    // })
    
   //console.log(datos)


}