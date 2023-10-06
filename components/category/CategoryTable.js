// CategoryTable.js

import React, { useState, useEffect } from 'react';
import Table from 'rc-table';
import Pagination from "react-js-pagination";
import Modal from '../common/Modal'; // Adjust the path accordingly

const CategoryTable = () => {
    const [tableData, setTableData] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    // Filter state
    const [filterColor, setFilterColor] = useState('');
    const [filterAge, setFilterAge] = useState('');
    const [filterBreed, setFilterBreed] = useState('');
    const [filterCharacteristics, setFilterCharacteristics] = useState('');

    const fetchPets = async () => {
        try {
            const response = await fetch("https://k9upr0m3mb.execute-api.us-east-1.amazonaws.com/dev/add");
            const data = await response.json();
            setTableData(data);
            setTotalItems(data.length);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchPets();
    }, []);

    const deletePet = async (id) => {
        try {
            const response = await fetch(`https://k9upr0m3mb.execute-api.us-east-1.amazonaws.com/dev/add/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Successfully deleted!');
                fetchPets();
            } else {
                const data = await response.json();
                alert('Error deleting data: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            alert('Failed to delete data: ' + error.message);
        }
    };

    const applyFilters = () => {
        // Filter the data based on user input
        const filteredData = tableData.filter((pet) => {
            return (
                (filterColor === '' || pet.color.toLowerCase() === filterColor.toLowerCase()) &&
                (filterAge === '' || pet.age.toString() === filterAge) &&
                (filterBreed === '' || pet.breed.toLowerCase() === filterBreed.toLowerCase()) &&
                (filterCharacteristics === '' || pet.characteristics.toLowerCase().includes(filterCharacteristics.toLowerCase()))
            );
        });

        setTableData(filteredData);
    };

    const resetFilters = () => {
        // Reset filter input fields
        setFilterColor('');
        setFilterAge('');
        setFilterBreed('');
        setFilterCharacteristics('');

        // Reset table data to original
        fetchPets();
    };

    const columns = [
      { title: 'Breed', dataIndex: 'breed', key: 'breed', width: 400, className: "text-white bg-gray-800 p-2 border-r-2 border-b-2" },
      { title: 'Color', dataIndex: 'color', key: 'color', width: 400, className: "text-white bg-gray-600 p-2 border-r-2 border-b-2" },
      { title: 'Characteristics', dataIndex: 'characteristics', key: 'characteristics', width: 400, className: "text-white bg-gray-600 p-2 border-r-2 border-b-2" },
      { title: 'Age', dataIndex: 'age', key: 'age', width: 400, className: "text-white bg-gray-600 p-2 border-r-2 border-b-2" },
      { title: 'Image', dataIndex: 'image', key: 'image', width: 400, className: "text-white bg-gray-600 p-2 border-r-2 border-b-2", render: (text, record) => <img src={record.image} alt="pet" style={{ width: '50px', height: '50px' }} /> },
      { title: 'CaringTips', dataIndex: 'caringTips', key: 'caringTips', width: 400, className: "text-white bg-gray-800 p-2 border-r-2 border-b-2" },

        {
            title: 'Operations',
            dataIndex: '',
            key: 'operations',
            className: "text-white bg-gray-600 p-2 border-b-2",
            render: (text, record) => (
                <>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setSelectedPet(record);
                        setModalOpen(true);
                    }}> Update</a> 
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        deletePet(record.id);
                    }}> Delete</a> 
                </>
            )
        },
    ];

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    return (
        <>
            {/* Filter input fields */}
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Color"
                    value={filterColor}
                    onChange={(e) => setFilterColor(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Age"
                    value={filterAge}
                    onChange={(e) => setFilterAge(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Breed"
                    value={filterBreed}
                    onChange={(e) => setFilterBreed(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Characteristics"
                    value={filterCharacteristics}
                    onChange={(e) => setFilterCharacteristics(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={applyFilters}
                >
                    Apply Filters
                </button>
                <button
                    className="bg-gray-500 text-white p-2 rounded"
                    onClick={resetFilters}
                >
                    Reset Filters
                </button>
            </div>

            <Table
                columns={columns}
                data={tableData}
                rowKey={data => data.id}
                className='bg-purple-700 p-4 w-full text-center rc-table-custom font-semibold '
            />
            <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={totalItems}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                innerClass="js-ul"
                itemClass='js-li'
                linkClass='page-link'
            />
            <Modal
                modal={isModalOpen}
                setModal={setModalOpen}
                selectedPet={selectedPet}
            />
        </>
    );
};

export default CategoryTable;
