import React from 'react'
import { CChart } from '@coreui/react-chartjs';
import { useEffect } from 'react';

export default function index({nutr,labels,value}) {
  useEffect(() => {
    console.log(value);
  }, [value])
  
  return (
    <CChart
  type="line" 
  data={{
    labels: labels,
    datasets: [
      {
        label: nutr,
        backgroundColor: "rgba(220, 220, 220, 0.2)",
        borderColor: "rgba(220, 220, 220, 1)",
        pointBackgroundColor: "rgba(220, 220, 220, 1)",
        pointBorderColor: "black",
        data: value
      }
    ],
  }}
/>
  )
}
