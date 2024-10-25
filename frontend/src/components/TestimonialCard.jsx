import { useNavigate } from 'react-router-dom';

const TestimonialCard = ({ image, name, review, rating }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/reviews');
    }

    return (
        <div
            onClick={handleNavigate}
            className="bg-mainWhite rounded-lg overflow-hidden shadow-lg w-80 transition-transform transform hover:scale-[1.02] duration-200 ease-in-out cursor-pointer flex flex-col items-center p-6"
        >
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-xl">
                <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt={`${name}'s testimonial`}
                />
            </div>
            
            <h1 className="text-2xl pt-4 font-bold text-mainBlack text-center">{name}</h1>
            
            <div className="flex-grow flex items-center justify-center">
                <p className="text-mainDarkGray text-xl text-center px-4 pt-3 h-32 overflow-hidden">
                    {review}
                </p>
            </div>

            <hr className="border-t-2 border-gray-400 w-full my-4" />
            <p className="text-yellow-500 text-xl font-semibold text-center">Rating: {rating}⭐</p>
        </div>
    );
}

export default TestimonialCard;
