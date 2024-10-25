import { useNavigate } from "react-router-dom";


const BlackButtonHollow = ({ title, width = '150', navigateTo = '/' }) => {
    const navigate = useNavigate();

    const buttonClick = () => {
      navigate(`${navigateTo}`);
    }

    return (
        <div
            onClick={buttonClick}
            style={{ width: `${width}px` }}
            className="bg-transparent hover:bg-mainBlack hover:border-mainYellow-500 hover:text-mainYellow cursor-pointer border-4 border-mainBlack transition-all duration-200 ease-in-out group"
        >
            <div className="pt-3 pb-3 text-center">
                <h1 className="text-mainBlack tracking-wider font-bold text-lg transition-all duration-200 ease-in-out group-hover:text-mainYellow">
                    {title}
                </h1>
            </div>
        </div>
    )
}

export default BlackButtonHollow
