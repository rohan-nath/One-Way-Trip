import { setInputSelectedValue } from "@/features/input-box/inputBoxSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const TimeSearch = ({ cName, valueKey }) => {
  const dispatch = useDispatch();

  const locationSearchContent = [
    {
      id: 1,
      name: "08:00 AM - 09:00 AM",
    },
    {
      id: 2,
      name: "09:00 AM - 10:00 AM",
    },
    {
      id: 3,
      name: "10:00 AM - 11:00 AM",
    },
    {
      id: 4,
      name: "11:00 AM - 12:00 PM",
    },
    {
      id: 5,
      name: "12:00 PM - 01:00 PM",
    },
  ];
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    dispatch(
      setInputSelectedValue({
        value: item.name,
        valueKey,
      })
    );
  };

  return (
    <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        data-bs-offset="0,22"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">{cName}</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <input
            autoComplete="off"
            type="search"
            placeholder="Select Time"
            className="js-search js-dd-focus"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      {/* End location Field */}

      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
          <ul className="y-gap-5 js-results">
            {locationSearchContent.map((item) => (
              <li
                className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                  selectedItem && selectedItem.id === item.id ? "active" : ""
                }`}
                key={item.id}
                role="button"
                onClick={() => handleOptionClick(item)}
              >
                <div className="d-flex">
                  <div className="icon-location-2 text-light-1 text-20 pt-4" />
                  <div className="ml-10">
                    <div className="text-15 lh-12 fw-500 js-search-option-target">
                      {item.name}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimeSearch;
