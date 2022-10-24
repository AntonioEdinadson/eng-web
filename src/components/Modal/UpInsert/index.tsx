import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ISMBios } from "../../../interfaces/IProduct";

interface UpInsertComponent {
    isOpen: () => void;
    execute: () => void;
    smbios?: ISMBios;
}

export const ModalUpInsertModal = ({ isOpen, execute, smbios }: UpInsertComponent) => {

    return (
        <div className="">
            <div className="fixed bg-black bg-opacity-50 inset-0"></div>
            <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel">
                <div className="relative w-[30%] bg-zinc-800 rounded-lg p-[1rem] text-center flex flex-col gap-4">
                    <div className="text-[#bebebe] mt-[2rem]">
                        <span className="block text-[1.2rem] font-medium">Create SMBIOS</span>
                        <span className="block text-[1rem]">Remembering that this action is irreversible</span>
                    </div>
                    <section className="p-3">
                        <form id="form" method="post">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text" className="w-full p-1 outline-none bg-transparent" />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text" className="w-full p-1 outline-none bg-transparent" />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text" className="w-full p-1 outline-none bg-transparent" />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text" className="w-full p-1 outline-none bg-transparent" />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text" className="w-full p-1 outline-none bg-transparent" />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text" className="w-full p-1 outline-none bg-transparent" />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text" className="w-full p-1 outline-none bg-transparent" />
                                </div>
                                <div className="w-full bg-zinc-900  rounded text-[#bebebe] px-2">
                                    <input type="text" className="w-full p-1 outline-none bg-transparent" />
                                </div>
                            </div>
                            <div className="w-full flex justify-end items-center gap-2 text-[#bebebe] mt-6">
                                <button
                                    className="w-[120px] py-1 px-5 mr-2 mb-2 
                                    border rounded border-[#3B82F6]
                                text-[#3B82F6] hover:scale-105 
                                hover:text-[#bebebe]
                                hover:bg-[#3B82F6]"
                                    onClick={() => execute()}>
                                    Create
                                </button>
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