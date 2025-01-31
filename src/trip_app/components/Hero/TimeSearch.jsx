import { setInputSelectedValue } from "@/features/input-box/inputBoxSlice";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useDispatch } from "react-redux";

const TimeSearch = () => {
  const [selectedTime, setSelectedTime] = useState(new Date());

  const [isTimeChanged, setIsTimeChanged] = useState(false);
  const dispatch = useDispatch();
  const datePickerRef = useRef(null); // Ref for the date picker container

  const handleClick = (e) => {
    setSelectedTime(e);
    setIsTimeChanged(true);
  };

  const dispatchTime = useCallback(() => {
    if (isTimeChanged) {
      dispatch(
        setInputSelectedValue({
          value: selectedTime.format("hh:mm A"),
          isFullScreen: false,
        })
      );
      setIsTimeChanged(false);
    }
  }, [isTimeChanged, selectedTime, dispatch]);

  const handleClickOutside = useCallback(
    (event) => {
      if (
        isTimeChanged &&
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        dispatchTime();
      }
    },
    [isTimeChanged, dispatchTime]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      ref={datePickerRef}
      className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker"
    >
      <DatePicker
        disableDayPicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={selectedTime}
        onChange={handleClick}
        offsetY={10}
        format="hh:mm A"
        plugins={[<TimePicker hideSeconds />]}
      />
    </div>
  );
};

export default TimeSearch;
