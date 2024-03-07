import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';
import {
  BsBell,
  BsHouse,
  BsPerson,
} from 'react-icons/bs';

import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import TwitterSidebarButton from './TwitterSidebarButton';

function Sidebar() {
const router=useRouter();
const {data:currentUser}=useCurrentUser();
    const items=[{label:'Home', href:'/', icon:BsHouse}, 
    {label:'Notifications', href:"/notifications", icon:BsBell, auth:true},
     {label:"Profile", href:"/users/id1", icon:BsPerson, auth:true}]

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
        <div className="flex flex-col items-end">
            <div className=" space-y-2 lg:w-[230px]">
  <SidebarLogo/>
  {items.map((item)=>(<SidebarItem auth={item.auth} key={item.href} icon={item.icon} label={item.label} href={item.href}/>))}
          {currentUser &&
           <SidebarItem onClick={async ()=>{await signOut()}} icon={BiLogOut} label='Logout'/>
          }
           <TwitterSidebarButton/>
            </div>
        </div>
    </div>
  )
}

export default Sidebar