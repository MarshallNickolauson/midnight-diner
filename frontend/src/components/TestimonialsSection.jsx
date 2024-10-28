import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import man1 from '../assets/img/man-1.jpg';
import woman1 from '../assets/img/woman-1.jpeg';
import man2 from '../assets/img/man-2.jpg';

const TestimonialsSection = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 1065);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const testimonials = [
        {
            image: man1,
            name: 'John Doe',
            review: 'Best place for high-quality comfort food... and served fast!',
            rating: '5',
        },
        {
            image: woman1,
            name: 'Jane Smith',
            review: 'A delightful experience! The ambiance is perfect, and the service is top-notch.',
            rating: '4',
        },
        {
            image: man2,
            name: 'Alex Johnson',
            review: 'The burgers are the bomb! Will definitely be coming back for more.',
            rating: '5',
        },
    ];

    return (
        <section className='bg-mainBlack pb-12'>
            <div className='flex justify-center text-center pb-5'>
                <div className='flex flex-row text-[2.5rem] sm:text-[3rem] font-bold'>
                    <h1 className='text-mainWhite font-bold mr-3'>
                        HERE'S WHAT <span className='text-mainYellow'>PEOPLE</span> SAY.
                    </h1>
                </div>
            </div>

            <div className='pb-10 pt-10'>
                {isSmallScreen ? (
                    <Swiper
                        modules={[Mousewheel]}
                        spaceBetween={20}
                        slidesPerView={'auto'}
                        mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
                        className='px-8'
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index} style={{ width: 'auto' }} className='pb-6'>
                                <TestimonialCard
                                    image={testimonial.image}
                                    name={testimonial.name}
                                    review={testimonial.review}
                                    rating={testimonial.rating}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className='flex flex-wrap justify-center gap-6 pl-6 pr-6'>
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                image={testimonial.image}
                                name={testimonial.name}
                                review={testimonial.review}
                                rating={testimonial.rating}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TestimonialsSection;
