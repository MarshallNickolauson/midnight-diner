import { useMemo } from 'react';
import { format } from 'date-fns';

const ReviewCard = ({ name, rating, comment, updatedAt }) => {
    const formattedDate = useMemo(() => format(new Date(updatedAt), 'MMM. dd, yyyy'), [updatedAt]);

    const renderStars = () => (
        [...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? 'text-yellow-500' : 'text-gray-300'}>
                ★
            </span>
        ))
    );

    return (
        <div
            onClick={() => console.log('Open modal for review card')}
            className="review-card flex flex-col h-35 p-4 shadow-md bg-white rounded-lg transition-transform hover:scale-[1.02] hover:cursor-pointer">
            <div className="flex items-center text-yellow-500 mb-2">
                {renderStars()}
            </div>
            <p className="comment text-gray-700 text-sm mb-2 flex-grow line-clamp-2 overflow-hidden">
                {comment}
            </p>
            <p className="text-mainBlack font-bold text-md">{name}<span className='text-gray-500 font-normal text-sm'> - {formattedDate}</span></p>
        </div>
    );
};

export default ReviewCard;
