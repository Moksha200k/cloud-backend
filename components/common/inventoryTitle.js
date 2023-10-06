import React from 'react';

const PageComponentTitle = ({ title, titleDescription, buttonTitle, onButtonClick }) => {
    return (
        <>
            <div className="mr-6">
                <h1 className="text-4xl font-semibold mb-2">{title}</h1>
                <h2 className="text-gray-600 ml-0.5">{titleDescription}</h2>
            </div>
  
            <div className="flex flex-wrap items-start justify-end -mb-3">
                <button
                    className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
                    onClick={onButtonClick}  // Use the prop here
                >
                    {/* ... SVG and buttonTitle code */}
                </button>
            </div>
        </>
    );
};

export default PageComponentTitle;
