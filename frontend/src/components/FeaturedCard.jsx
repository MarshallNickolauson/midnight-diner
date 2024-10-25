import { useNavigate } from 'react-router-dom'

const FeaturedCard = ({ image, title, description, navigateTo = '/' }) => {
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate(`${navigateTo}`);
    }
    
    return (
        <div onClick={handleNavigate} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg w-80 transition-transform transform hover:scale-105 duration-200 ease-in-out hover:cursor-pointer">
            <img className="w-full h-80 object-cover" src={image} alt={title} />
            <div className="p-4">
                <h1 className="text-xl font-bold text-mainBlack mb-2">{title}</h1>
                <p className="text-mainDarkGray text-base">{description}</p>
                <hr className="border-gray-300 my-3" />
                <div className='flex justify-center'>
                    <p className='inline-block text-center text-blue-500 cursor-pointer hover:underline'>View Item</p>
                </div>
            </div>
        </div>
    )
}

export default FeaturedCard