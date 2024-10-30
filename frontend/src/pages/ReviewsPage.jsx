import { useEffect, useState } from 'react';
import ReviewFormModal from '../components/ReviewFormModal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetReviewsQuery } from '../features/review/reviewApiSlice';
import ReviewCard from '../components/ReviewCard';

const ReviewsPage = () => {
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);

    const { userInfo } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const { data: reviews = [], isLoading } = useGetReviewsQuery();

    useEffect(() => {
        if (reviews.length > 0) {
            console.log(reviews);
        }
    }, [reviews]);

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

            <div className="review-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 px-10">
                {isLoading ? (
                    <p>Loading reviews...</p>
                ) : (
                    reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            name={review.name}
                            rating={review.rating}
                            comment={review.comment}
                            updatedAt={review.updatedAt}
                        />
                    ))
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
