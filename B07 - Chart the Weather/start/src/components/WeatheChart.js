import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// all things weather api and formatting the weather data = new component // WeatherChart
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  // creating labels with new array and mapping over them
  const labels = [...Array(7)].map((_,i) =>{
    const date = new Date();
    date.setDate(date.getDate() + i);
    return days[date.getDay()];
  })
  
  // options in own variable
  const options = {
    maintainAspectRatio: true,
    tooltips: {
      mode: 'index', intersect: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: false,
          ticks: { fontColor: '#5f6c7b', fontSize: 10, padding: 20}
        }
      ],
      yAxes: [{
          ticks: {
              beginAtZero: true, fontColor: '#5f6c7b', fontSize: 10, padding: 20
          }
      }]
    }
  }
  
  // weather api
  const apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely&units=imperial&appid=bb96c7f9ac6f57dc00333727c5407547'
  
  export default function WeatherChart({latLng}) {
  
    const [datasets, setDataSet] = useState([])
    const [data, setData] = useState([])
  
    useEffect(() =>{
      getData();
      getWeatherData();

      async function getData(){
        const res = await fetch(`${apiUrl}&lat=${latLng.lat}&lon=${latLng.lng}`)
        const data = await res.json();
        setData(parseFloat(data.current.temp).toFixed(0));
      }
  
      async function getWeatherData(){
        const res = await fetch(`${apiUrl}&lat=${latLng.lat}&lon=${latLng.lng}`)
        const data = await res.json();
        const formattedData = formatWeatherData(data);
        setDataSet(formattedData);
      }
  
      function formatWeatherData(data){
        return [
          {
            label: 'Highs',
            backgroundColor: '#ef4565',
            borderColor: '#ef4565',
            data: data.daily.map(day => day.temp.max)
        
          },
          {
            label: 'Lows',
            backgroundColor: '#3da9fc',
            borderColor: '#3da9fc',
            data: data.daily.map(day => day.temp.min)
          }
        ]
      }
  
    },[latLng])
  
  
    return (  
      <div className="chart">
        Skate Weather
      <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="feels-like">{ data }&deg;</div>
        { data > 50 
            ? <svg className="svg-icon" viewBox="0 0 20 20">
                <path fill="none" d="M5.114,5.726c0.169,0.168,0.442,0.168,0.611,0c0.168-0.169,0.168-0.442,0-0.61L3.893,3.282c-0.168-0.168-0.442-0.168-0.61,0c-0.169,0.169-0.169,0.442,0,0.611L5.114,5.726z M3.955,10c0-0.239-0.193-0.432-0.432-0.432H0.932C0.693,9.568,0.5,9.761,0.5,10s0.193,0.432,0.432,0.432h2.591C3.761,10.432,3.955,10.239,3.955,10 M10,3.955c0.238,0,0.432-0.193,0.432-0.432v-2.59C10.432,0.693,10.238,0.5,10,0.5S9.568,0.693,9.568,0.932v2.59C9.568,3.762,9.762,3.955,10,3.955 M14.886,5.726l1.832-1.833c0.169-0.168,0.169-0.442,0-0.611c-0.169-0.168-0.442-0.168-0.61,0l-1.833,1.833c-0.169,0.168-0.169,0.441,0,0.61C14.443,5.894,14.717,5.894,14.886,5.726 M5.114,14.274l-1.832,1.833c-0.169,0.168-0.169,0.441,0,0.61c0.168,0.169,0.442,0.169,0.61,0l1.833-1.832c0.168-0.169,0.168-0.442,0-0.611C5.557,14.106,5.283,14.106,5.114,14.274 M19.068,9.568h-2.591c-0.238,0-0.433,0.193-0.433,0.432s0.194,0.432,0.433,0.432h2.591c0.238,0,0.432-0.193,0.432-0.432S19.307,9.568,19.068,9.568 M14.886,14.274c-0.169-0.168-0.442-0.168-0.611,0c-0.169,0.169-0.169,0.442,0,0.611l1.833,1.832c0.168,0.169,0.441,0.169,0.61,0s0.169-0.442,0-0.61L14.886,14.274z M10,4.818c-2.861,0-5.182,2.32-5.182,5.182c0,2.862,2.321,5.182,5.182,5.182s5.182-2.319,5.182-5.182C15.182,7.139,12.861,4.818,10,4.818M10,14.318c-2.385,0-4.318-1.934-4.318-4.318c0-2.385,1.933-4.318,4.318-4.318c2.386,0,4.318,1.933,4.318,4.318C14.318,12.385,12.386,14.318,10,14.318 M10,16.045c-0.238,0-0.432,0.193-0.432,0.433v2.591c0,0.238,0.194,0.432,0.432,0.432s0.432-0.193,0.432-0.432v-2.591C10.432,16.238,10.238,16.045,10,16.045"></path>
            </svg>
            : <svg className="svg-icon" viewBox="0 0 20 20">
                <path fill="none" d="M7.409,12.653c-0.477,0-0.864,0.388-0.864,0.863c0,0.478,0.387,0.864,0.864,0.864s0.864-0.387,0.864-0.864C8.273,13.041,7.886,12.653,7.409,12.653 M4.818,16.972c-0.477,0-0.864,0.387-0.864,0.863c0,0.478,0.387,0.864,0.864,0.864c0.476,0,0.863-0.387,0.863-0.864C5.682,17.358,5.294,16.972,4.818,16.972 M3.091,14.381c-0.477,0-0.864,0.387-0.864,0.863s0.387,0.864,0.864,0.864s0.864-0.388,0.864-0.864S3.567,14.381,3.091,14.381 M10,16.108c-0.477,0-0.864,0.387-0.864,0.863S9.523,17.835,10,17.835s0.864-0.387,0.864-0.863S10.477,16.108,10,16.108 M14.318,14.381c0-0.477-0.388-0.864-0.864-0.864s-0.863,0.388-0.863,0.864c0,0.478,0.387,0.863,0.863,0.863S14.318,14.858,14.318,14.381 M16.903,4.992c0.002-0.037,0.006-0.074,0.006-0.111c0-1.431-1.16-2.591-2.591-2.591c-0.653,0-1.248,0.244-1.704,0.642c-0.922-1.424-2.518-2.369-4.341-2.369c-2.601,0-4.748,1.918-5.119,4.415C1.633,5.34,0.5,6.703,0.5,8.335c0,1.908,1.547,3.455,3.455,3.455h12.091c1.907,0,3.454-1.547,3.454-3.455C19.5,6.724,18.396,5.375,16.903,4.992 M16.046,10.926H3.955c-1.429,0-2.591-1.162-2.591-2.591c0-1.204,0.817-2.238,1.99-2.517c0.343-0.081,0.603-0.364,0.655-0.713C4.32,3.007,6.153,1.426,8.273,1.426c1.464,0,2.384,0.306,3.185,1.543c0.136,0.21,0.789,0.783,1.037,0.817c0.04,0.006,0.119,0.009,0.119,0.009c0.208,0,0.41-0.075,0.568-0.214c0.315-0.275,0.72-0.428,1.136-0.428c0.952,0,1.728,0.775,1.726,1.737L16.04,4.953c-0.019,0.409,0.253,0.775,0.648,0.876c1.147,0.293,1.948,1.324,1.948,2.506C18.637,9.764,17.475,10.926,16.046,10.926 M16.909,15.244c-0.477,0-0.863,0.388-0.863,0.864c0,0.478,0.387,0.863,0.863,0.863s0.863-0.386,0.863-0.863C17.772,15.632,17.386,15.244,16.909,15.244 M14.318,17.835c-0.477,0-0.864,0.387-0.864,0.864c0,0.477,0.388,0.863,0.864,0.863s0.863-0.387,0.863-0.863C15.182,18.222,14.795,17.835,14.318,17.835"></path>
            </svg>
        }
      </div>
        <Bar
          options={options}
          data={{labels,datasets}}
          height={200}
        />
      </div>
    )
  };