import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ILineSetup } from "../../../interfaces/ILineConfig";
import { useEffect, useState } from "react";
import { useModelImage } from "../../../hooks/useAPI";
import { IModelImage } from "../../../interfaces/IModelImage";

interface UpInsertComponentLineSetup {
    isOpen: () => void;
    execute: (data?: ILineSetup) => Promise<ILineSetup | void>
    lineSetup: ILineSetup | null;
}

export const ModalUpInsertLineSetup = ({ isOpen, execute, lineSetup }: UpInsertComponentLineSetup) => {

    const { register, handleSubmit, reset } = useForm<ILineSetup>();
    const [listModels, setListModel] = useState<IModelImage[]>();

    useEffect(() => {
        getListModels();
    }, []);

    const getListModels = async () => {

        try {

            const listModels = await useModelImage.GetAllModelImage();
            setListModel(listModels.modelImage);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
            <div className="fixed bg-black bg-opacity-50 inset-0"></div>
            <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel">
                <div className="relative w-[30%] bg-zinc-800 rounded-lg p-[1rem] text-center flex flex-col gap-4">
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

                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('linha', { required: !lineSetup?.linha ? true : false })}
                                        defaultValue={lineSetup?.linha}
                                        placeholder={`${lineSetup?.linha ? "" : "Line"}`} />
                                </div>

                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('IPServer', { required: !lineSetup?.IPServer ? true : false })}
                                        defaultValue={lineSetup?.IPServer}
                                        placeholder={`${lineSetup?.IPServer ? "" : "IPServer"}`} />
                                </div>

                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <select {...register("modelo")} defaultValue={`${lineSetup?.modelo}`} className="w-full py-1 outline-none bg-transparent ">
                                        {listModels && listModels.length > 0
                                            ?
                                            <>
                                                <option value="">Select Model</option>
                                                {listModels.map((list: IModelImage, index: number) => (
                                                    <option
                                                        value={list.id}
                                                        key={index}
                                                        selected={lineSetup?.modelo == list.modelo ? true : false}>
                                                        {`${list.modelo} ${list.systemVersion}`}
                                                    </option>
                                                ))}
                                            </>
                                            :
                                            <option value="">NOK</option>
                                        }
                                    </select>
                                </div>

                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <select {...register("status")} defaultValue={`${lineSetup?.status}`} className="w-full py-1 outline-none bg-transparent ">
                                        <option
                                            value="1"
                                            selected={lineSetup?.status ? true : false}>
                                            ENABLE
                                        </option>
                                        <option
                                            value="0"
                                            selected={lineSetup?.status ? false : true}>
                                            DISABLE
                                        </option>
                                    </select>
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