import { BuildingComplex, ChevronDown, ChevronRight } from 'lucide-react';

export default function header(){

  const path = location.pathname.slice(1)

  function capitalizeFirstLetter(str: string){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return(
    <header className="flex items-center justify-between px-6 bg-white border-b border-gray-300 h-18">
      <div className='flex items-center gap-3 text-gray-500 text-sm'>
        <BuildingComplex size={20}/>
        <span>Workspace</span>
        <ChevronRight size={20}/>
        <span className='text-black font-semibold'>{capitalizeFirstLetter(path)}</span>
      </div>
      <div className='flex items-center gap-2.5'>
        <div className='flex items-center justify-center bg-pink-300 size-8 rounded-full text-xs'>
          AM
        </div>
        <ChevronDown size={20} className='text-gray-500'/>
      </div>
    </header>
  )
}