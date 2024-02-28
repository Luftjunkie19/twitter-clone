import React, {
  useCallback,
  useState,
} from 'react';

import Modal from '@/components/Modal';
import { onLoginModal } from '@/hooks/useLoginModal';
import { onRegisterModal } from '@/hooks/useRegisterModal';

import Input from '../Input';

type Props = {}

function RegisterModal({}: Props) {
    const loginModal=onLoginModal();
    const registerModal=onRegisterModal();
    const [name, setName]=useState('');
    const [nickname, setNickname]=useState('');
    const [email, setEmail]=useState('');
const [password, setPassword]=useState('');
const [isLoading, setIsLoading]=useState(false);

const onToggle=useCallback(()=>{
    if(isLoading){
        return;
    }
    registerModal.onClose();
    loginModal.onOpen();
}, [isLoading, loginModal, registerModal])


const onSubmit= useCallback(async()=>{
    try{
        setIsLoading(true);


        registerModal.onClose();
    }catch(err){}
    finally{
        setIsLoading(false);
    }
},[registerModal]);


const bodyContent=(
    <div className="flex flex-col gap-4">
<Input type='text' color='white' onChange={(e)=>setName(e.target.value)} disabled={isLoading} placeholder='name'/>
<Input type='text' color='white' onChange={(e)=>setNickname(e.target.value)} disabled={isLoading} placeholder='nickname'/>
<Input type='email' color='white' disabled={isLoading}  placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
<Input type='password' color='white' disabled={isLoading}  placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
    </div>
)

const footerContent=(<div className='text-neutral-800 text-center mt-4'>
<p>Already have an account?</p>

<span onClick={onToggle} className='text-white cursor-pointer hover:underline'>Sign In</span>

</div>)

  return (
<Modal footer={footerContent} onSubmit={onSubmit} body={bodyContent} actionLabel='Sign Up' onClose={registerModal.onClose} title='Create an account' isOpen={registerModal.isOpen}  disabled={isLoading}/>
  )
}

export default RegisterModal