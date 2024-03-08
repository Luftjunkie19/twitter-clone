import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/lib/prismadb';

export async function handler(req:NextApiRequest, res:NextApiResponse) {
 if(req.method !== "GET"){
    return res.status(405).end();
}

try {
    const {postId}=req.body;

    if(!postId ||  typeof postId !== "string" ) {
        throw new Error('Invalid ID');
    }

    const post= await prisma.post.findUnique({
        where:{
            id:postId
        },
        include:{
            user:true,
            comments:{
                include:{
                    user:true
                },
                orderBy:{
                    createdAt:'desc'
                }
            }
        }
    });

    return res.status(200).json(post);
    
} catch (error) {
    console.log(error);
    return res.status(400).end();
}
}
