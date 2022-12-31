import {
    PencilSquareIcon,
    PlusCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";

import { RiSearchLine } from "react-icons/ri";
import { useSmbios, useSystemInfo } from "../../../hooks/useAPI";
import { useEffect, useState } from "react";

import { ISMBios } from "../../../interfaces/IProduct";
import { INotify } from "../../../interfaces/INotify";
import { Alert } from "../../../components/Alert";
import { ModalDelete } from "../../../components/Modal/Delete";
import { ModalUpInsertModal } from "../../../components/Modal/UpInsertSmbios";
import { Header } from "../../../components/Header";
import { Navbar } from "../../../components/Navbar";

export const SystemInfo = () => {

    const [smbiosData, setDataSmbios] = useState<ISMBios[] | null>(null);
    const [smbios, setSmbios] = useState<ISMBios | null>(null);

    const [modalDelete, setModalDelete] = useState<Boolean>();
    const [modalUpInsert, setModalUpInsert] = useState<Boolean>();

    const [notify, setNotify] = useState<INotify>();

    useEffect(() => {
        getSmbios();
    }, []);

    const getSmbios = async () => {
        try {
            const response = await useSystemInfo.GetAllSystemInfo();
            setDataSmbios(response.smbios);
        } catch (error) {
            console.log(error);
        }
    };

    const searchSmbios = async (search: string) => {
        try {
            const request = await useSystemInfo.GetSystemInfo(search);
            setDataSmbios(request.smbios);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (e: any) => {
        if (!smbios?.id) {
            createSmbios(e);
            return;
        }
        updateSmbios(e);
    };

    const createSmbios = async (e: ISMBios) => {
        try {

            console.log(e);


            const request = await useSmbios.CreateSMbios(e);

            if (!request.smbios.id) {
                SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: 'SMBIOS was successfully creating!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getSmbios();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const updateSmbios = async (e: ISMBios) => {
        try {

            const request = await useSmbios.UpdateSmbios(e);

            if (!request.smbios.id) {
                SendNotification({ message: 'There was an error update!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: 'SMBIOS was successfully update!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getSmbios();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error update!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const deleteSmbios = async () => {
        try {

            if (!smbios?.id) {
                SendNotification({ message: 'ID not found', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            const request = await useSmbios.DeleteSmbios(smbios.id);

            if (!request.smbios.id) {
                SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            SendNotification({ message: 'SMBIOS was successfully deleted!', type: 'SUCCESS', status: true });
            setModalDelete(false);
            getSmbios();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
            setModalDelete(false);
        }
    };

    const SendNotification = async (notify: INotify) => {
        setNotify({ message: notify.message, status: notify.status, type: notify.type });
        setTimeout(() => setNotify({ message: notify.message, status: false, type: notify.type }), 3500);
    }

    return (
        <>
            <Header />
            <div className='flex'>
                <nav className='w-[250px]'>
                    <Navbar />
                </nav>
                <main className="w-[calc(100%-250px)]">
                    <div className="w-full h-[calc(100vh-60px)] mx-auto px-[2rem] py-6">
                        <div className={`w-full fixed top-[4rem] flex justify-end pr-4`}>
                            <Alert type={notify?.type} message={notify?.message} status={notify?.status} />
                        </div>
                        <div className="w-full h-5rem flex justify-between items-center">
                            <div className="text-[#bebebe]">
                                <h1 className="font-medium text-[1.5rem]">SystemInfo Product</h1>
                                <h2>This page is used to do all the SMBios configuration part of the product.</h2>
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
                                <PlusCircleIcon className="w-10 text-[#3B82F6] hover:scale-110 cursor-pointer" onClick={() => { setSmbios(null); setModalUpInsert(!modalUpInsert) }} />
                            </div>
                        </div>
                        <section className="relative w-full h-[calc(90%-5rem)] mt-[2rem] py-2 overflow-auto">
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
                                                    <td className="py-4">{smbios?.id}</td>
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
                                                            <span className="w-14 flex justify-center border border-[#00e170] text-[#00e170] py-[.1rem] rounded-lg text-[.7rem] font-bold">ENABLE</span>
                                                            :
                                                            <span className="w-14 flex justify-center border border-[#db021f] text-[#db021f] py-[.1rem] rounded-lg text-[.7rem] font-bold">DISABLE</span>
                                                        }
                                                    </td>
                                                    <td className="w-full py-4 px-1 flex justify-between">
                                                        <PencilSquareIcon onClick={() => { setSmbios(smbios); setModalUpInsert(true) }} className="w-5 hover:scale-110 cursor-pointer" />
                                                        <TrashIcon onClick={() => { setSmbios(smbios), setModalDelete(true) }} className="w-5 hover:scale-110 cursor-pointer text-[#db021f]" />
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
                        </section>
                        {modalDelete &&
                            <ModalDelete
                                isOpen={() => setModalDelete(!modalDelete)}
                                execute={deleteSmbios}
                                model={smbios}
                                title="SMbios" />
                        }
                        {modalUpInsert &&
                            <ModalUpInsertModal
                                isOpen={() => setModalUpInsert(!modalUpInsert)}
                                execute={(e) => onSubmit(e)}
                                smbios={smbios} />
                        }
                    </div>
                </main>
            </div>
        </>
    );
};
