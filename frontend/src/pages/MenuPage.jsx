import { useState } from 'react';
import { useGetMenuItemsQuery } from '../features/menu/menuApiSlice';
import MenuItemCarousel from '../components/MenuItemCarousel';
import ItemFormModal from '../components/ItemFormModal';
import MenuItemCardModal from '../components/MenuItemCardModal';
import { ClipLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';

const MenuPage = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 10)
    }, [location]);

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
                <h1 className='text-[1.5rem]'>Wholesome flavors that feel like home - <span onClick={() => setItemFormModalOpen(true)} className='underline cursor-pointer'>Add Item</span></h1>
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
