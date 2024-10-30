import { useState } from 'react';
import ReviewFormModal from '../components/ReviewFormModal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ReviewsPage = () => {
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleOpenReviewModal = () => {
        if (userInfo) {
            setReviewModalOpen(true);
        } else {
            navigate('/login');
        }
    };

    const handleCloseModal = () => {
        setReviewModalOpen(false);
    };

    return (
        <div className='bg-mainWhite py-3'>
            <div className='flex flex-col mx-auto justify-center text-center'>
                <h1 className='text-[3rem] text-mainBlack font-bold'>Customer Reviews</h1>
                <h2 className='text-[1.5rem]'>Your feedback matters to us!</h2>
                <div>
                    <button
                        type="button"
                        onClick={handleOpenReviewModal}
                        className="mt-5 bg-mainYellow w-[180px] hover:bg-yellow-500 hover:text-mainYellow cursor-pointer border-2 border-mainYellow transition-all duration-300 ease-in-out group py-3 shadow-gray-300 shadow-md"
                    >
                        <h1 className="text-mainBlack text-lg">Leave a Review</h1>
                    </button>
                </div>
            </div>

            <div className='flex flex-col items-center mt-5'>
                {/* Replace with actual loading logic */}
                <h3 className="text-lg text-mainBlack mt-5">Reviews will go here</h3>
            </div>

            <ReviewFormModal
                isOpen={isReviewModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default ReviewsPage;
