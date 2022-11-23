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

    const { register, handleSubmit, control, formState: { errors } } = useForm<IImageCreate>();

    const [listSystemOperational, setListSystemOperational] = useState<ISelect[]>([]);
    const [systemOperational, setSystemOperational] = useState<ISelect | null>(null);
    const [listVersionOperational, setListVersionOperational] = useState<ISelect[]>([]);

    useEffect(() => {
        getListSystemOperational();
    }, []);

    useEffect(() => {
        setListVersionOperational([]);
        handleVersionOperational();
    }, [systemOperational]);

    const getListSystemOperational = async () => {
        try {

            const data = await useModelSystemOperational.GetAllModelSystemOperational();
            setListSystemOperational(
                data.systemOperational.map((list: ISystemOperational) => {

                    return {
                        label: list.name,
                        value: list.id,
                        version: list.version
                    }
                })
            );

        } catch (error) {
            console.log(error);
        }
    };

    const handleVersionOperational = async () => {
        try {

            const newVersion = listSystemOperational?.filter((e) => e.value == systemOperational?.value).map((el) => {
                return {
                    label: el.version,
                    value: el.value
                }
            });

            if (!newVersion) {
                return;
            }

            setListVersionOperational(newVersion as ISelect[]);

        } catch (error) {
            console.log();
        }
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
                            <div className="grid grid-cols-2 gap-3">
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2 hidden">
                                    <input type="text" {...register('id')} defaultValue={image?.id} />
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