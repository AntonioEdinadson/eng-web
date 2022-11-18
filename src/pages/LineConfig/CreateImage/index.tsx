import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Alert } from "../../../components/Alert";
import { ModalDelete } from "../../../components/Modal/Delete";
import { ModalUpInsertLineSetup } from "../../../components/Modal/UpInsertLineSetup";
import { useLineSetup } from "../../../hooks/useAPI";
import { IImageCreate, ILineSetup } from "../../../interfaces/ILineConfig";
import { INotify } from "../../../interfaces/INotify";
import { ModalUpInsertCreateImage } from "../../../components/Modal/UpInsertCreateImage";

export const CreateImage = () => {

    const [createImageData, setCreateImageData] = useState<IImageCreate[] | null>(null);
    const [createImage, setCreateImage] = useState<IImageCreate | null>(null);

    const [notify, setNotify] = useState<INotify>();

    const [modalDelete, setModalDelete] = useState<Boolean>();
    const [modalUpInsert, setModalUpInsert] = useState<Boolean>();

    useEffect(() => {
        getLineSetup();
    }, []);

    const getLineSetup = async () => {
        try {
            const data = await useLineSetup.GetAllLineSetup();
            setCreateImageData(data.linesetup);
        } catch (error) {
            console.log(error);
        }
    };

    const searchLineSetup = async (search: string) => {
        try {
            const request = await useLineSetup.GetLineSetup(search);
            setCreateImageData(request.linesetup);
        } catch (error) {
            console.log(error);
        }
    };

    const createLineSetup = async (e: ILineSetup) => {
        try {

            const request = await useLineSetup.CreateLineSetup(e);

            if (!request.linesetup.id) {
                SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: 'LineSetup was successfully creating!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getLineSetup();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const updateLineSetup = async (e: ILineSetup) => {
        try {

            console.log(e);


            const request = await useLineSetup.UpdateLineSetup(e);

            if (!request.linesetup.id) {
                SendNotification({ message: 'There was an error update!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: ' LineSetup successfully update!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getLineSetup();

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

            const request = await useLineSetup.DeleteLineSetup(createImage.id);

            if (!request.linesetup.id) {
                SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            SendNotification({ message: 'LineSetup was successfully deleted!', type: 'SUCCESS', status: true });
            setModalDelete(false);
            getLineSetup();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
            setModalDelete(false);
        }
    };

    const onSubmit = async (e: any) => {

        console.log(e);        

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
                            onChange={(e) => searchLineSetup(e.target.value)}
                            type="text"
                            className="w-[300px] bg-transparent outline-none px-1 py-[.3rem] rounded-2xl text-[#bebebe]"
                            placeholder="pesquisar" />
                    </div>
                    <PlusCircleIcon
                        className="w-10 text-[#3B82F6] hover:scale-110 cursor-pointer"
                        onClick={() => ""} />
                </div>
            </div>

            {modalDelete &&
                <ModalDelete
                    isOpen={() => setModalDelete(!modalDelete)}
                    execute={deleteLineSetup}
                    model={createImage}
                    title={"Create"} />
            }

            <ModalUpInsertCreateImage
                isOpen={() => setModalUpInsert(!modalUpInsert)}
                execute={(e) => onSubmit(e)}
                image={createImage} />
        </div>
    );
};