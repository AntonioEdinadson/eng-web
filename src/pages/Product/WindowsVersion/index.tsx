import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Alert } from "../../../components/Alert";
import { InfoUser } from "../../../components/InfoUser";
import { ModalDelete } from "../../../components/Modal/Delete";
import { ModalUpInsertModal } from "../../../components/Modal/UpInsertSmbios";
import { ModalUpInsertWindowsVersion } from "../../../components/Modal/UpInsertWindowsVersion";
import { useWindowsVersion } from "../../../hooks/useAPI";
import { INotify } from "../../../interfaces/INotify";
import { ISMBios, IWindowsVersion } from "../../../interfaces/IProduct";

export const WindowsVersion = () => {

    const [windowsVersionData, setWindowsVersionData] = useState<IWindowsVersion[] | null>(null);
    const [windowsVersion, setWindowsVersion] = useState<IWindowsVersion | null>(null);

    const [modalDelete, setModalDelete] = useState<Boolean>();
    const [modalUpInsert, setModalUpInsert] = useState<Boolean>();

    const [notify, setNotify] = useState<INotify>();

    useEffect(() => {
        getWindowsVersion();
    }, []);

    const getWindowsVersion = async () => {
        try {
            const data = await useWindowsVersion.GetAllWindowsVersion();
            setWindowsVersionData(data.versionWindows);
        } catch (error) {
            console.log(error);
        }
    };

    const searchWindowsVersion = async (search: string) => {
        try {

            const request = await useWindowsVersion.GetWindowsVersion(search);
            setWindowsVersionData(request.versionWindows);

        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (e?: IWindowsVersion) => { };

    const deleteWindowsVersion = async () => {
        alert(windowsVersion?.modelo);
    };

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
                    <h1 className="font-medium text-[1.5rem]">Windows Version</h1>
                    <h2>This page is used to do all the Windows Version configuration part of the product.</h2>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="bg-zinc-800 flex gap-2 items-center rounded-2xl px-2">
                        <RiSearchLine className="text-[#bebebe]" />
                        <input
                            onChange={(e) => searchWindowsVersion(e.target.value)}
                            type="text"
                            className="w-[300px] bg-transparent outline-none px-1 py-[.3rem] rounded-2xl text-[#bebebe]"
                            placeholder="pesquisar" />
                    </div>
                    <PlusCircleIcon className="w-10 text-[#3B82F6] hover:scale-110 cursor-pointer" onClick={() => { setWindowsVersion(null); setModalUpInsert(!modalUpInsert) }} />
                </div>
            </div>
            <section className="relative w-full h-[calc(80%-5rem)] mt-[2rem] py-2 overflow-auto">
                <div className="overflow-x-auto relative">
                    {windowsVersionData && windowsVersionData.length > 0
                        ?
                        <table className="min-w-[1366px] w-full text-sm text-left text-[#bebebe]">
                            <thead className="text-xs text-[#3B82F6] uppercase ">
                                <tr className="">
                                    <th className="py-3">#</th>
                                    <th className="py-3">Model</th>
                                    <th className="py-3">SVersion</th>
                                    <th className="py-3">Version</th>
                                    <th className="py-3">Csup</th>
                                    <th className="py-3">NPartitionsDisk</th>
                                    <th className="py-3">Windows</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {windowsVersionData.map((version: IWindowsVersion, index: number) => (
                                    <tr className="" key={index}>
                                        <td className="py-4">{version?.id}</td>
                                        <td className="py-4">{version.modelo}</td>
                                        <td className="py-4">{version.systemVersion}</td>
                                        <td className="py-4">{version.version}</td>
                                        <td className="py-4">{version.csup}</td>
                                        <td className="py-4">{version.numberPartitionsDisk}</td>
                                        <td className="py-4">{version.windows}</td>
                                        <td className="py-4">
                                            {version.status
                                                ?
                                                <span className="w-14 flex justify-center border border-[#00e170] text-[#00e170] py-[.1rem] rounded-lg text-[.7rem] font-bold">ENABLE</span>
                                                :
                                                <span className="w-14 flex justify-center border border-[#db021f] text-[#db021f] py-[.1rem] rounded-lg text-[.7rem] font-bold">DISABLE</span>
                                            }
                                        </td>
                                        <td className="w-full py-4 px-1 flex justify-between">
                                            <PencilSquareIcon
                                                className="w-5 hover:scale-110 cursor-pointer"
                                                onClick={() => { setWindowsVersion(version); setModalUpInsert(!modalUpInsert) }}
                                            />
                                            <TrashIcon
                                                className="w-5 hover:scale-110 cursor-pointer text-[#db021f]"
                                                onClick={() => { setWindowsVersion(version); setModalDelete(!modalDelete) }}
                                            />
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
                    execute={deleteWindowsVersion}
                    model={windowsVersion} />
            }
            {modalUpInsert &&
                <ModalUpInsertWindowsVersion
                    isOpen={() => setModalUpInsert(!modalUpInsert)}
                    execute={(e) => onSubmit(e)}
                    windows={windowsVersion} />
            }
        </div>
    );
};