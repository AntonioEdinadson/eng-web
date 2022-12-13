import { Controller, useForm } from "react-hook-form";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { ISMBios, IWindowsVersion } from "../../../interfaces/IProduct";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { ISelect } from "../../../interfaces/ILineConfig";

import Select from 'react-select';

interface UpInsertComponentSmbios {
    isOpen: () => void;
    execute: (data?: ISMBios) => Promise<ISMBios | void>
    smbios: ISMBios | null;
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

export const ModalUpInsertModal = ({ isOpen, execute, smbios }: UpInsertComponentSmbios) => {

    const { register, handleSubmit, control, formState: { errors } } = useForm<ISMBios>();
    const [status, setStatus] = useState<ISelect[]>([]);

    useEffect(() => {        
        setStatus([{ label: "ENABLE", value: 1 }, { label: "DISABLE", value: 0 }]);
    }, []);

    return (
        <div className="">
            <div className="fixed bg-black bg-opacity-50 inset-0"></div>
            <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel">
                <div className="relative w-[30%] bg-zinc-800 rounded-lg p-[1rem] flex flex-col gap-4">
                    <div className="text-[#bebebe] mt-[2rem]">
                        <span className="block text-[1.2rem] font-medium">{smbios ? "Edit SMBIOS" : "Create SMBIOS"}</span>
                        <span className="block text-[1rem]">Remembering that this action is irreversible</span>
                    </div>
                    <section className="p-3">
                        <form id="form" method="post" onSubmit={handleSubmit(execute)}>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2 hidden">
                                    <input type="text" {...register('id')} defaultValue={smbios?.id} />
                                </div>

                                <div className="col-span-1">
                                    <span className="block text-zinc-500 pb-1">Model</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('modelo', { required: !smbios?.modelo ? true : false })}
                                            defaultValue={smbios?.modelo}
                                            placeholder="modelo" />
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">SProdutc</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('systemProduct', { required: !smbios?.systemProduct ? true : false })}
                                            defaultValue={smbios?.systemProduct}
                                            placeholder="systemProduct" />
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">SFamily</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('systemFamily', { required: !smbios?.systemFamily ? true : false })}
                                            defaultValue={smbios?.systemFamily}
                                            placeholder="systemFamily" />
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">SVersion</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('systemVersion', { required: !smbios?.systemVersion ? true : false })}
                                            defaultValue={smbios?.systemVersion}
                                            placeholder="systemVersion" />
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">SSkuNumber</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('systemSkuNumber', { required: !smbios?.systemSkuNumber ? true : false })}
                                            defaultValue={smbios?.systemSkuNumber}
                                            placeholder="systemSkuNumber" />
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">BProduct</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('baseboardProduct', { required: !smbios?.baseboardProduct ? true : false })}
                                            defaultValue={smbios?.baseboardProduct}
                                            placeholder="baseboardProduct" />
                                    </div>
                                </div>

                                <div className="col-span-1">
                                    <span className="block text-zinc-500 pb-1">SManufacture</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('systemManufacture', { required: !smbios?.systemManufacture ? true : false })}
                                            defaultValue={smbios?.systemManufacture}
                                            placeholder="systemManufacture" />
                                    </div>
                                </div>

                                <div className="col-span-1">
                                    <span className="block text-zinc-500 pb-1">BManufacture</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('baseboardManufacture', { required: !smbios?.baseboardManufacture ? true : false })}
                                            defaultValue={smbios?.baseboardManufacture}
                                            placeholder="baseboardManufacture" />
                                    </div>
                                </div>

                                <div className="col-span-1">
                                    <span className="block text-zinc-500 pb-1">CManufacture</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('chassisManufacture', { required: !smbios?.chassisManufacture ? true : false })}
                                            defaultValue={smbios?.chassisManufacture}
                                            placeholder="chassisManufacture" />
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">Status</span>
                                    <Controller
                                        name="status"
                                        control={control}
                                        rules={smbios?.status != undefined ? {} : { required: "Status is required." }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                styles={customStylesSelect}
                                                options={status}
                                                value={status.find((e: any) => e.value == value)}
                                                defaultValue={smbios?.status
                                                    ?
                                                    {
                                                        label: smbios ? "ENABLE" : "DISABLE",
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
                                {smbios
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