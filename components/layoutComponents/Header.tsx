import { BiArrowBack } from 'react-icons/bi';

interface props{
    label:string,
    showBackArrow?:boolean,
}
function Header({label, showBackArrow}: props) {


  return (
    <div className="border-b-[1px] border-neutral-800 p-6">
        <div className="flex flex-row items-center gap-2">
            {showBackArrow && (<BiArrowBack onClick={()=>{}} color="white" size={24} className="cursor-pointer hover:opacity-80 transition"/>)}
       <h1 className="text-xl font-semibold text-white">{label}</h1>
        </div>
    </div>
  )
}

export default Header