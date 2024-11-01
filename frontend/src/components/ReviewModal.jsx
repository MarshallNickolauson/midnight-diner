const ReviewModal = ({ isOpen, onClose, name, rating, comment, formattedDate }) => {
    if (!isOpen) return null;

    const renderStars = () => (
        [...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? 'text-yellow-500' : 'text-gray-300'}>
                ★
            </span>
        ))
    );

    const handleOutsideClick = (e) => {
        if (e.target.id === 'modal-overlay') onClose();
    };

    return (
        <div
            id="modal-overlay"
            onClick={handleOutsideClick}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div className="bg-white max-w-lg w-full max-h-[85vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3.5 text-gray-600 hover:text-gray-900 text-lg"
                >
                    ✕
                </button>
                <div className="flex items-center text-yellow-500 mb-4">
                    {renderStars()}
                </div>
                <p className="text-mainBlack font-bold text-lg mb-2">{name}</p>
                <p className="text-gray-500 font-normal text-sm mb-4">{formattedDate}</p>
                <div className="text-gray-700 text-sm leading-relaxed mb-2 overflow-y-auto">
                    {comment}
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;