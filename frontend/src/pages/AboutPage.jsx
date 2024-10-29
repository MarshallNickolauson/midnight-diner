import React from 'react'
import { Navigate } from 'react-router-dom'
import BlackButtonHollow from '../components/BlackButtonHollow'

const AboutPage = () => {
    return (
        <div className='bg-mainWhite py-3 pb-10'>
            <div className='text-center space-y-4'>
                <h1 className='text-[3rem] text-mainBlack font-bold'>OUR <span className='text-mainRed'>STORY</span></h1>
                <h1 className='text-[1.2rem] mx-52'>
                    At Midnight Diner, we believe there’s nothing quite like the warmth and satisfaction of comfort food. Our story began with a simple goal: to create a cozy place where friends and family can gather, unwind, and enjoy the flavors that feel like home. From cherished family recipes to new takes on classic dishes, every meal we serve is made with love, fresh ingredients, and a touch of nostalgia. Whether you’re here for a hearty meal or a sweet treat, we hope you’ll feel right at home with us.
                </h1>
                <div className='flex flex-row justify-center pt-5 space-x-2'>
                    <BlackButtonHollow title='Order Now' navigateTo='/menu' width='160' />
                    <BlackButtonHollow title='Make a Reservation' navigateTo='/booking' width='240' />
                </div>
            </div>
        </div>
    )
}

export default AboutPage
