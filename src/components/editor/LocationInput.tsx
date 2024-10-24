import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useLoadScript } from "@react-google-maps/api";

const LocationInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    if (!isLoaded) return;

    const autocompleteService = new window.google.maps.places.AutocompleteService();

    if (inputValue.length > 2) {
      autocompleteService.getPlacePredictions({ input: inputValue }, (predictions) => {
        if (predictions) {
          setOptions(predictions.map((prediction) => ({
              value: prediction.place_id,
              label: prediction.description,
            }))
          );
        } else {
          setOptions([]);
          }
        }
      );
    } else {
      setOptions([]);
    }
  }, [inputValue, isLoaded]);

  return (
    <Select
      value={options.find((option) => option.value === inputValue)}
      onChange={(option) => setInputValue(option?.value ?? "")}
      options={options}
      isClearable
      placeholder="Search for a location"
      onInputChange={(value) => setInputValue(value)}
    />
  );
};

export default LocationInput;
