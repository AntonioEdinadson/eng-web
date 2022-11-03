import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { IModelDPKConfig } from "../../../interfaces/IProduct";

interface UpInsertComponent {
    isOpen: () => void;
    execute: (data?: IModelDPKConfig) => Promise<IModelDPKConfig | void>
    dpkConfig: IModelDPKConfig | null;
}

export const ModalUpInsertModelDPKConfig = (props: UpInsertComponent) => {

    const { register, handleSubmit, reset } = useForm<IModelDPKConfig>();

    return (
        <div className="">
            <div className="fixed bg-black bg-opacity-50 inset-0"></div>
            <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel">
                <div className="relative w-[30%] bg-zinc-800 rounded-lg p-[1rem] text-center flex flex-col gap-4">
                    <div className="text-[#bebebe] mt-[2rem]">
                        <span className="block text-[1.2rem] font-medium">{props.dpkConfig ? "Edit DPKConfig" : "Create DPKConfig"}</span>
                        <span className="block text-[1rem]">Remembering that this action is irreversible</span>
                    </div>
                    <section className="p-3">
                        <form id="form" method="post" onSubmit={handleSubmit(props.execute)}>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2 hidden">
                                    <input type="text" {...register('id')} defaultValue={props.dpkConfig?.id} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('modelo', { required: !props.dpkConfig?.modelo ? true : false })}
                                        defaultValue={props.dpkConfig?.modelo}
                                        placeholder={`${props.dpkConfig?.modelo ? "" : "MODEL"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('ZPC_MODEL_SKU', { required: !props.dpkConfig?.ZPC_MODEL_SKU ? true : false })}
                                        defaultValue={props.dpkConfig?.ZPC_MODEL_SKU}
                                        placeholder={`${props.dpkConfig?.ZPC_MODEL_SKU ? "" : "ZPC_MODEL_SKU"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('ZFRM_FATOR_CL1', { required: !props.dpkConfig?.ZFRM_FATOR_CL1 ? true : false })}
                                        defaultValue={props.dpkConfig?.ZFRM_FATOR_CL1}
                                        placeholder={`${props.dpkConfig?.ZFRM_FATOR_CL1 ? "" : "ZFRM_FATOR_CL1"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('ZFRM_FATOR_CL2', { required: !props.dpkConfig?.ZFRM_FATOR_CL2 ? true : false })}
                                        defaultValue={props.dpkConfig?.ZFRM_FATOR_CL2}
                                        placeholder={`${props.dpkConfig?.ZFRM_FATOR_CL2 ? "" : "ZFRM_FATOR_CL2"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('ZSCREEN_SIZE', { required: !props.dpkConfig?.ZSCREEN_SIZE ? true : false })}
                                        defaultValue={props.dpkConfig?.ZSCREEN_SIZE}
                                        placeholder={`${props.dpkConfig?.ZSCREEN_SIZE ? "" : "ZSCREEN_SIZE"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('ZTOUCH_SCREEN', { required: !props.dpkConfig?.ZTOUCH_SCREEN ? true : false })}
                                        defaultValue={props.dpkConfig?.ZTOUCH_SCREEN}
                                        placeholder={`${props.dpkConfig?.ZTOUCH_SCREEN ? "" : "ZTOUCH_SCREEN"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('BUSINESSID', { required: !props.dpkConfig?.BUSINESSID ? true : false })}
                                        defaultValue={props.dpkConfig?.BUSINESSID}
                                        placeholder={`${props.dpkConfig?.BUSINESSID ? "" : "BUSINESSID"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('ZPGM_ELIG_VAL')}
                                        defaultValue={props.dpkConfig?.ZPGM_ELIG_VAL}
                                        placeholder={`${props.dpkConfig?.ZPGM_ELIG_VAL ? "" : "ZPGM_ELIG_VAL"}`} />
                                </div>
                            </div>
                            <div className="w-full flex justify-end items-center gap-2 text-[#bebebe] mt-6">
                                {props.dpkConfig
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