import {
    PencilSquareIcon,
    PlusCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";

import { RiSearchLine } from "react-icons/ri";
import { useModelDPKConfig } from "../../../hooks/useAPI";
import { useEffect, useState } from "react";

import { IModelDPKConfig } from "../../../interfaces/IProduct";
import { INotify } from "../../../interfaces/INotify";
import { Alert } from "../../../components/Alert";
import { ModalDelete } from "../../../components/Modal/Delete";
import { ModalUpInsertModelDPKConfig } from "../../../components/Modal/UpInsertModelDPKConfig";


export const ModelDPKConfig = () => {

    const [modelDpkConfigData, setModelConfigDpkData] = useState<IModelDPKConfig[] | null>(null);
    const [modelDPKConfig, setModelDPKConfig] = useState<IModelDPKConfig | null>(null);

    const [modalDelete, setModalDelete] = useState<Boolean>();
    const [modalUpInsert, setModalUpInsert] = useState<Boolean>();

    const [notify, setNotify] = useState<INotify>();

    useEffect(() => {
        getKeyconfig();
    }, []);

    const getKeyconfig = async () => {
        try {
            const response = await useModelDPKConfig.GetAllSModelDPKConfig();
            setModelConfigDpkData(response.keyConfig);
        } catch (error) {
            console.log(error);
        }
    };

    const searchKeyConfig = async (search: string) => {
        try {
            const request = await useModelDPKConfig.GetModelDPKConfig(search);
            setModelConfigDpkData(request.keyConfig);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (e: any) => {
        if (!modelDPKConfig?.id) {
            createKeyConfig(e);
            return;
        }
        updateKeyConfig(e);
    };

    const createKeyConfig = async (e: IModelDPKConfig) => {
        try {

            const request = await useModelDPKConfig.CreateModelDPKConfig(e);

            if (!request.keyConfig.id) {
                SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: 'ModelKeyConfig was successfully creating!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getKeyconfig();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error creating!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const updateKeyConfig = async (e: IModelDPKConfig) => {
        try {

            const request = await useModelDPKConfig.UpdateModelDPKConfig(e);

            if (!request.keyConfig.id) {
                SendNotification({ message: 'There was an error update!', type: 'ERROR', status: true });
                setModalUpInsert(false);
                return;
            }

            SendNotification({ message: 'ModelKeyConfig was successfully update!', type: 'SUCCESS', status: true });
            setModalUpInsert(false);
            getKeyconfig();

        } catch (error) {
            console.log(error);
            SendNotification({ message: 'There was an error update!', type: 'ERROR', status: true });
            setModalUpInsert(false);
        }
    };

    const deleteKeyConfig = async () => {
        try {

            if (!modelDPKConfig?.id) {
                SendNotification({ message: 'ID not found', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            const request = await useModelDPKConfig.DeleteModelDPKConfig(modelDPKConfig.id);

            if (!request.keyConfig.id) {
                SendNotification({ message: 'There was an error deleting!', type: 'ERROR', status: true });
                setModalDelete(false);
                return;
            }

            SendNotification({ message: 'ModelKeyConfig was successfully deleted!', type: 'SUCCESS', status: true });
            setModalDelete(false);
            getKeyconfig();

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
        <div className="w-full h-[calc(100vh-60px)] mx-auto px-[2rem] py-6">
            <div className={`w-full fixed top-[4rem] flex justify-end pr-4`}>
                <Alert type={notify?.type} message={notify?.message} status={notify?.status} />
            </div>            
            <div className="w-full h-5rem flex justify-between items-center">
                <div className="text-[#bebebe]">
                    <h1 className="font-medium text-[1.5rem]">SMBios Product</h1>
                    <h2>This page is used to do all the SMBios configuration part of the product.</h2>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="bg-zinc-800 flex gap-2 items-center rounded-2xl px-2">
                        <RiSearchLine className="text-[#bebebe]" />
                        <input
                            onChange={(e) => searchKeyConfig(e.target.value)}
                            type="text"
                            className="w-[300px] bg-transparent outline-none px-1 py-[.3rem] rounded-2xl text-[#bebebe]"
                            placeholder="pesquisar" />
                    </div>
                    <PlusCircleIcon className="w-10 text-[#3B82F6] hover:scale-110 cursor-pointer" onClick={() => { setModelDPKConfig(null); setModalUpInsert(!modalUpInsert) }} />
                </div>
            </div>
            <section className="relative w-full h-[calc(90%-5rem)] mt-[2rem] py-2 overflow-auto">
                <div className="overflow-x-auto relative">
                    {modelDpkConfigData && modelDpkConfigData.length > 0
                        ?
                        <table className="min-w-[1366px] w-full text-sm text-left text-[#bebebe]">
                            <thead className="text-xs text-[#3B82F6] uppercase ">
                                <tr className="">
                                    <th className="py-3">#</th>
                                    <th className="py-3">ZPC_MODEL_SKU</th>
                                    <th className="py-3">ZFRM_FATOR_CL1</th>
                                    <th className="py-3">ZFRM_FATOR_CL2</th>
                                    <th className="py-3">ZSCREEN_SIZE</th>
                                    <th className="py-3">ZTOUCH_SCREEN</th>
                                    <th className="py-3">BUSINESSID</th>
                                    <th className="py-3">ZPGM_ELIG_VAL</th>
                                    <th className="py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {modelDpkConfigData.map((keyConfig: IModelDPKConfig, index: number) => (
                                    <tr className="" key={index}>
                                        <td className="py-4">{keyConfig?.id}</td>
                                        <td className="py-4">{keyConfig.ZPC_MODEL_SKU}</td>
                                        <td className="py-4">{keyConfig.ZFRM_FATOR_CL1}</td>
                                        <td className="py-4">{keyConfig.ZFRM_FATOR_CL2}</td>
                                        <td className="py-4">{keyConfig.ZSCREEN_SIZE}</td>
                                        <td className="py-4">{keyConfig.ZTOUCH_SCREEN}</td>
                                        <td className="py-4">{keyConfig.BUSINESSID}</td>
                                        <td className="py-4">{
                                            keyConfig.ZPGM_ELIG_VAL && keyConfig.ZPGM_ELIG_VAL == "|OW20|"
                                            ?
                                            <span className="w-[5rem] flex justify-center border border-[#00e170] text-[#00e170] py-[.1rem] rounded-lg text-[.7rem] font-bold">OFFICE-ON</span>
                                            :
                                            <span className="w-[5rem] flex justify-center border border-[#db021f] text-[#db021f] py-[.1rem] rounded-lg text-[.7rem] font-bold">OFFICE-OFF</span>
                                        }</td>
                                        <td className="w-full py-4 px-1 flex justify-between">
                                            <PencilSquareIcon onClick={() => { setModelDPKConfig(keyConfig); setModalUpInsert(true) }} className="w-5 hover:scale-110 cursor-pointer" />
                                            <TrashIcon onClick={() => { setModelDPKConfig(keyConfig), setModalDelete(true) }} className="w-5 hover:scale-110 cursor-pointer text-[#db021f]" />
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
                    execute={deleteKeyConfig}
                    model={modelDPKConfig}
                    title="ModelDPKConfig" />
            }
            {modalUpInsert &&
                <ModalUpInsertModelDPKConfig
                    isOpen={() => setModalUpInsert(!modalUpInsert)}
                    execute={(e) => onSubmit(e)}
                    dpkConfig={modelDPKConfig} />
            }
        </div>
    );
};
