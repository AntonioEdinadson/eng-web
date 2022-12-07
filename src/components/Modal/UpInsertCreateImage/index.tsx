import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

import { XMarkIcon, CloudArrowDownIcon } from "@heroicons/react/24/solid";
import { IImageCreate, ISelect, ISystemOperational } from "../../../interfaces/ILineConfig";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Select from 'react-select';

import { useModelSystemOperational } from "../../../hooks/useAPI";

interface UpInsertComponentCreateImage {
    isOpen: () => void;
    execute: (data?: IImageCreate) => Promise<IImageCreate | void>
    image: IImageCreate | null;
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

export const ModalUpInsertCreateImage = ({ isOpen, execute, image }: UpInsertComponentCreateImage) => {

    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<IImageCreate>();
    const [listSystemOperational, setListSystemOperational] = useState<ISelect[]>([]);

    const [status, setStatus] = useState<ISelect[]>([]);

    const getListSystemOperational = async () => {
        try {

            const data = await useModelSystemOperational.GetAllModelSystemOperational();
            const newData = data.systemOperational.map((list: ISystemOperational) => {

                return {
                    label: list.name,
                    value: list.id,
                    version: list.version
                }
            });

            setListSystemOperational(newData);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setStatus([
            {
                label: 'ENABLE',
                value: 1
            },
            {
                label: 'DISABLE',
                value: 0
            }]);
        getListSystemOperational();
    }, []);

    const handleFiles = (e: any) => {
        setValue('fileName', e.target.files[0].name);
        setValue('fileDate', `${e.target.files[0].lastModifiedDate}`);
    };

    return (
        <div className="">
            <div className="fixed bg-black bg-opacity-50 inset-0"></div>
            <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel">
                <div className="relative w-[30%] bg-zinc-800 rounded-lg p-[1rem] flex flex-col gap-4">
                    <div className="w-full text-[#bebebe] mt-[2rem]">
                        <span className="block text-[1.2rem] font-medium">{image ? "Edit image" : "Create image"}</span>
                        <span className="block text-[1rem]">Remembering that this action is irreversible</span>
                    </div>
                    <section className="p-3">
                        <form id="form" method="post" onSubmit={handleSubmit(execute)} encType="multipart/form-data">
                            <div className="grid grid-cols-3 gap-3">

                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2 hidden">
                                    <input type="text" {...register('id')} defaultValue={image?.id} />
                                </div>

                                <div className="col-span-2">
                                    <span className="block text-zinc-500 pb-1">OperationalSystem</span>
                                    <Controller
                                        name="operationalSystem"
                                        control={control}
                                        rules={image?.operationalSystem ? {} : { required: "OPSystem is required." }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                styles={customStylesSelect}
                                                options={listSystemOperational}
                                                value={listSystemOperational.find((e: any) => e.value == value)}
                                                defaultValue={image?.operationalSystem
                                                    ?
                                                    { label: `${image?.operationalSystem}`, value: 0 }
                                                    :
                                                    { label: 'Select', value: 0 }
                                                }
                                                onChange={(e: any) => onChange(e.value)}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="operationalSystem"
                                        render={({ message }) => <p className="text-red-400 text-[.8rem] py-1">{message}</p>}
                                    />
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">Recovery</span>
                                    <Controller
                                        name="recovery"
                                        control={control}
                                        rules={image?.recovery ? {} : { required: "Recovery is required." }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                styles={customStylesSelect}
                                                options={status}
                                                value={status.find((e: any) => e.value == value)}
                                                defaultValue={image?.recovery
                                                    ?
                                                    {
                                                        label: image.recovery == 'S' ? 'ENABLE' : 'DISABLE',
                                                        value: image.recovery == 'S' ? 1 : 0,
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
                                        name="recovery"
                                        render={({ message }) => <p className="text-red-400 text-[.8rem] py-1">{message}</p>}
                                    />
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">Status</span>
                                    <Controller
                                        name="status"
                                        control={control}
                                        rules={image?.recovery ? {} : { required: "Recovery is required." }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                styles={customStylesSelect}
                                                options={status}
                                                value={status.find((e: any) => e.value == value)}
                                                defaultValue={image?.recovery
                                                    ?
                                                    {
                                                        label: image.status ? 'ENABLE' : 'DISABLE',
                                                        value: image.status ? 1 : 0,
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
                                        name="recovery"
                                        render={({ message }) => <p className="text-red-400 text-[.8rem] py-1">{message}</p>}
                                    />
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">Language</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('language', { required: "Language is required." })}
                                            defaultValue={image?.language && image?.language}
                                            placeholder="Language"
                                        />
                                    </div>
                                    {errors.language && <p className="text-red-400 text-[.8rem] py-1">{errors.language.message}</p>}
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">BuildVersion</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('buildVersion', { required: "BuildVersion is required." })}
                                            defaultValue={image?.buildVersion && image?.buildVersion}
                                            placeholder="BuildVersion"
                                        />
                                    </div>
                                    {errors.buildVersion && <p className="text-red-400 text-[.8rem] py-1">{errors.buildVersion.message}</p>}
                                </div>

                                <div className="col-span-3">
                                    <span className="block text-zinc-500 pb-1">Observation</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            {...register('observation', { required: "Observation is required." })}
                                            defaultValue={image?.observation && image?.observation}
                                            placeholder="Observation"
                                        />
                                    </div>
                                    {errors.observation && <p className="text-red-400 text-[.8rem] py-1">{errors.observation.message}</p>}
                                </div>

                                <div className="col-span-3">
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] overflow-hidden">
                                        <label htmlFor="file" className="w-full flex justify-center items-center cursor-pointer">
                                            <CloudArrowDownIcon className="w-20 hover:scale-125 animate-bounce text-[#3B82F6]" />
                                            <input
                                                type="file"
                                                id="file"
                                                hidden
                                                onChange={(e) => handleFiles(e)}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <span className="block text-zinc-500 pb-1">Image Name</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            disabled
                                            {...register('fileName')}
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            defaultValue={image?.fileName && image.fileName}
                                            placeholder="FileName"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-zinc-500 pb-1">Image Date</span>
                                    <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                        <input type="text"
                                            disabled
                                            {...register('fileDate')}
                                            className="w-full p-[.45rem] outline-none bg-transparent"
                                            defaultValue={image?.fileDate && image.fileDate}
                                            placeholder="FileDate"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="w-full flex justify-end items-center gap-2 text-[#bebebe] mt-6">
                                {image
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

