import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Mousewheel } from 'swiper/modules';
import MenuItemCard from './MenuItemCard';

const MenuItemCarousel = ({ category, items, onReadMore, onEdit }) => {
    if (items.length === 0) return null;

    return (
        <div className="carousel-container overflow-hidden">
            <div className="pl-8">
                <h2 className='text-xl text-mainBlack'>{category}</h2>
                <div className='border-b-2 border-mainBlack rounded-full mt-1 mb-4'></div>
            </div>
            <Swiper
                modules={[Mousewheel]}
                spaceBetween={15}
                slidesPerView={'auto'}
                mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
                className='px-8'
            >
                {items.map(item => (
                    <SwiperSlide key={item._id} style={{ width: 'auto' }} className='pb-6'>
                        <MenuItemCard menuItem={item} onReadMore={onReadMore} onEdit={onEdit} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MenuItemCarousel;
