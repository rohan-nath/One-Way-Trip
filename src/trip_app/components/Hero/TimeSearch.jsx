import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const TimeSearch = () => {
  const [selectedTime, setSelectedTime] = useState(new Date());


  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        disableDayPicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={selectedTime}
        onChange={setSelectedTime}
        offsetY={10}
        format="hh:mm A"
        plugins={[<TimePicker hideSeconds />]}
      />
    </div>
  );
};

export default TimeSearch;
