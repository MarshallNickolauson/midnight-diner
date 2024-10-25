import React from 'react'
import BlackButtonHollow from './BlackButtonHollow'

const CTASection = () => {
    return (
        <div className='bg-mainYellowGradient py-12'>
            <div className="w-8/12 mx-auto text-mainBlack space-y-6">
                <div>
                    <h1 className='font-bold text-[3rem] text-left pb-1'>READY TO EAT?</h1>
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