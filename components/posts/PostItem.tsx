import React, {
  useCallback,
  useMemo,
} from 'react';

import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/router';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
} from 'react-icons/ai';

import useCurrentUser from '@/hooks/useCurrentUser';
import useLike from '@/hooks/useLike';
import { onLoginModal } from '@/hooks/useLoginModal';

import Avatar from '../Avatar';

type Props = {userId?:string, data:Record<string, any>, key?:string}

function PostItem({userId, key, data}: Props) {
const router=useRouter();

const loginModal=onLoginModal();

const {data:currentUser}=useCurrentUser();
const {hasLiked, toggleLike}=useLike({postId:data.id, userId});
const goToUser=useCallback((event:any)=>{
    event.stopPropagation();

    router.push(`/users/${data.user.id}`)
},[data.user.id, router]);

const goToPost=useCallback(()=>{
    router.push(`/posts/${data.id}`);
},[data.id, router]);

const onLike=useCallback(async(event:any)=>{
    event.stopPropagation();

    if(!currentUser){
      return loginModal.onOpen();
    }
     
       await toggleLike();
      
    
    
}, [currentUser, loginModal, toggleLike]);

const createdAt=useMemo(()=>{
    if(!data?.createdAt){
        return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
},[data.createdAt])
  return (
    <div onClick={goToPost} className=' border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-950 transition'>
        <div className="flex flex-row items-start gap-3">
            <Avatar userId={data.user.id}/>
<div className="">
    <div className="flex flex-row items-center gap-2">
        <p className=' text-white text-base hover:underline font-semibold cursor-pointer' onClick={goToUser}>{data.user.name}</p>
        <span onClick={goToUser} className='text-neutral-500 text-base cursor-pointer hover:underline md:block hidden'>@{data.user.username}</span>
  <span className='text-neutral-500 text-sm'>
    {createdAt}
  </span>
    </div>
    <div className="text-white mt-1 text-base">
        {data.body}
    </div>
   <div className="flex flex-row items-center mt-3 gap-10">
    <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
        <AiOutlineMessage size={20}/>
        <p className='text-base'>{data.comments?.length || 0}</p>
    </div>
    <div onClick={onLike}  className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
      {hasLiked ?  <AiFillHeart color='red' size={20}/> : <AiOutlineHeart size={20} />}

        <p className='text-base'>{data.likedIds.length || 0}</p>
    </div>
   </div>
</div>
        </div>


    </div>
  )
}

export default PostItem