import userIMG from '../../assets/profile.jpg'
import { AuthContext } from '../../context/Auth/AuthContext';

import {
    ChevronDownIcon
} from '@heroicons/react/24/solid';

import { useContext } from 'react';

interface IUserInfoComponent {
    isOpen: (e: any) => void;
    status: Boolean
}

export const UserInfo = ({ isOpen, status }: IUserInfoComponent) => {

    const auth = useContext(AuthContext);

    return (
        <div id='card' className='relative flex items-center gap-2' >
            <span className='text-[#878787] text-[.9rem]'>{auth.user?.name}</span>
            <div className="w-[35px] h-[35px] flex justify-center items-center bg-zinc-800 rounded-full overflow-hidden">
                <img src={userIMG} alt="profile-image" className='cursor-pointer' />
            </div>
            <ChevronDownIcon className='w-4 text-[#878787] cursor-pointer' onClick={(e: any) => isOpen(e)} />
            <div className={`z-10 absolute top-0 right-0 bg-zinc-800 mt-16 rounded p-8 ${!status && "hidden"}`}>
                <div className='w-72 flex items-center gap-2 py-4 border-b border-zinc-700'>
                    <div className='w-16 h-16 rounded-full overflow-hidden'>
                        <img src={userIMG} alt="profile-image" className='w-full' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium text-zinc-400'>{auth.user?.name}</span>
                        <span className='text-zinc-400 text-[.8rem]'>{auth.user?.email}</span>
                    </div>
                </div>
                <div className='text-zinc-400 py-4  border-b border-zinc-700'>
                    <span className='block py-2 text-center'>Permissions</span>
                    {auth.user?.permissions
                        ?
                        <div className='flex gap-2 justify-center'>
                            {auth.user?.permissions.map((permission, index) => (
                                <span key={index} className='border rounded border-zinc-600 text-[.7rem] p-1'>{permission}</span>
                            ))}
                        </div>
                        :
                        <span className='border rounded border-zinc-600 text-[.7rem] p-1'>FULERO</span>
                    }
                </div>
                <div className='text-center mt-6'>
                    <button
                        className="bg-transparent hover:bg-zinc-600 text-zinc-500 font-semibold hover:text-white py-1 px-4 border border-zinc-600 hover:border-transparent rounded"
                        onClick={auth.sigout}>
                        LOGOUT
                    </button>
                </div>
            </div>
        </div>
    );
};
