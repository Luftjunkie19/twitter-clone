import {
  useCallback,
  useMemo,
} from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

import useCurrentUser from './useCurrentUser';
import { onLoginModal } from './useLoginModal';
import usePost from './usePost';
import usePosts from './usePosts';

type Props = {
    postId:string,
    userId?:string,
}

function useLike({postId, userId}: Props) {

    const {data:currentUser}=useCurrentUser();

    const {data:fetchedPost, mutate:mutateFetchedPost}=usePost(postId);
    const {mutate:mutateFechedPosts}=usePosts(userId);

    const loginModal=onLoginModal();

    const hasLiked=useMemo(()=>{
        const list = fetchedPost?.likedIds || [];

        return  list.includes(currentUser?.id);
    },[currentUser?.id, fetchedPost?.likedIds]);

    const toggleLike=useCallback(async ()=>{
if(!currentUser){
    return loginModal.onOpen();
}

try {
    let request;

    if(hasLiked){
        request= ()=> axios.delete('/api/like',{data:{postId}});
    }else{
        request= ()=>axios.post('/api/like', {postId})
    }

    await request();

    mutateFechedPosts();
    mutateFetchedPost();

    toast.success('Success');

} catch (error) {
    toast.error('Something went wrong');
}
    },[currentUser, hasLiked, loginModal, mutateFechedPosts, mutateFetchedPost, postId])

return {
    hasLiked, 
    toggleLike
}
}

export default useLike