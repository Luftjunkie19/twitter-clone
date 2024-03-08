import React from 'react';

import Image from 'next/image';

import useUser from '@/hooks/useUser';

import Avatar from '../Avatar';

interface  Props {
 userId: string;
}
function UserHero({userId}:Props) {
  
    const {data:fetchedUser}=useUser(userId);
  
    return (
    <div>
  <div className="bg-neutral-700 h-44 relative">
    {fetchedUser?.coverImage && (<Image src={fetchedUser?.coverImage} fill alt='User cover image' style={{objectFit:'cover'}}/>)}
  <div className="absolute -bottom-16 left-4">
    <Avatar userId={userId} isLarge hasBorder/>
  </div>
  </div>
        
    </div>
  )
}

export default UserHero