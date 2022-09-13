import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import logo from '../../assets/logo.webp';

interface IMenu {
    name: string;
    itens: string[];
    icon: JSX.Element;
}

interface INavbarComponent {
    menuItens: IMenu[];
}

export const Navbar = ({ menuItens }: INavbarComponent) => {
    return (
        <aside className="w-[250px]">
            <div className="fixed w-[250px] h-full py-[1.5rem] border-r">
                <div className="w-full border-b pb-[1.5rem] px-[1rem]">
                    <Link to=""><img src={logo} className="w-[85%]" alt="" /></Link>
                </div>
                <ul>
                    <div className="w-full mt-[3rem]">
                        <ul className="flex flex-col gap-[1rem]">
                            {menuItens.map((item, index) => (
                                <li className="flex items-center justify-between cursor-pointer hover:bg-slate-100 px-3 py-2 rounded" key={index}>
                                    <div className='flex items-center gap-2'>
                                        {item.icon}
                                        <span className="text-[#969696]">{item.name}</span>
                                    </div>
                                    <ChevronRightIcon className="w-4 text-blue-500" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </ul>
            </div>
        </aside>
    );
};
