export const InfoUser = () => {
    return (
        <div className="w-full relative">
            <div className="w-full flex justify-end items-center gap-3 p-4 text-[#78787A] font-medium">
                <span>Lucas Joaquim PokPok</span>
                <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-zinc-800 cursor-pointer overflow-hidden hover:scale-105">
                    <img src="/profile.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};