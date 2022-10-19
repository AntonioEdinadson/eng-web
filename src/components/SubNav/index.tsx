import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { INavbar } from "../../interfaces/INavbar";

interface ISubNavComponent {
    props: INavbar;
}

export const SubNav = ({ props }: ISubNavComponent) => {

    const [menuOpen, setMenuOpen] = useState<Boolean>(false);

    return (
        <>
            {props.itens && props.itens.length > 0
                ?
                <li className='py-2' onClick={() => setMenuOpen(!menuOpen)}>
                    <div className='flex items-center justify-between hover:bg-zinc-900 hover:text-white cursor-pointer p-2'>
                        <div className='flex items-center gap-2'>
                            {props.icon}
                            <span>{props.name}</span>
                        </div>
                        <ChevronRightIcon className={`w-4 ${menuOpen ? "rotate-90" : ""}`} />
                    </div>
                    {menuOpen &&
                        <ul>
                            {props.itens.map((child: INavbar, index) => (
                                <li key={index} className='flex items-center hover:bg-zinc-800 hover:text-white cursor-pointer pl-9 p-1 mt-1'>
                                    <Link to={child.path}>
                                        <div className='flex items-center my-1 gap-2'>
                                            {child.icon}
                                            <span>{child.name}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    }
                </li>
                :
                <li className='py-2 flex justify-between items-center hover:bg-zinc-900 hover:text-white cursor-pointer p-2 mt-2'>
                    <Link to={props.path}>
                        <div className='flex items-center gap-2'>
                            {props.icon}
                            <span>{props.name}</span>
                        </div>
                    </Link>
                </li>
            }
        </>
    );
}