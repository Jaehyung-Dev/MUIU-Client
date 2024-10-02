import React, { useState } from 'react';

const HS_test = () => {

    const [userLocation, setUserLocation] = useState(null);

    const getUserLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    alert('클릭은 됐음! 작동도 되나요?');
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser');
        }
    };

    return (
        <div>
            <h1>Geolocation App</h1>
            <button onClick={getUserLocation} style={{width : "400px", height: "50px", backgroundColor: "black", color: "white"}}>Get User Location</button>
            {userLocation && (
                <div>
                    <h2>User Location</h2>
                    <p>Latitude: {userLocation.latitude}</p>
                    <p>Longitude: {userLocation.longitude}</p>
                </div>
            )}
        </div>
    );
};

export default HS_test;