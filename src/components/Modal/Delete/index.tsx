import { IModelDPK, IModelDPKConfig, IResolution, ISecureBoot, ISMBios, IWindowsVersion } from "../../../interfaces/IProduct";

interface IModalDeletedComponent {
    isOpen: () => void;
    execute: () => void;
    model: ISMBios | IWindowsVersion | ISecureBoot | IModelDPK | IModelDPKConfig | IResolution | null;
    title: string;
}

export const ModalDelete = ({ isOpen, execute, model, title }: IModalDeletedComponent) => {
    return (
        <div className="">
            <div className="fixed bg-black bg-opacity-50 inset-0"></div>
            <div className="fixed inset-0 w-full flex justify-center items-center" id="modalDel">
                <div className="w-[25%] bg-zinc-800 rounded-lg p-[1rem] text-center flex flex-col gap-4">
                    <div className="text-[#bebebe] mt-[2rem]">
                        <span className="block text-[1.2rem] font-medium">Delete {title} {model?.modelo}</span>
                        <span className="block text-[1rem]">Remembering that this action is irreversible</span>
                    </div>
                    <div className="flex justify-center items-center gap-2 text-[#bebebe] mt-3">
                        <button
                            className="py-1 px-5 mr-2 mb-2 
                        border rounded border-[#db021f] 
                        text-[#db021f] hover:scale-105 
                        hover:text-[#bebebe]
                        hover:bg-[#db021f]"
                            onClick={() => isOpen()}>
                            No
                        </button>
                        <button
                            className="py-1 px-5 mr-2 mb-2 
                        border rounded border-[#3B82F6]
                         text-[#3B82F6] hover:scale-105 
                         hover:text-[#bebebe]
                         hover:bg-[#3B82F6]"
                            onClick={() => execute()}>
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};