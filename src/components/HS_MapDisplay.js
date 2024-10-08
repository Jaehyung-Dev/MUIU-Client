import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import userMarkerIcon from '../svg/userMarker.svg';
import hospitalMarkerIcon from '../svg/hospitalMarker.svg';

const MapContainer = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 10px;
    overflow: hidden;
`;

const MapDisplay = styled.div`
    width: 100%;
    height: 100%;
`;

const HS_MapDisplay = ({ openInfoPopUp, searchQuery }) => {
    const mapRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);
    const [map, setMap] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(18);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser');
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        const { naver } = window;

        if (mapRef.current && naver) {
            const initialLocation = userLocation
                ? new naver.maps.LatLng(userLocation.latitude, userLocation.longitude)
                : new naver.maps.LatLng(37.4997777, 127.0324107);

            const mapOptions = {
                center: initialLocation,
                zoom: zoomLevel,
                zoomControl: true,
                zoomControlOptions: {
                    style: naver.maps.ZoomControlStyle.SMALL,
                    position: naver.maps.Position.TOP_RIGHT,
                },
            };

            const newMap = new naver.maps.Map(mapRef.current, mapOptions);
            setMap(newMap);

            if (userLocation) {
                new naver.maps.Marker({
                    position: initialLocation,
                    map: newMap,
                    icon: {
                        url: userMarkerIcon,
                        size: new naver.maps.Size(100, 100),
                        anchor: new naver.maps.Point(11, 35)
                    },
                });
            }
        }
    }, [userLocation]);

    useEffect(() => {
        const { naver } = window;

        if (map && userLocation) {
            const newLocation = new naver.maps.LatLng(userLocation.latitude, userLocation.longitude);
            map.setCenter(newLocation);
        }
    }, [userLocation, map]);

    useEffect(() => {
        if (searchQuery) {
            const fetchLocalData = async () => {
                const client_id = '6um4uarnuv';
                const client_secret = 'yKRqSVB06Gt0EBoYyRaYAdDbkfWfFXNc7rsCZ7f8';
                const api_url = `https://openapi.naver.com/v1/search/local?query=${encodeURI(searchQuery)}`;

                try {
                    const response = await axios.get(api_url, {
                        headers: {
                            'X-Naver-Client-Id': client_id,
                            'X-Naver-Client-Secret': client_secret
                        }
                    });
                    setResults(response.data.items);
                    setError(null);
                } catch (err) {
                    setError(err.response ? err.response.status : 'Error occurred');
                    setResults([]);
                }
            };

            fetchLocalData();
        }
    }, [searchQuery]);

    return (
        <MapContainer>
            <MapDisplay>
                <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
            </MapDisplay>
            <div>
                {error && <p>오류: {error}</p>}
                <ul>
                    {results.map((item) => (
                        <li key={item.link}>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </MapContainer>
    );
};

export default HS_MapDisplay;
