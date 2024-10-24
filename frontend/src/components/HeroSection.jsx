import YellowButtonHollow from '../components/YellowButtonHollow'
import YellowButtonFilled from '../components/YellowButtonFilled'

const HeroSection = () => {
    return (
        <section className='bg-mainBlack mb-10'>
            <div className="flex flex-row justify-center pt-10 pb-1 text-[4rem] font-bold">
                <h1 className='text-mainWhite mr-3'>WELCOME TO</h1>
                <h1 className='text-mainYellow'>MIDNIGHT DINER</h1>
            </div>
            <p className='flex justify-center tracking-wider text-mainWhite text-3xl font-oswald'>
                Where late-night cravings meet irresistible comfort food.
            </p>
            <div className='flex flex-row space-x-4 justify-center mt-20'>
                <YellowButtonHollow text='View Our Bar' navigateTo='/drinks' />
                <YellowButtonFilled text='Order Online' navigateTo='/menu' />
            </div>
        </section>
    )
}

export default HeroSection