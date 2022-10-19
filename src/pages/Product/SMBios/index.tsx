import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export const SMBios = () => {
    return (
        <div className="w-full mx-auto px-[1rem] py-6 mt-4">
            <div className="flex justify-between items-center">
                <div className="text-[#bebebe]">
                    <h1 className="font-medium text-[1.5rem]">SMBios Product</h1>
                    <h2>This page is used to do all the DMI configuration part of the product.</h2>
                </div>
                <PlusCircleIcon className="w-10 text-[#3B82F6] hover:scale-110 cursor-pointer" />
            </div>
            <section className="mt-[2rem] py-3">
                <div className="overflow-x-auto relative">
                    <table className="min-w-[1366px] w-full text-sm text-left text-[#bebebe]">
                        <thead className="text-xs text-[#3B82F6] uppercase ">
                            <tr className="">
                                <th className="py-3">#</th>
                                <th className="py-3">SProduct</th>
                                <th className="py-3">SFamily</th>
                                <th className="py-3">SVersion</th>
                                <th className="py-3">SSkuNumber</th>
                                <th className="py-3">BProduct</th>
                                <th className="py-3">SManufacture</th>
                                <th className="py-3">BManufacture</th>
                                <th className="py-3">CManufacture</th>
                                <th className="py-3">Status</th>
                                <th className="py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <td className="py-4">01</td>
                                <td className="py-4">MLSH3A</td>
                                <td className="py-4">Ultra</td>
                                <td className="py-4">SHG59</td>
                                <td className="py-4">UB560</td>
                                <td className="py-4">UB560</td>
                                <td className="py-4">Multilaser Industrial</td>
                                <td className="py-4">Multilaser Industrial</td>
                                <td className="py-4">Multilaser Industrial</td>
                                <td className="py-4">
                                    {1 == 1
                                        ?
                                        <span className="border border-[#3B82F6] text-[#3B82F6] px-[.5rem] py-[.2rem] rounded-lg text-[.7rem] font-bold">ACTIVE</span>
                                        :
                                        <span className="border border-[#db021f] text-[#db021f] px-[.5rem] py-[.2rem] rounded-lg text-[.7rem] font-bold">INACTIVE</span>
                                    }
                                </td>
                                <td className="w-full py-4 px-1 flex justify-between">
                                    <Link to="#"><PencilSquareIcon className="w-5 hover:scale-110 cursor-pointer" /></Link>
                                    <Link to="#"><TrashIcon className="w-5 hover:scale-110 cursor-pointer text-[#db021f]" /></Link>
                                </td>
                            </tr>
                            <tr className="">
                                <td className="py-4">01</td>
                                <td className="py-4">MLSH3A</td>
                                <td className="py-4">Ultra</td>
                                <td className="py-4">SHG59</td>
                                <td className="py-4">UB560</td>
                                <td className="py-4">UB560</td>
                                <td className="py-4">Multilaser Industrial</td>
                                <td className="py-4">Multilaser Industrial</td>
                                <td className="py-4">Multilaser Industrial</td>
                                <td className="py-4">
                                    {1 != 1
                                        ?
                                        <span className="border border-[#3B82F6] text-[#3B82F6] px-[.5rem] py-[.2rem] rounded-lg text-[.7rem] font-bold">ACTIVE</span>
                                        :
                                        <span className="border border-[#db021f] text-[#db021f] px-[.5rem] py-[.2rem] rounded-lg text-[.7rem] font-bold">INACTIVE</span>
                                    }
                                </td>
                                <td className="w-full py-4 px-1 flex justify-between">
                                    <Link to="#"><PencilSquareIcon className="w-5 hover:scale-110 cursor-pointer" /></Link>
                                    <Link to="#"><TrashIcon className="w-5 hover:scale-110 cursor-pointer text-[#db021f]" /></Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </section>
        </div>
    );
};