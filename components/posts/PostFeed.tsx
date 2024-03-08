import React from 'react';

/* eslint-disable react/jsx-key */
import usePosts from '@/hooks/usePosts';

import PostItem from './PostItem';

type Props = {
  userId?:string,
}

function PostFeed({userId}: Props) {
  const {data:posts=[]}=usePosts(userId);
  return (
    <>
    {posts.map((post:Record<string, any>)=>(<PostItem userId={userId as string} key={post.id} data={post}/>))}
    </>
  )
}

export default PostFeed