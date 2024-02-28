import React, {
  useCallback,
  useState,
} from 'react';

import { onLoginModal } from '../../hooks/useLoginModal';
import Input from '../Input';
import Modal from '../Modal';

type Props = {}

function LoginModal({}: Props) {
const loginModal=onLoginModal();
const [email, setEmail]=useState('');
const [password, setPassword]=useState('');
const [isLoading, setIsLoading]=useState(false);

const onSubmit= useCallback(async()=>{
    try{
        setIsLoading(true);


        loginModal.onClose();
    }catch(err){}
    finally{
        setIsLoading(false);
    }
},[loginModal]);

const bodyContent=(
    <div className="flex flex-col gap-4">
<Input type='email' color='white' disabled={isLoading}  placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
<Input type='password' color='white' disabled={isLoading}  placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
    </div>
)

  return (
   <Modal onSubmit={onSubmit} body={bodyContent} actionLabel='Sign In' onClose={loginModal.onClose} title='Login' isOpen={loginModal.isOpen}  disabled={isLoading}/>
  )
}

export default LoginModal