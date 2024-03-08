import React, {
  useCallback,
  useState,
} from 'react';

import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

type Props = {
    onChange:(base:string)=>void,
    label:string,
    value?:string,
    disabled?:boolean
}

function ImageUpload({onChange, label, value, disabled}: Props) {

const [base64, setBase64]=useState(value);
const handlerChange=useCallback((base64:string)=>{
    onChange(base64);
},[onChange]);

const handleDrop=useCallback((files:any)=>{
const file= files[0];

const reader= new FileReader();

reader.onload=(event:any)=>{
    setBase64(event.target.result);
    handlerChange(event.target.result);
}

reader.readAsDataURL(file);

},[handlerChange]);


const {getRootProps, getInputProps}=useDropzone({
    maxFiles:1,
    onDrop:handleDrop,
    disabled:disabled,
    accept:{
        'image/jpeg':[],
        'image/png':[]
    }
});

    return (
    <div {...getRootProps({className:"w-full p-4 text-white text-center border-dotted rounded-md border-neutral-800"})}>
<input {...getInputProps}/>
{base64 ? (<div className='flex items-center justify-center'>
    <Image src={base64} height={100} width={100} alt='uploaded image'/>
</div>) : (<p className='text-white'>{label}</p>)}
    </div>
  )
}

export default ImageUpload