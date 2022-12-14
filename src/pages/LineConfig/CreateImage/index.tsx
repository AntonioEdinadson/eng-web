import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Alert } from "../../../components/Alert";
import { ModalDelete } from "../../../components/Modal/Delete";
import { useModelImageStatus } from "../../../hooks/useAPI";
import { IImageCreate } from "../../../interfaces/ILineConfig";
import { INotify } from "../../../interfaces/INotify";
import { ModalUpInsertCreateImage } from "../../../components/Modal/UpInsertCreateImage";
import moment from 'moment';
import { Header } from "../../../components/Header";
import { Navbar } from "../../../components/Navbar";

export const CreateImage = () => {

    const [createImageData, setCreateImageData] = useState<IImageCreate[] | null>(null);
    const [createImage, setCreateImage] = useState<IImageCreate | null>(null);

    const [notify, setNotify] = useState<INotify>();

    const [modalDelete, setModalDelete] = useState<Boolean>();
    const [modalUpInsert, setModalUpInsert] = useState<Boolean>();

    useEffect(() => {
        getCreateImage();
    }, []);

    const getCreateImage = async () => {
        try {
            const data = await useModelImageStatus.GetAllModelImageStatus();
            setCreateImageData(data.modelImageStatus);
        } catch (error) {
            console.log(error);
        }
    };

    const searchCreateImage = async (search: string) => {
        try {
            const request = await useModelImageStatus.GetModelImageStatus(search);
            console.log(request);
            setCreateImageData(request.modelImageStatus);
        } catch (error) {
            console.log(error);
        }
    };

    const createLineSetup = async (e: IImageCreate) => {
        try {

            const request = await useModelImageStatus.CreateImageStatus(e);

            if (!request.modelImageStatus.id) {
                SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: 'ModelImageStatus was successfully creating!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getCreateImage();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const updateLineSetup = async (e: IImageCreate) => {
        try {

            const request = await useModelImageStatus.UpdateImageStatus(e);

            if (!request.modelImageStatus.id) {
                SendNotification({ message: 'There was an error update!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: ' ModelImageStatus successfully update!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getCreateImage();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error update!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const deleteLineSetup = async () => {
        try {

            if (!createImage?.id) {
                SendNotification({ message: 'ID not found', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            const request = await useModelImageStatus.DeleteImageStatus(createImage.id);

            if (!request.modelImageStatus.id) {
                SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            SendNotification({ message: 'LineSetup was successfully deleted!', type: 'SUCCESS', status: true });
            setModalDelete(false);
            getCreateImage();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
            setModalDelete(false);
        }
    };

    const onSubmit = async (e: IImageCreate) => {
        if (!createImage?.id) {
            createLineSetup(e);
            return;
        }
        updateLineSetup(e);
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
                                <h1 className="font-medium text-[1.5rem]">Create Image</h1>
                                <h2>This page is used to do all the Line configuration part of the product.</h2>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="bg-zinc-800 flex gap-2 items-center rounded-2xl px-2">
                                    <RiSearchLine className="text-[#bebebe]" />
                                    <input
                                        onChange={(e) => searchCreateImage(e.target.value)}
                                        type="text"
                                        className="w-[300px] bg-transparent outline-none px-1 py-[.3rem] rounded-2xl text-[#bebebe]"
                                        placeholder="pesquisar" />
                                </div>
                                <PlusCircleIcon
                                    className="w-10 text-[#3B82F6] hover:scale-110 cursor-pointer"
                                    onClick={() => { setCreateImage(null); setModalUpInsert(!modalUpInsert) }} />
                            </div>
                        </div>

                        <section className="relative w-full h-[calc(90%-5rem)] mt-[2rem] py-2 overflow-auto">
                            <div className="overflow-x-auto relative">
                                {createImageData && createImageData.length > 0
                                    ?
                                    <table className="min-w-[1366px] w-full text-sm text-left text-[#bebebe]">
                                        <thead className="text-xs text-[#3B82F6] uppercase ">
                                            <tr className="">
                                                <th className="py-3">#</th>
                                                <th className="py-3">OPSystem</th>
                                                <th className="py-3">OPSystemVersion</th>
                                                <th className="py-3">Language</th>
                                                <th className="py-3">BuildVersion</th>
                                                <th className="py-3">Recovery</th>
                                                <th className="py-3">FileName</th>
                                                <th className="py-3">FileDate</th>
                                                <th className="py-3">Observation</th>
                                                <th className="py-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {createImageData.map((key: IImageCreate, index: number) => (
                                                <tr className="" key={index}>
                                                    <td className="py-4">{key?.id}</td>
                                                    <td className="py-4">{key.operationalSystem}</td>
                                                    <td className="py-4">{key.operationalSystemVersion}</td>
                                                    <td className="py-4">{key?.language.toUpperCase()}</td>
                                                    <td className="py-4">{key.buildVersion}</td>
                                                    <td className="py-4">
                                                        {key.recovery == 'S'
                                                            ?
                                                            <span className="w-14 flex justify-center border border-[#00e170] text-[#00e170] py-[.1rem] rounded-lg text-[.7rem] font-bold">ON</span>
                                                            :
                                                            <span className="w-14 flex justify-center border border-[#db021f] text-[#db021f] py-[.1rem] rounded-lg text-[.7rem] font-bold">OFF</span>
                                                        }
                                                    </td>
                                                    <td className="py-4">{key.fileName}</td>
                                                    <td className="py-4">{moment(key.fileDate).format('YYYY-MM-DD h:mm:ss')}</td>
                                                    <td className="py-4">{key.observation}</td>
                                                    <td className="py-4">
                                                        {key.status
                                                            ?
                                                            <span className="w-14 flex justify-center border border-[#00e170] text-[#00e170] py-[.1rem] rounded-lg text-[.7rem] font-bold">ENABLE</span>
                                                            :
                                                            <span className="w-14 flex justify-center border border-[#db021f] text-[#db021f] py-[.1rem] rounded-lg text-[.7rem] font-bold">DISABLE</span>
                                                        }
                                                    </td>
                                                    <td className="w-full py-4 px-1 flex justify-between">
                                                        <PencilSquareIcon
                                                            className="w-5 hover:scale-110 cursor-pointer"
                                                            onClick={() => { setCreateImage(key); setModalUpInsert(!modalUpInsert) }} />
                                                        <TrashIcon
                                                            className="w-5 hover:scale-110 cursor-pointer text-[#db021f]"
                                                            onClick={() => { setCreateImage(key); setModalDelete(!modalDelete) }} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    :
                                    <div>
                                        <span className="text-white">No products found.</span>
                                    </div>
                                }
                            </div>
                        </section>
                        {modalDelete &&
                            <ModalDelete
                                isOpen={() => setModalDelete(!modalDelete)}
                                execute={deleteLineSetup}
                                model={createImage}
                                title={"Create"} />
                        }

                        {modalUpInsert &&
                            <ModalUpInsertCreateImage
                                isOpen={() => setModalUpInsert(!modalUpInsert)}
                                execute={(e: any) => onSubmit(e)}
                                image={createImage} />
                        }
                    </div>
                </main>
            </div>
        </>
    );
};