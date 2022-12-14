import { UserInfo } from "../UserInfo";
import logo from '../../assets/logo.webp';

export const Header = () => {
    return (
        <header className='relative w-full h-[60px] border-b border-zinc-800'>
            <div className='absolute w-full h-full flex items-center px-6'>
                <div className='w-full flex justify-between items-center'>
                    <div className='w-[170px] flex'>
                        <a href=""><img src={logo} alt="logo-multisoftware" /></a>
                    </div>
                    <div>
                        <UserInfo />
                    </div>
                </div>
            </div>
        </header>
    );
}