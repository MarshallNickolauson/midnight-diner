import { useState } from 'react';
import { useGetMenuItemsQuery } from '../features/menu/menuApiSlice';
import MenuItemCarousel from '../components/MenuItemCarousel';
import ItemFormModal from '../components/ItemFormModal';
import MenuItemCardModal from '../components/MenuItemCardModal';
import { ClipLoader } from 'react-spinners';

const MenuPage = () => {
    const [isItemFormModalOpen, setItemFormModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editItem, setEditItem] = useState(null);

    const { data: menuItems = [], isLoading, isError } = useGetMenuItemsQuery();

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
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setItemFormModalOpen(true);
    };

    const handleCloseModal = () => {
        setItemFormModalOpen(false);
        setEditItem(null);
        setSelectedItem(null);
    };

    return (
        <div className='bg-mainWhite py-3'>
            <div className={`flex flex-col justify-center text-center ${isItemFormModalOpen ? 'pointer-events-none' : ''}`}>                
                <h1 className='text-[3rem] text-mainBlack font-bold'>COMFORT FOOD YOU <span className='text-mainRed'>LOVE</span></h1>
                <h1 className='text-[1.5rem]'>Wholesome flavors that feel like home.</h1>

                <button
                    type="button"
                    onClick={() => setItemFormModalOpen(true)}
                    className="absolute right-5 top-[110px] bg-mainYellow w-32 hover:bg-yellow-500 hover:text-mainYellow cursor-pointer border-2 border-mainYellow transition-all duration-300 ease-in-out group py-3 shadow-gray-300 shadow-md"
                >
                    <h1 className="text-mainBlack text-lg">
                        Add Item
                    </h1>
                </button>
            </div>
            
            <div className='flex flex-col space-y-2'>
                {isLoading ? (
                    <div className="flex items-center justify-center h-screen">
                        <ClipLoader color="#36d7b7" loading={isLoading} size={50} />
                    </div>
                ) : (
                    groupedItems.map((group, index) => (
                        <MenuItemCarousel
                            key={index}
                            category={group.category}
                            items={group.items}
                            onReadMore={handleReadMore}
                            onEdit={handleEdit}
                        />
                    ))
                )}
            </div>

            <ItemFormModal 
                isOpen={isItemFormModalOpen} 
                onClose={handleCloseModal} 
                key={editItem ? editItem._id : 'new'} 
                item={editItem} 
            />

            {selectedItem && (
                <MenuItemCardModal
                    item={selectedItem}
                    isOpen={!!selectedItem}
                    onClose={handleCloseModal}
                />
            )}
        </div >
    );
};

export default MenuPage;
