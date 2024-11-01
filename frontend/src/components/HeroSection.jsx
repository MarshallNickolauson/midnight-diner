import YellowButtonHollow from '../components/YellowButtonHollow';
import YellowButtonFilled from '../components/YellowButtonFilled';
import heroPic from '../assets/img/hero-pic.jpg';

const HeroSection = () => {
    return (
        <section 
            className="relative bg-fixed bg-center bg-cover py-24" 
            style={{
                backgroundImage: `url(${heroPic})`,
            }}
        >
            <div className="absolute inset-0 bg-mainBlack opacity-75"></div>

            <div className="relative z-10 flex flex-col md:flex-row text-center justify-center pb-1 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-bold">
                <h1 className="text-mainWhite mr-3">WELCOME TO</h1>
                <h1 className="text-mainYellow">MIDNIGHT DINER</h1>
            </div>
            
            <p className="relative z-10 flex justify-center tracking-widest text-mainWhite text-xs md:text-sm lg:text-xl px-5 text-center font-bold mt-2">
                WHERE LATE-NIGHT CRAVINGS MEET IRRESISTIBLE COMFORT FOOD.
            </p>
            
            <div className="relative z-10 flex flex-row space-x-4 justify-center mt-10 md:mt-20">
                <YellowButtonHollow text="View Our Menu" navigateTo="/menu" width="180" />
                <YellowButtonFilled text="Order Online" navigateTo="/mybag" width="180" />
            </div>
        </section>
    )
}

export default HeroSection;
