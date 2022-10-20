import {
    PencilSquareIcon,
    PlusCircleIcon,
    TrashIcon
} from "@heroicons/react/24/solid";
import { RiSearchLine } from "react-icons/ri";

import { useSmbios } from "../../../hooks/useAPI";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { ISMBios } from "../../../interfaces/IProduct";
import { InfoUser } from "../../../components/InfoUser";
import { INotify } from "../../../interfaces/INotify";
import { Alert } from "../../../components/Alert";

export const SMBios = () => {

    const [smbiosData, setDataSmbios] = useState<ISMBios[] | null>(null);
    const [smbios, setSmbios] = useState<ISMBios | null>(null);

    const [notify, setNotify] = useState<INotify>();

    const [modalAdd, setModalAdd] = useState<Boolean>(false);
    const [modalEdit, setModalEdit] = useState<Boolean>(false);
    const [modalDel, setModalDel] = useState<Boolean>(false);

    useEffect(() => {
        getSmbios();
    }, []);

    const getSmbios = async () => {
        try {
            const response = await useSmbios.GetAllSMbios();
            setDataSmbios(response.smbios);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const searchSmbios = async (search: string) => {
        try {
            const request = await useSmbios.GetSMbios(search);
            setDataSmbios(request.smbios);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteSmbios = async (id?: string) => {
        try {

            if (!id) {
                SendNotification({ message: 'ID not found', type: 'ERROR', status: true });
                setModalDel(false);
                return;
            }

            const request = await useSmbios.DeleteSmbios(id);

            if (!request.smbios.id) {
                SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
                setModalDel(false);
                return;
            }

            SendNotification({ message: 'SMBIOS was successfully deleted!', type: 'SUCCESS', status: true });
            setModalDel(false);
            getSmbios();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
            setModalDel(false);
        }
    };

    const SendNotification = async (notify: INotify) => {
        setNotify({ message: notify.message, status: notify.status, type: notify.type });
        setTimeout(() => setNotify({ message: notify.message, status: false, type: notify.type }), 3500);
    }

    return (
        <div className="w-full h-screen mx-auto px-[2rem] py-6">
            <div className={`w-full fixed top-[4rem] flex justify-end pr-4`}>
                <Alert type={notify?.type} message={notify?.message} status={notify?.status} />
            </div>
            <div className="mb-10">
                <InfoUser />
            </div>
            <div className="w-full h-5rem flex justify-between items-center">
                <div className="text-[#bebebe]">
                    <h1 className="font-medium text-[1.5rem]">SMBios Product</h1>
                    <h2>This page is used to do all the DMI configuration part of the product.</h2>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="bg-zinc-800 flex gap-2 items-center rounded-2xl px-2">
                        <RiSearchLine className="text-[#bebebe]" />
                        <input
                            onChange={(e) => searchSmbios(e.target.value)}
                            type="text"
                            className="w-[300px] bg-transparent outline-none px-1 py-[.3rem] rounded-2xl text-[#bebebe]"
                            placeholder="pesquisar" />
                    </div>
                    <PlusCircleIcon className="w-10 text-[#3B82F6] hover:scale-110 cursor-pointer" />
                </div>
            </div>
            <section className="relative w-full h-[calc(80%-5rem)] mt-[2rem] py-2 overflow-auto">
                <div className="overflow-x-auto relative">
                    {smbiosData && smbiosData.length > 0
                        ?
                        <table className="min-w-[1366px] w-full text-sm text-left text-[#bebebe]">
                            <thead className="text-xs text-[#3B82F6] uppercase ">
                                <tr className="">
                                    <th className="py-3">#</th>
                                    <th className="py-3">SProduct</th>
                                    <th className="py-3">SFamily</th>
                                    <th className="py-3">SVersion</th>
                                    <th className="py-3">SSkuNumber</th>
                                    <th className="py-3">BProduct</th>
                                    <th className="py-3">SManufacture</th>
                                    <th className="py-3">BManufacture</th>
                                    <th className="py-3">CManufacture</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {smbiosData.map((smbios: ISMBios, index: number) => (
                                    <tr className="" key={index}>
                                        <td className="py-4">{smbios.id}</td>
                                        <td className="py-4">{smbios.systemProduct}</td>
                                        <td className="py-4">{smbios.systemFamily}</td>
                                        <td className="py-4">{smbios.systemVersion}</td>
                                        <td className="py-4">{smbios.systemSkuNumber}</td>
                                        <td className="py-4">{smbios.baseboardProduct}</td>
                                        <td className="py-4">{smbios.systemManufacture}</td>
                                        <td className="py-4">{smbios.baseboardManufacture}</td>
                                        <td className="py-4">{smbios.chassisManufacture}</td>
                                        <td className="py-4">
                                            {smbios.status
                                                ?
                                                <span className="w-14 flex justify-center border border-[#00e170] text-[#00e170] py-[.1rem] rounded-lg text-[.7rem] font-bold">ACTIVE</span>
                                                :
                                                <span className="w-14 flex justify-center border border-[#db021f] text-[#db021f] py-[.1rem] rounded-lg text-[.7rem] font-bold">INACTIVE</span>
                                            }
                                        </td>
                                        <td className="w-full py-4 px-1 flex justify-between">
                                            <PencilSquareIcon onClick={() => { setSmbios(smbios), setModalEdit(true) }} className="w-5 hover:scale-110 cursor-pointer" />
                                            <TrashIcon onClick={() => { setSmbios(smbios); setModalDel(true) }} className="w-5 hover:scale-110 cursor-pointer text-[#db021f]" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        <div>
                            <span className="text-white">000</span>
                        </div>
                    }
                </div>
                <div className={`${modalDel ? "" : "hidden"}`}>
                    <div className="fixed bg-black bg-opacity-50 inset-0"></div>
                    <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel" onClick={(e: any) => e.target.id == "modalDel" && setModalDel(false)}>
                        <div className="w-[25%] bg-zinc-800 rounded-lg p-[1rem] text-center flex flex-col gap-4">
                            <div className="text-[#bebebe] mt-[2rem]">
                                <span className="block text-[1.2rem] font-medium">Delete SMBIOS {smbios?.systemSkuNumber} {smbios?.systemVersion}</span>
                                <span className="block text-[1rem]">Remembering that this action is irreversible</span>
                            </div>
                            <div className="flex justify-center items-center gap-2 text-[#bebebe] mt-3">
                                <button
                                    className="py-1 px-5 mr-2 mb-2 
                                    border rounded border-[#db021f] 
                                    text-[#db021f] hover:scale-105 
                                    hover:text-[#bebebe]
                                    hover:bg-[#db021f]"
                                    onClick={() => setModalDel(false)}>
                                    No
                                </button>
                                <button
                                    className="py-1 px-5 mr-2 mb-2 
                                    border rounded border-[#3B82F6]
                                     text-[#3B82F6] hover:scale-105 
                                     hover:text-[#bebebe]
                                     hover:bg-[#3B82F6]"
                                    onClick={() => deleteSmbios(smbios?.id)}>
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${modalEdit ? "" : "hidden"}`}>
                    <div className="fixed bg-black bg-opacity-50 inset-0"></div>
                    <div className="fixed inset-0 w-full flex justify-center items-center">
                        <div className="w-[35%] bg-zinc-800 rounded-lg py-[1rem] px-[2rem] text-center flex flex-col gap-4">
                            <div className="text-[#bebebe] mt-[2rem]">
                                <span className="block text-[1.2rem] font-medium">Edit SMBIOS {smbios?.systemSkuNumber} - {smbios?.systemVersion}</span>
                                <span className="block text-[1rem]">Edit any information related to SMBIOS</span>
                                <div className="w-full my-[2rem]">
                                    <form action="" method="post" className="grid grid-cols-2 gap-4">
                                        <div className="w-full bg-zinc-900 flex gap-2 items-center rounded px-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent outline-none px-1 py-[.3rem] text-[#bebebe]"                                                
                                                value={smbios?.systemProduct} />
                                        </div>
                                        <div className="w-full bg-zinc-900 flex gap-2 items-center rounded px-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent outline-none px-1 py-[.3rem] text-[#bebebe]"                                                
                                                value={smbios?.systemFamily} />
                                        </div>
                                        <div className="w-full bg-zinc-900 flex gap-2 items-center rounded px-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent outline-none px-1 py-[.3rem] text-[#bebebe]"                                                
                                                value={smbios?.systemVersion} />
                                        </div>
                                        <div className="w-full bg-zinc-900 flex gap-2 items-center rounded px-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent outline-none px-1 py-[.3rem] text-[#bebebe]"                                                
                                                value={smbios?.systemSkuNumber} />
                                        </div>
                                        <div className="w-full bg-zinc-900 flex gap-2 items-center rounded px-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent outline-none px-1 py-[.3rem] text-[#bebebe]"                                                
                                                value={smbios?.baseboardProduct} />
                                        </div>
                                        <div className="w-full bg-zinc-900 flex gap-2 items-center rounded px-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent outline-none px-1 py-[.3rem] text-[#bebebe]"                                                
                                                value={smbios?.systemManufacture} />
                                        </div>
                                        <div className="w-full bg-zinc-900 flex gap-2 items-center rounded px-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent outline-none px-1 py-[.3rem] text-[#bebebe]"                                                
                                                value={smbios?.baseboardManufacture} />
                                        </div>
                                        <div className="w-full bg-zinc-900 flex gap-2 items-center rounded px-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent outline-none px-1 py-[.3rem] text-[#bebebe]"                                                
                                                value={smbios?.chassisManufacture} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-2 text-[#bebebe] mt-3">
                                <button
                                    className="py-1 px-5 mr-2 mb-2 
                                    border rounded border-[#db021f] 
                                    text-[#db021f] hover:scale-105 
                                    hover:text-[#f3f3f3]
                                    hover:bg-[#db021f]"
                                    onClick={() => setModalEdit(false)}>
                                    No
                                </button>
                                <button
                                    className="py-1 px-5 mr-2 mb-2 
                                    border rounded border-[#3B82F6]
                                     text-[#3B82F6] hover:scale-105 
                                     hover:text-[#fdfdfd]
                                     hover:bg-[#3B82F6]"
                                    onClick={() => ""}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};