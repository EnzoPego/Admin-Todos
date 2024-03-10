
export const dynamic = 'force-dynamic'
export const revalidate = 0

import prisma from "@/lib/prisma";
import { TodoGrid } from "@/todos/components/TodoGrid";
import { NewTodo } from '../../../todos/components/NewTodo';
import { getUserSessionServer } from "@/auth/actions/auth-acctions";
import { redirect } from "next/navigation";



export const metadata = {
  title: 'Listado de Todos',
  description: 'SEO Title',
};




export default async function RestTodosPage() {

  const user = await getUserSessionServer()
  if ( !user ){
    redirect('/api/auth/signin')
  }

  const todos = await prisma.todo.findMany({
    where:{userId: user.id},
    orderBy: {description:'asc'}
  })




  return (
    <div>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodoGrid todos={todos}/>
    </div>
  );
}