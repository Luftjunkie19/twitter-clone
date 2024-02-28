import { create } from 'zustand';

interface LoginModalStore {
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void,
}

export const onLoginModal= create<LoginModalStore>((set)=>({
isOpen:false,
onClose: () => set({isOpen: false}),
onOpen: ()=> set({isOpen:true})
}));