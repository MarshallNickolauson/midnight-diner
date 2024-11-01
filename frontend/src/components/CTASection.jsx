import BlackButtonHollow from './BlackButtonHollow'

const CTASection = () => {
    return (
        <div className='bg-mainYellowGradient py-12'>
            <div className="flex flex-col justify-center items-center text-mainBlack space-y-6">
                <div className='text-center'>
                    <h1 className='font-bold text-[3.5rem] pb-'>READY TO EAT?</h1>
                    <p>Join us for a night of delicious flavors and good company.</p>
                    <p>Or, build your own order for carry-out.</p>
                </div>
                <div className='flex flex-row space-x-2'>
                    <BlackButtonHollow title='Make a Reservation' width='220' navigateTo='/booking' />
                    <BlackButtonHollow title='Order Online' width='220' navigateTo='/menu' />
                </div>
            </div>
        </div>
    )
}

export default CTASection