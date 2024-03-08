import React from 'react';

import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import Form from '@/components/Form';
import Header from '@/components/layoutComponents/Header';
import CommentFeed from '@/components/posts/CommentFeed';
import PostItem from '@/components/posts/PostItem';
import usePost from '@/hooks/usePost';

type Props = {}

function PostView() {
    const router=useRouter();

    const {postId}=router.query;

    const {data:fetchedPost, isLoading}=usePost(postId as string);

    if(isLoading || !fetchedPost){
        return (
            <div className="flex justify-center items-center full">
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )
    }


  return (
    <>
        <Header label='Tweet' showBackArrow/>
        <PostItem data={fetchedPost} />
        <Form postId={postId as string} isComment placeholder='Tweet your reply'/>
        <CommentFeed comments={fetchedPost?.comments}/>
    </>
  )
}

export default PostView