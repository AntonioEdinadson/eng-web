import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { IModelDPK, IResolution } from "../../../interfaces/IProduct";

interface UpInsertComponent {
    isOpen: () => void;
    execute: (data?: IResolution) => Promise<IResolution | void>
    resolution: IResolution | null;
}

export const ModalUpInsertResolution = (props: UpInsertComponent) => {

    const { register, handleSubmit, reset } = useForm<IResolution>();

    return (
        <div className="">
            <div className="fixed bg-black bg-opacity-50 inset-0"></div>
            <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel">
                <div className="relative w-[30%] bg-zinc-800 rounded-lg p-[1rem] text-center flex flex-col gap-4">
                    <div className="text-[#bebebe] mt-[2rem]">
                        <span className="block text-[1.2rem] font-medium">{props.resolution ? "Edit Resolution" : "Create Resolution"}</span>
                        <span className="block text-[1rem]">Remembering that this action is irreversible</span>
                    </div>
                    <section className="p-3">
                        <form id="form" method="post" onSubmit={handleSubmit(props.execute)}>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2 hidden">
                                    <input type="text" {...register('id')} defaultValue={props.resolution?.id} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('modelo', { required: !props.resolution?.modelo ? true : false })}
                                        defaultValue={props.resolution?.modelo}
                                        placeholder={`${props.resolution?.modelo ? "" : "modelo"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('systemVersion', { required: !props.resolution?.systemVersion ? true : false })}
                                        defaultValue={props.resolution?.systemVersion}
                                        placeholder={`${props.resolution?.systemVersion ? "" : "systemVersion"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('currentVerticalResolution', { required: !props.resolution?.currentVerticalResolution ? true : false })}
                                        defaultValue={props.resolution?.currentVerticalResolution}
                                        placeholder={`${props.resolution?.currentVerticalResolution ? "" : "currentVerticalResolution"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('currentHorizontalResolution', { required: !props.resolution?.currentHorizontalResolution ? true : false })}
                                        defaultValue={props.resolution?.currentHorizontalResolution}
                                        placeholder={`${props.resolution?.currentHorizontalResolution ? "" : "currentHorizontalResolution"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('equalResolution', { required: !props.resolution?.equalResolution ? true : false })}
                                        defaultValue={props.resolution?.equalResolution}
                                        placeholder={`${props.resolution?.equalResolution ? "" : "equalResolution"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <select {...register("status")} defaultValue={`${props.resolution?.status}`} className="w-full py-1 outline-none bg-transparent ">
                                        <option
                                            value="1"
                                            selected={props.resolution?.status ? true : false}>
                                            ENABLE
                                        </option>
                                        <option
                                            value="0"
                                            selected={props.resolution?.status ? false : true}>
                                            DISABLE
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full flex justify-end items-center gap-2 text-[#bebebe] mt-6">
                                {props.resolution
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