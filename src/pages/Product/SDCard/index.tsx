import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Alert } from "../../../components/Alert";
import { InfoUser } from "../../../components/InfoUser";
import { ModalDelete } from "../../../components/Modal/Delete";
import { ModalUpInsertSDCard } from "../../../components/Modal/UpInsertSDCard";
import { ModalUpInsertSecureBoot } from "../../../components/Modal/UpInsertSecureBoot";
import { useSDCard, useSecureBoot } from "../../../hooks/useAPI";
import { INotify } from "../../../interfaces/INotify";
import { ISDCard, ISecureBoot } from "../../../interfaces/IProduct";

export const SDCard = () => {

    const [SDCardData, setSDCardData] = useState<ISecureBoot[] | null>(null);
    const [SDCard, setSDCard] = useState<ISecureBoot | null>(null);

    const [notify, setNotify] = useState<INotify>();

    const [modalDelete, setModalDelete] = useState<Boolean>();
    const [modalUpInsert, setModalUpInsert] = useState<Boolean>();

    useEffect(() => {
        getSDCard();
    }, []);

    const getSDCard = async () => {
        try {
            const data = await useSDCard.GetAllSCard();
            setSDCardData(data.sdCard);
        } catch (error) {
            console.log(error);
        }
    };

    const searchSDCard = async (search: string) => {
        try {
            const request = await useSDCard.GetSDCard(search);
            setSDCardData(request.sdCard);
        } catch (error) {
            console.log(error);
        }
    };

    const createSDCard = async (e: ISDCard) => {
        try {

            const request = await useSDCard.CreateSDCard(e);

            if (!request.sdCard.id) {
                SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: 'SDCard was successfully creating!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getSDCard();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const updateSDCard = async (e: ISDCard) => {
        try {

            const request = await useSDCard.UpdateSCard(e);

            if (!request.sdCard.id) {
                SendNotification({ message: 'There was an error update!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: ' SDCard successfully update!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getSDCard();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error update!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const deleteSDCard = async () => {
        try {

            if (!SDCard?.id) {
                SendNotification({ message: 'ID not found', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            const request = await useSDCard.DeleteSCard(SDCard.id);

            if (!request.sdCard.id) {
                SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            SendNotification({ message: 'SDCard was successfully deleted!', type: 'SUCCESS', status: true });
            setModalDelete(false);
            getSDCard();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
            setModalDelete(false);
        }
    };

    const onSubmit = async (e: any) => {

        if (!SDCard?.id) {
            createSDCard(e);
            return;
        }
        updateSDCard(e);
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
                    <h1 className="font-medium text-[1.5rem]">SDCard</h1>
                    <h2>This page is used to do all the SDCard configuration part of the product.</h2>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="bg-zinc-800 flex gap-2 items-center rounded-2xl px-2">
                        <RiSearchLine className="text-[#bebebe]" />
                        <input
                            onChange={(e) => searchSDCard(e.target.value)}
                            type="text"
                            className="w-[300px] bg-transparent outline-none px-1 py-[.3rem] rounded-2xl text-[#bebebe]"
                            placeholder="pesquisar" />
                    </div>
                    <PlusCircleIcon
                        className="w-10 text-[#3B82F6] hover:scale-110 cursor-pointer"
                        onClick={() => { setSDCard(null); setModalUpInsert(!modalUpInsert) }} />
                </div>
            </div>
            <section className="relative w-full h-[calc(80%-5rem)] mt-[2rem] py-2 overflow-auto">
                <div className="overflow-x-auto relative">
                    {SDCardData && SDCardData.length > 0
                        ?
                        <table className="min-w-[1366px] w-full text-sm text-left text-[#bebebe]">
                            <thead className="text-xs text-[#3B82F6] uppercase ">
                                <tr className="">
                                    <th className="py-3">#</th>
                                    <th className="py-3">Model</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {SDCardData.map((secure: ISecureBoot, index: number) => (
                                    <tr className="" key={index}>
                                        <td className="py-4">{secure?.id}</td>
                                        <td className="py-4">{secure.modelo}</td>
                                        <td className="py-4">
                                            {secure.status
                                                ?
                                                <span className="w-14 flex justify-center border border-[#00e170] text-[#00e170] py-[.1rem] rounded-lg text-[.7rem] font-bold">ENABLE</span>
                                                :
                                                <span className="w-14 flex justify-center border border-[#db021f] text-[#db021f] py-[.1rem] rounded-lg text-[.7rem] font-bold">DISABLE</span>
                                            }
                                        </td>
                                        <td className="w-full py-4 px-1 flex justify-between">
                                            <PencilSquareIcon
                                                className="w-5 hover:scale-110 cursor-pointer"
                                                onClick={() => { setSDCard(secure); setModalUpInsert(!modalUpInsert) }} />
                                            <TrashIcon
                                                className="w-5 hover:scale-110 cursor-pointer text-[#db021f]"
                                                onClick={() => { setSDCard(secure); setModalDelete(!modalDelete) }} />
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
                    execute={deleteSDCard}
                    model={SDCard}
                    title={"SDCard"} />
            }
            {modalUpInsert &&
                <ModalUpInsertSDCard
                    isOpen={() => setModalUpInsert(!modalUpInsert)}
                    execute={(e) => onSubmit(e)}
                    sdcard={SDCard} />
            }
        </div>
    );
};