import { useState } from "react";
import { Alert } from "../../components/Alert"
import { InfoUser } from "../../components/InfoUser"
import { INotify } from "../../interfaces/INotify";

export const Dashboard = () => {

    const [notify, setNotify] = useState<INotify>();

    return (
        <div className="w-full h-screen mx-auto px-[2rem] py-6">
            <div className={`w-full fixed top-[4rem] flex justify-end pr-4`}>
                <Alert type={notify?.type} message={notify?.message} status={notify?.status} />
            </div>
            <div className="mb-10">
                <InfoUser />
            </div>
            <div className="w-full h-5rem flex justify-between items-center">
                <div className="text-[#bebebe]">
                    <h1 className="font-medium text-[1.5rem]">Dashboard</h1>
                    <h2>This page is used to do all the DPK configuration part of the product.</h2>
                </div>
            </div>
        </div>
    );
};