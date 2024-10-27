import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetMenuItemsQuery } from '../features/menu/menuApiSlice';

import MenuItemCarousel from '../components/MenuItemCarousel';
import ItemFormModal from '../components/ItemFormModal';
import MenuItemCardModal from '../components/MenuItemCardModal';

const MenuPage = () => {
    useGetMenuItemsQuery();
    const [isItemFormModalOpen, setItemFormModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editItem, setEditItem] = useState(null);

    const { menuItems } = useSelector((state) => state.menu);

    const categories = Array.from(new Set(menuItems.map(item => item.category)));

    const featuredItems = menuItems.filter(item => item.featured === true);
    if (featuredItems.length > 0) {
        categories.unshift('Popular');
    }

    const groupedItems = categories.map(category => ({
        category,
        items: category === 'Popular' ? featuredItems : menuItems.filter(item => item.category === category)
    }));

    const handleReadMore = (item) => {
        setSelectedItem(item);
    }

    const handleEdit = (item) => {
        setEditItem(item);
    }

    return (
        <div className='bg-mainWhite py-3'>
            <div className={`flex flex-col justify-center text-center ${isItemFormModalOpen ? 'pointer-events-none' : ''}`}>                <h1 className='text-[3rem] text-mainBlack font-bold'>COMFORT FOOD YOU <span className='text-mainRed'>LOVE</span></h1>
                <h1 className='text-[1.5rem]'>Wholesome flavors that feel like home.</h1>

                <button
                    type="button"
                    onClick={() => setItemFormModalOpen(true)}
                    className="bg-mainBlack w-32 hover:bg-mainYellow hover:border-mainYellow hover:text-mainYellow cursor-pointer border-2 border-mainYellow transition-all duration-300 ease-in-out group py-3"
                >
                    <h1 className="text-mainYellow text-lg transition-all duration-100 ease-in-out group-hover:text-mainBlack">
                        Add Item
                    </h1>
                </button>

            </div>
            <div className='flex flex-col space-y-2'>
                {groupedItems.map((group, index) => (
                    <MenuItemCarousel
                        key={index}
                        category={group.category}
                        items={group.items}
                        onReadMore={handleReadMore}
                        onEdit={handleEdit}
                    />
                ))}

            </div>
            <ItemFormModal isOpen={isItemFormModalOpen} onClose={() => setItemFormModalOpen(false)} />

            {selectedItem && (
                <MenuItemCardModal
                    item={selectedItem}
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}

            {editItem && (
                <ItemFormModal
                    item={editItem}
                    isOpen={!!editItem}
                    onClose={() => setEditItem(null)}
                />
            )}

        </div >
    )
}

export default MenuPage
