import { useNavigate } from "react-router-dom";

const YellowButtonHollow = ({ text = 'blank', navigateTo = '/', width = '150' }) => {
  const navigate = useNavigate();

  const buttonClick = () => {
    navigate(`${navigateTo}`);
  }

  return (
    <div
      onClick={buttonClick}
      style={{ width: `${width}px` }}
      className="bg-transparent hover:bg-mainYellow hover:border-mainYellow-500 hover:text-mainYellow cursor-pointer border-4 border-mainYellow transition-all duration-200 ease-in-out group"
    >
      <div className="pt-3 pb-3 text-center">
        <h1 className="text-mainYellow tracking-wider text-lg transition-all duration-200 ease-in-out group-hover:text-mainBlack">
          {text}
        </h1>
      </div>
    </div>
  )
}

export default YellowButtonHollow;
