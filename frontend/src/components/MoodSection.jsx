import peopleEating from '../assets/img/people-eating.jpeg'
import takeoutMeal from '../assets/img/takeout-meal.jpg'
import YellowButtonFilled from './YellowButtonFilled'

const MoodSection = () => {
    return (
        <section className='bg-mainBlack pb-10'>
            <div className='flex justify-center text-center pt-5 pb-5'>
                <div className='flex flex-row text-[3rem] font-bold'>
                    <h1 className='text-mainWhite font-bold mr-3'>WHAT'S YOUR</h1>
                    <h1 className='text-mainYellow'>MOOD?</h1>
                </div>
            </div>
            <div className='flex flex-row justify-center space-x-6 text-mainWhite'>
                <div className='flex flex-row items-center space-x-4 bg-mainDarkGray p-4 rounded-lg white-shadow'>
                    <img className="w-64 h-64 object-cover rounded-lg" src={peopleEating} alt="Dine-In Image" />
                    <div className='flex flex-col text-mainWhite items-center text-center space-y-8'>
                        <h1 className='font-bold tracking-wider text-3xl'>Dine-In</h1>
                        <p className='text-lg'>Join us for a cozy night out.</p>
                        <YellowButtonFilled text='Reserve a Table' navigateTo='/reservations' width='250' />
                    </div>
                </div>
                <div className='flex flex-row items-center space-x-4 bg-mainDarkGray p-4 rounded-lg white-shadow'>
                    <div className='flex flex-col text-mainWhite items-center text-center space-y-8'>
                        <h1 className='font-bold tracking-wider text-3xl'>Takeout</h1>
                        <p className='text-lg'>Grab your favorites to-go!</p>
                        <YellowButtonFilled text='Order Now' navigateTo='/order' />
                    </div>
                    <img className="w-64 h-64 object-cover rounded-lg" src={takeoutMeal} alt="Takeout Image" />
                </div>
            </div>
        </section >
    )
}

export default MoodSection
