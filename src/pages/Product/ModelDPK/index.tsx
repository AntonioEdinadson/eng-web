import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Alert } from "../../../components/Alert";
import { ModalDelete } from "../../../components/Modal/Delete";
import { ModalUpInsertModelDPK } from "../../../components/Modal/UpInsertModelDPK";
import { useModelDPK, useSDCard } from "../../../hooks/useAPI";
import { INotify } from "../../../interfaces/INotify";
import { IModelDPK, ISDCard } from "../../../interfaces/IProduct";

export const ModelDPK = () => {

    const [modeldpkData, setModeldpkData] = useState<IModelDPK[] | null>(null);
    const [modeldpk, setModeldpk] = useState<IModelDPK | null>(null);

    const [notify, setNotify] = useState<INotify>();

    const [modalDelete, setModalDelete] = useState<Boolean>();
    const [modalUpInsert, setModalUpInsert] = useState<Boolean>();

    useEffect(() => {
        getModeldpk();
    }, []);

    const getModeldpk = async () => {
        try {
            const data = await useModelDPK.GetAllSModelDPK();
            setModeldpkData(data.key);
        } catch (error) {
            console.log(error);
        }
    };

    const searchModelDPK = async (search: string) => {
        try {
            const request = await useModelDPK.GetModelDPK(search);
            setModeldpkData(request.key);
        } catch (error) {
            console.log(error);
        }
    };

    const createModelDPK = async (e: IModelDPK) => {
        try {

            const request = await useModelDPK.CreateModelDPK(e);

            if (!request.key.id) {
                SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: 'ModelDPK was successfully creating!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getModeldpk();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const updateModelDPK = async (e: IModelDPK) => {
        try {

            const request = await useModelDPK.UpdateModelDPK(e);

            if (!request.key.id) {
                SendNotification({ message: 'There was an error update!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: ' ModelDPK successfully update!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getModeldpk();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error update!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const deleteModelDPK = async () => {
        try {

            if (!modeldpk?.id) {
                SendNotification({ message: 'ID not found', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            const request = await useModelDPK.DeleteModelDPK(modeldpk.id);

            if (!request.key.id) {
                SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            SendNotification({ message: 'ModelDPK was successfully deleted!', type: 'SUCCESS', status: true });
            setModalDelete(false);
            getModeldpk();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
            setModalDelete(false);
        }
    };

    const onSubmit = async (e: any) => {

        if (!modeldpk?.id) {
            createModelDPK(e);
            return;
        }
        updateModelDPK(e);
    };

    const SendNotification = async (notify: INotify) => {
        setNotify({ message: notify.message, status: notify.status, type: notify.type });
        setTimeout(() => setNotify({ message: notify.message, status: false, type: notify.type }), 3500);
    }

    return (
        <div className="w-full h-[calc(100vh-60px)] mx-auto px-[2rem] py-6">
            <div className={`w-full fixed top-[4rem] flex justify-end pr-4`}>
                <Alert type={notify?.type} message={notify?.message} status={notify?.status} />
            </div>            
            <div className="w-full h-5rem flex justify-between items-center">
                <div className="text-[#bebebe]">
                    <h1 className="font-medium text-[1.5rem]">ModelDPK</h1>
                    <h2>This page is used to do all the DPK configuration part of the product.</h2>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="bg-zinc-800 flex gap-2 items-center rounded-2xl px-2">
                        <RiSearchLine className="text-[#bebebe]" />
                        <input
                            onChange={(e) => searchModelDPK(e.target.value)}
                            type="text"
                            className="w-[300px] bg-transparent outline-none px-1 py-[.3rem] rounded-2xl text-[#bebebe]"
                            placeholder="pesquisar" />
                    </div>
                    <PlusCircleIcon
                        className="w-10 text-[#3B82F6] hover:scale-110 cursor-pointer"
                        onClick={() => { setModeldpk(null); setModalUpInsert(!modalUpInsert) }} />
                </div>
            </div>
            <section className="relative w-full h-[calc(90%-5rem)] mt-[2rem] py-2 overflow-auto">
                <div className="overflow-x-auto relative">
                    {modeldpkData && modeldpkData.length > 0
                        ?
                        <table className="min-w-[1366px] w-full text-sm text-left text-[#bebebe]">
                            <thead className="text-xs text-[#3B82F6] uppercase ">
                                <tr className="">
                                    <th className="py-3">#</th>
                                    <th className="py-3">Model</th>
                                    <th className="py-3">PartNumber</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {modeldpkData.map((key: IModelDPK, index: number) => (
                                    <tr className="" key={index}>
                                        <td className="py-4">{key?.id}</td>
                                        <td className="py-4">{key.modelo}</td>
                                        <td className="py-4">{key.partnumber}</td>
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
                                                onClick={() => { setModeldpk(key); setModalUpInsert(!modalUpInsert) }} />
                                            <TrashIcon
                                                className="w-5 hover:scale-110 cursor-pointer text-[#db021f]"
                                                onClick={() => { setModeldpk(key); setModalDelete(!modalDelete) }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        <div>
                            <span className="text-white">D000</span>
                        </div>
                    }
                </div>
            </section>
            {modalDelete &&
                <ModalDelete
                    isOpen={() => setModalDelete(!modalDelete)}
                    execute={deleteModelDPK}
                    model={modeldpk}
                    title={"ModelDPK"} />
            }
            {modalUpInsert &&
                <ModalUpInsertModelDPK
                    isOpen={() => setModalUpInsert(!modalUpInsert)}
                    execute={(e) => onSubmit(e)}
                    dpk={modeldpk} />
            }
        </div>
    );
};