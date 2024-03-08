import React, {
  useCallback,
  useState,
} from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

import useCurrentUser from '@/hooks/useCurrentUser';
import { onLoginModal } from '@/hooks/useLoginModal';
import usePost from '@/hooks/usePost';
import usePosts from '@/hooks/usePosts';
import { onRegisterModal } from '@/hooks/useRegisterModal';

import Avatar from './Avatar';
import Button from './buttons/Button';

type Props = {placeholder:string, isComment?:boolean, postId?:string}

function Form({placeholder, isComment, postId}: Props) {
  const registerModal=onRegisterModal();
  const loginModal=onLoginModal();

  const {data:currentUser}=useCurrentUser();
const {mutate:mutatePosts}=usePosts();
const {mutate:mutatePost}=usePost(postId as string);
const [body, setBody]=useState('');
const [isLoading, setIsLoading]=useState(false);

const onSubmit=useCallback(async ()=>{
    try {
        setIsLoading(true);

        const url = isComment ? `/api/comments?postId=${postId}` : `/api/posts`

        await axios.post(url, {body});

        toast.success(isComment ? 'Comment added !' : 'Tweet sent !');

        setBody('');
        mutatePosts();
        mutatePost();

    } catch (error) {
        toast.error('Something went wrong');
    }
    finally{
        setIsLoading(false);
    }
},[body, isComment, mutatePost, mutatePosts, postId])

    return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
       {currentUser ? (
<div className="flex flex-row gap-4">
    <div className="">
      <Avatar userId={currentUser?.id}/>
    </div>
    <div className="w-full">
        <textarea placeholder={placeholder} value={body} className='disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white' disabled={isLoading} onChange={(e)=>setBody(e.target.value)}>

        </textarea>
        <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition'/>
    <div className="mt-4 flex flex-row justify-end" >
        <Button label='Tweet'  onClick={onSubmit} disabled={isLoading || body.trim().length === 0}/>
    </div>
    </div>
</div>

       ) : (<div className="py-8">
            <h1 className='text-white text-2xl text-center mb-4 font-bold'>Welcome to Twitter</h1>
       <div className="flex flex-row items-center justify-center gap-4">

        <Button  label='Login' onClick={loginModal.onOpen}/>
        <Button  secondary label='Register' onClick={registerModal.onOpen}/>
       </div> 
        </div>)}
       
      
    </div>
  )
}

export default Form