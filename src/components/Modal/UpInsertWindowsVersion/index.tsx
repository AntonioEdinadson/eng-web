import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { IWindowsVersion } from "../../../interfaces/IProduct";

interface UpInsertComponentWindows {
    isOpen: () => void;
    execute: (data?: IWindowsVersion) => Promise<IWindowsVersion | void>
    windows: IWindowsVersion | null;
}

export const ModalUpInsertWindowsVersion = (props: UpInsertComponentWindows) => {

    const { register, handleSubmit, reset } = useForm<IWindowsVersion>();

    return (
        <div className="">
            <div className="fixed bg-black bg-opacity-50 inset-0"></div>
            <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel">
                <div className="relative w-[30%] bg-zinc-800 rounded-lg p-[1rem] text-center flex flex-col gap-4">
                    <div className="text-[#bebebe] mt-[2rem]">
                        <span className="block text-[1.2rem] font-medium">{props.windows ? "Edit WindowsVersion" : "Create WindowsVersion"}</span>
                        <span className="block text-[1rem]">Remembering that this action is irreversible</span>
                    </div>
                    <section className="p-3">
                        <form id="form" method="post" onSubmit={handleSubmit(props.execute)}>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2 hidden">
                                    <input type="text" {...register('id')} defaultValue={props.windows?.id} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('modelo', { required: !props.windows?.modelo ? true : false })}
                                        defaultValue={props.windows?.modelo}
                                        placeholder={`${props.windows?.modelo ? "" : "modelo"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('systemVersion', { required: !props.windows?.systemVersion ? true : false })}
                                        defaultValue={props.windows?.systemVersion}
                                        placeholder={`${props.windows?.systemVersion ? "" : "systemVersion"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('version', { required: !props.windows?.version ? true : false })}
                                        defaultValue={props.windows?.version}
                                        placeholder={`${props.windows?.version ? "" : "version"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('csup', { required: !props.windows?.csup ? true : false, maxLength: 10 })}
                                        defaultValue={props.windows?.csup}
                                        placeholder={`${props.windows?.csup ? "" : "csup"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('numberPartitionsDisk', { required: !props.windows?.numberPartitionsDisk ? true : false, maxLength: 2 })}
                                        defaultValue={props.windows?.numberPartitionsDisk}
                                        placeholder={`${props.windows?.numberPartitionsDisk ? "" : "numberPartitionsDisk"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('windows', { required: !props.windows?.windows ? true : false, maxLength: 25 })}
                                        defaultValue={props.windows?.windows}
                                        placeholder={`${props.windows?.windows ? "" : "windows"}`} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <select {...register("status")} defaultValue={`${props.windows?.status}`} className="w-full py-1 outline-none bg-transparent ">
                                        <option
                                            value="1"
                                            selected={props.windows?.status ? true : false}>
                                            ENABLE
                                        </option>
                                        <option
                                            value="0"
                                            selected={props.windows?.status ? false : true}>
                                            DISABLE
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full flex justify-end items-center gap-2 text-[#bebebe] mt-6">
                                {props.windows?.status
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