import React, { useCallback } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import useUser from '@/hooks/useUser';

interface AvatarProps{
    userId:string,
    isLarge?:boolean,
    hasBorder?:boolean
}

const Avatar:React.FC<AvatarProps>=({userId, isLarge, hasBorder})=>{
const router=useRouter();
    const {data:fetchedUser}=useUser(userId);

    const clickHandler=useCallback((event:any)=>{
event.stopPropagation();

const url = `/users/${userId}`;

router.push(url);
    },[router, userId])

    return (<div className={`
    ${hasBorder ? 'border-4 border-black' : ''}
    ${isLarge ? 'h-32' : 'h-12'}
    ${isLarge ? 'w-32' : 'w-12'}
    rounded-full hover:opacity-90 transition cursor-pointer relative
    `}>
<Image fill style={{ objectFit: "cover", borderRadius: '100%' }} onClick={clickHandler} src={fetchedUser?.profileImage || ''} alt={''}/>

    </div>);
}

export default Avatar;