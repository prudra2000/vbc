import React, { useEffect, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Input } from '@/components/ui/input'; // shadcn input component

interface LocationInputProps {
  onSelect: (place: google.maps.places.PlaceResult) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onSelect }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        fields: ['address_components', 'geometry', 'formatted_address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        onSelect(place);
      });
    }
  }, [isLoaded, onSelect]);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <div className="relative">
      <Input
        type="text"
        ref={inputRef}
        placeholder="Enter a location"
        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default LocationInput;
