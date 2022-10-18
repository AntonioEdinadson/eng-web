import { CogIcon, PlusCircleIcon, ChevronRightIcon, ClipboardDocumentIcon, FireIcon, UsersIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { INavbar } from '../../interfaces/INavbar';
import { SubNav } from '../SubNav';

import logo from '../../assets/logo.webp';

const menu = [
    {
        icon: <PlusCircleIcon className="w-6 text-blue-500" />,
        name: "Cadastro de Produtos",
        path: "/item1",
        itens: []
    },
    {
        icon: <ClipboardDocumentIcon className="w-6 text-blue-500" />,
        name: "Checklist",
        path: "/item2",
        itens: [
            {
                icon: <CogIcon />,
                name: "submenu",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon />,
                name: "submenu",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon />,
                name: "submenu",
                path: "/item",
                itens: []
            },
        ]
    },
    {
        icon: <FireIcon className="w-6 text-blue-500" />,
        name: "Microsoft",
        path: "/item3",
        itens: [
            {
                icon: <CogIcon />,
                name: "submenu",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon />,
                name: "submenu",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon />,
                name: "submenu",
                path: "/item",
                itens: []
            },
        ]
    },
    {
        icon: <UsersIcon className="w-6 text-blue-500" />,
        name: "Usuarios",
        path: "/item4",
        itens: []
    },
    {
        icon: <CogIcon className="w-6 text-blue-500" />,
        name: "Configurações",
        path: "/item5",
        itens: []
    }
];

export const Navbar = () => {

    const [contentMenu, setContentMenu] = useState<INavbar[] | null>([]);

    useEffect(() => {
        getContentMenu();
    }, []);

    const getContentMenu = () => {
        setContentMenu(menu);
    };

    return (
        <aside className="w-[280px]">
            <div className="fixed w-[280px] h-full py-[1.5rem] border-r border-zinc-800">
                <div className="w-full pb-[1.5rem] px-[1rem]">
                    <Link to=""><img src={logo} className="w-[85%]" alt="logo" /></Link>
                </div>
                <ul className="text-[#878787] mt-[2rem]">
                    {contentMenu && contentMenu.length > 0 &&
                        <>
                            {contentMenu.map((menu: INavbar, index) => (
                                <SubNav props={menu} />
                            ))}
                        </>
                    }
                </ul>
            </div>
        </aside>
    );
};
