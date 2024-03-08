import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import Header from '@/components/layoutComponents/Header';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';

function UserDetails() {
    const router=useRouter();
  const {userId}=router.query;
  
  const {data:fetchedUser, isLoading}=useUser(userId as string);

  if(isLoading || !fetchedUser){
    return (<div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80}/>
    </div>)
  }
  
    return (
    <>
    <Header label={fetchedUser?.name} showBackArrow/>
    <UserHero userId={userId as string}/>
<UserBio userId={userId as string} />
    </>
  )
}

export default UserDetails