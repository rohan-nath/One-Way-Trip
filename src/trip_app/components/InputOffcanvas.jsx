import React, { useState } from "react";

const InputOffcanvas = () => {
  const locationSearchContent = [
    {
      id: 1,
      name: "London",
      address: "Greater London, United Kingdom",
    },
    {
      id: 2,
      name: "New York",
      address: "New York State, United States",
    },
    {
      id: 3,
      name: "Paris",
      address: "France",
    },
    {
      id: 4,
      name: "Madrid",
      address: "Spain",
    },
    {
      id: 5,
      name: "Santorini",
      address: "Greece",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleOptionClick = (item) => {
    setSelectedItem(item);
  };

  return (
    // <div className="shadow-2 dropdown-menu min-width-400">
    //   <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
    //     <ul className="y-gap-5 js-results">
    //       {locationSearchContent.map((item) => (
    //         <li
    //           className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
    //             selectedItem && selectedItem.id === item.id ? "active" : ""
    //           }`}
    //           key={item.id}
    //           role="button"
    //           onClick={() => handleOptionClick(item)}
    //         >
    //           <div className="d-flex">
    //             <div className="icon-location-2 text-light-1 text-20 pt-4" />
    //             <div className="ml-10">
    //               <div className="text-15 lh-12 fw-500 js-search-option-target">
    //                 {item.name}
    //               </div>
    //               <div className="text-14 lh-12 text-light-1 mt-5">
    //                 {item.address}
    //               </div>
    //             </div>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
    <>hello world </>
  );
};

export default InputOffcanvas;
