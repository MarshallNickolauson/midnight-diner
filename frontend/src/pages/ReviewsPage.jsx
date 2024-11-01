import { useEffect, useState } from 'react';
import ReviewFormModal from '../components/ReviewFormModal';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetReviewsQuery } from '../features/review/reviewApiSlice';
import ReviewCard from '../components/ReviewCard';

const ReviewsPage = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 10)
    }, [location]);

    const [isReviewModalOpen, setReviewModalOpen] = useState(false);

    const { userInfo } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const { data: reviews = [], isLoading, isError } = useGetReviewsQuery();

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
                <h1 className='text-[3rem] text-mainBlack font-bold'>REVIEWS FROM <span className='text-mainRed'>REAL PEOPLE</span></h1>
                <h2 className='text-[1.5rem]'>Your feedback matters to us!</h2>
                <div>
                    <button
                        type="button"
                        onClick={handleOpenReviewModal}
                        className="mt-5 bg-mainYellow w-[180px] border border-mainDarkGray hover:border-mainDarkGray text-mainDarkGray font-semibold py-2 rounded transition duration-200 hover:bg-yellow-500"
                    >
                        <h1 className="text-mainBlack text-lg">Leave a Review</h1>
                    </button>
                </div>
            </div>

            <div className="review-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 px-10">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ReviewCard
                            key={review._id}
                            name={review.name}
                            rating={review.rating}
                            comment={review.comment}
                            updatedAt={review.updatedAt}
                        />
                    ))
                ) : (
                    <p>No reviews yet. Be the first!</p>
                )}
            </div>

            <ReviewFormModal
                isOpen={isReviewModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default ReviewsPage;
