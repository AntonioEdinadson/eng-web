import { XMarkIcon } from "@heroicons/react/24/solid";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useModelImage, useModelImageStatus, useSystemInfo } from "../../../hooks/useAPI";
import { IAssociateImage, IImageCreate, ISelect } from "../../../interfaces/ILineConfig";
import Select from 'react-select';
import { ISystemInfo } from "../../../interfaces/IProduct";

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

interface UpInsertImage {
    isOpen: () => void;
    execute: (data?: IAssociateImage) => Promise<IAssociateImage | void>
    image: IAssociateImage | null;
}

export const ModalUpInsertImage = (props: UpInsertImage) => {

    const { register, handleSubmit, control, formState: { errors } } = useForm<IAssociateImage>();
    const [createImageData, setCreateImageData] = useState<ISelect[] | null>(null);
    const [systemInfo, setSystemInfo] = useState<ISelect[] | null>(null);

    const getImageStatus = async () => {
        try {
            const data = await useModelImageStatus.GetAllModelImageStatus();
            const newData = data.modelImageStatus.map((item: IImageCreate) => {
                return {
                    label: item.fileName,
                    value: item.id
                }
            });

            setCreateImageData(newData);
        } catch (error) {
            console.log(error);
        }
    };

    const getSystemInfo = async () => {
        try {

            const data = await useSystemInfo.GetAllSystemInfo();
            const newData = data.systemInfo.map((item: ISystemInfo) => {
                return {
                    label: `${item.modelo} ${item.systemVersion}`,
                    value: item.id,
                    version: item.systemVersion
                }
            });

            setSystemInfo(newData);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getImageStatus();
        getSystemInfo();
    }, []);

    return (
        <div className="">
            <div className="fixed bg-black bg-opacity-50 inset-0"></div>
            <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel">
                <div className="relative w-[30%] bg-zinc-800 rounded-lg p-[1rem] flex flex-col gap-4">
                    <div className="w-full text-[#bebebe] mt-[2rem]">
                        <span className="block text-[1.2rem] font-medium">{props.image ? "Edit image" : "Create Associate"}</span>
                        <span className="block text-[1rem]">Remembering that this action is irreversible</span>
                    </div>
                    <section className="p-3">
                        <form id="form" method="post" onSubmit={handleSubmit(props.execute)} encType="multipart/form-data">
                            <div className="grid grid-cols-4 gap-3">

                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2 hidden">
                                    <input type="text" {...register('id')} defaultValue={props.image?.id} />
                                </div>

                                <div className="col-span-4">
                                    <span className="block text-zinc-500 pb-1">Image</span>
                                    <Controller
                                        name="modeloImageStatus"
                                        control={control}
                                        rules={props.image?.modeloImageStatus ? {} : { required: "Image is required." }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                styles={customStylesSelect}
                                                options={createImageData ? createImageData : []}
                                                value={createImageData?.find((e: any) => e.value == value)}
                                                defaultValue={props.image?.modeloImageStatus
                                                    ?
                                                    {
                                                        label: props.image.modeloImageStatus.fileName,
                                                        value: props.image.modeloImageStatus.id
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
                                        name="modeloImageStatus"
                                        render={({ message }) => <p className="text-red-400 text-[.8rem] py-1">{message}</p>}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <span className="block text-zinc-500 pb-1">Modelo</span>
                                    <Controller
                                        name="modelo"
                                        control={control}
                                        rules={props.image?.modelo ? {} : { required: "Modelo is required." }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                styles={customStylesSelect}
                                                options={systemInfo ? systemInfo : []}
                                                value={systemInfo?.find((e: any) => e.value == value)}
                                                defaultValue={props.image?.modelo
                                                    ?
                                                    {
                                                        label: `${props.image.modelo} ${props.image.systemVersion}`,
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

                                <div className="col-span-2">
                                    <span className="block text-zinc-500 pb-1">Directory</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('directory', { required: "Directory is required." })}
                                            defaultValue={props.image?.directory && props.image?.directory}
                                            placeholder="Directory"
                                        />
                                    </div>
                                    {errors.directory && <p className="text-red-400 text-[.8rem] py-1">{errors.directory.message}</p>}
                                </div>

                            </div>
                            <div className="w-full flex justify-end items-center gap-2 text-[#bebebe] mt-6">
                                {props.image
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

                    <div className="absolute w-6 h-6 flex justify-center items-center bg-zinc-900 top-3 right-3 rounded-full p-1 cursor-pointer hover:bg-red-500" onClick={props.isOpen}>
                        <XMarkIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};