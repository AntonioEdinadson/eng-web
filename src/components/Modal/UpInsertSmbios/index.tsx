import { useForm } from "react-hook-form";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { ISMBios, IWindowsVersion } from "../../../interfaces/IProduct";

interface UpInsertComponentSmbios {
    isOpen: () => void;
    execute: (data?: ISMBios) => Promise<ISMBios | void>
    smbios: ISMBios | null;
}

export const ModalUpInsertModal = ({ isOpen, execute, smbios }: UpInsertComponentSmbios) => {

    const { register, handleSubmit, reset } = useForm<ISMBios>();

    return (
        <div className="">
            <div className="fixed bg-black bg-opacity-50 inset-0"></div>
            <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel">
                <div className="relative w-[30%] bg-zinc-800 rounded-lg p-[1rem] text-center flex flex-col gap-4">
                    <div className="text-[#bebebe] mt-[2rem]">
                        <span className="block text-[1.2rem] font-medium">{smbios ? "Edit SMBIOS" : "Create SMBIOS"}</span>
                        <span className="block text-[1rem]">Remembering that this action is irreversible</span>
                    </div>
                    <section className="p-3">
                        <form id="form" method="post" onSubmit={handleSubmit(execute)}>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2 hidden">
                                    <input type="text" {...register('id')} defaultValue={smbios?.id} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('modelo', { required: !smbios?.modelo ? true : false })}
                                        defaultValue={smbios?.modelo}
                                        placeholder={`${smbios?.modelo ? "" : "modelo"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('systemProduct', { required: !smbios?.systemProduct ? true : false })}
                                        defaultValue={smbios?.systemProduct}
                                        placeholder={`${smbios?.systemProduct ? "" : "systemProduct"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('systemFamily', { required: !smbios?.systemFamily ? true : false })}
                                        defaultValue={smbios?.systemFamily}
                                        placeholder={`${smbios?.systemFamily ? "" : "systemFamily"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('systemVersion', { required: !smbios?.systemVersion ? true : false })}
                                        defaultValue={smbios?.systemVersion}
                                        placeholder={`${smbios?.systemVersion ? "" : "systemVersion"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('systemSkuNumber', { required: !smbios?.systemSkuNumber ? true : false })}
                                        defaultValue={smbios?.systemSkuNumber}
                                        placeholder={`${smbios?.systemSkuNumber ? "" : "systemSkuNumber"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('baseboardProduct', { required: !smbios?.baseboardProduct ? true : false })}
                                        defaultValue={smbios?.baseboardProduct}
                                        placeholder={`${smbios?.baseboardProduct ? "" : "baseboardProduct"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('systemManufacture', { required: !smbios?.systemManufacture ? true : false })}
                                        defaultValue={smbios?.systemManufacture}
                                        placeholder={`${smbios?.systemManufacture ? "" : "systemManufacture"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('baseboardManufacture', { required: !smbios?.baseboardManufacture ? true : false })}
                                        defaultValue={smbios?.baseboardManufacture}
                                        placeholder={`${smbios?.baseboardManufacture ? "" : "baseboardManufacture"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('chassisManufacture', { required: !smbios?.chassisManufacture ? true : false })}
                                        defaultValue={smbios?.chassisManufacture}
                                        placeholder={`${smbios?.chassisManufacture ? "" : "chassisManufacture"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <select {...register("status")} defaultValue={`${smbios?.status}`} className="w-full py-1 outline-none bg-transparent ">
                                        <option
                                            value="1"
                                            selected={smbios?.status ? true : false}>
                                            ENABLE
                                        </option>
                                        <option
                                            value="0"
                                            selected={smbios?.status ? false : true}>
                                            DISABLE
                                        </option>
                                    </select>
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