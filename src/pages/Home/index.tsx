import { useState } from "react";
import { Alert } from "../../components/Alert"
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { INotify } from "../../interfaces/INotify";

export const Home = () => {

    const [notify, setNotify] = useState<INotify>();

    return (
        <>
            <Header />
            <div className='flex'>
                <nav className='w-[250px]'>
                    <Navbar />
                </nav>
                <main className="w-[calc(100%-250px)]">
                    <div className="w-full h-[calc(100vh-60px)] mx-auto px-[2rem] py-6">
                        <div className={`w-full fixed top-[4rem] flex justify-end pr-4`}>
                            <Alert type={notify?.type} message={notify?.message} status={notify?.status} />
                        </div>
                        <div className="w-full h-5rem flex justify-between items-center">
                            <div className="text-[#bebebe]">
                                <h1 className="font-medium text-[1.5rem]">Welcome</h1>
                                <h2>This page is used to do all the DPK configuration part of the product.</h2>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};
