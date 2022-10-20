import { INotify } from "../../interfaces/INotify";


export const Alert = ({ type, message, status }: INotify) => {
    return (
        <div className={`fixed top-0 left-0 right-0 text-center py-4 lg:px-4 transition-all duration-500 ease-in ${status ? 'translate-y-20' : 'translate-y-[-100px]'}`}>
            <div className={`p-2 items-center ${type === 'ERROR' ? "bg-red-100 text-red-700" : "bg-[#00e17065] text-[#018845]"} leading-none rounded flex lg:inline-flex`} role="alert">
                <span className={`flex rounded ${type === 'ERROR' ? "bg-red-500" : "bg-[#00e170]"} text-white uppercase px-2 py-1 text-xs font-bold mr-3`}>
                    {type === 'ERROR'
                        ?
                        'ERRO!'
                        :
                        'SUCESSO!'
                    }
                </span>
                <span className="font-semibold mr-2 text-left flex-auto">{message}</span>
                <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
            </div>
        </div>
    );
}