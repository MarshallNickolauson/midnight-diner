import YellowButtonHollow from '../components/YellowButtonHollow'
import YellowButtonFilled from '../components/YellowButtonFilled'

const HeroSection = () => {
    return (
        <section className='bg-mainBlack py-12'>
            <div className="flex flex-col md:flex-row text-center justify-center pb-1 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-bold">
                <h1 className='text-mainWhite mr-3'>WELCOME TO</h1>
                <h1 className='text-mainYellow'>MIDNIGHT DINER</h1>
            </div>
            <p className='flex justify-center tracking-widest text-mainWhite text-xs md:text-sm lg:text-xl px-5 text-center font-bold mt-2'>
                WHERE LATE-NIGHT CRAVINGS MEET IRRESISTIBLE COMFORT FOOD.
            </p>
            <div className='flex flex-row space-x-4 justify-center mt-10 md:mt-20'>
                <YellowButtonHollow text='View Our Menu' navigateTo='/drinks' width='180' />
                <YellowButtonFilled text='Order Online' navigateTo='/menu' width='180' />
            </div>
        </section>
    )
}

export default HeroSection