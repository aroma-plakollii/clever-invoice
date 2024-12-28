interface DashboardFormLoaderProps{
    type: string;
}

export const DashboardFormLoader: React.FC<DashboardFormLoaderProps> = (props) => {
    return (
        <div className={`mx-auto mt-2 lg:mt-4 bg-gray-200 animate-pulse rounded-2xl 
                ${props.type === 'client' && "w-12/12 lg:w-9/12 py-7 px-5 sm:px-6 h-[21rem]"}
                ${props.type === 'product' && "w-12/12 sm:w-11/12 lg:w-9/12 py-7 px-5 sm:px-6 h-[26rem]"}
                 ${props.type === 'user' && "w-12/12 lg:w-9/12 py-7 px-5 sm:px-6 h-[28rem]"}
                ${props.type === 'full' && "w-full h-[35rem]"}
                ${props.type === 'full-receipt' && "w-full mt-9 lg:mt-10 h-[30rem]"}
            `}>
        </div>
    )
}