import React, {useState, useCallback, useEffect} from 'react';
import {useSelector} from "react-redux";
import {GoogleMap, InfoWindow, LoadScript, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';

const POINT1_LATITUDE = 19.730610;
const POINT1_LONGITUDE = -72.935242;
const POINT2_LATITUDE = 39.048111;
const POINT2_LONGITUDE = -77.472806;
const POINT3_LATITUDE = 45.849100;
const POINT3_LONGITUDE = -119.714000;
const API_KEY = 'AIzaSyA4LLM8mhT3dygn4ervEfnWTGlpIXnTmO4';
const CENTERING_LATITUDE = (POINT1_LATITUDE + POINT2_LATITUDE + POINT3_LATITUDE) / 3;
const CENTERING_LONGITUDE = (POINT1_LONGITUDE + POINT2_LONGITUDE + POINT3_LONGITUDE) / 3;


const containerStyle = {
    height: '60vh', width: '100%'
};

const center = {
    lat: POINT1_LATITUDE,
    lng: POINT1_LONGITUDE
};
const intalDistnce = {
    "centroid": {
        "lat": CENTERING_LATITUDE,
        "lng": CENTERING_LONGITUDE,
    },
    "distance1": 0,
    "distance2": 0,
    "distance3": 0
}
export default function GoogleMaps() {
    const data = useSelector(state => state.data);
    const formData = useSelector(state => state.data.formData);
    // console.log("Form Data:::", formData);
    const [distance, setDistance] = useState(intalDistnce);
    const [points, setPoints] = useState({
        point1: {lat: POINT1_LATITUDE, lng: POINT1_LONGITUDE},
        point2: {lat: POINT2_LATITUDE, lng: POINT2_LONGITUDE},
        point3: {lat: POINT3_LATITUDE, lng: POINT3_LONGITUDE},
    });
    useEffect(() => {
        if (data.status === 'succeeded')
            setDistance(data?.payload[0]);
    }, [data]);

    //set state from data with useEffect
    useEffect(() => {
        // console.log("GOOGLE MAP FORM DATA:::", formData.length);
        setPoints({
                point1: {lat: formData?.latitude1, lng: formData?.longitude1},
                point2: {lat: formData?.latitude2, lng: formData?.longitude2},
                point3: {lat: formData?.latitude3, lng: formData?.longitude3},
            }
        );
    }, [formData]);
    // console.log("GOOGLE MAP CALC DISTANCE:::", distance);
    // console.log("GOOGLE MAP POINTS:::", points);
    // Function to convert degrees to radians
    return (
        <LoadScript googleMapsApiKey={API_KEY}>
            <div>
                <h3>Calculate distance</h3>
                <p>Distance between point 1 and centroid: {distance.distance1} km</p>
                <p>Distance between point 2 and centroid: {distance.distance2} km</p>
                <p>Distance between point 3 and centroid: {distance.distance3} km</p>
            </div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={3}
            >
                {/* Markers */}
                <Marker
                    position={points.point1}
                />
                <Marker
                    position={points.point2}
                />
                <Marker
                    position={points.point3}
                />
                {/* Centroid marker */}
                <Marker
                    position={distance.centroid}
                />
                {/* Polyline */}

                <Polyline
                    path={[points.point1, distance.centroid]}
                    options={{
                        geodesic: true,
                        strokeColor: 'red',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                    }}/>
                <Polyline
                    path={[points.point2, distance.centroid]}
                    options={{
                        geodesic: true,
                        strokeColor: 'red',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                    }}/>
                <Polyline
                    path={[points.point3, distance.centroid]}
                    options={{
                        geodesic: true,
                        strokeColor: 'red',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                    }}/>
            </GoogleMap>
        </LoadScript>
    )
}