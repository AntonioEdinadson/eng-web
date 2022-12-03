import userIMG from '../../assets/profile.jpg'

import {
    ChevronDownIcon
} from '@heroicons/react/24/solid';

export const UserInfo = () => {
    return (
        <div className='flex items-center gap-2 cursor-pointer'>
            <span className='text-[#878787] text-[.9rem]'>Lucas Vieira</span>
            <div className="w-[40px] h-[40px] flex justify-center items-center bg-zinc-800 rounded-full overflow-hidden">
                <img src={userIMG} alt="" />
            </div>
            <ChevronDownIcon className='w-4 text-[#878787]' />
        </div>
    );
};