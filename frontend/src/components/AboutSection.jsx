import React from 'react';
import personEating from '../assets/img/person-eating.jpg';

const AboutSection = () => {
    return (
        <div className='bg-mainWhite py-12'>
            <div className="w-8/12 mx-auto flex flex-col md:flex-row items-start">
                <div className='flex flex-col font-bold text-mainBlack text-left w-full md:w-1/2'>
                    <h1 className='text-[3rem]'>COMFORT FOOD</h1>
                    <h1 className='text-[3.8rem] transform -translate-y-6'>DONE <span className='text-mainRed'>RIGHT.</span></h1>
                    <p className='text-mainDarkGray font-normal text-center md:text-left'>
                        At Midnight Diner, we believe comfort food should be an experience. From savory burgers to rich desserts, every plate is crafted to satisfy your cravings and warm your heart. We have a long-standing history of making people happy when they leave. You won't regret choosing our food for a meal that feels like home.
                    </p>
                </div>
                <div className='w-full md:w-1/2 flex justify-center items-start mt-6 md:mt-0'>
                    <img
                        src={personEating}
                        alt="Person Eating"
                        className='w-80 h-80 object-cover rounded-lg shadow-sm shadow-black'
                    />
                </div>
            </div>
        </div>
    );
}

export default AboutSection;
