import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetMenuItemsQuery } from '../features/menu/menuApiSlice';
import { setMenuItems } from '../features/menu/menuSlice';

import MenuItemCard from '../components/MenuItemCard';
import MenuItemCarousel from '../components/MenuItemCarousel';

const MenuPage = () => {

    const dispatch = useDispatch();
    const { data: menuItems = [], error, isLoading } = useGetMenuItemsQuery();

    useEffect(() => {
        if (menuItems.length) {
            dispatch(setMenuItems(menuItems));
        }
    }, [menuItems, dispatch]);

    const categories = Array.from(new Set(menuItems.map(item => item.category)));

    const featuredItems = menuItems.filter(item => item.featured === true);
    if (featuredItems.length > 0) {
        categories.unshift('Popular');
    }



    const groupedItems = categories.map(category => ({
        category,
        items: category === 'Popular' ? featuredItems : menuItems.filter(item => item.category === category)
    }));

    return (
        <div className='bg-mainWhite py-3'>
            <div className='flex flex-col justify-center text-center'>
                <h1 className='text-[3rem] text-mainBlack font-bold'>COMFORT FOOD YOU <span className='text-mainRed'>LOVE</span></h1>
                <h1 className='text-[1.5rem]'>Wholesome flavors that feel like home.</h1>
            </div>
            <div className='flex flex-col px-8 space-y-2'>
                {groupedItems.map((group, index) => (
                    <MenuItemCarousel key={index} category={group.category} items={group.items} />
                ))}

            </div>

        </div>
    )
}

export default MenuPage
