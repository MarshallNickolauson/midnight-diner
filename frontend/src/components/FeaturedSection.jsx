import burger from '../assets/img/burger-1.jpg';
import breadsticks from '../assets/img/breadsticks-1.jpg';
import wings from '../assets/img/wings-1.jpg';
import FeaturedCard from './FeaturedCard';

const FeaturedSection = () => {


    return (
        <section className='bg-mainWhite py-6'>
            <div className='flex justify-center text-center'>
                <div className='flex flex-col'>
                    <h1 className='text-[3rem] text-mainBlack font-bold'>MOST <span className='text-mainRed'>POPULAR</span> ITEMS</h1>
                    <h1 className='text-[1.5rem]'>Our customers' top picks.</h1>
                </div>
            </div>
            <div className='pb-10 pt-10 flex flex-wrap justify-center gap-6 pl-6 pr-6'>
                <FeaturedCard 
                    image={burger} 
                    title='Midnight Burger' 
                    description='Juicy beef patty with all the fixings, served with a side of crispy fries and a choice of your favorite drink.' 
                    navigateTo='/menu'
                />
                <FeaturedCard 
                    image={breadsticks}
                    title='Sticky Breadsticks' 
                    description='Soft, warm breadsticks glazed with garlic butter and a touch of honey, served with marinara for dipping.' 
                    navigateTo='/menu'
                />
                <FeaturedCard 
                    image={wings} 
                    title='Inferno Wings' 
                    description='Crispy chicken wings tossed in a fiery buffalo sauce, served with a side of cool ranch dressing.' 
                    navigateTo='/menu'
                />
            </div>
        </section>
    )
}

export default FeaturedSection
