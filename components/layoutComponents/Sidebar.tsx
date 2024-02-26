import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';
import {
  BsBell,
  BsHouse,
  BsPerson,
} from 'react-icons/bs';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import TwitterSidebarButton from './TwitterSidebarButton';

function Sidebar() {
const router=useRouter();
    const items=[{label:'Home', href:'/', icon:BsHouse}, {label:'Notifications', href:"/notifications", icon:BsBell}, {label:"Profile", href:"/users/id1", icon:BsPerson}]

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
        <div className="flex flex-col items-end">
            <div className=" space-y-2 lg:w-[230px]">
  <SidebarLogo/>
  {items.map((item)=>(<SidebarItem onClick={()=>(router.push(item.href))} key={item.href} icon={item.icon} label={item.label} href={item.href}/>))}
           <SidebarItem onClick={()=>{}} icon={BiLogOut} label='Logout'/>
           <TwitterSidebarButton/>
            </div>
        </div>
    </div>
  )
}

export default Sidebar