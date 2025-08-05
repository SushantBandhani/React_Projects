const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null
    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-500 border border-amber-400">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-50">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-black">
                            {title}
                        </h3>
                        <button type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                            onClick={onClose}
                        >
                            <svg className="w-4 h-4 text-gray-20" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 1l6 6m0 0l6-6M7 7l6 6M7 7l-6 6" />
                            </svg>


                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-4 md:p-5 space-y-4">
                        {children}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Modal