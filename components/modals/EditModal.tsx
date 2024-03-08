import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import toast from 'react-hot-toast';

import useCurrentUser from '@/hooks/useCurrentUser';
import { onEditModal } from '@/hooks/useEditModal';
import useUser from '@/hooks/useUser';

import Input from '../Input';
import Modal from '../Modal';
import ImageUpload from '../users/ImageUpload';

type Props = {}

function EditModal({}: Props) {
    const {data:currentUser}=useCurrentUser();
    const {mutate:mutateFetchedUser}=useUser(currentUser?.id);
    const editModal=onEditModal();

    const [profileImage, setProfileImage]=useState('');
    const [coverImage, setCoverImage]=useState('');
    const [name, setName]=useState('');
    const [username, setUsername]=useState('');
    const [bio, setBio]=useState('');

    useEffect(()=>{
setProfileImage(currentUser?.ProfileImage);
setCoverImage(currentUser?.CoverImage);
setName(currentUser?.name);
setUsername(currentUser?.username);
setBio(currentUser?.bio);
    },[currentUser?.CoverImage, currentUser?.ProfileImage, currentUser?.bio, currentUser?.name, currentUser?.username])

const [isLoading, setIsLoading]=useState(false);
const submitHandler=useCallback(async ()=>{
    try {
        setIsLoading(true);

    await fetch('/api/edit', {
          method:'PATCH',
          body:JSON.stringify({name, username, coverImage, profileImage, bio}),
          headers:{
          'Content-Type':"application/json"
          }
        });

        mutateFetchedUser();
        toast.success('Updated successfully');

        editModal.onClose();
    } catch (error) {
        toast.error('Something went wrong');
    }finally{
        setIsLoading(false);
    }
},[bio, coverImage, editModal, mutateFetchedUser, name, profileImage, username])

const bodyContent= (<div className='flex flex-col gap-4'>
<ImageUpload value={profileImage} disabled={isLoading} onChange={(image)=>setProfileImage(image)} label='Upload Image'/>
<ImageUpload value={coverImage} disabled={isLoading} onChange={(image)=>setCoverImage(image)} label='Upload Cover'/>
<Input disabled={isLoading} placeholder='name' onChange={(e) => setName(e.target.value)} color={''} type={''}/>
<Input disabled={isLoading} placeholder='username' onChange={(e) => setUsername(e.target.value)} color={''} type={''}/>
<Input disabled={isLoading} placeholder='Bio' onChange={(e) => setBio(e.target.value)} color={''} type={''}/>
</div>)

  return (
<Modal 
disabled={isLoading}
isOpen={editModal.isOpen}
title='Edit your Profile'
actionLabel='Save Changes'
onClose={editModal.onClose}
onSubmit={submitHandler}
body={bodyContent}
/>
  )
}

export default EditModal