import React from 'react';

import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Header from '@/components/layoutComponents/Header';
import NotificationsFeed from '@/components/users/NotificationsFeed';

//Prevents from rendering to the client if the session does not exist on a server side.
export async function  getServerSideProps(context:NextPageContext) {
const session= await getSession(context);

if(!session){
    return {
        redirect:{
            destination:'/',
            permanent:false
        }
    }
}
    return {
        props:{
            session
        }
    }
}


function Notifications() {
  return (
    <>
        <Header label='Notifications' showBackArrow/>
        <NotificationsFeed/>
    </>
  )
}

export default Notifications