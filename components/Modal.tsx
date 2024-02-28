import React, { useCallback } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

import Button from './buttons/Button';

type Props = {
    isOpen?:boolean,
    onClose: ()=>void,
    onSubmit:()=>void,
    title?:string,
    body?:React.ReactElement,
    footer?:React.ReactElement,
    actionLabel:string,
    disabled?:boolean
}

const Modal:React.FC<Props> = ({
    isOpen, onClose, onSubmit, title, body, footer,
    actionLabel, disabled
})=> {

    const handleClose=useCallback(()=>{
        if(disabled){
            return;
        }

        onClose();
    },[disabled, onClose]);

    const handleSubmit=useCallback(()=>{
        if(disabled) {
            return;
        }
        onSubmit();
    },[disabled, onSubmit]);

    if(!isOpen){
        return null;
    }

  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto z-50 fixed inset-0 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">

<div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
    <div className="h-full lg:h-auto border-0 rounded-lg relative flex flex-col bg-black outline-none focus:outline-none">
        <div className="flex item-center justify-between p-10 rounded-t">
            <h1 className='text-3xl font-semibold text-white'>{title}</h1>
      <button onClick={handleClose} className='p-1 ml-auto border-0 text-white hover:opacity-70 transition'>
        <AiOutlineClose size={20}/>
      </button>
        </div>
  <div className="relative p-10 flex-auto">
    {body}
    </div>
    <div className="flex flex-col gap-2 p-10">
      <Button large onClick={handleSubmit} secondary fullWidth disabled={disabled} label={actionLabel} />
        {footer}
        </div>      
    </div>
</div>

    </div>
    </>
  )
}

export default Modal