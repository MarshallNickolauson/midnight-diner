import personEating from '../assets/img/person-eating.jpg'
import personEating2 from '../assets/img/person-eating-2.jpg'

const AboutSection = () => {
    return (
        <div className='bg-mainWhite pt-12 pb-80'>
            <div className="flex flex-row w-8/12 justify-center">
                <div className='flex flex-row items-center justify-center w-full'> {/* Added w-full */}
                    <div className='flex flex-col font-bold text-mainBlack justify-center text-left'> {/* Added text-center */}
                        <h1 className='w-1/2 mx-auto text-[3rem]'>COMFORT FOOD</h1>
                        <h1 className='w-1/2 mx-auto text-[3.8rem] transform -translate-y-6'>DONE <span className='text-mainRed'>RIGHT.</span></h1>
                        <p className='w-1/2 mx-auto'> {/* Added mx-auto for horizontal centering */}
                            At Midnight Diner, we believe comfort food should be an experience. From savory burgers to rich desserts, every plate is crafted to satisfy your cravings and warm your heart. We have a long-standing history of making people happy when they leave. You won't regret choosing our food for a meal that feels like home.
                        </p>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className="absolute w-80 h-80">
                        <img
                            src={personEating}
                            alt="Person Eating"
                            className='w-full h-full object-cover rounded-lg shadow-sm shadow-black'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutSection
