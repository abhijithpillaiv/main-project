import React, { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
export default function index({setlocal_t_strap, setdate }) {
  const [value, onChange] = useState(new Date());
  useEffect(() => {
    setlocal_t_strap(value)
    let val=value.toLocaleString().split(',')[0]
    setdate(val);
  }, [value]);

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <DatePicker
      showTimeSelect
      selected={value}
      onChange={onChange}
      timeClassName={handleColor}
      dateFormat="dd/MM/yyyy"
      maxDate={new Date()}
    />
  );
}
