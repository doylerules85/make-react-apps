import React, {useState, useEffect, useCallback } from 'react';
import Geocode from 'react-geocode';

Geocode.setApiKey("AIzaSyDgBITUsYQT1mRTRtHuBPMLjvS2KkKWqPY");

export default function GeoForm({setLatLng}) {

    const [value, setValue] = useState('Phoenix');
  
    const getLatLng = useCallback( (address) => {
        Geocode.fromAddress(address).then((res) => {
          const { lat, lng } = res.results[0].geometry.location;
          setLatLng({lat, lng});
        });
    },[]);
  
    useEffect(() =>{
        getLatLng(value)
    }, []);
    
    function handleSubmit(e){
        e.preventDefault();
        getLatLng(value);
    }
  
    return (
        <form onSubmit={handleSubmit}>
            <input value={value} onChange={(e) => setValue(e.target.value)} type="text"/>
            {/* <input type="submit" value="search"/> */}
        </form>
    )
  };