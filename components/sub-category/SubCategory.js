import React from 'react';
import PageComponentTitle from '../common/PageComponentTitle';
import SubCategoryTable from './SubCategoryTable';
import InventoryModal from '../common/inventoryModal';  // Assuming you have this component

const SubCategory = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <main className="p-6 sm:p-10 space-y-6">
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <PageComponentTitle 
                    title='Inventory'
                    titleDescription='List, view and edit'
                    buttonTitle='Create new Item'
                    onButtonClick={() => setIsModalOpen(true)}
                />
            </div>

            <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
                <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
                    <SubCategoryTable />
                </div>
            </section>

            {isModalOpen && (
                <InventoryModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </main>
    );
};

export default SubCategory;
