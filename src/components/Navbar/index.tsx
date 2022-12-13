import {
    CogIcon,
    PlusCircleIcon,
    ChevronRightIcon,
    ClipboardDocumentIcon,
    FireIcon,
    UsersIcon,
    HomeIcon,
    ComputerDesktopIcon
} from '@heroicons/react/24/solid';

import { RiChromeFill } from 'react-icons/ri';

import { useEffect, useState } from 'react';

import { INavbar } from '../../interfaces/INavbar';
import { SubNav } from '../SubNav';

const menu = [
    {
        icon: <HomeIcon className="w-5 text-blue-500" />,
        name: "Home",
        path: "/home",
        itens: []
    },
    {
        icon: <PlusCircleIcon className="w-5 text-blue-500" />,
        name: "Product Configuration",
        path: "/product",
        itens: [
            {
                icon: <CogIcon className='w-4' />,
                name: "SMBios Product",
                path: "/product/smbios",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Windows Version",
                path: "/product/windowsversion",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "SecureBoot Check",
                path: "/product/secureboot",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Model Resolution",
                path: "/product/modelresolution",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "SDCard Check",
                path: "/product/sdcard",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Model DPK",
                path: "/product/modeldpk",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Model DPK Config",
                path: "/product/modeldpkconfig",
                itens: []
            }
        ]
    },
    {
        icon: <ComputerDesktopIcon className="w-5 text-blue-500" />,
        name: "Line Configuration",
        path: "/lineconfig",
        itens: [            
            {
                icon: <CogIcon className='w-4' />,
                name: "Create Image",
                path: "/lineconfig/createimage",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Associate Image",
                path: "/lineconfig/associateimage",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Line Setup",
                path: "/lineconfig/setup",
                itens: []
            }
        ]
    },
    {
        icon: <ClipboardDocumentIcon className="w-5 text-blue-500" />,
        name: "Checklist",
        path: "/item2",
        itens: [
            {
                icon: <CogIcon className='w-4' />,
                name: "All Records",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Image Approval",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Image Creation",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Bios approval",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Line Setup",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Benchmark",
                path: "/item",
                itens: []
            },
        ]
    },
    {
        icon: <FireIcon className="w-5 text-blue-500" />,
        name: "Microsoft",
        path: "/item3",
        itens: [
            {
                icon: <CogIcon className='w-4' />,
                name: "DPK Quantity Control",
                path: "/item",
                itens: []
            }
        ]
    },
    {
        icon: <RiChromeFill className="text-[1.3rem] text-blue-500" />,
        name: "Chromebook",
        path: "/item3",
        itens: [
            {
                icon: <CogIcon className='w-4' />,
                name: "Provisioning",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Packages",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "License Pack",
                path: "/item",
                itens: []
            },
        ]
    },
    {
        icon: <PlusCircleIcon className="w-5 text-blue-500" />,
        name: "Technical Assistance",
        path: "/item1",
        itens: [
            {
                icon: <CogIcon className='w-4' />,
                name: "Serial Number",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Tools",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Bios and EC Version",
                path: "/item",
                itens: []
            },
            {
                icon: <CogIcon className='w-4' />,
                name: "Linux/Windows Images",
                path: "/item",
                itens: []
            }
        ]
    },
    {
        icon: <UsersIcon className="w-5 text-blue-500" />,
        name: "Users",
        path: "/item4",
        itens: []
    },
    {
        icon: <CogIcon className="w-5 text-blue-500" />,
        name: "Settings",
        path: "/item5",
        itens: []
    },
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
        <aside className="w-[250px] px-3">
            <div className="fixed w-[250px] h-[calc(100%-50px)] py-[1.5rem] border-r border-zinc-800 overflow-auto">
                <ul className="text-[#878787]">
                    {contentMenu && contentMenu.length > 0 &&
                        <>
                            {contentMenu.map((menu: INavbar, index) => (
                                <SubNav props={menu} key={index} />
                            ))}
                        </>
                    }
                </ul>
            </div>
        </aside>
    );
};