import { setInputSelectedValue } from "@/features/input-box/inputBoxSlice";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useDispatch } from "react-redux";

const DateSearch = ({ valueKey }) => {
  // const [dates, setDates] = useState([
  //   new DateObject({ year: 2023, month: 1, day: 22 }),
  //   "December 09 2020",
  //   1597994736000, //unix time in milliseconds (August 21 2020)
  // ]);
  // const [dates, setDates] = useState([
  //   new DateObject().setDay(5),
  //   new DateObject().setDay(14).add(1, "month"),
  // ]);
  const dispatch = useDispatch();

  const [dates, setDates] = useState(new Date());

  const handleClick = (e) => {
    setDates(e);
    dispatch(
      setInputSelectedValue({ value: e.format("MMMM DD YYYY"), valueKey })
    );
  };

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={dates}
        onChange={handleClick}
        offsetY={10}
        // range
        // rangeHover
        format="MMMM DD YYYY"
      />
    </div>
  );
};

export default DateSearch;
