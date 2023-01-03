import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

import { Alert } from "../../../components/Alert";
import { Header } from "../../../components/Header";
import { ModalDelete } from "../../../components/Modal/Delete";
import { ModalUpInsertImage } from "../../../components/Modal/UpInsertModelImage";
import { Navbar } from "../../../components/Navbar";
import { useModelImage } from "../../../hooks/useAPI";

import { IAssociateImage } from "../../../interfaces/ILineConfig";
import { INotify } from "../../../interfaces/INotify";

export const AssociateImage = () => {

    const [createImageData, setCreateImageData] = useState<IAssociateImage[] | null>(null);
    const [createImage, setCreateImage] = useState<IAssociateImage | null>(null);

    const [notify, setNotify] = useState<INotify>();

    const [modalDelete, setModalDelete] = useState<Boolean>();
    const [modalUpInsert, setModalUpInsert] = useState<Boolean>();

    useEffect(() => {
        getCreateImage();
    }, []);

    const getCreateImage = async () => {
        try {

            const data = await useModelImage.GetAllModelImage();
            setCreateImageData(data.modelImage);

        } catch (error) {
            console.log(error);
        }
    };

    const searchCreateImage = async (search: string) => {
        try {
            const request = await useModelImage.GetModelImage(search);
            console.log(request);
            setCreateImageData(request.modelImage);
        } catch (error) {
            console.log(error);
        }
    };

    const createAssociate = async (e: IAssociateImage) => {
        try {

            const request = await useModelImage.CreateModelImage(e);

            if (!request.modelImage.id) {
                SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: 'ModelImage was successfully creating!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getCreateImage();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const updateAssociate = async (e: IAssociateImage) => {
        try {

            const request = await useModelImage.UpdateModelImage(e);

            if (!request.modelImage.id) {
                SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: 'ModelImage was successfully updating!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getCreateImage();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const deleteAssociate = async () => {
        try {

            if (!createImage?.id) {
                SendNotification({ message: 'ID not found', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            const request = await useModelImage.DeleteModelImage(createImage.id);

            if (!request.modelImage.id) {
                SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            SendNotification({ message: 'Image was successfully deleted!', type: 'SUCCESS', status: true });
            setModalDelete(false);
            getCreateImage();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
            setModalDelete(false);
        }
    };

    const onSubmit = async (e: IAssociateImage) => {
        if (!createImage?.id) {
            createAssociate(e);
            return;
        }
        updateAssociate(e);
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
                                <h1 className="font-medium text-[1.5rem]">Associate Image</h1>
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
                                                <th className="py-3">IDIMAGE</th>
                                                <th className="py-3">FileName</th>
                                                <th className="py-3">Modelo</th>
                                                <th className="py-3">SystemVersion</th>
                                                <th className="py-3">Directory</th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {createImageData.map((key: IAssociateImage, index: number) => (
                                                <tr className="" key={index}>
                                                    <td className="py-4">{key?.id}</td>
                                                    <td className="py-4">{key?.idImage}</td>
                                                    <td className="py-4">{key.modeloImageStatus.fileName}</td>
                                                    <td className="py-4">{key.modelo}</td>
                                                    <td className="py-4">{key?.systemVersion.toUpperCase()}</td>
                                                    <td className="py-4">{key.directory}</td>
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
                                execute={deleteAssociate}
                                model={createImage}
                                title={"Create"} />
                        }

                        {modalUpInsert &&
                            <ModalUpInsertImage
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