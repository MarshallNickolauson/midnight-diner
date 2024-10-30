import { useEffect, useState } from 'react';

const ReviewFormModal = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    
    useEffect(() => {
        if (!isOpen) {
            setRating(1);
            setComment('');
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission logic here, e.g., API call to save the review
        console.log({ rating, comment });

        onClose();
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={handleOutsideClick}
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 modal-overlay">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-6 max-h-[85vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-center text-mainBlack">Leave a Review</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Rating Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="rating" className="w-1/3 text-gray-700">Stars:</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>

                    {/* Comment Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="comment" className="w-1/3 text-gray-700">Comment:</label>
                        <textarea
                            id="comment"
                            required
                            placeholder="Leave your comment here..."
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        {/* Replace with actual loading logic */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-mainBlack rounded hover:bg-gray-400 w-24"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-mainYellow text-mainBlack rounded hover:bg-yellow-500 w-24"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewFormModal;
