import TestimonialCard from './TestimonialCard'
import man1 from '../assets/img/man-1.jpg'
import woman1 from '../assets/img/woman-1.jpeg'
import man2 from '../assets/img/man-2.jpg'

const TestimonialsSection = () => {
    return (
        <section className='bg-mainBlack pb-12'>
            <div className='flex justify-center text-center pb-5'>
                <div className='flex flex-row text-[3rem] font-bold'>
                    <h1 className='text-mainWhite font-bold mr-3'>HERE'S WHAT <span className='text-mainYellow'>PEOPLE</span> SAY.</h1>
                </div>
            </div>
            <div className='pb-10 pt-10 flex flex-wrap justify-center gap-6 pl-6 pr-6'>
                <TestimonialCard
                    image={man1}
                    name='John Doe'
                    review='Best place for high-quality comfort food... and served fast!'
                    rating='5'
                />
                <TestimonialCard
                    image={woman1}
                    name='Jane Smith'
                    review='A delightful experience! The ambiance is perfect, and the service is top-notch.'
                    rating='4'
                />
                <TestimonialCard
                    image={man2}
                    name='Alex Johnson'
                    review='The burgers are the bomb! Will definitely be coming back for more.'
                    rating='5'
                />
            </div>
        </section>
    )
}

export default TestimonialsSection
