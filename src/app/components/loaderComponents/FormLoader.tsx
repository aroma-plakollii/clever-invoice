interface FormLoaderProps{
    type: string;
}

export const FormLoader: React.FC<FormLoaderProps> = (props) => {
    return(
        <div role='status' className='max-w-full animate-pulse px-6 py-24 sm:py-32 lg:px-8'>
            <div className={`mx-auto bg-gray-200 rounded-xl w-full sm:w-8/12 md:w-7/12 ${props.type === 'signupSetting' ? "xl:w-5/12" : "xl:w-6/12"}  p-7 sm:p-10
                ${props.type === 'login' && "h-[26rem] my-auto"}
                ${props.type === 'signup' && "h-[37rem]"}
                ${props.type === 'signupSetting' && "h-[61rem]"}
                `}>
            </div>
        </div>
    )
}