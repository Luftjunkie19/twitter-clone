import React from 'react';

import FollowBar from './layoutComponents/FollowBar';
import Sidebar from './layoutComponents/Sidebar';

interface layoutProps{
    children:React.ReactNode
}


const Layout:React.FC<layoutProps> = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-screen bg-black'>
        <div className="container h-full mx-auto xl:px-32 max-w-6xl">
<div className="grid grid-cols-4 h-full">
<Sidebar />
    <div className="col-span-3 lg:col-span-2 border-x-2 border-neutral-800">
{children}
    </div>
    <FollowBar/>
</div>
</div>
           </div>
  )
}

export default Layout