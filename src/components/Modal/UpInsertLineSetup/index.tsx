import { Controller, useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ILineSetup, ISelect } from "../../../interfaces/ILineConfig";
import { useEffect, useState } from "react";
import { useModelImage } from "../../../hooks/useAPI";
import { IModelImage } from "../../../interfaces/IModelImage";
import Select from 'react-select';
import { ErrorMessage } from "@hookform/error-message";

interface UpInsertComponentLineSetup {
    isOpen: () => void;
    execute: (data?: ILineSetup) => Promise<ILineSetup | void>
    lineSetup: ILineSetup | null;
}

const customStylesSelect = {
    control: (base: any) => ({
        ...base,
        backgroundColor: "#18181B",
        border: 0,
    }),

    placeholder: (provided: any) => ({
        ...provided,
        fontWeight: '500',
    }),

    singleValue: (provided: any) => ({
        ...provided,
        color: '#CCC',
        fontWeight: '500',
    }),

    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: '1px solid #CCC',
        fontWeight: '500',
        color: state.isSelected ? 'white' : '#757575',
        padding: 5,
    }),
}

export const ModalUpInsertLineSetup = ({ isOpen, execute, lineSetup }: UpInsertComponentLineSetup) => {

    const { register, handleSubmit, control, formState: { errors } } = useForm<ILineSetup>();

    const [listModels, setListModel] = useState<ISelect[]>([]);
    const [status, setStatus] = useState<ISelect[]>([]);

    useEffect(() => {
        getListModels();
        setStatus([{ label: "ENABLE", value: 1 }, { label: "DISABLE", value: 0 }]);
    }, []);

    const getListModels = async () => {

        try {

            const listModels = await useModelImage.GetAllModelImage();

            const newData = listModels.modelImage.map((list: ILineSetup) => {

                return {
                    label: list.modelo,
                    value: list.id
                }
            });


            setListModel(newData);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
            <div className="fixed bg-black bg-opacity-50 inset-0"></div>
            <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel">
                <div className="relative w-[30%] bg-zinc-800 rounded-lg p-[1rem] flex flex-col gap-4">
                    <div className="text-[#bebebe] mt-[2rem]">
                        <span className="block text-[1.2rem] font-medium">{lineSetup ? "Edit LineSetup" : "Create LineSetup"}</span>
                        <span className="block text-[1rem]">Remembering that this action is irreversible</span>
                    </div>
                    <section className="p-3">
                        <form id="form" method="post" onSubmit={handleSubmit(execute)}>
                            <div className="grid grid-cols-2 gap-3">

                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2 hidden">
                                    <input type="text" {...register('id')} defaultValue={lineSetup?.id} />
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">Line</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            disabled={lineSetup?.linha ? true : false}
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('linha', { required: !lineSetup?.linha ? true : false })}
                                            defaultValue={lineSetup?.linha}
                                            placeholder={`${lineSetup?.linha ? "" : "Line"}`} />
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">IPServer</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            disabled={lineSetup?.IPServer ? true : false}
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('IPServer', { required: !lineSetup?.IPServer ? true : false })}
                                            defaultValue={lineSetup?.IPServer}
                                            placeholder={`${lineSetup?.IPServer ? "" : "IPServer"}`} />
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">Model</span>
                                    <Controller
                                        name="modelo"
                                        control={control}
                                        rules={lineSetup?.modelo ? {} : { required: "Modelo is required." }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                styles={customStylesSelect}
                                                options={listModels}
                                                value={listModels.find((e: any) => e.value == value)}
                                                defaultValue={lineSetup?.modelo
                                                    ?
                                                    {
                                                        label: lineSetup.modelo,
                                                        value: 0
                                                    }
                                                    :
                                                    {
                                                        label: 'Select',
                                                        value: 0
                                                    }
                                                }
                                                onChange={(e: any) => onChange(e.value)}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="modelo"
                                        render={({ message }) => <p className="text-red-400 text-[.8rem] py-1">{message}</p>}
                                    />
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">Status</span>
                                    <Controller
                                        name="status"
                                        control={control}
                                        rules={lineSetup?.status != undefined ? {} : { required: "Status is required." }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                styles={customStylesSelect}
                                                options={status}
                                                value={listModels.find((e: any) => e.value == value)}
                                                defaultValue={lineSetup?.status
                                                    ?
                                                    {
                                                        label: lineSetup ? "ENABLE" : "DISABLE",
                                                        value: 0
                                                    }
                                                    :
                                                    {
                                                        label: 'DISABLE',
                                                        value: 0
                                                    }
                                                }
                                                onChange={(e: any) => onChange(e.value)}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="status"
                                        render={({ message }) => <p className="text-red-400 text-[.8rem] py-1">{message}</p>}
                                    />
                                </div>

                            </div>

                            <div className="w-full flex justify-end items-center gap-2 text-[#bebebe] mt-6">
                                {lineSetup
                                    ?
                                    <button
                                        className="w-[120px] py-1 px-5 mr-2 mb-2 
                                    border rounded border-[#3B82F6]
                                text-[#3B82F6] hover:scale-105 
                                hover:text-[#bebebe]
                                hover:bg-[#3B82F6]">
                                        Update
                                    </button>
                                    :
                                    <button
                                        className="w-[120px] py-1 px-5 mr-2 mb-2 
                                    border rounded border-[#3B82F6]
                                text-[#3B82F6] hover:scale-105 
                                hover:text-[#bebebe]
                                hover:bg-[#3B82F6]">
                                        Create
                                    </button>
                                }
                            </div>
                        </form>
                    </section>
                    <div className="absolute w-6 h-6 flex justify-center items-center bg-zinc-900 top-3 right-3 rounded-full p-1 cursor-pointer hover:bg-red-500" onClick={isOpen}>
                        <XMarkIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};