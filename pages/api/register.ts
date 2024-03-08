import bcrypt from 'bcrypt';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/lib/prismadb';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    try {
        const {email, username, name, password}=req.body;
        const hashedPassword= await bcrypt.hash(password, 12);

        const user = await prisma?.user.create({
            data:{
                email,
                username,
                name,
                hashedPassword
            }
        });
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    res.status(500).end();
    }
}