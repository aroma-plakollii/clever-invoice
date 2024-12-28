interface IAlertConfirmProps {
    title: string;
    message: string;
    isOpen: boolean;
    onClose: (confirm: any) => void;
}

const AlertConfirm = (props: IAlertConfirmProps) => {
    if (!props.isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
                <div className="border-b px-4 py-3">
                    <h2 className="text-lg font-bold">{props.title}</h2>
                </div>
                <div className="px-4 py-5">
                    <p className="text-sm text-gray-700">{props.message}</p>
                </div>
                <div className="flex justify-end px-4 py-3 border-t">
                    <button
                        className="mr-2 px-6 py-2 bg-gray-400 text-white text-sm rounded hover:bg-gray-500"
                        onClick={() => props.onClose('cancel')}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 bg-black text-white text-sm rounded hover:bg-gray-900"
                        onClick={() => props.onClose('confirm')}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertConfirm;