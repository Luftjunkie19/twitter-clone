import React from 'react';

type Props = {
    placeholder:string,
    color:string,
    type:string,
    disabled:boolean,
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}

function Input({placeholder, color, onChange, type, disabled}: Props) {
  return (
    <div>
        <input className='w-full transition disabled:bg-neutral-900 disabled:opacity-20 disabled:cursor-not-allowed focus:border-2 focus:border-sky-500 rounded-md text-white outline-none p-4 bg-black border-2 border-neutral-800' type={type} disabled={disabled} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}

export default Input