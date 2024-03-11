import { useCallback } from 'react';

import { useRouter } from 'next/router';
import { BsDot } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';

import useCurrentUser from '@/hooks/useCurrentUser';
import { onLoginModal } from '@/hooks/useLoginModal';

function SidebarItem({label, key, href, icon:Icon, onClick, auth, alert }:{label:string, key?:string, href?:string, icon:IconType, onClick?:()=>void, auth?:boolean, alert?:boolean}) {
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

<div key={key} className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
<Icon size={26} color='white'/>
{alert ? <BsDot className='text-sky-500 absolute -top-4 left-0' size={70}/> : null}
</div>
<div className="relative hidden items-center gap-4 p-4 rounded-full cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 lg:flex">
    <Icon size={24} color='white'/>
    <p className='text-white'>{label}</p>
    {alert ? <BsDot className='text-sky-500 absolute -top-4 left-0' size={70}/> : null}
</div>

    </div>
  )
}

export default SidebarItem