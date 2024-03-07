import { useCallback } from 'react';

import { useRouter } from 'next/router';
import { IconType } from 'react-icons/lib';

import useCurrentUser from '@/hooks/useCurrentUser';
import { onLoginModal } from '@/hooks/useLoginModal';

function SidebarItem({label, key, href, icon:Icon, onClick, auth }:{label:string, key?:string, href?:string, icon:IconType, onClick?:()=>void, auth?:boolean}) {
 const router=useRouter();
 const loginModal=onLoginModal();
const {data:currentUser}=useCurrentUser();
 const handleClick=useCallback(()=>{
   if(auth && !currentUser){
     loginModal.onOpen();
   return;
    }
  if(onClick){
    return onClick();
  }


  if(href){
    router.push(href);
  }
 },[auth, currentUser, href, loginModal, onClick, router])

    return (
    <div key={key} onClick={handleClick} className='flex flex-row items-center'>

<div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
<Icon size={26} color='white'/>
</div>
<div className="relative hidden items-center gap-4 p-4 rounded-full cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 lg:flex">
    <Icon size={24} color='white'/>
    <p className='text-white'>{label}</p>
</div>

    </div>
  )
}

export default SidebarItem