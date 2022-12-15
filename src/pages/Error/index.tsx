import { Link } from "react-router-dom";

export const Error = () => {
    return (
        <div className="w-full">
            <div className="w-full flex justify-center items-center gap-10 h-[calc(100vh-61px)] ">
                <div className="text-white">
                    <div className="">
                        <p className="text-[5rem] font-bold">Oops!</p>
                        <p className="text-[1.5rem]">Sorry, we couldn't find this page.</p>
                        <p className="text-[.9rem] font-light">But don't worry, you can find many other things on our homepage.</p>
                    </div>
                    <Link to="">
                        <button
                            className="mt-5 text-[#3B82F6] hover:text-white border
                                border-[#3B82F6] hover:bg-[#3B82F6] focus:ring-1 
                                focus:outline-none focus:ring-[#3B82F6] font-medium 
                                rounded-lg text-sm px-5 p-5 text-center text-[1.1rem]">
                            Go to home
                        </button>
                    </Link>

                </div>
                <div>
                    <p className="text-[8rem] text-[#3B82F6] font-bold">404</p>
                </div>
            </div>
        </div>
    );
};