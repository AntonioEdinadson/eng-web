import {
    EyeIcon,
    EyeSlashIcon,
    ShieldCheckIcon,
    UserCircleIcon,
    AtSymbolIcon
} from "@heroicons/react/24/solid";

import { Link, useParams } from "react-router-dom";

import { useContext, useState } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import logo from '../../assets/logo.webp';
import { IUser } from "../../interfaces/IUser";
import { ErrorMessage } from "@hookform/error-message";
import { RiErrorWarningFill } from "react-icons/ri";

export const Register = () => {

    const params = useParams();
    const auth = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<IUser>();    

    const [message, setMessage] = useState<string>();
    const [error, setError] = useState<Boolean>(false);
    const [created, setCreated] = useState<Boolean>(false);

    const [loading, setLoading] = useState(false);
    const [password, SetPassword] = useState<Boolean>(false);

    const onSubmit = async (event: any) => {
        try {

            setCreated(true);
            setLoading(true);

            if (!event.name || !event.email || !event.password) {
                setError(true);
                setMessage('Complete all the fields correctly');
                return;
            }

            const isCreated = await auth.signup(event.name, event.email, event.password);

            if (!isCreated) {
                setError(true);
                SendNotification('email or password incorrect');
                setLoading(false);
                return;
            }            

        } catch (error) {
            console.log({ error });
            setError(true);
            SendNotification("Error occurred while request");
            setLoading(false);
        }
    };

    const emailValidation = (event: string) => {

        if (event.split('@')[1] !== "grupomulti.com.br") {
            return "domain e-mail not authorized, use @grupomulti.com.br"
        }

        return undefined;
    };

    const SendNotification = async (notify: string) => {
        setError(true);
        setMessage(notify);

        setTimeout(() => {
            setError(false);
        }, 3500);
    }

    return (
        <div>
            <header>
                <div className="w-full h-[3rem] flex items-center p-8">
                    <Link to={"/"}>
                        <img src={logo} alt="logo" className="w-[180px]" />
                    </Link>
                </div>
            </header>
            <main className="w-full h-[calc(100vh-4rem)] relative flex items-center justify-center">
                <div className="sm:w-[50%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%] w-full py-4 px-8 rounded">
                    {created
                        ?
                        <div>
                            <div className="w-full text-white text-center">
                                <div className="">
                                    <p className="text-[3rem] font-bold">Account created!</p>
                                    <p className="text-[1.3rem]">Awaiting confirmation of your account.</p>
                                    <p className="text-[.9rem] font-light">To gain access enter your email and click confirm account.</p>
                                </div>
                                <Link to="/signin">
                                    <button
                                        className="mt-5 text-[#3B82F6] hover:text-white border
                                border-[#3B82F6] hover:bg-[#3B82F6] focus:ring-1 
                                focus:outline-none focus:ring-[#3B82F6] font-medium 
                                rounded-lg text-sm px-5 p-4 text-center text-[1.1rem]">
                                        Go to Login
                                    </button>
                                </Link>

                            </div>                            
                        </div>
                        :
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="w-full flex flex-col gap-3">

                                <div>
                                    <div className="w-full bg-[##141414] bg-[#27272A] rounded p-3 flex gap-4">
                                        <UserCircleIcon className="w-8" />
                                        <input
                                            {...register("name", { required: "name is required", })}
                                            type="text"
                                            className="w-full bg-transparent text-zinc-300  outline-none placeholder-zinc-500"
                                            placeholder="Your name" />
                                    </div>
                                    <ErrorMessage
                                        errors={errors}
                                        name="name"
                                        render={({ message }) => <p className="text-[.8rem] text-[#F21B3F]">{message}</p>} />
                                </div>


                                <div>
                                    <div className="w-full bg-[##141414] bg-[#27272A] rounded p-3 flex gap-4">
                                        <AtSymbolIcon className="w-8" />
                                        <input
                                            {...register("email", { required: "email is required", validate: (e: any) => emailValidation(e) })}
                                            type="email"
                                            className="w-full bg-transparent text-zinc-300  outline-none placeholder-zinc-500"
                                            placeholder="Your email" />
                                    </div>
                                    <ErrorMessage
                                        errors={errors}
                                        name="email"
                                        render={({ message }) => <p className="text-[.8rem] text-[#F21B3F]">{message}</p>} />
                                </div>


                                <div>
                                    <div className="w-full bg-[##141414] bg-[#27272A] rounded p-3 flex gap-4">
                                        <ShieldCheckIcon className="w-8" />
                                        <input
                                            {...register("password", { required: "Password is required", })}
                                            type={password ? "text" : "password"}
                                            className="w-full bg-transparent text-zinc-300 outline-none placeholder-zinc-500"
                                            placeholder="Your Password" />
                                        <div onClick={() => { SetPassword(!password) }}>
                                            {password
                                                ?
                                                <EyeSlashIcon className="w-6 cursor-pointer" />
                                                :
                                                <EyeIcon className="w-6 cursor-pointer" />
                                            }
                                        </div>
                                    </div>
                                    <ErrorMessage
                                        errors={errors}
                                        name="password"
                                        render={({ message }) => <p className="text-[.8rem] text-[#F21B3F]">{message}</p>} />
                                </div>

                                <button className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    CREATE
                                </button>
                            </div>
                            {error &&
                                <div className="w-full py-2 text-[#F21B3F] flex items-center gap-2">
                                    <RiErrorWarningFill className="text-[1.5rem]" />
                                    <p className="text-[.8rem]">{message}</p>
                                </div>
                            }
                            <div className="text-zinc-500 flex gap-1 justify-center py-2 text-[1rem] mt-[2rem]">
                                <span>Have an account?</span>
                                <Link to={"/signin"}>
                                    <span className="font-medium hover:text-zinc-400">Click Here</span>
                                </Link>
                            </div>
                        </form>
                    }
                </div>
            </main>
        </div>
    );
};