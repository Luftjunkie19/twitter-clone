import React, {
  useCallback,
  useMemo,
} from 'react';

import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/router';

import Avatar from '../Avatar';

type Props = {data:Record<string, any>}

function CommentItem({data}: Props) {
    const router= useRouter();
    const goToUser=useCallback((event:any)=>{
        event.stopPropagation();

        router.push(`/user/${data.user.id}`)
    },[data.user.id, router])

const createdAt=useMemo(()=>{
    if(!data?.createdAt){
        return null;
    }
    return formatDistanceToNowStrict(new  Date(data.createdAt));
},[data.createdAt])

    return (
    <div className='border-b-[1px] border-neutral-500 p-5 cursor-pointer hover:bg-neutral-900 transition'>
        <div className='flex flex-row items-start gap-3'>
            <Avatar userId={data.user.id}/>
            <div className="">
                <div className="flex flex-row items-center gap-2">
                    <p onClick={goToUser} className='text-white font-semibold cursor-pointer hover:underline'>{data.user.name}</p>
                <span className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{data.user.username}</span>
              <span className="text-neutral-500 text-sm">
                {createdAt}
              </span>
                </div>
                <div className="text-white mt-1">
                    {data.body}
                </div>
            </div>
        </div>


    </div>
  )
}

export default CommentItem