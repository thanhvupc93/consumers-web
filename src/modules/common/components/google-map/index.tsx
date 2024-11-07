'use client'
import { useState, useRef } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    Autocomplete,
} from "@react-google-maps/api";
import { AddressType } from "@/types/address";
import { useTranslations } from "next-intl";
import { checkValidateAddress } from "@/utils/validate";
import { CSS_INPUT_DEFAULT } from "@/constants/css";

interface MapProps {
    changeAddress: (data: AddressType) => void;
}
interface LngLat {
    lat: number,
    lng: number
}

const Map = ({ changeAddress }: MapProps) => {
    const u = useTranslations('User');
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult>();
    const [searchLngLat, setSearchLngLat] = useState<LngLat>();
    const [currentLocation, setCurrentLocation] = useState<LngLat>();
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [validateAddress, setValidateAddress] = useState<boolean>(true);

    // laod script for google map
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading....</div>;

    // static lat and lng
    const centerEmBeGa = { lat: 10.798905, lng: 106.642586 };
    // handle place change on search
    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            setSelectedPlace(place);
            setSearchLngLat({
                lat: place?.geometry?.location?.lat() || 0,
                lng: place?.geometry?.location?.lng() || 0,
            });
            // on viet name array will have 5 item
            const addressSearch = place.address_components;
            if (addressSearch && addressSearch.length > 3) {
                const number = addressSearch[0].long_name;
                const street = addressSearch[1].long_name;
                const district = addressSearch[2].long_name;
                const city = addressSearch[3].long_name;
                const address = new AddressType(number, street, district, city);
                changeAddress(address);
                if (!checkValidateAddress(address.full)) {
                    setValidateAddress(false);
                } else {
                    setValidateAddress(true)
                }
                setValidateAddress(false);
            }
        }
        setCurrentLocation(undefined);
    };

    // get current location
    const handleGetLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setSelectedPlace(undefined);
                    setSearchLngLat(undefined);
                    setCurrentLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    // on map load
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onMapLoad = (map: any) => {
        const controlDiv = document.createElement("div");
        const controlUI = document.createElement("div");
        controlUI.innerHTML = "Get Location";
        controlUI.style.backgroundColor = "white";
        controlUI.style.color = "black";
        controlUI.style.border = "2px solid #ccc";
        controlUI.style.borderRadius = "3px";
        controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
        controlUI.style.cursor = "pointer";
        controlUI.style.marginBottom = "22px";
        controlUI.style.textAlign = "center";
        controlUI.style.width = "100%";
        controlUI.style.padding = "8px 0";
        controlUI.addEventListener("click", handleGetLocationClick);
        controlDiv.appendChild(controlUI);
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
            controlDiv
        );
    };

    const onChangeInputAddress = (value: string) => {
        if (!checkValidateAddress(value)) {
            setValidateAddress(false);
        } else {
            setValidateAddress(true)
        }
    }
    return (

        <>
            <div className="">
                <div className=" pb-2 pt-5">
                    <Autocomplete className=""
                        onLoad={(autocomplete) => {
                            autocompleteRef.current = autocomplete;
                        }}
                        onPlaceChanged={handlePlaceChanged}
                        options={{ fields: ["address_components", "geometry", "name"] }}
                    >
                        <input onChange={(e) => onChangeInputAddress(e.target.value)}
                            className={validateAddress ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                            type="text" placeholder={u('address')} />
                    </Autocomplete>
                </div>

                <div className="hidden lg:block">
                    <div className=" flex flex-wrap pt-5">
                        {/* map component  */}
                        <GoogleMap
                            zoom={currentLocation || selectedPlace || centerEmBeGa ? 20 : 12}
                            center={currentLocation || searchLngLat || centerEmBeGa}
                            mapContainerClassName="map"
                            mapContainerStyle={{ width: "100%", height: "600px", margin: "auto" }}
                            onLoad={onMapLoad}
                        >
                            {centerEmBeGa && <Marker position={centerEmBeGa} />}
                            {currentLocation && <Marker position={currentLocation} />}
                            {searchLngLat && <Marker position={searchLngLat} />}
                        </GoogleMap>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Map;