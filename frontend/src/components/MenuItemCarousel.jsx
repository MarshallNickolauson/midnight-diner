import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import MenuItemCard from './MenuItemCard';

const MenuItemCarousel = ({ category, items }) => {
    if (items.length === 0) return null;
    
    return (
        <div className="carousel-container overflow-hidden pb-6">
            <h2 className='text-xl text-mainBlack'>{category}</h2>
            <div className='border-b-2 border-mainBlack rounded-full mt-1 mb-4'></div>
            <Swiper
                spaceBetween={15}
                slidesPerView={'auto'}
                onSlideChange={() => console.log('Slide changed')}
            >
                {items.map(item => (
                    <SwiperSlide key={item._id} style={{ width: 'auto' }}>
                        <MenuItemCard menuItem={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MenuItemCarousel;
