import burger from '../assets/img/burger-1.jpg';
import breadsticks from '../assets/img/breadsticks-1.jpg';
import wings from '../assets/img/wings-1.jpg';
import FeaturedCard from './FeaturedCard';
import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Mousewheel } from 'swiper/modules';

const FeaturedSection = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 1065);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const featuredItems = [
        {
            image: burger,
            title: 'Midnight Burger',
            description: 'Juicy beef patty with all the fixings, served with a side of crispy fries and a choice of your favorite drink.',
            navigateTo: '/menu',
        },
        {
            image: breadsticks,
            title: 'Sticky Breadsticks',
            description: 'Soft, warm breadsticks glazed with garlic butter and a touch of honey, served with marinara for dipping.',
            navigateTo: '/menu',
        },
        {
            image: wings,
            title: 'Inferno Wings',
            description: 'Crispy chicken wings tossed in a fiery buffalo sauce, served with a side of cool ranch dressing.',
            navigateTo: '/menu',
        },
    ];

    return (
        <section className='bg-mainWhite py-6'>
            <div className='flex flex-col justify-center text-center'>
                <h1 className='text-[2rem] sm:text-[3rem] text-mainBlack font-bold'>MOST <span className='text-mainRed'>POPULAR</span> ITEMS</h1>
                <h1 className='text-[1.2rem] sm:text-[1.5rem]'>Our customers' top picks.</h1>
            </div>

            <div className='pt-10'>
                {isSmallScreen ? (
                    <Swiper
                        modules={[Mousewheel]}
                        spaceBetween={15}
                        slidesPerView={'auto'}
                        mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
                        className='px-8'
                    >
                        {featuredItems.map((item, index) => (
                            <SwiperSlide key={index} style={{ width: 'auto' }} className='pb-6'>
                                <FeaturedCard
                                    image={item.image}
                                    title={item.title}
                                    description={item.description}
                                    navigateTo={item.navigateTo}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className='flex flex-wrap justify-center gap-6 pl-6 pr-6'>
                        {featuredItems.map((item, index) => (
                            <FeaturedCard
                                key={index}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                navigateTo={item.navigateTo}
                            />
                        ))}
                    </div>
                )}
            </div>

        </section>
    )
}

export default FeaturedSection
