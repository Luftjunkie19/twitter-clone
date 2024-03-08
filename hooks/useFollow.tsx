import {
  useCallback,
  useMemo,
} from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

import useCurrentUser from './useCurrentUser';
import { onLoginModal } from './useLoginModal';
import useUser from './useUser';

type Props = {}

function useFollow(userId:string) {
const {data:currentUser, mutate:mutateCurrentUser} = useCurrentUser();

const {mutate:mutateFetchedUser}=useUser(userId);

const loginModal=onLoginModal();

const isFollowing=useMemo(()=>{
    const list= currentUser?.followingId || [];

    return list.includes(userId);
},[currentUser?.followingId, userId]);

const toggleFollow=useCallback(async ()=>{
    if(!currentUser){
        return loginModal.onOpen();
    }

    try {
        let request;

        if(isFollowing){
            request= ()=> axios.delete('/api/follow', {data:{userId}});
        }else{
            request= ()=> axios.post('/api/follow', {userId});
        }
     
        await request();
        mutateCurrentUser();
        mutateFetchedUser();

        toast.success('SUCCESS !');

    } catch (error) {
        toast.error('Something went wrong');
    }
},[currentUser, isFollowing, loginModal, mutateCurrentUser, mutateFetchedUser, userId])

return {
    isFollowing,
    toggleFollow
}

}

export default useFollow