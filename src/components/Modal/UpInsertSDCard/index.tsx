import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { ISDCard, ISecureBoot } from "../../../interfaces/IProduct";

interface UpInsertComponentWindows {
    isOpen: () => void;
    execute: (data?: ISDCard) => Promise<ISDCard | void>
    sdcard: ISDCard | null;
}

export const ModalUpInsertSDCard = (props: UpInsertComponentWindows) => {

    const { register, handleSubmit } = useForm<ISDCard>();

    return (
        <div className="">
            <div className="fixed bg-black bg-opacity-50 inset-0"></div>
            <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel">
                <div className="relative w-[30%] bg-zinc-800 rounded-lg p-[1rem] text-center flex flex-col gap-4">
                    <div className="text-[#bebebe] mt-[2rem]">
                        <span className="block text-[1.2rem] font-medium">{props.sdcard ? "Edit SDCard" : "Create SecureBoot"}</span>
                        <span className="block text-[1rem]">Remembering that this action is irreversible</span>
                    </div>
                    <section className="p-3">
                        <form id="form" method="post" onSubmit={handleSubmit(props.execute)}>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2 hidden">
                                    <input type="text" {...register('id')} defaultValue={props.sdcard?.id} />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text"
                                        className="w-full p-1 outline-none bg-transparent"
                                        {...register('modelo', { required: !props.sdcard?.modelo ? true : false })}
                                        defaultValue={props.sdcard?.modelo}
                                        placeholder={`${props.sdcard?.modelo ? "" : "modelo"}`} />
                                </div>

                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <select {...register("status")} defaultValue={`${props.sdcard?.status}`} className="w-full py-1 outline-none bg-transparent ">
                                        <option
                                            value="1"
                                            selected={props.sdcard?.status ? true : false}>
                                            ENABLE
                                        </option>
                                        <option
                                            value="0"
                                            selected={props.sdcard?.status ? false : true}>
                                            DISABLE
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full flex justify-end items-center gap-2 text-[#bebebe] mt-6">
                                {props.sdcard
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
