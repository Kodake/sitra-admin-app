import { toast } from "react-toastify";

interface ToastConfirmationProps {
    message: string;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmButtonClass?: string;
    cancelButtonClass?: string;
}

export const showToastConfirmation = ({
    message,
    onConfirm,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    confirmButtonClass = "flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-red-600 transition-all active:scale-95",
    cancelButtonClass = "flex-1 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all active:scale-95",
}: ToastConfirmationProps) => {
    const ConfirmToast = ({ closeToast }: any) => (
        <div className="flex flex-col items-center text-center px-1 py-2 font-sans">
            {/* Premium Icon Container */}
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3 shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            
            <p className="mb-6 text-[15px] font-medium text-slate-800 leading-relaxed">
                {message}
            </p>
            
            <div className="flex w-full gap-3">
                <button
                    onClick={() => {
                        closeToast();
                    }}
                    className={cancelButtonClass}
                >
                    {cancelLabel}
                </button>
                <button
                    onClick={() => {
                        onConfirm();
                        closeToast();
                    }}
                    className={confirmButtonClass}
                >
                    {confirmLabel}
                </button>
            </div>
        </div>
    );

    toast.warning(<ConfirmToast closeToast={() => toast.dismiss()} />, {
        position: "top-center",
        autoClose: false,
        data: { isConfirmation: true },
        closeButton: false,
        draggable: false,
        style: { borderRadius: '1.25rem', padding: '0.5rem' } // Gives the toast wrapper a more Apple-like rounded feel
    });
};
