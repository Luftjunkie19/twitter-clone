import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

import prisma from '@/lib/prismadb';

const serverAuth= async (req:NextApiRequest)=>{
    const session= await getSession({req})

    if(!session?.user?.email){
        throw new Error('No signed in');
    }

    const currentUser= await prisma.user.findUnique({
where:{
    email:session.user.email,
},
    });

    if(!currentUser){
        throw new Error("This account is not exist");
    }

    return {currentUser}
}

export default serverAuth;