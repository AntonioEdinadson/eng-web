import {
    EyeIcon,
    EyeSlashIcon,
    ShieldCheckIcon,
    UserCircleIcon
} from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";

import { useContext, useState } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";

import logo from '../../assets/logo.webp';
import { IUser } from "../../interfaces/IUser";
import { ErrorMessage } from "@hookform/error-message";
import { RiErrorWarningFill } from "react-icons/ri";

export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [message, setMessage] = useState<string>();
    const [error, setError] = useState<Boolean>(false);

    const [loading, setLoading] = useState(false);
    const [password, SetPassword] = useState<Boolean>(false);

    const onSubmit = async (event: any) => {
        try {

            setLoading(true);

            if (!event.email || !event.password) {
                setError(true);
                setMessage('Complete all the fields correctly');
                return;
            }

            const isLogged = await auth.sign(event.email, event.password);

            if (!isLogged) {
                setError(true);
                SendNotification('email or password incorrect');
                setLoading(false);
                return;
            }

            navigate('/home');
            window.location.reload();

        } catch (error) {
            console.log({ error });
            setError(true);
            SendNotification("Error occurred while request");
            setLoading(false);
        }
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex flex-col gap-3">
                            <div className="w-full bg-[##141414] bg-[#27272A] rounded p-3 flex gap-4">
                                <UserCircleIcon className="w-8" />
                                <input
                                    {...register("email", { required: "email is required", })}
                                    type="text"
                                    className="w-full bg-transparent text-zinc-300  outline-none placeholder-zinc-500"
                                    placeholder="Your email" />
                            </div>
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({ message }) => <p className="text-[.7rem] text-[#F21B3F]">{message}</p>}
                            />

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
                                render={({ message }) => <p className="text-[.7rem] text-[#F21B3F]">{message}</p>} />

                            <div className="text-zinc-500 flex gap-1 justify-end py-2 text-[.9rem]">
                                <span>Forgot your password?</span>
                                <Link to={""}>
                                    <span className="font-medium hover:text-zinc-400">Click Here</span>
                                </Link>
                            </div>

                            <button
                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                LOGIN
                            </button>
                        </div>

                        {error &&
                            <div className="w-full py-2 text-[#F21B3F] flex items-center gap-2">
                                <RiErrorWarningFill className="text-[1.5rem]" />
                                <p className="text-[.8rem]">{message}</p>
                            </div>
                        }
                    </form>
                    <div className="text-zinc-500 flex gap-1 justify-center py-2 text-[1rem] mt-[2rem]">
                        <span>Create my account</span>
                        <Link to={"/signup"}>
                            <span className="font-medium hover:text-zinc-400">Click Here</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};